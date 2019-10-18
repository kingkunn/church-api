import Sermon from '../models/sermons'

const checkFields = (body) => {
    let errArray = []

    if(!body.title){
        errArray.push('title')
    }
    if(!body.content){
        errArray.push('content')
    }
    if(!body.date){
        errArray.push('date')
    }

    if(!body.category){
        errArray.push('category')
    }

    if(!body.preacher){
        errArray.push('preacher')
    }

    if(!body.image_url){
        errArray.push('image_url')
    }

    return errArray
}

class SermonsController {
    getAllSermons(req, res) {
        Sermon.find((err, sermons) => {
            if(err){
              return res.status(400).send({
                success: false,
                err
              })
            }
            else {
                if(req.query.category){
                    return res.status(200).send({
                        success: true,
                        sermons: sermons.filter(key => key.category.toLowerCase() === req.query.category.toLowerCase())
                    })                    
                }

                return res.status(200).send({
                    success: true,
                    sermons
                })
            }
        })
    }

    // get a single sermon
    getSermon(req, res) {
        Sermon.findById(req.params.id, (err, sermon) => {
            if(err) {
                return res.status(404).send({
                    success: false,
                    message: 'This sermon does not exist',
                    error: err
                })
            }
            
            return res.status(200).send({
                success: true,
                sermon
            })
        })
    }

    // create a new sermon
    addSermon(req, res) {
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
            let sermon = {
                title: req.body.title,
                quote: req.body.quote,
                content: req.body.content,
                date: req.body.date,
                preacher: req.body.preacher,
                category: req.body.category,
                image_url: req.body.image_url || null,
                created_at: Date.now(),
                updated_at: Date.now()
            }

            sermon = new Sermon(sermon)

            sermon.save()
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Sermon added sucessfully',
                });
            }).catch((error) => {
                // uniqueness
                if(error.code===11000){
                    return res.status(400).send({
                        success: false,
                        message: `This sermon, ${error.keyValue.title}, already exists`,
                    })
                }

                return res.status(400).send({
                    success: false,
                    message: 'An error occured while saving sermon',
                    error
                })
            });
        }
    }

    // update a sermon
    updateSermon(req, res) {
        Sermon.findById(req.params.id, (err, sermon) => {
            if(!sermon){
                return res.status(404).send({
                    success: false,
                    message: 'This sermon does not exist',
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
                    sermon.title = req.body.title || sermon.title,
                    sermon.quote = req.body.quote || sermon.quote,
                    sermon.content = req.body.content || sermon.content,
                    sermon.date = req.body.date || sermon.date,
                    sermon.preacher = req.body.preacher || sermon.preacher,
                    sermon.category = req.body.category || sermon.category,
                    sermon.image_url = req.body.image_url  || sermon.image_url || null,
                    sermon.created_at = sermon.created_at,
                    sermon.updated_at = Date.now()   

                    sermon.save().then(() => {
                        return res.status(200).send({
                            success: true,
                            message: 'Sermon updated sucessfully',
                        })
                    })
                    .catch(() => {
                        // uniqueness
                        if(error.code===11000){
                            return res.status(400).send({
                                success: false,
                                message: `This sermon, ${error.keyValue.title}, already exists`,
                            })
                        }

                        return res.status(400).send({
                            success: false,
                            message: 'An error occured while saving sermon',
                        })
                    });
                }
            }
        })
    }

    deleteSermon(req, res) {
        Sermon.findByIdAndRemove({_id: req.params.id}, (err) => {
            if(err){
                res.json(err);
            }
            else {
                return res.status(200).send({
                    success: true,
                    message: `Sermon deleted successfully`,
                })
            }
        });
    }
}

const sermonController = new SermonsController();

export default sermonController;