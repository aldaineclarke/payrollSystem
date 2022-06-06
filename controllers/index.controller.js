const { request } = require("express");
const res = require("express/lib/response");
const db = require("../config/db.config");
const { parseDateToInputField } = require("../utilities/helper.utils");

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
                
                
                return res.redirect("/");
            }else {
                req.flash("error", "Credentials are not correct");
                res.redirect('/login');

            }
        })

    }
    startEmployeeClock(req, res, next){
        let timecardInfo = {
            emp_id : parseInt(req.session.user.emp_id),
            // loginTime: new Date(),
            status : "Awaiting"
        }
        // login on timecard
        db.query("INSERT INTO timecard SET ?", timecardInfo, (error, results, fields)=>{
            if(error) throw error;
        })
        res.redirect("/");
    }
    stopEmployeeClock(req, res, next){
        let emp_id =  parseInt(req.session.user.emp_id);
        let startDate = parseDateToInputField(new Date());
        let tomo = new Date().setDate(new Date().getDate() + 1)
        let endDate = parseDateToInputField(new Date(tomo));
        let timecardInfo = {
            status : "Pending",
            logoutTime : new Date(),
        }
        console.log(startDate)
        console.log(endDate)
        // login on timecard
        db.query("UPDATE timecard SET ? WHERE emp_id = ? AND loginTime BETWEEN ? AND ?", [timecardInfo, emp_id, startDate, endDate ], (error, results, fields)=>{
            if(error) throw error;
        })
        res.redirect("/");
    }
    async getUserInfo(req, res, next){
        if(!req.session.user){
            return res.redirect("/login")
        }
        req.session.clockStarted = false;
        let user_id = (req.session.user.emp_id);
        let timecard = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM timecard WHERE emp_id = ?",user_id, (error, results, fields)=>{
                if(error){reject({message: error})}
                return resolve(results);
            })

            
        }).catch((error)=>{res.status(500).json(error)});

        res.render("index",{timecard, user:req.session.user})

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