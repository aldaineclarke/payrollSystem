const res = require("express/lib/response");
const db = require("../config/db.config");

class AdminController{
    getAllEmployees(req,res, next){
        db.query(`SELECT tc.id, e.emp_id, concat(e.fname,' ', e.lname) as name, tc.loginTime, tc.logoutTime,  tc.status FROM employees e
        INNER JOIN timecard tc ON tc.emp_id = e.emp_id`,(error, results, fields)=>{
            if(error) {
                throw error;
            }
            
            return res.render("admin-dashboard",{records:results});
        });
    }

    renderTimeCardForm(req,res,next){
        db.query("SELECT * FROM timecard WHERE id = ?", [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            
            if (results.length <= 0) return res.redirect("admin-dashboard");
            
            return res.render("editTimecard", {timecard: results[0]})
        })
    }
    approveHours(req,res,next){
        let recordId = parseInt(req.params.id);
        let status = 'Approved';
        db.query("Update timecard SET status = ?  WHERE id = ?", [status, recordId],(error, results, fields)=>{
            if(error) {
                throw error;
            }
            return res.redirect("/admin")

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
        return res.redirect("/admin/");

    }
    createEmployee(req, res, next){
        
        let addressData = {
            line_1: req.body.line1,
            line_2: req.body.line2,
            parish: req.body.parish,
        }

        db.query("INSERT INTO address SET ?", addressData, (error, results,fields)=>{
            if(error) {throw error}
            // respond with an error message if the error is present

            let employeeData = {
                fname:req.body.firstname,
                lname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                is_admin: req.body.admin,
                manager_id: req.body.manager_id,
                address_id: results.insertId,
            };
            
            db.query("INSERT INTO employees SET ?", employeeData, (error, results, fields)=>{
                if(error){ throw error}
            })

        })
        return res.status(201).json({message: "Successfully created"})
    }
}

module.exports = new AdminController();