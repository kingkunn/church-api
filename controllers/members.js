import Member from '../models/members'

const checkFields = (body) => {
    let errArray = []

    if(!body.title){
        errArray.push('title')
    }
    if(!body.name){
        errArray.push('name')
    }
    if(!body.phone_number){
        errArray.push('phone number')
    }

    if(!body.gender){
        errArray.push('gender')
    }

    if(!body.marital_status){
        errArray.push('marital status')
    }

    return errArray
}

class MembersController {
    async getMember(req, res) {
        await Member.findById(req.params.id, (err, member) => {
            if(err) {
                return res.status(404).send({
                    success: false,
                    message: 'This member does not exist',
                    error: err
                })
            }
            
            return res.status(200).send({
                success: true,
                member
            })
        })
    }

    async getAllMembers(req, res) {
        await Member.find((err, members) => {
            if(err){
              return res.status(400).send({
                success: false,
                err
              })
            }
            else {
                if(req.query.gender){
                    return res.status(200).send({
                        success: true,
                        members: members.filter(key => key.gender.toLowerCase() === req.query.gender.toLowerCase())
                    })                    
                }

                return res.status(200).send({
                    success: true,
                    members
                })
            }
        })
    }

    // title, name, phone_number, email, image_url, gender, dob, marital_status, 
    // level_of_education, state_of_origin, nationality, home_address

    async addMember(req, res) {
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
            let member = {
                title: req.body.title,
                name: req.body.name, 
                phone_number: req.body.phone_number, 
                email: req.body.email || null, 
                image_url: req.body.image_url || null, 
                gender: req.body.gender, 
                dob: req.body.dob || null, 
                marital_status: req.body.marital_status, 
                level_of_education: req.body.level_of_education || null, 
                state_of_origin: req.body.state_of_origin || null, 
                nationality: req.body.nationality, 
                home_address: req.body.home_address || null
            }

            member = new Member(member)

            await member.save()
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Member added sucessfully',
                });
            }).catch((error) => {
                // uniqueness
                if(error.code===11000){
                    return res.status(400).send({
                        success: false,
                        message: `A member uses this email address, ${error.keyValue.email}`,
                    })
                }

                return res.status(400).send({
                    success: false,
                    message: 'An error occured while saving member',
                    error
                })
            });
        }
    }

    async updateMember(req, res) {
        await Member.findById(req.params.id, (err, member) => {
            if(!member) {
                return res.status(404).send({
                    success: false,
                    message: 'This member does not exist',
                    error: err
                })
            } else {
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
                    member.title = req.body.title || member.title,
                    member.name = req.body.name || member.name, 
                    member.phone_number = req.body.phone_number || member.phone_number, 
                    member.email = req.body.email || member.email, 
                    member.image_url = req.body.image_url || member.image_url, 
                    member.gender = req.body.gender || member.gender, 
                    member.dob = req.body.dob || member.dob, 
                    member.marital_status = req.body.marital_status || member.marital_status, 
                    member.level_of_education = req.body.level_of_education || member.level_of_education, 
                    member.state_of_origin = req.body.state_of_origin || member.state_of_origin, 
                    member.nationality = req.body.nationality || member.nationality, 
                    member.home_address = req.body.home_address || member.home_address
                    member.updated_at = Date.now()

                    member.save().then(() => {
                        return res.status(200).send({
                            success: true,
                            message: 'Member updated sucessfully',
                        })
                    })
                    .catch(() => {
                        res.status(400).send({
                            success: false,
                            message: 'An error occured while saving member',
                        });
                    });
                }
            }
        })
    }

    async deleteMember(req, res) {
        await Member.findByIdAndRemove({_id: req.params.id}, err => {
            if(err){
                res.json(err);
            }
            else {
                return res.status(200).send({
                    success: true,
                    message: `Member deleted successfully`,
                })
            }
        });
    }
}

export default new MembersController()