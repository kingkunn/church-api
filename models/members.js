import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Define collection and schema for Members

// define schema
const Member = new Schema({
    // title, name, phone_number, email, image_url, gender, dob, marital_status, 
    // level_of_education, state_of_origin, nationality, home_address
    
    title: {
        type: String,
        required: true, // Rev., Rev. (Mrs), Mr., Miss, Master, Mrs, Dcn., Dcns., Elder
    },
    name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // unique: true,
    },
    image_url: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date
    },
    marital_status: {
        type: String // divorced, single, seperated, married, widowed
    },
    level_of_education: {
        type: String // None, Primary, Secondary, Tertiary
    }, 
    state_of_origin: {
        type: String
    }, 
    nationality: {
        type: String,
        default: 'Nigerian'
    }, 
    home_address: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }, 
    updated_at: {
        type: Date,
        default: Date.now()
    }
}, {
    // define collection
    collection: 'members'
})

export default mongoose.model('Member', Member)