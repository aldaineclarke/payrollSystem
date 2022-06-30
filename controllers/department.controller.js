const db = require("../config/db.config");

class DepartmentController{

    getAllDepartments(req, res, next){
        db.query("SELECT * FROM departments",(error, departments)=>{
            res.render("departments",{departments});
        })
    }
    getDepartment(req, res, next){
        let id = parseInt(req.params.id);
        db.query("SELECT * FROM departments WHERE id = ?", id,(error, departments)=>{
            res.render("editDepartment",{department: departments[0]});
        });
    }
    createDepartment(req, res, next){

        let data = {
            department: req.body.department,
            base_rate: req.body.baseRate,
            overtime_rate: req.body.overtime
        }
        db.query("INSERT INTO departments SET ?",[data],(error, departments)=>{
            res.redirect("/admin/departments");
        })
    }
    createDepartmentForm(req, res, next){
        res.render("addDepartment");
    }
    updateDepartment(req, res, next){
        let id = parseInt(req.params.id);
        let data = {
            department: req.body.department,
            base_rate: req.body.baseRate,
            overtime_rate: req.body.overtime
        }
        db.query("UPDATE departments SET ? WHERE id = ?",[data, id],(error, departments)=>{
            res.redirect("/admin/departments");
        });
    }
    deleteDepartment(req, res, next){
        let id = parseInt(req.params.id);
        db.query("DELETE FROM departments WHERE id = ?",[id],(error, departments)=>{
            res.redirect("/admin/departments");
        })
    }

}

module.exports = new DepartmentController();