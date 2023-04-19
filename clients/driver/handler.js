'use strict';

const emitter = require('../../eventPool');

// let driverPickUpMsg = function(payload){
//   console.log(`DRIVER: picked up ${payload.orderId}`);
// };
// emitter.on('DriverPickUpPkg', driverPickUpMsg);

// 2b Listens for a pickup event from the Global Event Pool and responds with the following:DRIVER: picked up <ORDER_ID>.
// emitter.on('PkgReadyToDriver', (payload) => {
//   console.log(`DRIVER: picked up ${payload.orderId}`);
//   // 3a Emit an in-transit event to the Global Event Pool with the order payload.
//   // emitter.emit('DriverPickUpPkg', payload);
//   DriverPickUpPkg(payload);
//   // 4a Log a confirmation message to the console: DRIVER: delivered <ORDER_ID>.
// // Emit a delivered event to the Global Event Pool with the order payload.
//   console.log(`DRIVER: delivered ${payload.orderId}`);
//   DriverDeliverPkg(payload);
//   DeliverPkgToVendor(payload);
//   // emitter.emit('DriverDeliverPkg', payload);
// }
// );

function PkgReadyToDriver(payload, socket) {
  socket.emit('PkgReadyToDriver', payload);
}

function DriverPickUpPkg(payload, socket) {
  socket.emit('DriverPickUpPkg', payload);
}

function DriverDeliverPkg(payload, socket) {
  socket.emit('DriverDeliverPkg', payload);
}

function DeliverPkgToVendor(payload, socket) {
  socket.emit('DeliverPkgToVendor', payload);
}

module.exports = {
  PkgReadyToDriver,
  DriverPickUpPkg,
  DriverDeliverPkg,
  DeliverPkgToVendor
};