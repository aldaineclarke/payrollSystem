const db = require("../config/db.config");
const { parseDateToInputField, findStartWeek } = require("../utilities/helper.utils");

class PayrollController{

    getEmployeePayrolls(req,res, next){
        db.query("SELECT * FROM payrolls WHERE emp_id = ?", [id], (error, payrolls)=>{
            res.render("payroll",{payrolls});
        });
    }
    async getAllPayroll(req, res, next){


        try{
            let {startDate, endDate} = findStartWeek(new Date());
            startDate = parseDateToInputField(startDate);
            let employees = await new Promise((resolve, reject)=>{
                db.query("SELECT * FROM employees" ,(error, employees)=>{
                    if(error) reject({code: error.code, message: error.sqlMessage});
                    resolve(employees);
                })
            })
            db.query("SELECT p.id, e.emp_id,e.fname, e.lname, p.total_hours, p.overtime_hours, p.net_salary,p.overtime_payment, p.date_paid FROM payrolls p JOIN employees e ON p.emp_id = e.emp_id WHERE p.date_paid BETWEEN ? AND ?", [startDate, endDate],(error, payrolls)=>{
                if(error) console.log({code: error.code, message: error.sqlMessage});
                console.log(payrolls.map((payroll)=> payroll.date_paid));
                res.render("viewPayrolls",{payrolls, employees, startDate })
            })
        }catch(error){
            console.log(error);
        }
       
        
    }
    async generateAllPayrolls(req, res, next){

        // only allows payroll to be generated on fridays
        // if( new Date().getDay() != 5){
        //     return res.redirect("/");
        // }
        let {startDate, endDate } = findStartWeek(new Date()) //Finds the starting date of the week from the current date.

        let employees = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM employees" ,(error, employees)=>{
                if(error){ reject({code: error.code, message: error.sqlMessage})}
                resolve(employees);
            })
        })
        let departments = await new Promise((resolve, reject)=>{
            db.query("SELECT * FROM departments" ,(error, departments)=>{
                if (error) reject({code: error.code, message: error.sqlMessage})
                resolve(departments);
            })
        });
        
        employees.forEach((employee)=>{
            departmentInfo = departments.filter((department)=> employee.department_id == department.id)[0];

            db.query(`SELECT CAST(SUM(TIMEDIFF(logoutTime, loginTime)) / (10000) AS DECIMAL(10, 2))AS hours
            FROM timecard WHERE emp_id = ${employee.emp_id} AND loginTime BETWEEN '${startDate}' AND '${endDate}'`,(error, totalHours) => {
                if(error) console.log({code: error.code, message: error.sqlMessage});

                // Calculate payroll
                let hours = totalHours[0].hours
                let netSalary = 0;
                let overtimeSalary = 0;
                if(hours > 40 ){
                 netSalary = 40 * departmentInfo.base_rate;
                 overtimeSalary = (hours - 40) * (departmentInfo.overtime_rate * departmentInfo.base_rate);
                }else{
                    netSalary = hours * departmentInfo.base_rate;
                }

                // End Payroll Calculation
                let payrollData = {
                    emp_id: employee.emp_id,
                    total_hours: (hours > 40) ? 40 : hours,
                    overtime_hours: (hours > 40) ? hours - 40 : 0,
                    net_salary: netSalary,
                    overtimeSalary: overtimeSalary,
                    date_paid : parseDateToInputField(new Date ()),
                }
                db.query("INSERT INTO payroll SET ? ", [payrollData], (error, payroll)=>{
                    if (error) console.log({code: error.code, message: error.sqlMessage});

                })
            })
        });
    }
}
module.exports = new PayrollController();