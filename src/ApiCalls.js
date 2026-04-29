/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const axios = require('axios');
const config = require('config');

const createData = (data, kmvcatoken) => {
  const headers = {headers: {kmvcatoken}};
  axios.post(config.recieverDomain + 'kmvd/vocu/address/create', data, headers)
    .then((res) => { }).catch((err) => {});
}
const updateData = (data, kmvcatoken) => {
  const headers = {headers: {kmvcatoken}};
  axios.put(config.recieverDomain + 'kmvd/vocu/address/update', data, headers)
    .then((res) => { }).catch((err) => {});
}
const deleteData = (data, kmvcatoken) => {
  const headers = {headers: {kmvcatoken}};
  axios.put(config.recieverDomain + `kmvd/vocu/address/delete/${data._id}`, data, headers)
    .then((res) => { }).catch((err) => {});
}
const setDefaultData = (data, kmvcatoken) => {
  const headers = {headers: {kmvcatoken}};
  axios.put(config.recieverDomain + `kmvd/vocu/address/setdefault/${data._id}`, data, headers)
    .then((res) => { }).catch((err) => {});
}

module.exports = {
  createData,
  updateData,
  deleteData,
  setDefaultData
}
