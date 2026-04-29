/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection, {useUnifiedTopology: true, useNewUrlParser: true});
const Schema = mongoose.Schema;

// --- Begin: Vendor Customer Users Addresses Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},

  vndrOrg: {type: String, required: true}, // ref: config.collVndrsOrgs: VNDR0001
  voName: {type: String, required: true}, // Urban Sattva
  voCode: {type: String, required: true}, // US0001

  uId: {type: String, required: true}, // ref: config.CustsUsers
  mobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  emID: {type: String, required: false, trim: true}, // Email ID
  refUID: {type: String, required: true}, // Reference Unique ID

  isPrimary: {type: Boolean, default: false},
  isDefault: {type: Boolean, default: false},

  lName: {type: String, required: true, trim: true}, // Location Name
  cName: {type: String, required: false}, // Contact Name
  cMobCc: {type: String, required: false}, // Contact Mobile Number Country Code: +91
  cMobNum: {type: String, required: false}, // Contact Mobile Number: xxxxxxx997
  cMobCcNum: {type: String, required: false}, // Contact Mobile Number with Country Code: +91xxxxxxx997
  cEmID: {type: String, required: false}, // Contact Email ID
  chirunama: {type: String, required: false, trim: true}, // Address
  lmark: {type: String, required: false, trim: true}, // Landmark
  intiNum: {type: String, required: false, trim: true}, // House Number
  veedhi: {type: String, required: false, trim: true}, // Street / Area
  vuru: {type: String, required: false, trim: true}, // Village / Area Locality
  mandal: {type: String, required: false, trim: true}, // Mandal
  jilla: {type: String, required: false, trim: true}, // District
  jillaCode: {type: String, required: false, trim: true}, // District Code
  pincode: {type: String, required: false, trim: true}, // Pincode
  rastr: {type: String, required: false, trim: true}, // State
  rastrCode: {type: String, required: false, trim: true}, // State Code
  zone: {type: String, required: false},
  zoneCode: {type: String, required: false},
  desam: {type: String, required: false, trim: true}, // Country
  desamCode: {type: String, required: false, trim: true}, // Country Code
  plusCode: {type: Object, required: false},
  geocoordinates: { // geocoordinates
    type: {type: String, default: 'Point'},
    coordinates: {type: [Number], required: false} // <longitude>(-180 and 180), <latitude>(-90 and 90)
  },

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuRakam: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cUserName: {type: String, required: true}, // Created Users.pName
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  cDtNum: {type: Number, required: true}, // Date & Time Number
  uuRakam: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uUserName: {type: String, required: true}, // Updated Users.pName
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uDtNum: {type: Number, required: true}, // Date & Time Number
});

schema.index({'$**': 'text'});
schema.index({delFlag: -1, vndrOrg: 1, uId: 1, isPrimary: 1});
schema.index({isDefault: 1, uDtNum: -1});

module.exports = mongoose.model(config.collCustsUsrsAdrs, schema);
// --- End: Vendor Customer Users Addresses Schema --- //
