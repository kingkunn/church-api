import User from '../models/users';
import jwt from 'jsonwebtoken';

const checkFields = (body) => {
    let errArray = []

    if(!body.username){
        errArray.push('username')
    }
    if(!body.password){
        errArray.push('password')
    }

    return errArray
}

class UsersController {
    async register(req, res) {
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
            if(req.body.password.length<6){
                return res.status(400).send({
                    success: 'false',
                    message: `Password should have at least 6 characters`
                });
            } 
            else if(req.body.username.length<6){
                return res.status(400).send({
                    success: 'false',
                    message: `Username should have at least 6 characters`
                });
            }
            else{
                let user = {
                    username: req.body.username,
                    password: req.body.password
                }

                user = new User(user)
                const {id, username} = user
                const token = jwt.sign({id, username}, process.env.SECRET_KEY)

                await user.save()
                .then(() => {
                    return res.status(200).send({
                        success: true,
                        message: 'User added sucessfully',
                        user: { id, username, token }
                    });
                }).catch((error) => {
                    if(error.code===11000){
                        return res.status(400).send({
                            success: false,
                            message: `This username is already taken`,
                        })
                    }

                    return res.status(400).send({
                        success: false,
                        message: 'An error occured while registering user',
                        // error
                    })
                });
            }
        }
    }

    async login(req, res, next) {
        try{
            const user = await User.findOne({ username: req.body.username })
            if(user){
                const { id, username } = user
                const valid = await user.comparePassword(req.body.password)

                if(valid){
                    const token = jwt.sign({id, username}, process.env.SECRET_KEY)

                    return res.status(200).send({
                        success: true,
                        message: 'Login successful',
                        user: {id, username, token}
                    })
                }else{
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid Username/Password'
                    })
                }
            }

            return res.status(400).send({
                success: false,
                message: 'Invalid Username/Password'                
            })
        }
        catch (err) {
            next(err)
        }
    }
}
const authController = new UsersController();

export default authController 