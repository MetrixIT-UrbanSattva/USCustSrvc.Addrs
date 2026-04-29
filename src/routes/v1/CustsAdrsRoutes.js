/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

const CustsAdrsCtrl = require('../../controllers/CustsAdrsCtrl');

module.exports.controller = (app) => {

  app.get('/', CustsAdrsCtrl.apiServerStatus);
  app.get('/kmvcd/addresses/list', CustsAdrsCtrl.getCustsAdrsList);

  app.post('/kmvcd/address/create', CustsAdrsCtrl.createCustsAdrs);
  app.post('/kmvcd/address/view/:id', CustsAdrsCtrl.viewCustsAdrs);

  app.put('/kmvcd/address/update', CustsAdrsCtrl.updateCustsAdrs);
  app.put('/kmvcd/address/delete/:id', CustsAdrsCtrl.deleteCustsAdrs);
  app.put('/kmvcd/address/setdefault/:id', CustsAdrsCtrl.setDefaultCustsAdrs);
}