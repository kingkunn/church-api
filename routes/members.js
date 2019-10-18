import express from "express";
import controller from '../controllers'
import auth from '../middleware'

const MembersController = controller.members
const router = express.Router();

// get all members
router.get('/api/v1/members', auth, MembersController.getAllMembers)

// get a single member
router.get('/api/v1/members/:id', MembersController.getMember)

// update a single member
router.put('/api/v1/members/:id', MembersController.updateMember)

// delete a single member
router.delete('/api/v1/members/:id', MembersController.deleteMember)

// create a new member
router.post('/api/v1/members', MembersController.addMember)

export default router;