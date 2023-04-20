'use strict';
let socket = require('../socket');

const { orderFromVendor, thankyouFromVendor, receiveMsg } = require('./handler');
// 2. Trigger the received event with the correct payload to the server.
socket.on('getAll', receiveMsg(socket));
socket.on('DeliverPkgToVendor', thankyouFromVendor);
// 1. On startup, your client applications should trigger a getAll event that fetches all messages from the server that are in that Vendor’s Queue (events/messages they’ve not yet received).
socket.emit('getAll', {store: 'flower'});

// Subscribe to the delivered Queue.
// Each client should be able to receive payloads “published” to the delivered Queue.
// We still want to log a confirmation with the “order-id” and payload.


orderFromVendor('flower', 'order1', socket);

