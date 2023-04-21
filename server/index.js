'use strict';

const { Server } = require('socket.io');
const MessageQueue = require('./lib/queue');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
let caps = io.of('/caps');

let pickup = new MessageQueue();
let delivered = new MessageQueue();


//EVENT Logger
const date = new Date();
function logger(eventName, payload) {
  let event = {};
  event.event = eventName;
  event.time = date;
  event.payload = payload;
  console.log(event);
}

//payload generator
function payloadGenerator(event, payload) {
  let newMsg = {};
  newMsg.event = event;
  newMsg.messageId = payload.orderId;
  newMsg.clientId = payload.store;
  newMsg.order = payload;
  // let newPayload = {
  //   event: 'appropriate-event-name', // either pickup or delivered
  //   messageId: order.orderId,  // unique id from the original payload
  //   clientId: `store-name`,  // either acme-widgets or 1-800-flowers
  //   order: payload,
  // };
  return newMsg;
}

caps.on('connection', (socket) => {
  console.log('CLIENT CONNECTED TO /caps', socket.id);

  //rooms
  socket.on('joinRoom', (payload) => {
    socket.join(payload.store);
  });

  // getAll event/ When this event is heard on the server, find each of the messages in the queue for the client, for the event specified.
  socket.on('getAll', (payload) => {
    // Go through each of the entries for the client/event in the queue (if any) and broadcast them to the client.
    let message = delivered.read(payload.store);
    // send notification
    socket.emit('getAll', message);
  });
  // pickup - this will be broadcast to all sockets.
  socket.on('PkgReadyFromVendor', (payload) => {
    let message = pickup.store(payload.store, payload);
    let newMsg = payloadGenerator('pickup',payload);
    caps.emit.('PkgReadyToDriver', newMsg);
    logger('pickup', message);
    // use your vendor "id" string
    // caps.to('room-id').emit('food', payload);
  });
  // in-transit - this will be emitted only to Vendors that have joined the appropriate room.
  socket.on('DriverPickUpPkg', (payload) => {
    
    caps.to(payload.store).emit('DriverPickUpPkg', payload);
    logger('inTransit', payload);
  });

  // delivered - this will be be emitted only to Vendors that have joined the appropriate room.
  socket.on('DriverDeliverPkg', (payload) => {
    caps.to(payload.store).emit('DeliverPkgToVendor', payload);
    logger('delivered', payload);
  });


  // received event. When this event is heard on the server, assume it's a Client Module telling you a payload was successfully read.
  socket.on('received', (payload) => {
    let receivedMsg = delivered.read(payload.store);
    // The payload should include the client id, event name, and message id, so that you can delete it from the Queue.
    let message = receivedMsg.remove(payload.orderId);
    console.log(message);
    socket.emit('confirm-received', message);
  });
});






