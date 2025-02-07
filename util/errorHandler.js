export const errorHandler = (error, _req, res, next) => {
  switch (error.title) {
    case 'Blog not found':
      return res.status(404).send(error)
    case 'Blog creation failed':
      return res.status(400).send(error)
    case 'Blog update failed':
      return res.status(400).send(error)
    case 'Blog deletion failed':
      return res.status(400).send(error)
  }

  next(error)
}
