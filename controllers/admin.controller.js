const db = require("../config/db.config");

class AdminController{
    getAllEmployees(req,res, next){
        let manager_id = req.session.emp_id;
        db.query("SELECT * FROM employees WHERE manager_id = ", manager_id,(error, results, fields)=>{
            if(error) {
                return res.status(500).json({message:"Server error"});
            }
            
            return res.status(200).json({employees:results});
        });
    }
    approveHours(req,res,next){
        let status = req.body.status;
        let emp_id = req.body.employee_id;
        db.query("Update employees SET status = ? WHERE emp_id = ?", [status, emp_id],(error, results, fields)=>{
            if(error) {
                return res.status(500).json({message:"Server error"});
            }
        });
        return res.status(200).json({message: "successfully added"})
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