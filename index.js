const express = require('express')
const PORT = process.env.PORT || 5000

const cacheClient = require('./cache.js');
const getDroneById = require('./fetch.js');

const handleRequest = (req, res) => {
	// cacheClient.set('foo', 'bar', {expires: 600})
	// 	.catch(e => console.log('set failed', e))
	// cacheClient.get('foo', function (err, value, key) {
	// 	const valueFromCache = value ? value.toString() : 'No value'
	// 	res.send(`From cache: ${ valueFromCache }`)
	// })

	getDroneById(2,
		error => { res.send(error) },
		droneJsonString => { res.send(droneJsonString) }
	)
}

express()
  .get('/', handleRequest)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
