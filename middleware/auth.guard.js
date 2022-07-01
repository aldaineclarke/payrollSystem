const db = require("../config/db.config");

async function authGuard(req, res, next){
    let user_id = parseInt(req.params.id);
    db.query("SELECT * FROM employees WHERE emp_id = ?", user_id,(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        if(results.length <= 0){ 
            return res.status(404).json({message: "User not found"}) 
        }else if(results[0].is_admin == false){
            return res.status(401).json({message: "User is not Authorized"})
        }
        else{
            next();
        }
    })
}


module.exports = {authGuard}