import mongoose from "mongoose";
const Schema = mongoose.Schema

// Define collection and schema for Events

// define schema
const Sermon = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    quote: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
    },
    preacher: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,  
    },
    created_at: {
        type: Date,
        default: Date.now
    }, 
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    // define collection
    collection: 'sermons'
})

export default mongoose.model('Sermon', Sermon)