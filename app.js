require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';

import router from './routes'
import controllers from './controllers'
import models from './models'

const app = express();

// adding Helmet to enhance your API's security
// app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
// app.use(morgan('combined'));

// API routes
app.use(router.events);
app.use(router.sermons);
app.use(router.auth);
app.use(router.members);
app.use(router.upload);

app.use(controllers.errors)
app.use(controllers.notFound)

// API DB
app.use(models.events)
app.use(models.sermons)
app.use(models.users)
app.use(models.members)

const port = 5000;

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${port}`)
})