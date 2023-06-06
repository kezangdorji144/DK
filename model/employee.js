import mongoose, { Schema } from "mongoose";
const employee_recordSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    employee_ID: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required:true

    },
    dob: {
        type: Date,
        required: true
    },
    designation: {
        type: String,
        required: true

    },
    department: {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true

    },
    

}
);
const EmployeeRecord = mongoose.model("EmployeeRecord",employee_recordSchema)
export default EmployeeRecord