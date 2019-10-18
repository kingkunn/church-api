import sermons from './sermons'
import events from './events'
import auth from './auth'
import members from "./members";

const notFound = (req, res, next) => {
    return res.status(404).send({
        success: false,
        message: 'Not found'
    })
}

const imageUpload = (req, res, next) => {
    // let formData = new FormData();
    // formData.append('image', req.body);
    // return res.status(200).send({
    //     form: formData
    // })
}

const errors = (err, req, res, next) => {
    return res.status(err.status || 500).send({
        success: false,
        message: err.message || 'Something went wrong',
    })
}

const controllers = {
    sermons, 
    events, 
    members,
    auth,
    errors,
    notFound,
    imageUpload
}

export default controllers