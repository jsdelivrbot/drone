const memjs = require('memjs');

// Connection details with defaults for local testing

console.log("Env", process.env)
const server = process.env.MEMCACHEDCLOUD_SERVERS
	  ||
	  'memcached-19275.c12.us-east-1-4.ec2.cloud.redislabs.com:19275'

const login = {
	username: process.env.MEMCACHEDCLOUD_USERNAME || 'memcached-app101467974',
	password: process.env.MEMCACHEDCLOUD_PASSWORD || 't0cZC4eMZIcBrGaH7yddQpX65TxMcIVl'
	}

// Export client else false if can't connect

let client, connected;

try {
	client = memjs.Client.create(server, login)
	connected = client.servers[0].connected
} catch (err) { }

if (! connected) {
	console.log("Can't connect", client);
}

module.exports = connected && client
