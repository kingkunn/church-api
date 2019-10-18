import express from "express";
import controller from '../controllers'
import auth from '../middleware'

const EventsController = controller.events
const router = express.Router();

// get all events
router.get('/api/v1/events', EventsController.getAllEvents)

// get a single event
router.get('/api/v1/events/:id', EventsController.getEvent)

// update a single event
router.put('/api/v1/events/:id', auth, EventsController.updateEvent)

// delete a single event
router.delete('/api/v1/events/:id', auth, EventsController.deleteEvent)

// create a new event
router.post('/api/v1/events', auth, EventsController.addEvent)

export default router;