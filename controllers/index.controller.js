const { request } = require("express");
const res = require("express/lib/response");
const db = require("../config/db.config");

class IndexController{

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
                let timecardInfo = {
                    emp_id : parseInt(req.session.user.emp_id),
                    // loginTime: new Date(),
                    status : "Pending"
                }
                // login on timecard
                db.query("INSERT INTO timecard SET ?", timecardInfo, (error, results, fields)=>{
                    if(error) throw error;
                })
                
                return res.redirect("/");
            }else {
                req.flash("error", "Credentials are not correct");
                res.redirect('/login');

            }
        })

    }
    async getUserInfo(req, res, next){
        if(!req.session.user){
            return res.redirect("/login")
        }
        let user_id = (req.session.user.emp_id);
        let timecard = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM timecard WHERE emp_id = ?",user_id, (error, results, fields)=>{
                if(error){reject({message: error})}
                return resolve(results);
            })

            
        }).catch((error)=>{res.status(500).json(error)});
        let data = {
            
        }
        res.render("index",{timecard})

    }
    getPayrollInfo(req, res, next){
        db.query("SELECT * FROM payroll WHERE emp_id = ?",user_id, (error,results, fields)=>{

        });
    }

}

module.exports = new IndexController()