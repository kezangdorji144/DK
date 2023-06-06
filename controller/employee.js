import EmployeeRecord from "../model/employee.js";

export const employee = async (req, res) => {
    try {
      const employee_detail = await EmployeeRecord.find();
      res.render('./employee/userRegister', {employee_detail});
    } catch (error) {
      res.send("Internal error");
      console.log(error);
    }
  };
export const register = async (req, res, next) => {
    try {
  
      const newEmployee_record = EmployeeRecord({
        
        name: req.body.name,
        employee_ID: req.body.employee_ID,
        gender: req.body.gender,
        dob: req.body.dob,
        designation: req.body.designation,
        department: req.body.department,
        appointment_date: req.body.appointment_date,
  
      })
      try {
        await newEmployee_record.save();
  
      } catch (error) {
        console.error('Error updating documents:', error);
      }
  
      res.redirect('/user_detail');
    } catch (err) {
      next(err)
  
    }
  }
  