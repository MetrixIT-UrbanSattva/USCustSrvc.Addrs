/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CustsUsrsAdrs = require('../schemas/CustsUsrsAdrs');
const CustsUsrsAdrsClsd = require('../schemas/CustsUsrsAdrsClsd');
const CustsAdrsDaoImpl = require('../daosimplements/CustsAdrsDaoImpl');
const SetRes = require('../SetRes');
const logger = require('../lib/logger');

// ---------------------- BEGIN: Customer Address APIs ---------------------- //

// BEGIN: Customer Address List
const getCustsAdrsList = (qObj, callback) => {
  CustsUsrsAdrs.find(qObj.query).sort(qObj.sort).exec(callback);
}
// END: Customer Address List

// BEGIN:  Create
const createFunc = (createData, callback) => {
  createData.save((error, resObj) => callback(error, resObj));
}
// END: Create

// BEGIN: UpdateDefaultAdrs
const updateDefaultAdrs = (query, updateObj, callback) => {
  CustsUsrsAdrs.updateMany(query, updateObj, (error, resObj) => callback(error, resObj));
}
// END: UpdateDefaultAdrs

// BEGIN: UpdateClsdDefaultAdrs
const updateClsdDefaultAdrs = (query, updateObj, callback) => {
  CustsUsrsAdrsClsd.updateMany(query, updateObj, (error, resObj) => callback(error, resObj));
}
// END: UpdateClsdDefaultAdrs

// BEGIN: Customer Address View
const viewCustsAdrs = (query, callback) => {
  CustsUsrsAdrs.findOne(query, (error, resObj) => {
    if (error) {
      logger.error('There was an Error occured in daos/CustsAdrsDAO.js, at viewCustsAdrs:' + error);
      const uke = SetRes.unKnownErr({});
      callback(uke);
    } else if (resObj && resObj._id) {
      const adrObj = CustsAdrsDaoImpl.setResAddressObj(resObj);
      const result = SetRes.responseData(adrObj);
      callback(result);
    } else {
      const noData = SetRes.noData({});
      callback(noData);
    }
  })
}
// END: Customer Address View

// BEGIN: Customer Address Update
const updateCustsAdrs = (query, updateObj, callback) => {
  CustsUsrsAdrs.findOneAndUpdate(query, { $set: updateObj }, { new: true }, (error, resObj) => {
    if (error) {
      logger.error('There was an Error occured in daos/CustsAdrsDAO.js, at updateCustsAdrs:' + error);
      const error = SetRes.unKnownErr({});
      callback(error);
    } else if (resObj && resObj._id) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const updateFailed = SetRes.updateFailed();
      callback(updateFailed);
    }
  })
}
// END: Customer Address Update

// BEGIN: Update Custs AdrsClsd
const updateCustsAdrsClsd = (query, updateObj, callback) => {
  CustsUsrsAdrsClsd.findOneAndUpdate(query, { $set: updateObj }, { new: true }, (error, resObj) => {
    if (error) {
      logger.error('There was an Error occured in daos/CustsAdrsDAO.js, at updateCustsAdrsClsd:' + error);
      const error = SetRes.unKnownErr({});
      callback(error);
    } else if (resObj && resObj._id) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const updateFailed = SetRes.updateFailed();
      callback(updateFailed);
    }
  })
}
// END: Update Custs AdrsClsd

// BEGIN: Customer Address Update
const deleteCustsAdrs = (query, callback) => {
  CustsUsrsAdrs.deleteOne(query, (error, resObj) => {
    if (error) {
      logger.error('There was an Error occured in daos/CustsAdrsDAO.js, at deleteCustsAdrs:' + error);
      const error = SetRes.unKnownErr({});
      callback(error);
    } else if (resObj.deletedCount > 0) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const deleteFailed = SetRes.deleteFailed();
      callback(deleteFailed);
    }
  })
}
// END: Customer Address Update

// ---------------------- END: Customer Address APIs ---------------------- //

module.exports = {
  createFunc,
  getCustsAdrsList,
  updateCustsAdrs,
  viewCustsAdrs,
  deleteCustsAdrs,
  updateCustsAdrsClsd,
  updateDefaultAdrs,
  updateClsdDefaultAdrs
}
