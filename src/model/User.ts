import mongoose, {Schema, Document} from "mongoose";


export interface User extends Document {
    username:string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required:[true,"username is required"],
        trim: true
    },
    email: {
        type:String,
        required: [true,"email is required"],
        match: [/.+\@.+\..+/, 'Please use a valid email address']
    },
    password: {
        type:String,
        required: true
    },
    verifyCode: {
        type:String,
        required: true
    },
    verifyCodeExpiry: {
        type:Date,
        required: true
    }

})

const userModel = (mongoose.models.User as mongoose.Model<User>) ||mongoose.model<User>('User',UserSchema)

export default userModel;
