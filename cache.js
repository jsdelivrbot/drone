const memjs = require('memjs');

// Export client connected to memcached

const client = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
	username: process.env.MEMCACHEDCLOUD_USERNAME,
	password: process.env.MEMCACHEDCLOUD_PASSWORD
})

module.exports = client
