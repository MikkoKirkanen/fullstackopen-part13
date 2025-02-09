import { mapAndClearErrors } from './helper.js'

export const errorHandler = (error, _req, res, next) => {
  if (error) {
    error.messages = mapAndClearErrors(error)
    delete error.content
    return res.status(error.code || 400).send(error)
  }

  next(error)
}
