const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.log(err.stack);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'MulterError') {
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be 5MB or smaller.'
            : err.message;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'ValidationError' || err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const details = err.errors ? Object.values(err.errors).map(val => val.message) : [];
        const message = details.filter(Boolean).join(', ') || err.message;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
