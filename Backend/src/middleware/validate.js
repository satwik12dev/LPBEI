const { validationResult } = require('express-validator')
const { badRequest } = require('../utils/apiResponse')

/**
 * Drop-in middleware — run after express-validator chains.
 * If there are validation errors, responds 400 with the list.
 * Otherwise calls next().
 */
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return badRequest(
      res,
      'Validation failed',
      errors.array().map((e) => ({ field: e.path, message: e.msg }))
    )
  }
  next()
}

module.exports = validate
