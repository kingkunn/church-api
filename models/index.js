require('dotenv').config();

import mongoose from "mongoose";

import sermons from './sermons'
import events from './events'
import users from './users'
import members from './members'

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise

// let db = 'mongodb://localhost/tejuosho-db'
// db = process.env.DATABASE

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

const models = {sermons, events, users, members}

export default models