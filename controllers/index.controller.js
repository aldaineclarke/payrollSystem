
const db = require("../config/db.config");
const { parseDateToInputField, getDateRange, findStartWeek } = require("../utilities/helper.utils");

class IndexController{
    getEmployeeProfile(req, res, next){
        let emp_id = parseInt(req.session.user.emp_id);
        db.query("SELECT e.emp_id, e.address_id, e.fname, e.lname, e.email, e.username, e.is_admin, e.password, a.line_1, a.line_2, a.parish, d.department FROM employees e JOIN departments d ON e.department_id = d.id JOIN addresses a ON e.address_id = a.id WHERE emp_id = ?", [emp_id], (error, results, fields)=>{
            if(error) console.log({code: error.code, message: error.sqlMessage});
            if(results.length <= 0){
                console.log(results)
                return res.redirect("/");
            }   
            console.log(results)

            db.query("SELECT * FROM departments", (error, departments)=>{
                return res.render("employee-profile", {employeeInfo:results[0], allDepartments: departments})
            })
        })
    }

    updateEmployeeInfo(req, res, next){

    }
    async loginUser(req, res, next){
        let password = req.body.password;
        let email = req.body.email;

        db.query("SELECT * FROM employees WHERE email = ?", email, (error, results, fields)=>{
            if(error) throw error;
            if(results.length <= 0){
                req.flash("error", "No Employee exists with that Email");
                return res.redirect("/login");

            }
            let user = (password == results[0].password)? results[0]: null;

            if(user){
                req.session.user = user;
                
                
                return res.redirect("/");
            }else {
                req.flash("error", "Credentials are not correct");
                res.redirect('/login');

            }
        })

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
    startEmployeeClock(req, res, next){

        let {startRange, endRange } = getDateRange();
        let timecardInfo = {
            emp_id : parseInt(req.session.user.emp_id),
            // loginTime: new Date(),
            status : "Awaiting"
        }
        // login on timecard
        db.query("SELECT * FROM timecard WHERE emp_id = ? AND loginTime BETWEEN ? AND ? ",[req.session.user.emp_id, startRange, endRange ],(error,records, fields)=>{
            if(error) throw error;
            
            if(records.length > 0){
                req.flash("error", "An Entry was already made for the day. Please contact Manager");
                return res.redirect("/")
            }else{
                db.query("INSERT INTO timecard SET ?", timecardInfo, (error, results, fields)=>{
                    if(error) throw error;
                    res.redirect("/");
                })
            }
            
        })
        
    }
    stopEmployeeClock(req, res, next){
        let emp_id =  parseInt(req.session.user.emp_id);
        let {startRange, endRange } = getDateRange();
        let timecardInfo = {
            status : "Pending",
            logoutTime : new Date(),
        }

        // login on timecard
        db.query("UPDATE timecard SET ? WHERE emp_id = ? AND loginTime BETWEEN ? AND ?", [timecardInfo, emp_id, startRange, endRange ], (error, results, fields)=>{
            if(error) throw error;
        })
        res.redirect("/");
    }
    
    async getUserInfo(req, res, next){
        if(!req.session.user){
            return res.redirect("/login")
        }
        let {startDate, endDate} = findStartWeek(new Date());

        if(req.query.startRange){
            let date = new Date(req.query.startRange);
            ({startDate, endDate} = findStartWeek(date))
        }
        startDate = parseDateToInputField(startDate);
        endDate = parseDateToInputField(endDate);


        let {startRange, endRange } = getDateRange();


        let clockStarted = await new Promise((resolve, reject) =>{
            db.query("SELECT * FROM timecard  WHERE emp_id = ? AND ( loginTime BETWEEN ? AND ? ) AND (logoutTime IS NULL) ", [req.session.user.emp_id, startRange, endRange ], (error, results, fields)=>{
            if(error) throw error;

            if(results.length <= 0){
                resolve(false)
            }else if(results.length == 1){
                resolve(true)
            }
            resolve(results)

        })
        }).catch((error)=> {throw error})
        
        let user_id = (req.session.user.emp_id);
        let timecard = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM timecard where emp_id = ? AND loginTime BETWEEN ? AND ? ", [user_id, startDate, endDate],(error, results, fields)=>{
                if (error) throw error;
    
                resolve(results)
    
            });

            
        }).catch((error)=>{res.status(500).json(error)});
        res.render("index",{timecard, user:req.session.user, clockStarted, startDate})

    }
    getPayrollInfo(req, res, next){
        db.query("SELECT * FROM payroll WHERE emp_id = ?",user_id, (error,results, fields)=>{

        });
    }
    logoutUser(req, res, next){
        req.flash("error", "Successfully Logged out");

        req.session.destroy();
        return res.redirect("/login")
    }

}

module.exports = new IndexController()