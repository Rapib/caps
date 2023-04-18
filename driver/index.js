'use strict';
const emitter = require('../eventPool');

const { driverAlertSysPkgPicked3,
  driverAlertSysDelivered4,
  vendorPkgDelivered5 } = require('./handler');

emitter.on('2driverReadyToPickPkg', (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  // 3a Emit an in-transit event to the Global Event Pool with the order payload.
  // emitter.emit('3driverAlertSysPkgPicked', payload);
  driverAlertSysPkgPicked3(payload);
  // 4a Log a confirmation message to the console: DRIVER: delivered <ORDER_ID>.
  // Emit a delivered event to the Global Event Pool with the order payload.
  console.log(`DRIVER: delivered ${payload.orderId}`);
  driverAlertSysDelivered4(payload);
  vendorPkgDelivered5(payload);
  // emitter.emit('4driverAlertSysDelivered', payload);
}
);