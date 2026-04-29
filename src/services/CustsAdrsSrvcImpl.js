/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const ApiCalls = require('../ApiCalls');
const CustsAdrsDao = require('../daos/CustsAdrsDao');
const CustsAdrsDaoImpl = require('../daosimplements/CustsAdrsDaoImpl');
const CustsUsrsAdrsClsd = require('../schemas/CustsUsrsAdrsClsd');
const logger = require('../lib/logger');

const createCustsAdrsClsd = (resObj, kmvcatoken, custsAdrsDataObj) => {
  ApiCalls.createData(resObj, kmvcatoken);
  const userAdrsDltData = new CustsUsrsAdrsClsd(custsAdrsDataObj);
  CustsAdrsDao.createFunc(userAdrsDltData, (err, resObj) => {
    if (err) {
      logger.error('Unknown Error in services/CustsAdrsSrvcImpl.js, at createCustsAdrsClsd:' + err);
    }
  });
}

const updateDfltCustsAdrsData = (resObj, tokenData) => {
  const obj = CustsAdrsDaoImpl.updateDefaultAdrs(resObj, tokenData);
  CustsAdrsDao.updateDefaultAdrs(obj.query, obj.updateObj, (err1, resObj1) => {
    if (err1) {
      logger.error('Unknown Error in services/CustsAdrsSrvcImpl.js, at updateDfltCustsAdrsData(err1):' + err1);
    } else if(resObj1.modifiedCount > 0) {
      CustsAdrsDao.updateClsdDefaultAdrs(obj.query, obj.updateObj, (err2, resObj2) => {
        if (err2) {
          logger.error('Unknown Error in services/CustsAdrsSrvcImpl.js, at updateDfltCustsAdrsData(err2):' + err2);
        }
      });
    }
  });
}
module.exports = {
  createCustsAdrsClsd,
  updateDfltCustsAdrsData,
}
