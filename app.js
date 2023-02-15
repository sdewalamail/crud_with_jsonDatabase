
// Pre-Define Method
const express = require('express');
 const app = express();
require('dotenv').config();

const  authMiddleware  = require('./middleware/auth');

  // const variable
 const port = process.env.PORT || 8000;



  app.use(express.urlencoded());
  app.use(express.json());
  app.use(authMiddleware);
  
  app.use('/', require('./routes/index'))


  app.listen(port, () => {

     console.log(`Server on, on the port number ${port}`);

  })


