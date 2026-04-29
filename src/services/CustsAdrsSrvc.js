/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const ApiCalls = require('../ApiCalls');
const CustsAdrsDao = require('../daos/CustsAdrsDao');
const CustsAdrsDaoImpl = require('../daosimplements/CustsAdrsDaoImpl');
const CustsAdrsSrvcImpl = require('../services/CustsAdrsSrvcImpl');
const CustsUsrsAdrs = require('../schemas/CustsUsrsAdrs');
const logger = require('../lib/logger');
const SetRes = require('../SetRes');

// ---------------------- BEGIN: Customer Address APIs ---------------------- //

// BEGIN: Customer Address List
const getCustsAdrsList = (tData, callback) => {
  const qObj = CustsAdrsDaoImpl.getCustsAdrsList(tData);
  CustsAdrsDao.getCustsAdrsList(qObj, (err, resObj) => {
    if (err) {
      logger.error('Unknown Error in services/CustsAdrsSrvc.js, at getCustsAdrsList:' + err);
      const uke = SetRes.unKnownErr([]);
      callback(uke);
    } else if (resObj && resObj.length > 0) {
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  });
}
// END: Customer Address List

// BEGIN: Customer Address Create
const createCustsAdrs = (reqBody, tData, callback) => {
  const custsAdrsDataObj  = reqBody.userRes && reqBody.userRes._id ? CustsAdrsDaoImpl.createUserAdress(reqBody.userRes, reqBody) : CustsAdrsDaoImpl.createCustsAdrs(reqBody, tData.tokenData)
  const custsAdrsData = new CustsUsrsAdrs(custsAdrsDataObj);
  CustsAdrsDao.createFunc(custsAdrsData, (err, resObj) => {
    if (err) {
      logger.error('Unknown Error in services/CustsAdrsSrvc.js, at createCustsAdrs:' + err);
      const error = SetRes.unKnownErr({});
      callback(error);
    } else if (resObj && resObj._id) {
      CustsAdrsSrvcImpl.createCustsAdrsClsd(resObj, tData.kmvcatoken, custsAdrsDataObj);
      resObj.isDefault && CustsAdrsSrvcImpl.updateDfltCustsAdrsData(resObj, tData.tokenData);
      const result = SetRes.responseData(resObj);
      callback(result);
    } else {
      const saveFailed = SetRes.saveFailed();
      callback(saveFailed);
    }
  });
}
// END: Customer Address Create

// BEGIN: Customer Address View
const viewCustsAdrs = (id, tData, callback) => {
  const query = CustsAdrsDaoImpl.viewCustsAdrs(id, tData);
  CustsAdrsDao.viewCustsAdrs(query, callback);
}
// END: Customer Address View

// BEGIN: Customer Address Update
const updateCustsAdrs = (reqBody, tData, callback) => {
  const obj = CustsAdrsDaoImpl.updateCustsAdrs(reqBody, tData.tokenData);
  CustsAdrsDao.updateCustsAdrs(obj.query, obj.updateObj, (resObj) => {
    if (resObj.status == '200') {
      ApiCalls.updateData(resObj.resData.result, tData.kmvcatoken);
      CustsAdrsDao.updateCustsAdrsClsd(obj.query, obj.updateObj, (resObj1) => { });
      if (resObj.resData.result.isDefault) {
        const upObj = CustsAdrsDaoImpl.updateDefaultAdrs(resObj.resData.result, tData.tokenData);
        CustsAdrsDao.updateDefaultAdrs(upObj.query, upObj.updateObj, (resObj2) => {
          CustsAdrsDao.updateClsdDefaultAdrs(upObj.query, upObj.updateObj, (resObj3) => { });
        });
      }
      const result = SetRes.responseData(resObj.resData.result);
      callback(result);
    } else {
      callback(resObj);
    }
  });
}
// END: Customer Address Update

// BEGIN: Customer Address Delete
const deleteCustsAdrs = (id, tData, callback) => {
  const obj = CustsAdrsDaoImpl.deleteCustsAdrs(id);
  CustsAdrsDao.deleteCustsAdrs(obj, (deleteResObj) => {
    if (deleteResObj.status == '200') {
      const objClsd = CustsAdrsDaoImpl.updateCustsClsdDltFlg(id, tData.tokenData);
      CustsAdrsDao.updateCustsAdrsClsd(objClsd.query, objClsd.updateObj, (resObj) => {
        ApiCalls.deleteData(resObj.resData.result, tData.kmvcatoken);
        callback(resObj);
      });
    } else {
      callback(deleteResObj);
    }
  });
}
// END: Customer Address Delete

// BEGIN:Set Default Customer Address 
const setDefaultCustsAdrs = (id, tData, callback) => {
  const obj = CustsAdrsDaoImpl.setDefaultCustsAdrs(id, tData.tokenData);
  CustsAdrsDao.updateCustsAdrs(obj.query, obj.updateObj, (resObj) => {
    if (resObj.status == '200') {
      ApiCalls.setDefaultData(resObj.resData.result, tData.kmvcatoken);
      CustsAdrsDao.updateCustsAdrsClsd(obj.query, obj.updateObj, (resObj1) => { });
      const obj1 = CustsAdrsDaoImpl.updateDefaultAdrs(resObj.resData.result, tData.tokenData);
      CustsAdrsDao.updateDefaultAdrs(obj1.query, obj1.updateObj, (err, resObj2) => {
        CustsAdrsDao.updateClsdDefaultAdrs(obj1.query, obj1.updateObj, (err1, resObj3) => { });
      });
      const result = SetRes.responseData(resObj.resData.result);
      callback(result);
    } else {
      callback(resObj);
    }
  });
}

// END:Set Default Customer Address 

// ---------------------- END: Customer Address APIs ---------------------- //
module.exports = {
  getCustsAdrsList,
  createCustsAdrs,
  updateCustsAdrs,
  deleteCustsAdrs,
  viewCustsAdrs,
  setDefaultCustsAdrs,
}
