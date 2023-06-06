import userCredential from "../model/user.js";
import jwt from "jsonwebtoken";


export const loginrequired = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token: " + token);
  if (token) {
    const validatetoken = jwt.verify(token, process.env.JWT);
    console.log("this is validatetoken:" + validatetoken);
    if (validatetoken) {
      res.user = validatetoken._id;
      next();
    } else {
      console.log("token expires");
      res.render("./HR/Login", { errorMessage: "You are logout" });
    }
  } else {
    console.log("token not found!");
    res.render("./HR/Login", { errorMessage: "Please login" });
  }
};




export default { loginrequired};