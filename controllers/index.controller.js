const { request } = require("express");
const res = require("express/lib/response");
const db = require("../config/db.config");

class IndexController{

    async loginUser(req, res, next){
        let password = req.body.password;
        let username = req.body.username;

        db.query("SELECT * FROM employees WHERE username = ?", username, (error, results, fields)=>{
            if(error) throw error;

            let user = (password == results[0].password)? results[0]: null;

            if(user){
                req.session.user = user;
                let data= {
                    sessionID: req.session.id, 
                    username: user.username, 
                    user_id: user.emp_id,
                    is_admin: user.is_admin
                }
                let timecardInfo = {
                    emp_id : parseInt(req.session.user.emp_id),
                    // loginTime: new Date(),
                    status : "Pending"
                }
                // login on timecard
                db.query("INSERT INTO timecard SET ?", timecardInfo, (error, results, fields)=>{
                    if(error) throw error;
                })
                return res.json(data);
            }else res.json(null)
        })

    }
    async getUserInfo(req, res, next){
        if(!req.session.user){
            return res.json({message:"user is unauthorized"})
        }
        let user_id = (req.session.user.emp_id);
        let timecard = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM timecard WHERE emp_id = ?",user_id, (error, results, fields)=>{
                if(error){reject({message: error})}
                return resolve(results);
            })

            
        }).catch((error)=>{res.status(500).json(error)});

        res.status(200).json({timecard})
        // }catch(error){
        //     res.status(404).send({message:"not sure what error caused this"})
        // }

        // let timecard = new Promise((resolve, reject)=>{
        //     db.query("SELECT * FROM timecard WHERE emp_id = ?",user_id, (error, results, fields)=>{
        //         if(error){reject({message: error})}
        //         resolve(results);
        //     })
        // });
    }
}

module.exports = new IndexController()