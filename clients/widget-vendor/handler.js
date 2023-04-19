'use strict';
// Your implementation should use a store name as a parameter.
function orderFromVendor(storeName, orderID, socket) {
  let order = {
    store: storeName,
    orderId: orderID,
    customer: "customer575",
    address: "USA"
  };
  console.log('pkg ready');
  // Emit that message to the CAPS server with an event called pickup.
  socket.emit('joinRoom', order);
  // capsSocket.to(order.store).emit('PkgReadyFromVendor', order);
  socket.emit('PkgReadyFromVendor', order);
}

// emits pickup to the global event pool.
// sends a vendor order payload:
// Listens for a delivered event and responds by logging a message to the console:
//  Thank you, <customer-name></customer-name>
function thankyouFromVendor(payload) {
  console.log(`Thank you, ${payload.customer}`);
  // After the delivery event has been received, exit the application using process.exit().
  process.exit();
}

function receiveMsg(socket){
  return (payload)=> socket.emit('received', payload);
}

module.exports = {
  orderFromVendor,
  thankyouFromVendor,
  receiveMsg
};