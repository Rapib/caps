'use strict';


const emitter  = require('../eventPool');
const { driverReadyToPickPkg2,driverAlertSysPkgPicked3,  driverAlertSysDelivered4, vendorPkgDelivered5 } = require('./handler');

jest.mock('../eventPool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

let payload =   {
  store: 'ss',
  orderId: "order2893247",
  customer: "customer575",
  address: "USA"
};

test('2 notified when there is a package to be delivered.', async () => {

  driverReadyToPickPkg2(payload);
  expect(emitter.emit).toHaveBeenCalledWith('2driverReadyToPickPkg', payload);
});

test('3 in transit.', async () => {

  driverAlertSysPkgPicked3(payload);
  expect(emitter.emit).toHaveBeenCalledWith('3driverAlertSysPkgPicked', payload);
});

test('4 driver alert package has been delivered.', async () => {

  driverAlertSysDelivered4(payload);
  expect(emitter.emit).toHaveBeenCalledWith('4driverAlertSysDelivered', payload);
});

test('5 vendor receive alert package has been delivered', async () => {

  vendorPkgDelivered5(payload);
  expect(emitter.emit).toHaveBeenCalledWith('5vendorPkgDelivered', payload);
});