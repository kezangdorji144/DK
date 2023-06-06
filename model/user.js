import mongoose from "mongoose";

const userCredentialSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    emailToken:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    date:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
      }
})

const userCredential = mongoose.model("UserCrendential", userCredentialSchema);
export default userCredential;