const express = require('express')
const PORT = process.env.PORT || 5000

const getCachedDroneById = require('./fetchCached.js')

const handleRequest = (req, res) => {
	// droneId = Math.floor(11 + 3 * Math.random()) // -> int 11..13.  Actual ids 1..12.
	const droneId = req.params.droneId
	console.log('Fetch drone', droneId)
	if (droneId == '')
		return res.send('Missing drone id')
	getCachedDroneById(droneId,
		error => {
			res.send(droneId + ": " + error)
		},
		droneJsonString => {
			if (droneJsonString == 'null') {
				res.status(404).send('Unknown drone id: ' + droneId)
			} else {
				res.send(droneJsonString)
			}
		})
}

express()
  .get('/:droneId(\\d{0,})', handleRequest)
  .listen(PORT, () => console.log('Listening on ' + PORT))
