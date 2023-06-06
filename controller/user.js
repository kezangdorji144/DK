import userCredential from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const getLoginRegisterForm = async (req, res) => {
  res.render("./HR/Login");
}

export const getForgotPassword = async (req, res) => {
  res.render("./HR/forgotPass");
}

export const getresetPassword = async (req, res) => {
  const { token } = req.params;
  res.render("./HR/reset-password", { token });
  console.log(token);
}

export const message = async (req, res) => {
  res.render("./HR/message");
}

export const forgotpasswordmail = async (req, res) => {
  const email = req.body.email;
  const token = crypto.randomBytes(20).toString('hex');

  try {
    const user = await userCredential.findOne({ email: email });
    if (!user) {
      res.render('./HR/message', { message: 'User not found' });
    } else {
      const userEmail = user.email;
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'Reset your password',
        text:
          `You are receiving this email because you (or someone else) requested a password reset for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://${req.headers.host}/reset-password/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
      res.render('./HR/message', {
        message: 'A verification link has been sent to your email address.',
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const reseting = async (req, res) => {
  try {
    const user = await userCredential.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('Invalid token');
      res.redirect('/forgotPass');
    } else {
      // hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.redirect('/forgotPass');
  }
};


// mail sender details
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kezangdorji144@gmail.com",
    pass: "pyebxhnthgaifmjn"
  },
  tls: {
    rejectUnauthorized: false
  }
});

const createToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT);
};

export const verifyemail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await userCredential.findOne({ emailToken: token }).exec();
    if (user) {
      await user.updateOne({ isVerified: true });
      res.render("./HR/Login", {
        successMessage: "Your Email has been successfully verified, Please login to continue..."
      });
    } else {
      res.render("./HR/Login", {
        errorMessage: "Something went wrong, Please try with valid email."
      });
    }
  } catch (err) {
    console.log("Verification Failed here " + err);
    res.render("./HR/Login", {
      errorMessage: err
    });
  }
};


export const registerUser = async (req, res) => {
  try {
    const foundUser = await userCredential.findOne({ email: req.body.email });
    if (foundUser) {
      console.log("Email used");
      res.render("./HR/Login", {
        errorMessage: "This email is already registered. Please try with a different email.",
      });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const user = new userCredential({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
      });
      await user.save();
      console.log("IIIIII");
      const link = "http://" + req.headers.host + "/verify-email?token=" + user.emailToken;
      const mailOptions = {
        from: "Pema Hotel Booking",
        to: user.email,
        subject: "Pema Hotel Booking",
        html:
          "<h2>Hello " +
          req.body.username +
          ", Thanks for registering on our Website</h2><h4> Please verify your email to continue...</h4><a href=" +
          link +
          ">Verify your Email</a>",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("email" + error);
        } else {
          console.log("Verification link is sent to your gmail account");
          res.render("./HR/Login", {
            successMessage: "Verification link is sent to your gmail account",
          });
        }
      });
    }
  } catch (err) {
    console.log("Verification Invalid" + err);
    res.render("./HR/Login", {
      errorMessage: "Something went wrong, Please try again!",
    });
  }
};


export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const foundUser = await userCredential.findOne({ email: req.body.email });
  if (foundUser) {
    bcrypt.compare(password, foundUser.password, function (err, result) {
      if (result === true) {
        const token = createToken(foundUser._id);
        //store token in cookies
        res.cookie("access_token", token, {
          
          httpOnly: true
        });
        res.redirect('/hr_page');
        console.log("sucessufull");
      } else {
        res.render("./HR/Login", {
          errorMessage: "Your password is incorrect!"
        });
        console.log("not able to login");
      }
    });
  } else {
    res.render("./HR/Login", {
      errorMessage: "No such User found!"
    });
  }

};

export const logout = async(req, res, next) => {
  res.cookie("access_token", "", {
    maxAge: 1
  });
  res.render('./HR/login');
};



export default { getLoginRegisterForm, verifyemail, registerUser, login, logout };