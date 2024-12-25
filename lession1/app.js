const express = require('express');
const cors = require('cors')


  const app = express();
  const { pid, env: { HTTP_PORT = 8080} } = process

  app.use(cors())
  app.listen(HTTP_PORT, () => {
    console.log({ message: `✓ 😀 Server started ( pid: ${pid}, port:${HTTP_PORT} )` })
  })

  app.use('/',(req,res)=>{
    console.log('Hello')
    res.json({message:'Hello World'})
  })