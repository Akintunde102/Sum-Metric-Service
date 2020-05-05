/**
 * Express Middlewares
 */

const { statusCodes } = require("./constants");

/**
 *  
 *  Middleware To Process Express Errors
 * @param {*} error 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleErrors = (error, req, res, next) => {
    res.status(error.status || statusCodes.SERVER_ERROR).send({
      error: {
        status: error.status || statusCodes.SERVER_ERROR,
        message: error.message || 'Internal Server Error',
      },
    });
}

module.exports = {
    handleErrors
}