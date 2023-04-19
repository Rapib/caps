'use strict';
const emitter = require('../../eventPool');
const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
let driverSocket = io(SERVER_URL + '/caps');


const { DriverPickUpPkg,
  DriverDeliverPkg,
  DeliverPkgToVendor } = require('./handler');

driverSocket.on('PkgReadyToDriver', (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  // 3a Emit an in-transit event to the Global Event Pool with the order payload.
  // emitter.emit('DriverPickUpPkg', payload);
  DriverPickUpPkg(payload, driverSocket);
  // 4a Log a confirmation message to the console: DRIVER: delivered <ORDER_ID>.
  // Emit a delivered event to the Global Event Pool with the order payload.
  console.log(`DRIVER: delivered ${payload.orderId}`);
  DriverDeliverPkg(payload, driverSocket);
  DeliverPkgToVendor(payload, driverSocket);
  // emitter.emit('DriverDeliverPkg', payload);
}
);