const db = require("../config/db.config");
const {parseDateToInputField,findStartWeek,getDateRange} = require("../utilities/helper.utils")
class TimecardController{
    getAllTimecards(req,res, next){

        let whereClause = '';
        let startDate;
        let endDate;
        let date;
        

        if(Object.keys(req.query).length > 0){

            if(req.query.startRange.length > 0){
                date = new Date(req.query.startRange);
                ({startDate, endDate} = findStartWeek(date));
                startDate = parseDateToInputField(startDate);
                endDate = parseDateToInputField(endDate);
            }
            if(req.query.emp_id && req.query.startRange.length > 0){
                    whereClause += `WHERE e.emp_id = ${parseInt(req.query.emp_id)} AND tc.loginTime BETWEEN '${startDate}' AND '${endDate}'`;
                    console.log(startDate);
                    console.log("EndDate: ", endDate)
            }else if(req.query.emp_id){
                whereClause += `WHERE e.emp_id = ${parseInt(req.query.emp_id)}`
            }else if(req.query.startRange.length > 0){
                whereClause += `WHERE tc.loginTime BETWEEN ${startDate} AND ${endDate}`
                
            }
        }else{
            ({startDate, endDate} = findStartWeek(new Date ()));
            startDate = parseDateToInputField(startDate);
        }
        
        
        // let {startRange, endRange } = getDateRange();
    
        db.query(`SELECT tc.id, e.emp_id, concat(e.fname,' ', e.lname) as name, tc.loginTime, tc.logoutTime,  tc.status FROM employees e
        INNER JOIN timecard tc ON tc.emp_id = e.emp_id `+ whereClause, async (error, results, fields)=>{
            if(error) {
                throw error;
            }
            try{
                
                let employeeNames = await new Promise((resolve, reject)=>{
                    db.query("SELECT * FROM employees",(error, results)=>{
                        if(error) reject({code: error.code, message: error.sqlMessage});
                        resolve(results)
                    })
                })
                return res.render("viewTimecards",{records:results, employees:employeeNames, activeId: (req.query.emp_id) ? req.query.emp_id : 0, startDate});
            }catch(error){
                console.log(error);
            }

            res.redirect("/admin/timecards/")
        });
    }
    getEmployeeTimecards(req, res,next){
        let emp_id = parseInt(req.query.emp_id);
        db.query(`SELECT tc.id, e.emp_id, concat(e.fname,' ', e.lname) as name, tc.loginTime, tc.logoutTime,  tc.status FROM employees e
        INNER JOIN timecard tc ON tc.emp_id = e.emp_id WHERE tc.emp_id = ?`, emp_id ,(error, results)=>{
            if(error) console.log({code: error.code, message:error.sqlMessage});

            let employeeNames = results.map((record)=>{
                return {name: record.name, emp_id: record.emp_id}
            });
            employeeNames = [... new Set(employeeNames)];

            console.log(employeeNames)
            res.render("viewTimecards",{records:results, employeeNames});
        });
    }
    getTimecardForWeek(req, res, next){
        let date = req.params.startRange;
        
        let {startDate, endDate} = findStartWeek(date);
        startDate = parseDateToInputField(startDate);
        endDate = parseDateToInputField(endDate);
        console.log("startDate: ", startDate); 
        console.log("endDate: ", endDate)
        db.query("SELECT * FROM timecard where emp_id = ? AND loginTime BETWEEN ? AND ? ", [req.session.user.emp_id, startDate, endDate],(error, results, fields)=>{

            console.log(results)

            // if(error) throw error;
            res.render("history", {timecard:results})
        });
        
    }

    approveHours(req,res,next){
        let recordId = parseInt(req.params.id);
        let status = 'Approved';
        db.query("Update timecard SET status = ?  WHERE id = ?", [status, recordId],(error, results, fields)=>{
            if(error) {
                throw error;
            }
            return res.redirect("/admin/timecards")

        });
    }
    updateTimecard(req,res,next){
        let recordId = req.params.id;
        console.log(req.body.loginTime);
        console.log(req.body.logoutTime);

        let data = {
            loginTime : req.body.loginTime,
            logoutTime: req.body.logoutTime,
            status: req.body.status
        }
        console.log(data.loginTime)
        db.query("Update timecard SET ? WHERE id = ?", [data, recordId],(error, results, fields)=>{
            if(error) {
                throw error;
            }
        });
        return res.redirect("/admin/timecards");

    }
    renderTimeCardForm(req,res,next){
        db.query("SELECT * FROM timecard WHERE id = ?", [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            
            if (results.length <= 0) return res.redirect("admin-dashboard");
            
            return res.render("editTimecard", {timecard: results[0]})
        })
    }
    
}

module.exports = new TimecardController()