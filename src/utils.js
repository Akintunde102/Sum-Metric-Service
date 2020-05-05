/** Utility Functions To Use in Different Parts of the Site */

/**
 *  Simple Console Log Wrapper
 * @param {*} data
 */
const smartLog = data => {
  console.log(data);
};

/**
 *  To Format Sent Data for Database Storage
 * @param {number} value
 */
const formatDataForStorage = value => {
  const time = Math.floor(Date.now() / 1000);
  return {
    value,
    time,
  };
};


/**
 *  Iterates through Submitted Key Data Metric to Get Value Sum
 * @param {{value: number, time: Date}[]} data
 */
const sumData = data => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    const roundedValue = Math.round(data[i].value);
    sum += roundedValue;
  }
  return sum;
};

module.exports = {
  smartLog,
  formatDataForStorage,
  sumData,
};
