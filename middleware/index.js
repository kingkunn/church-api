import jwt from 'jsonwebtoken';
require('dotenv').config();

const checkAuthorization = async (req, res, next) => {
  try {
    if(req.headers.authorization){
      // Bearer kdfn8943yefdnv38939r844
      const token = req.headers.authorization.split(' ')[1];

      await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
          return res.status(401).send({
            success: false,
            message: `Failed to authenticate token`,
          })
        }
        else{
          req.decoded = decoded;
          next()
        }
      })
    }

    // return res.status(401).send({
    //   success: false,
    //   message: `No tokens provided`,
    //   req: req.headers.authorization
    // })
  } catch (err) {
      return res.status(400).send({
        success: false,
        message: `No token provided`,
        err
      })
  }
}

export default checkAuthorization