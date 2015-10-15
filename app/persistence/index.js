const fs = require('fs');
const path = require('path');

const mongoose = require('./mongoose');
const debug = require('debug')('app:persistence');
const models = {};

/**
 * Dynamically load model types
 */
function getModels() {
  const modelNames = fs.readdirSync(path.join(__dirname, 'models'));

  function loadModel(modelName) {
    const modelFunction = require(`./models/${modelName}`);
    models[modelName] = modelFunction(mongoose);
  }

  modelNames.forEach(loadModel);
}

debug('Initializing Persistence');
getModels();

module.exports = {models};
