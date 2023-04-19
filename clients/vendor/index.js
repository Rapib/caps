'use strict';

// Connects to the CAPS Application Server using socket.io-client:
const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
// Upon connection, use a Vendor ID to join a room, this can be a store name.
let vendorSocket = io(SERVER_URL + '/caps');
const { orderFromVendor, thankyouFromVendor } = require('./handler');
// Listen for the delivered event coming in from the CAPS server.
vendorSocket.on('DeliverPkgToVendor', thankyouFromVendor);

orderFromVendor('aaa', vendorSocket);






