const express = require('express')
const PORT = process.env.PORT || 5000

const cache = require('./cache.js');

const handleRequest = (req, res) => {
	if (! cache) {
		res.send('Failed to connect to cache server');
		return
	}
	cache.set('foo', 'bar')
	cache.get('foo', function (err, value, key) {
		const valueFromCache = value ? value.toString() : 'No value'
		res.send(`From cache: ${ valueFromCache }`)
	})
}

express()
  .get('/', handleRequest)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
