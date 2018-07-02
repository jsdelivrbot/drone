const express = require('express')
const PORT = process.env.PORT || 5000

const handleRequest = (req, res) => res.send('Hello World!')

express()
  .get('/', handleRequest)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
