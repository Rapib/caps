'use strict';
// Your implementation should use a store name as a parameter.
const emitter  = require('../eventPool');

// 1a When triggered, the vendor module simulates a pickup event for the given store name to the Global Event Pool:
function orderFromVendor (storeName){
  let order =   {
    store: storeName,
    orderId: "order2893247",
    customer: "customer575",
    address: "USA"
  };
  console.log('pkg ready');
  emitter.emit('1vendorPkgToBePicked', order);

}

// emits pickup to the global event pool.
// sends a vendor order payload:
// Listens for a delivered event and responds by logging a message to the console:
//  Thank you, <customer-name></customer-name>
function thankyouFromVendor (payload){
  console.log(`5b Thank you, ${payload.customer}`);
};




module.exports = {
  orderFromVendor, 
  thankyouFromVendor
}