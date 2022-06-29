const db = require("../config/db.config");

class EmployeeController{

    getEmployee(req, res, next){
        let emp_id = parseInt(req.params.id);
        db.query("SELECT e.fname, e.lname, e.email, e.username, e.password, a.line_1, a.line_2, a.parish, d.department FROM employees e JOIN departments d ON e.department_id = d.id JOIN addresses a ON e.address_id = a.id WHERE emp_id = ?", [emp_id], (error, results, fields)=>{
            if(error) console.log({code: error.code, message: error.sqlMessage});
            if(results.length <= 0){
                return res.redirect("/admin/employees")
            }

            db.query("SELECT * FROM departments", (error, departments)=>{
                return res.render("employeeDetails", {employeeInfo:results[0], allDepartments: departments})
            })
        })
    }
    getEmployeeCreationForm(req, res, next){
        db.query("SELECT * FROM departments", (error, results)=>{
            if(error) console.log({code: error.code, message: error.sqlMessage});
            res.render("employeeCreation", {departments: results});
        });
    }
    createEmployee(req, res, next){
    

        let password = (req.body.fname).slice(0,1);
        console.log(password)
        let addressData = {
            line_1 : req.body.addressLine1,
            line_2 : req.body.addressLine2,
            parish : req.body.parish
        }

         db.query("INSERT INTO addresses SET ?",[addressData], (error, addressResult, next)=>{

             if(error) throw error;
             let password = (req.body.fname).slice(0,1);
            password = password.concat(".",req.body.lname).replace(" ","-").toUpperCase();
             let data = {
                 fname: req.body.fname,
                 lname: req.body.lname,
                 username: req.body.username,
                 email: req.body.email,
                 department_id: req.body.department,
                 password: password,
                 is_admin: (req.body.setAdmin) ? true : false,
                 address_id: addressResult.insertId
             }

             db.query("INSERT INTO employees SET ?", [data], (error, results, fields)=>{
                 if(error) throw error;
                 return res.redirect("/admin/employees/");
             });
         })
        

    }
    getEditEmployeeForm(req, res, next){
        let emp_id = req.params.id;
        db.query("SELECT * FROM employees WHERE emp_id = ?", [emp_id], (error, results,field)=>{
            if(error) throw error;
            res.render("employeeCreation") 


        })
        res.render()
    }
    getAllEmployees(req, res, next){
        db.query("SELECT e.emp_id, e.fname,e.lname, e.email, d.department FROM employees e JOIN departments d ON d.id = e.department_id", (error, results)=>{
            if(error) console.log({code: error.code, message: error.sqlMessage});
            res.render("viewEmployees", {employees:results});
        })
    }
    // getEmployee(req, res, next){

    // }

}
module.exports = new EmployeeController()