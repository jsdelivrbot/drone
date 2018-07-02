const express = require('express')
const PORT = process.env.PORT || 5000

const getCachedDroneById = require('./fetchCached.js')

const handleRequest = (req, res) => {
	droneId = Math.floor(1 + 13 * Math.random()) // -> int 1..13.  Actual ids 1..12.
	getCachedDroneById(droneId,
		error => {
			res.send(droneId + ": " + error)
		},
		droneJsonString => {
			res.send(droneJsonString)
		})
}

express()
  .get('/', handleRequest)
  .listen(PORT, () => console.log('Listening on ' + PORT))
