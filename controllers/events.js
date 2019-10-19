// Require Event model in our routes module
import Event from '../models/events'

const checkFields = (body) => {
    let errArray = []

    if(!body.title){
        errArray.push('title')
    }
    if(!body.description){
        errArray.push('description')
    }
    if(!body.date){
        errArray.push('date')
    }

    if(!body.venue){
        errArray.push('venue')        
    }
    return errArray
}

class EventsController{
    getAllEvents(req, res) {
        Event.find((err, events) => {
            if(err){
              return res.status(400).send({
                success: false,
                events: err
              })
            }
            else {
                return res.status(200).send({
                    success: true,
                    events
                })
            }
        });
    }

    getEvent(req, res) {
        Event.findById(req.params.id, (err, event) => {
            if(err) {
                return res.status(404).send({
                    success: false,
                    message: 'This event does not exist',
                    error: err
                })
            }
            
            return res.status(200).send({
                success: true,
                event
            })
            
        });
    }

    addEvent(req, res) {
        let errArray = checkFields(req.body)

        if(errArray.length){
            let errMsg = ''

            if(errMsg.length>1){
                errMsg = `The following fields are required: ${errArray.join(', ')}`
            }
            else{            
                errMsg = `The following field is required: ${errArray.join()}`
            }

            return res.status(400).send({
                success: 'false',
                message: errMsg
            });
        }
        else{
            let event = {
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                event_date: req.body.date,
                duration: req.body.duration || null,
                venue: req.body.venue,
                image_url: req.body.image_url || null,
            }

            event = new Event(event);
            
            event.save()
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Event added sucessfully',
                    event
                });
            }).catch((err) => {
                return res.status(400).send({
                    success: false,
                    message: 'An error occured while saving event',
                    err
                })
            });
        }
    }

    updateEvent(req, res) {
        Event.findById(req.params.id, (err, event) => {
            if(!event) {
                return res.status(404).send({
                    success: false,
                    message: 'This event does not exist',
                    error: err
                })
            }
            else {
                let errArray = checkFields(req.body)

                if(errArray.length){
                    let errMsg = ''
                    
                    if(errMsg.length>1){
                        errMsg = `The following fields are required: ${errArray.join(', ')}`
                    }
                    else{            
                        errMsg = `The following field is required: ${errArray.join()}`
                    }
        
                    return res.status(400).send({
                        success: 'false',
                        message: errMsg
                    });
                }
                else {
                    event.title = req.body.title || event.title,
                    event.description = req.body.description || event.description,
                    event.date = req.body.date || event.date,
                    event.event_date = req.body.date || event.date,
                    event.duration = req.body.duration  || event.duration || null,
                    event.venue = req.body.venue || event.venue,
                    event.image_url = req.body.image_url  || event.image_url || null,
                    event.created_at = event.created_at,
                    event.updated_at = Date.now()

                    event.save().then(() => {
                        return res.status(200).send({
                            success: true,
                            message: 'Event updated sucessfully',
                            event
                        })
                    })
                    .catch(() => {
                        res.status(400).send({
                            success: false,
                            message: 'An error occured while saving event',
                        });
                    });
                }
            }
        });
    }

    deleteEvent(req, res) {
        Event.findByIdAndRemove({_id: req.params.id}, err => {
            if(err){
                res.json(err);
            }
            else {
                return res.status(200).send({
                    success: true,
                    message: `Event deleted successfully`,
                })
            }
        });
    }
}

const eventController = new EventsController();

export default eventController;