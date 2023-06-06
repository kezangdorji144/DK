import express from "express";
import { homepage } from "../controller/home..js";

const router = express.Router();

router.route("/user_detail").get(homepage)

export default router;