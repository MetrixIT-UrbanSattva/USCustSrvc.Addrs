/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const {v4: uuidv4} = require('uuid');

const CommonSrvc = require('../services/CommonSrvc');

// ---------------------- BEGIN: Customer Address APIs ---------------------- //

// BEGIN: Customer Address List
const getCustsAdrsList = (tData) => {
  return {query: {delFlag: false, uId: tData.iss, vndrOrg: tData.vid}, sort: {isDefault: -1, uDtNum: -1}};
}
const createCustsAdrs = (reqBody, tokenData) => {
  const data = setCustAdrsCreateData(reqBody, tokenData);
  return data;
}
const updateDefaultAdrs = (resObj, tokenData) => {
  const currUTCObj = CommonSrvc.currUTCObj();
  const query = {delFlag: false, isDefault: true, uId: tokenData.iss, vndrOrg: tokenData.vid, _id: {$nin: [resObj._id]}};
  const updateObj = {
    isDefault: false,
    uuRakam: tokenData.ur,
    uUser: tokenData.iss,
    uUserName: tokenData.pn,
    uDtStr: currUTCObj.currUTCDtTmStr,
    uDtNum: currUTCObj.currUTCDtTmNum,
  };
  return {query, updateObj: {$set: updateObj}};
}
const viewCustsAdrs = (id, tData) => {
  return {delFlag: false, uId: tData.iss, vndrOrg: tData.vid, _id: id};
}
const updateCustsAdrs = (reqBody, tokenData) => {
  const data = updateCustAdrs(reqBody, tokenData)
  return data
}
const deleteCustsAdrs = (id) => {
  return { _id: id, delFlag: false, isDefault: false }
}
const updateCustsClsdDltFlg = (id, tokenData) => {
  const currUTCObj = CommonSrvc.currUTCObj();

  const query = { delFlag: false, _id: id }
  const updateObj = {
    delFlag: true,
    uuRakam: tokenData.ur,
    uUser: tokenData.iss,
    uUserName: tokenData.pn,
    uDtStr: currUTCObj.currUTCDtTmStr,
    uDtNum: currUTCObj.currUTCDtTmNum,
  }
  return { query, updateObj }
}
const setDefaultCustsAdrs = (id, tokenData) => {
  const currUTCObj = CommonSrvc.currUTCObj();
  const query = { delFlag: false, _id: id }
  const updateObj = {
    isDefault: true,
    uuRakam: tokenData.ur,
    uUser: tokenData.iss,
    uUserName: tokenData.pn,
    uDtStr: currUTCObj.currUTCDtTmStr,
    uDtNum: currUTCObj.currUTCDtTmNum,
  }
  return { query, updateObj }
}
const setResAddressObj = (resObj) => {
  return setCustAddressObj(resObj);
}

const createUserAdress = (resObj, reqBody) => {
  const obj = setUserAdress(resObj, reqBody);
  return obj;
}
module.exports = {
  getCustsAdrsList, createCustsAdrs, updateDefaultAdrs,
  updateCustsAdrs,
  deleteCustsAdrs,
  viewCustsAdrs,
  updateCustsClsdDltFlg,
  setDefaultCustsAdrs,
  setResAddressObj,
  createUserAdress
};
// ==========================Sub Functions==========================

const setCustAdrsCreateData = (reqBody, tokenData) => {
  const currUTCObj = CommonSrvc.currUTCObj();

  return {
    _id: uuidv4(),

    vndrOrg: tokenData.vid,
    voName: tokenData.von,
    voCode: tokenData.voc,

    uId: tokenData.iss,
    mobCcNum: tokenData.mn,
    emID: tokenData.eid,
    refUID: tokenData.uid,

    isPrimary: reqBody.isPrimary,
    isDefault: reqBody.isDefault,

    lName: reqBody.locationName,
    cName: reqBody.contactName,
    cMobCc: reqBody.contactMobCC,
    cMobNum: reqBody.contactMobNumber,
    cMobCcNum: reqBody.contactMobCC+reqBody.contactMobNumber,
    cEmID: reqBody.contactEmailId || '',
    lmark: reqBody.landmark || '',
    intiNum: reqBody.houseNumber,
    veedhi: reqBody.street || '',
    vuru: reqBody.village ,
    mandal: reqBody.mandal,
    jilla: reqBody.district,
    jillaCode: reqBody.districtCode,
    pincode: reqBody.pincode,
    rastr: reqBody.state,
    rastrCode: reqBody.stateCode,
    zone: reqBody.zone || '',
    zoneCode: reqBody.zoneCode || '',
    desam: reqBody.country,
    desamCode: reqBody.countryCode,
    plusCode: reqBody.plusCode || null,
    geocoordinates: {
      type: 'Point',
      coordinates: reqBody.coordinates || [],
    },

    cuRakam: tokenData.ur,
    cUser: tokenData.iss,
    cUserName: tokenData.pn,
    cDtStr: currUTCObj.currUTCDtTmStr,
    cDtNum: currUTCObj.currUTCDtTmNum,
    uuRakam: tokenData.ur,
    uUser: tokenData.iss,
    uUserName: tokenData.pn,
    uDtStr: currUTCObj.currUTCDtTmStr,
    uDtNum: currUTCObj.currUTCDtTmNum,
  };
}

