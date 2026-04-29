/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const SetRes = require('../SetRes');
const userType = 'VC User';

const getCustsAdrsList = (req) => {
  if(!req.headers.kmvcatoken) {
    const result = SetRes.tokenRequired();
    return {flag: false, result};
  } else {
    return {flag: true};
  }
}

const tokenValidation = (dtData) => {
  if (!dtData) {
    const invalidTkn = SetRes.tokenInvalid();
    return {flag: false, result: invalidTkn};
  } else if (dtData.isExpired) {
    const tokenExp = SetRes.tokenExpired();
    return {flag: false, result: tokenExp};
  } else if (dtData.tokenData && dtData.tokenData.ur != userType) {
    const access = SetRes.accessDenied();
    return {flag: false, result: access};
  } else {
    return {flag: true};
  }
}

const bodyValidation = (req) => {
  const reqBody = req.body;
  if (!req.headers.kmvcatoken) {
    const result = SetRes.tokenRequired();
    return {flag: false, result};
  } else if (!reqBody.contactName || !reqBody.contactMobCC || !reqBody.contactMobNumber ||  !reqBody.locationName ||  !reqBody.pincode || !reqBody.district || !reqBody.districtCode || !reqBody.state || !reqBody.stateCode || !reqBody.country || !reqBody.countryCode) {
    const result = SetRes.mandatory();
    return {flag: false, result};
  } else {
    return {flag: true};
  }
}
const updateValidation = (req) => {
  const reqBody = req.body;
  if (!req.headers.kmvcatoken) {
    const result = SetRes.tokenRequired();
    return {flag: false, result};
  } else if (!reqBody.id || !reqBody.contactName || !reqBody.contactMobCC || !reqBody.contactMobNumber || !reqBody.locationName || !reqBody.houseNumber || !reqBody.pincode || !reqBody.village || !reqBody.mandal || !reqBody.district || !reqBody.districtCode || !reqBody.state || !reqBody.stateCode || !reqBody.country || !reqBody.countryCode) {
    const result = SetRes.mandatory();
    return {flag: false, result};
  } else {
    return {flag: true};
  }
}
const paramValidation = (req) => {
  const id = req.params.id;
  if (!req.headers.kmvcatoken) {
    const result = SetRes.tokenRequired();
    return {flag: false, result};
  } else if (!id) {
    const result = SetRes.mandatory();
    return {flag: false, result};
  } else {
    return {flag: true};
  }
}

module.exports = {
  getCustsAdrsList,
  tokenValidation,
  bodyValidation,
  updateValidation,
  paramValidation
}