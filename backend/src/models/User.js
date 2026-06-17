import mongoose from 'mongoose';
import validator from 'validator'

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: validator.isEmail,
                message: 'Incorrect email address'
            }
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    { 
        timestamps: true 
    }
);

const User = mongoose.model('User', userSchema);

export default User

