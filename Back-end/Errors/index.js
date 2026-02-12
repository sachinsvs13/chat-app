const CustomAPIError = require('./CustomApi')
const BadRequestError = require('./BadRequest')
const NotFoundError = require('./NotFound')
const UnAuthenticatedError = require('./unAuth')

module.exports = {
    CustomAPIError,
    UnAuthenticatedError,
    NotFoundError,
    BadRequestError,
}