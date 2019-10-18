import express from "express";
import controller from '../controllers'
import auth from '../middleware'

const router = express.Router();
const SermonsController = controller.sermons

// get all sermons
router.get('/api/v1/sermons', SermonsController.getAllSermons)

// get a single sermon
router.get('/api/v1/sermons/:id', SermonsController.getSermon)

// update a single sermon
router.put('/api/v1/sermons/:id', auth, SermonsController.updateSermon)

// delete a single sermon
router.delete('/api/v1/sermons/:id', auth, SermonsController.deleteSermon)

// create a new sermon
router.post('/api/v1/sermons', auth, SermonsController.addSermon)

export default router;