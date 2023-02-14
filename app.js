
// Pre-Define Method
const express = require('express');
 const app = express();



  // const variable
 const port = 8000;



  app.use(express.urlencoded());
  app.use(express.json());

  app.use('/', require('./routes/index'))


  app.listen(port, () => {

     console.log(`Server on, on the port number ${port}`);

  })