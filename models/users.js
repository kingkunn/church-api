import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

// Define collection and schema for Users

// define schema
const User = new Schema({
    // title, description, date, duration, venue, image_url
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    // define collection
    collection: 'users'
})

User.pre('save', async function (next) {
    try {
        if(!this.isModified('password')){
            return next()
        }

        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed

        return next()
    } catch (err) {
        return next(err)
    }
})

User.methods.comparePassword = async function (attempt, next) {
    try {
        return await bcrypt.compare(attempt, this.password)
    } catch (err) {
        next(err)
    }
}

export default mongoose.model('User', User)