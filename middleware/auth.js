// import jwt from 'jsonwebtoken';

// const checkAuthorization = async (req, res, next) => {
//     try {
//         if(req.headers.authorization){
//             // Bearer kdfn8943yefdnv38939r844
//             const token = req.headers.authorization.split(' ')[1];

//             jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//                 if(err) {
//                     return res.status(400).send({
//                         success: false,
//                         message: `Failed to authenticate token`,
//                     })
//                 }else{
//                     req.decoded = decoded;
//                     next()
//                 }
//             })
//         }
//     } catch (err) {
//         return res.status(400).send({
//             success: false,
//             message: `No token provided`,
//         })
//     }
// }
