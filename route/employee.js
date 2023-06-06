import express from "express";
import { employee, register } from "../controller/employee.js";

const router = express.Router();

router.route('/registration').get(employee)
router.route('/registration').post(register);

export default router