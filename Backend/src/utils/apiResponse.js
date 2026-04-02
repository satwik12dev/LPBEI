/**
 * Consistent JSON envelope used by every controller.
 *
 *  Success:  { success: true,  data: <payload>,       message?: string }
 *  Error:    { success: false, error: <message>,       errors?: [] }
 */

const ok = (res, data = null, message = '', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data })

const created = (res, data, message = 'Created successfully') =>
  ok(res, data, message, 201)

const noContent = (res) => res.status(204).send()

const badRequest = (res, error, errors = []) =>
  res.status(400).json({ success: false, error, errors })

const unauthorized = (res, error = 'Unauthorized') =>
  res.status(401).json({ success: false, error })

const forbidden = (res, error = 'Forbidden') =>
  res.status(403).json({ success: false, error })

const notFound = (res, error = 'Resource not found') =>
  res.status(404).json({ success: false, error })

const conflict = (res, error) =>
  res.status(409).json({ success: false, error })

const serverError = (res, error = 'Internal server error') =>
  res.status(500).json({ success: false, error })

module.exports = { ok, created, noContent, badRequest, unauthorized, forbidden, notFound, conflict, serverError }
