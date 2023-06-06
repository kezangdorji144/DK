import express from "express";
import { addemployee, deleteuser, edituser,  hr_page, postedituser, registeremployee } from "../controller/hr.js";
import { loginrequired } from "../midddleware/jwt.js";
 const router = express.Router();
//router.route("/hr_page").get(hr_page)
router.route("/hr_page").get(loginrequired,hr_page)

router.route('/deleterecord/:id').post(deleteuser)

router.route('/edit-user/:id').get(edituser)
router.route('/update-user/:id').post(postedituser)

router.route('/add').get(loginrequired,addemployee)
router.route('/add').post(loginrequired,registeremployee);


export default router;
