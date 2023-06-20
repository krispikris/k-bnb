// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    _res.status(400);
      return _res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors
        });
      }

      next();
    };
    // const err = Error('Validation error');
    // err.errors = errors;
    // err.status = 400;
    // err.title = 'Validation error';
    // next(err);

module.exports = {
  handleValidationErrors
};
