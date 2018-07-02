const express = require('express')
const PORT = process.env.PORT || 5000

const getCachedDroneById = require('./fetchCached')

const handleRequest = (req, res) => {
	getCachedDroneById(2,
		error => {
			res.send(error)
		},
		droneJsonString => {
			res.send(droneJsonString)
		})
}

express()
  .get('/', handleRequest)
  .listen(PORT, () => console.log('Listening on ' + PORT))
