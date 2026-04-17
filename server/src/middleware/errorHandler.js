const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource id' })
  }

  console.error(err)
  return res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  })
}

module.exports = errorHandler
