/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const apiServerStatus = () => {
  return { httpStatus: 200, status: '200', resData: { message: 'Kaia Mart Vendor Customers - Addresses API server is running' } };
}
const unKnownErr = (result) => {
  return { httpStatus: 500, status: '199', resData: { message: '500 - Unknown Error', result } };
}
const noData = (result) => {
  return { httpStatus: 400, status: '204', resData: { message: '204 - No Data Found', result } };
}
const tokenRequired = () => {
  return { httpStatus: 400, status: '192', resData: { message: 'Token is required' } };
}
const tokenInvalid = () => {
  return { httpStatus: 400, status: '191', resData: { message: 'Invalid Token' } };
}
const tokenExpired = () => {
  return { httpStatus: 400, status: '190', resData: { message: 'Token Expired' } };
}
const accessDenied = () => {
  return { httpStatus: 400, status: '193', resData: { message: 'You do not have access' } };
}
const mandatory = () => {
  return { httpStatus: 400, status: '197', resData: { message: 'Provide required field(s) data' } };
}
const saveFailed = () => {
  return { httpStatus: 400, status: '196', resData: { message: 'Save Trx failed' } };
}
const updateFailed = () => {
  return { httpStatus: 400, status: '195', resData: { message: 'Update Trx failed' } };
}
const deleteFailed = () => {
  return { httpStatus: 400, status: '194', resData: { message: 'Delete Trx failed' } };
}
const responseData = (result) => {
  return { httpStatus: 200, status: '200', resData: { message: 'Success', result } };
}

module.exports = {
  apiServerStatus, unKnownErr, noData,
  tokenRequired, tokenInvalid, tokenExpired,
  accessDenied, mandatory,
  saveFailed, updateFailed, deleteFailed,
  responseData
};
