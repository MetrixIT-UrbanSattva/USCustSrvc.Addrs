/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const moment = require('moment');

const currUTCObj = () => {
  const utcMoment = moment.utc();
  const currUTCDtTmStr = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  const currUTCDtTmNum = moment(currUTCDtTmStr, 'YYYY-MM-DD HH:mm:ss').valueOf();
  const currUTCDtTm = new Date(currUTCDtTmStr);
  return {currUTCDtTmStr, currUTCDtTmNum, currUTCDtTm};
}

module.exports = {
  currUTCObj
}
