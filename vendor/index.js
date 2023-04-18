'use strict';
const emitter = require('../eventPool');
const {  orderFromVendor, thankyouFromVendor} = require('./handler');

orderFromVendor('aaa');

//5b
emitter.on('5vendorPkgDelivered', thankyouFromVendor);
