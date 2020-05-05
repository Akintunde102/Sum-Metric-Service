/** This File Contains Functions for Database Operations */

const fs = require('fs');
const { staleLimit, dataStorageLocation } = require('./config');

/**
 * Save Supplied Value By Key While Unstaling Old Data As A Side Effect
 *
 * @param {*} sentData
 * @param {string | number} key
 */
async function saveByKey(sentData, key) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataStorageLocation, 'utf-8', async function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      const store = data === '' ? {} : JSON.parse(data);
      if (key in store) {
        const unStaledData = await removeStaleData(store[key], staleLimit);
        store[key] = unStaledData;
        store[key].push(sentData);
      } else {
        store[key] = [sentData];
      }

      const updatedStore = JSON.stringify(store);

      fs.writeFile(dataStorageLocation, updatedStore, 'utf-8', function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  });
}

/**
 *  Get Data By Key After removing old data by StaleLimit in Config.js
 * @param {string | number} key
 */
async function findByKey(key) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataStorageLocation, 'utf-8', async function (err, data) {
      if (err) {
        reject(err);
        return;
      }
      const store = data === '' ? {} : JSON.parse(data);
      if (key in store) {
        const unStaledData = await unStaleAndStore(store, key);
        resolve(unStaledData);
        return;
      }
      reject('Key does not exist');
    });
  });
}

/**
 * Un-Stales Whole Storage And Stores it
 * @param {*} fullData
 * @param {string | number} key
 */

async function unStaleAndStore(fullData, key) {
  return new Promise((resolve, reject) => {
    const unStaledData = removeStaleData(fullData[key], staleLimit);
    fullData[key] = unStaledData;
    const updatedStore = JSON.stringify(fullData);
    fs.writeFile(dataStorageLocation, updatedStore, 'utf-8', function (err) {
      if (err) {
        reject(err);
        return;
      }
    });
    resolve(unStaledData);
  });
}

/**
 *  Helper Function to Un-stale Data
 * @param {*} data
 * @param {number} timeLimitInSeconds
 */
async function removeStaleData(data, timeLimitInSeconds) {
  const presentTimeStamp = Math.floor(Date.now() / 1000);
  const unStaledData = [];
  for (let i = 0; i < data.length; i++) {
    const eachData = data[i];
    if (presentTimeStamp - eachData.time < timeLimitInSeconds) {
      unStaledData.push(eachData);
    }
  }
  return unStaledData;
}

module.exports = {
  saveByKey,
  findByKey,
};
