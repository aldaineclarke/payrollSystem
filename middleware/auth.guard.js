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

async function isAdmin(req,res,next){
    if(!req.session.user){
        res.redirect("/login");
    }
    let user_id = parseInt(req.session.user.emp_id);
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

async function isLoggedIn(req, res, next){
    if(!req.session.user){
        res.redirect("/login");
    }
}
async function isAuthorizedAndAdmin(req, res, next){
    if(req.session.user.emp_id != parseInt(req.params.id)){
        if(!req.session.user.is_admin){
            return redirect("/");
        }
    }
    next();
}


module.exports = {authGuard, isAdmin, isLoggedIn,isAuthorizedAndAdmin};