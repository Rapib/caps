'use strict';

const emitter  = require('../eventPool');
let { orderFromVendor,  thankyouFromVendor} = require('./handler');
jest.mock('../eventPool', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

test('1 vendor Pkg ready To Be Picked up', async () => {
  orderFromVendor('aaa');
  let order =   {
    store: 'aaa',
    orderId: "order2893247",
    customer: "customer575",
    address: "USA"
  };
  expect(console.log).toHaveBeenCalledWith('pkg ready');
  expect(emitter.emit).toHaveBeenCalledWith('1vendorPkgToBePicked', order);
});

test('5 vendor receive package delivered msg', async () => {
  let obj = {
    customer: "a"
  };
  thankyouFromVendor(obj);

  expect(console.log).toHaveBeenCalledWith(`5b Thank you, a`);

});