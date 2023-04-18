'use strict';

const Events = require('events');
const emitter = new Events();

// const eventPool = [
//   // As a vendor, I want to alert the system when I have a package to be picked up.
//   '1vendorPkgToBePicked',
//   // As a driver, I want to be notified when there is a package to be delivered.
//   '2driverReadyToPickPkg',
//   // As a driver, I want to alert the system when I have picked up a package and it is in transit.
//   '3driverAlertSysPkgPicked',
//   // As a driver, I want to alert the system when a package has been delivered.
//   '4driverAlertSysDelivered',
//   // As a vendor, I want to be notified when my package has been delivered.
//   '5vendorPkgDelivered',
// ];

module.exports = emitter;
