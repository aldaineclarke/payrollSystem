const res = require("express/lib/response");
const db = require("../config/db.config");

class AdminController{

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