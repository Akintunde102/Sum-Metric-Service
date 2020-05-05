/**
 *  Controller Functions for Express Routes
 */

/** Useful Imports */
const { formatDataForStorage, sumData } = require('./utils');
const { saveByKey, findByKey} = require('./storage');
const { statusCodes } = require('./constants');


/**
 *  Saves / Logs Metrics
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const logMetric = async (req, res, next) => {
  const { value = null } = req.body;
  if (value === null) {
    return next(new Error('Value was not provided'));
  }
  if (typeof value !== 'number') {
    return next(new Error('Value is not a number'));
  }
  const sentData = formatDataForStorage(value);
  const isStored = await saveByKey(sentData, req.params.key);
  if (isStored) {
    return res.status(statusCodes.OK).send({});
  }
  return next(new Error('there was an unexpected error'));
};

/**
 * Gets Metric Sum Based On Stale Limit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const getMetricSum = async (req, res, next) => {
  try {
    const result = await findByKey(req.params.key);
    const sum = sumData(result);
    return res.status(statusCodes.OK).send(String(sum));
  } catch (error) {
    return next(new Error(error));
  }
};

/**
 *  Handle Missing Routes
 * @param {*} _ 
 * @param {*} __ 
 * @param {*} next 
 */
const handleMissingRoutes = (req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = statusCodes.NOT_FOUND;
  return next(error);
};

module.exports = {
  logMetric,
  getMetricSum,
  handleMissingRoutes,
};
