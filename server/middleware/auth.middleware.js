const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const Authorization = req.headers.authorization;
  const token = Authorization?.split(" ")[1];
 
  
// console.log(token,"line 7");

  if (!Authorization) {
    return res.status(400).send({ msg: "Something went wrong with Authorization" });
  }
  if (!token) {
    return res.status(400).send({ msg: "Unauthorized User" });
  }

  try {
    const decoded = jwt.verify(token, process.env.key); 
    req.user = decoded; 

    // console.log(req,"Line 18 middelware")
    // console.log(decoded,"line 19");
    
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went wrong11" });
  }
};

module.exports = authentication;



