const db = require("../config/db.config");

class EmployeeController{

    getEmployee(req, res, next){
        let emp_id = req.params.id;
        db.query("SELECT * FROM employee WHERE emp_id = ?", emp_id, (error, results, fields)=>{
            if(error) throw error;
            if(results.length <= 0){
                return res.render("")
            }
            return res.render("employeeDetail", {employee: results[0]})
        })
    }
    getEmployeeCreationForm(req, res, next){
        res.render("employeeCreation");
    }
    createEmployee(req, res, next){
        
        let addressData = {
            line_1 : req.body.addressLine1,
            line_2 : req.body.addressLine2,
            parish : req.body.parish
        }
        db.query("INSERT INTO address SET ?",[addressData], (error, addressResult, next)=>{


            let data = {
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: (req.body.fname).slice(0,1).concat(req.body.lname).toUpperCase(),
                is_admin: req.body.setAdmin,
                address_id: addressResult.insertId
            }

            db.query("INSERT INTO employee SET ?", [data], (error, results, fields)=>{
                if(error) throw error;
                return redirect("/admin/");
    
            });
        })
        

    }
    getEditEmployeeForm(req, res, next){
        let emp_id = req.params.id;
        db.query("SELECT * FROM employee WHERE emp_id = ?", [emp_id], (error, results,field)=>{
            if(error) throw error;
            res.render("employeeCreation") 


        })
        res.render()
    }
    getEmployee(req, res, next){

    }
    getEmployee(req, res, next){

    }

}
module.exports = new EmployeeController()