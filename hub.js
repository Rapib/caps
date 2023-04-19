'use strict';

const emitter = require('./eventPool');
const { PkgReadyToDriver } = require('./clients/driver/handler');


const eventPool = [
  // As a vendor, I want to alert the system when I have a package to be picked up.
  'PkgReadyFromVendor',
  // As a driver, I want to be notified when there is a package to be delivered.
  'PkgReadyToDriver',
  // As a driver, I want to alert the system when I have picked up a package and it is in transit.
  'DriverPickUpPkg',
  // As a driver, I want to alert the system when a package has been delivered.
  'DriverDeliverPkg',
  // As a vendor, I want to be notified when my package has been delivered.
  'DeliverPkgToVendor',
];

//EVENT Logger
const date = new Date();
eventPool.forEach(eventPool => {
  emitter.on(eventPool, (payload) => {
    let event = {};
    event.event = eventPool;
    event.time = date;
    event.payload = payload;
    console.log(event);
  }
  );
});

//1b ->  2a
emitter.on('PkgReadyFromVendor', PkgReadyToDriver);
//3b
// emitter.on('DriverPickUpPkg', (payload)=>{

// });

//4b -> 5a
// emitter.on('DriverDeliverPkg', (payload)=>{
//   emitter.emit('DeliverPkgToVendor', payload);

// });


require('./clients/driver/index');
require('./clients/vendor/index');