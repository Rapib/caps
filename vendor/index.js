'use strict';
const emitter = require('../eventPool');
const {  orderFromVendor, thankyouFromVendor} = require('./handler');

//5b
emitter.on('5vendorPkgDelivered', thankyouFromVendor);
orderFromVendor('aaa');

