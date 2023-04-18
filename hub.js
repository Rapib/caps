'use strict';

const  emitter = require('./eventPool');
const {driverReadyToPickPkg2} = require('./driver/handler');


const eventPool = [
  // As a vendor, I want to alert the system when I have a package to be picked up.
  '1vendorPkgToBePicked',
  // As a driver, I want to be notified when there is a package to be delivered.
  '2driverReadyToPickPkg',
  // As a driver, I want to alert the system when I have picked up a package and it is in transit.
  '3driverAlertSysPkgPicked',
  // As a driver, I want to alert the system when a package has been delivered.
  '4driverAlertSysDelivered',
  // As a vendor, I want to be notified when my package has been delivered.
  '5vendorPkgDelivered',
];

//EVENT Logger
const date = new Date();
eventPool.forEach(eventPool => {
  emitter.on(eventPool , (payload) => {
    let event = {};
    event.event = eventPool;
    event.time = date;
    event.payload = payload;
    console.log(event);
  }
  );
});

//1b ->  2a
emitter.on('1vendorPkgToBePicked', driverReadyToPickPkg2);
//3b
// emitter.on('3driverAlertSysPkgPicked', (payload)=>{

// });

//4b -> 5a
// emitter.on('4driverAlertSysDelivered', (payload)=>{
//   emitter.emit('5vendorPkgDelivered', payload);

// });


require('./driver/index');
require('./vendor/index');