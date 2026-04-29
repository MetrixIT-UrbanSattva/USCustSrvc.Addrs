/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CustsAdrsCtrlVldn = require('./CustsAdrsCtrlVldn');
const CustsAdrsSrvc = require('../services/CustsAdrsSrvc');
const SetRes = require('../SetRes');

const token = require('../tokens');
const util = require('../lib/util');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiResponse(res, resObj);
}

// ---------------------- BEGIN: Vendor Customer Users Addresses APIs ---------------------- //
// BEGIN: Customer Address List
const getCustsAdrsList = (req, res, next) => {
  const adrsListValid = CustsAdrsCtrlVldn.getCustsAdrsList(req);
  if(adrsListValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.getCustsAdrsList(dtData.tokenData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, adrsListValid.result);
  }
}
// END: Customer Address List

// BEGIN: Customer Address Create
const createCustsAdrs = (req, res, next) => {
  const reqValid = CustsAdrsCtrlVldn.bodyValidation(req);
  if (reqValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.createCustsAdrs(req.body, dtData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, reqValid.result);
  }
}
// END: Customer Address Create

// BEGIN: Customer Address View
const viewCustsAdrs = (req, res, next) => {
  const reqValid = CustsAdrsCtrlVldn.paramValidation(req);
  if (reqValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.viewCustsAdrs(req.params.id, dtData.tokenData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, reqValid.result);
  }
}
// END: Customer Address View

// BEGIN: Customer Address Update
const updateCustsAdrs = (req, res, next) => {
  const reqValid = CustsAdrsCtrlVldn.updateValidation(req);
  if (reqValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.updateCustsAdrs(req.body, dtData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, reqValid.result);
  }
}
// END: Customer Address Update

// BEGIN: Customer Address Delete
const deleteCustsAdrs = (req, res, next) => {
  const reqValid = CustsAdrsCtrlVldn.paramValidation(req);
  if (reqValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.deleteCustsAdrs(req.params.id, dtData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, reqValid.result);
  }
}
// END: Customer Address Delete

// START:Set Default Customer Address 
const setDefaultCustsAdrs = (req, res, next) => {
  const reqValid = CustsAdrsCtrlVldn.paramValidation(req);
  if (reqValid.flag) {
    const dtData = token.kaiaMartRefreshToken(req.headers.kmvcatoken, res);
    const tv = CustsAdrsCtrlVldn.tokenValidation(dtData);
    if (tv.flag) {
      CustsAdrsSrvc.setDefaultCustsAdrs(req.params.id, dtData, (resObj) => util.sendApiResponse(res, resObj));
    } else {
      util.sendApiResponse(res, tv.result);
    }
  } else {
    util.sendApiResponse(res, reqValid.result);
  }
}
// END: Set Default Customer Address
// ------------------- END: Vendor Customer Users Addresses APIs ---------------------- //

module.exports = {
  apiServerStatus,
  getCustsAdrsList, createCustsAdrs, viewCustsAdrs, updateCustsAdrs, deleteCustsAdrs, setDefaultCustsAdrs
}
