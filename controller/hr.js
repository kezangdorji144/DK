import EmployeeRecord from "../model/employee.js";
export const hr_page = async (req, res, next) => {
  let query = {};
  const { search,name, department, gender } = req.query;
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  // if (search) {
  //   query.employee_ID = { $regex: search, $options: "i" };
  // }

  if (department) {
    query.department = { $regex: department, $options: "i" };
  }
  if (gender) {
    query.gender = { $regex: gender, $options: "i" };
  }
  

    try {
    const hr_detail = await EmployeeRecord.find(query);
    const booked = new Set(hr_detail.map(item => item._id));
        const count = booked.size;
        
      res.render('./HR/hr',{hr_detail,query,department,gender,name,count});
    } catch (err) {
      console.log(err);
    }
  };

export const addemployee = async (req, res) => {
      try {
        const employee_detail = await EmployeeRecord.find();
        res.render('./HR/add', {employee_detail});
      } catch (error) {
        res.send("Internal error");
        console.log(error);
      }
    };

export const registeremployee = async (req, res, next) => {
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
    
        res.redirect('/hr_page');
      } catch (err) {
        next(err)
    
      }
    }
    
export const deleteuser = async (req, res, next) => {
    try {
        const user_detail = await EmployeeRecord.find();
        await EmployeeRecord.findByIdAndDelete(
            req.params.id,
        );
        res.redirect('/hr_page')
    } catch (err) {
        next(err);
    }
}

export const edituser = async (req, res, next) => {
    try {

        const update = await EmployeeRecord.findById(
            req.params.id,
        );
        res.render('./HR/edit', {
            update: update
        })
        console.log(update);
    } catch (err) {
        next(err);
    }
}

export const postedituser = async (req, res, next) => {
    try {
      const { name, employee_ID, gender, dob, designation, department, appointmentDate } = req.body;
      
      const update = await EmployeeRecord.findByIdAndUpdate(
        req.params.id,
        { name, employee_ID, gender, dob, designation, department, appointmentDate },
        { new: true } // This option returns the updated document
      );
  
      console.log(update);
      res.redirect('/hr_page'); // Redirect to the appropriate page
  
    } catch (err) {
      next(err);
    }
};





 







