'use strict';
// Use the socket.io npm package to configure an event Server that can be started at a designated port using node.
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
// Accept connections on a namespace called caps, and configure socket objects from clients.
let caps = io.of('/caps');

//EVENT Logger
const date = new Date();
function logger (eventName, payload){
  let event = {};
  event.event = eventName;
  event.time = date;
  event.payload = payload;
  console.log(event);
}

caps.on('connection', (socket) => {
  console.log('CLIENT CONNECTED TO /caps', socket.id);
  // Ensure that client sockets are connecting to their appropriate room if specified.
  socket.on('joinRoom', (payload) => {
    socket.join(payload.store);
  });
  // Configure a Global Event Pool that every client socket should listen for:
  // pickup - this will be broadcast to all sockets.
  socket.on('PkgReadyFromVendor', (payload) => {
    caps.emit('PkgReadyToDriver', payload);
    logger ('pickup', payload);
    // use your vendor "id" string
    // caps.to('room-id').emit('food', payload);
  });
  // in-transit - this will be emitted only to Vendors that have joined the appropriate room.
  socket.on('DriverPickUpPkg', (payload) => {
    caps.to(payload.store).emit('DriverPickUpPkg', payload);
    logger ('inTransit', payload);
  });

  // delivered - this will be be emitted only to Vendors that have joined the appropriate room.
  socket.on('DriverDeliverPkg', (payload) => {
    caps.to(payload.store).emit('DeliverPkgToVendor', payload);
    logger ('delivered', payload);
  });
});


