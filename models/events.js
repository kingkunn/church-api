import mongoose from "mongoose";
const Schema = mongoose.Schema

// Define collection and schema for Events

// define schema
const Event = new Schema({
    // title, description, date, duration, venue, image_url
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    venue: {
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
    collection: 'events'
})

export default mongoose.model('Event', Event)