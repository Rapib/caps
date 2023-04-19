'use strict';

const Events = require('events');
const emitter = new Events();

// const eventPool = [
//   // As a vendor, I want to alert the system when I have a package to be picked up.
//   'PkgReadyFromVendor',
//   // As a driver, I want to be notified when there is a package to be delivered.
//   'PkgReadyToDriver',
//   // As a driver, I want to alert the system when I have picked up a package and it is in transit.
//   'DriverPickUpPkg',
//   // As a driver, I want to alert the system when a package has been delivered.
//   'DriverDeliverPkg',
//   // As a vendor, I want to be notified when my package has been delivered.
//   'DeliverPkgToVendor',
// ];

module.exports = emitter;
