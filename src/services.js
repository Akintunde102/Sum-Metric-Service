/**
 *  Simple Service Functions
 */

const { smartLog } = require('./utils');

/**
 * Simple Abstraction for Initializing Server
 * @param {number} port
 */
const appStarts = port => smartLog('Metric Server listening on port ' + port);

module.exports = {
  appStarts,
};
