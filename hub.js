'use strict';

const  emitter = require('./eventPool');
const {driverReadyToPickPkg} = require('./driver/handler');

// Listens to ALL events in the Event Pool.
// eventPool.forEach(event => {
//   emitter.on(event, (payload) => {
//     console.log('BRAIN IS GETTING AN UPDATE', event, payload);

//     emitter.emit('UPDATE_STATE', payload);
//   });
// });


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
const date = new Date();
//1b ->  2a
emitter.on('1vendorPkgToBePicked', driverReadyToPickPkg);

//3b
emitter.on('3driverAlertSysPkgPicked', (payload)=>{

});

//4b -> 5a
emitter.on('4driverAlertSysDelivered', (payload)=>{

  emitter.emit('5vendorPkgDelivered', payload);
});
// Implement a Module for a Global Event Pool.
// Export a single EventEmitter from the Node JS module.
// Should be imported by any module that needs to notify or be alerted by other modules of an event.
// Implement a Module for Managing Global Package Events.
// Logs a timestamp and the payload of every event.

require('./driver/index');
require('./vendor/index');