const updateCustAdrs = (reqBody, tokenData) => {
  const currUTCObj = CommonSrvc.currUTCObj();

  const query = {delFlag: false, uId: tokenData.iss, vndrOrg: tokenData.vid, _id: reqBody.id};
  const updateObj = {
    isPrimary: reqBody.isPrimary,
    isDefault: reqBody.isDefault,

    lName: reqBody.locationName,
    cName: reqBody.contactName,
    cMobCc: reqBody.contactMobCC,
    cMobNum: reqBody.contactMobNumber,
    cMobCcNum: reqBody.contactMobCC+reqBody.contactMobNumber,
    cEmID: reqBody.contactEmailId || '',
    lmark: reqBody.landmark || '',
    intiNum: reqBody.houseNumber,
    veedhi: reqBody.street || '',
    vuru: reqBody.village ,
    mandal: reqBody.mandal,
    jilla: reqBody.district,
    jillaCode: reqBody.districtCode,
    pincode: reqBody.pincode,
    rastr: reqBody.state,
    rastrCode: reqBody.stateCode,
    desam: reqBody.country,
    desamCode: reqBody.countryCode,
    plusCode: reqBody.plusCode || null,
    geocoordinates: {
      type: 'Point',
      coordinates: reqBody.coordinates || [],
    },

    uuRakam: tokenData.ur,
    uUser: tokenData.iss,
    uUserName: tokenData.pn,
    uDtStr: currUTCObj.currUTCDtTmStr,
    uDtNum: currUTCObj.currUTCDtTmNum,
  };
  return {query, updateObj};
}

const setCustAddressObj = (resObj) => {
  return {
    id: resObj._id,
    vndrOrg: resObj.vndrOrg,
    vndrOrgName: resObj.vndrOrgName,
    vndrOrgCode: resObj.vndrOrgCode,

    uId: resObj.uId,
    mobNum: resObj.mobCcNum,
    emailId: resObj.emID,
    refUID: resObj.refUID,

    isPrimary: resObj.isPrimary,
    isDefault: resObj.isDefault,

    locationName: resObj.lName,
    contactName: resObj.cName,
    contactMobCC: resObj.cMobCc,
    contactMobNumber: resObj.cMobNum,
    cMobCcNum: resObj.cMobCcNum,
    contactEmailId: resObj.cEmID,
    landmark: resObj.lmark,
    houseNumber: resObj.intiNum,
    street: resObj.veedhi,
    village: resObj.vuru,
    mandal: resObj.mandal,
    district: resObj.jilla,
    districtCode: resObj.jillaCode,
    pincode: resObj.pincode,
    state: resObj.rastr,
    stateCode: resObj.rastrCode,
    zone: resObj.zone,
    zoneCode: resObj.zoneCode,
    country: resObj.desam,
    countryCode: resObj.desamCode,
    plusCode: resObj.plusCode || null,
    geocoordinates: resObj.geocoordinates,
    updatedDate: resObj.uDtStr,
    createdString: resObj.cDtStr
  };
}

const setUserAdress = (resObj, reqBody) => {
  return {
    _id: uuidv4(),

    vndrOrg: resObj.vndrOrg,
    voName: resObj.voName,
    voCode: resObj.voCode,

    uId: resObj._id,
    mobCcNum: resObj.mobCcNum,
    emID: resObj.emID,
    refUID: resObj.refUID,

    isPrimary: false,
    isDefault: true,

    lName: reqBody.locationName,
    cName: reqBody.contactName,
    cMobCc: reqBody.mobCc,
    cMobNum: reqBody.contactMobNumber,
    cMobCcNum: reqBody.contactMobCC,
    cEmID: resObj.contactEmailId || '',
    lmark: reqBody.landmark || '',
    intiNum: reqBody.houseNumber || '',
    veedhi: reqBody.street || '',
    vuru: reqBody.village || '',
    mandal: reqBody.mandal || '',
    jilla: reqBody.district,
    jillaCode: reqBody.districtCode,
    pincode: reqBody.pincode,
    rastr: reqBody.state,
    rastrCode: reqBody.stateCode,
    zone: reqBody.zone || '',
    zoneCode: reqBody.zoneCode || '',
    desam: reqBody.country,
    desamCode: reqBody.countryCode,

    plusCode: resObj.plusCode || null,
    geocoordinates: {
      type: 'Point',
      coordinates: resObj.coordinates || [],
    },

    cuRakam: resObj.cuRakam,
    cUser: resObj.cUser,
    cUserName: resObj.cUserName,
    cDtStr: resObj.cDtStr,
    cDtNum: resObj.cDtNum,
    uuRakam: resObj.uuRakam,
    uUser: resObj.uUser,
    uUserName: resObj.uUserName,
    uDtStr: resObj.uDtStr,
    uDtNum: resObj.uDtNum,
  }
}
// ---------------------- END: Customer Address APIs ---------------------- //
