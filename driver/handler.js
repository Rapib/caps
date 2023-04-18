'use strict';

const emitter = require('../eventPool');

// let driverPickUpMsg = function(payload){
//   console.log(`DRIVER: picked up ${payload.orderId}`);
// };
// emitter.on('3driverAlertSysPkgPicked', driverPickUpMsg);

// 2b Listens for a pickup event from the Global Event Pool and responds with the following:DRIVER: picked up <ORDER_ID>.
// emitter.on('2driverReadyToPickPkg', (payload) => {
//   console.log(`DRIVER: picked up ${payload.orderId}`);
//   // 3a Emit an in-transit event to the Global Event Pool with the order payload.
//   // emitter.emit('3driverAlertSysPkgPicked', payload);
//   driverAlertSysPkgPicked3(payload);
//   // 4a Log a confirmation message to the console: DRIVER: delivered <ORDER_ID>.
// // Emit a delivered event to the Global Event Pool with the order payload.
//   console.log(`DRIVER: delivered ${payload.orderId}`);
//   driverAlertSysDelivered4(payload);
//   vendorPkgDelivered5(payload);
//   // emitter.emit('4driverAlertSysDelivered', payload);
// }
// );

function driverReadyToPickPkg2 (payload) {
  emitter.emit('2driverReadyToPickPkg',payload);
}

function driverAlertSysPkgPicked3 (payload){
  emitter.emit('3driverAlertSysPkgPicked', payload);
}

function driverAlertSysDelivered4 (payload){
  emitter.emit('4driverAlertSysDelivered', payload);
}

function vendorPkgDelivered5 (payload){
  emitter.emit('5vendorPkgDelivered', payload);
}

module.exports = {
  driverReadyToPickPkg2,
  driverAlertSysPkgPicked3,
  driverAlertSysDelivered4,
  vendorPkgDelivered5
};