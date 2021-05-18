const constants = require('../config/constants');

/** error messages mapped to error types */
var errors = {
    Runtime: { json: { message: "Internal Server Error" }, status: constants.httpStatusCodes.internalError },
    PageNotFound: { json: { message: "Page Not Found" }, status: constants.httpStatusCodes.notFound },
    BadRequest: { json: { message: "Bad Content" }, status: constants.httpStatusCodes.badRequest },
    UnAuthorizedError: { json: { message: "unAuthorized user" }, status: constants.httpStatusCodes.unAuthorized },
    InvalidFeatureError: { json: { message: "Invalid feature name" }, status: constants.httpStatusCodes.unprocessableEntity },
    UnprocessableEntity: { json: { message: "Unprocessable Entity" }, status: constants.httpStatusCodes.unprocessableEntity },
    DuplicateDataError: { json: { message: "Record already exist with given details" }, status: constants.httpStatusCodes.conflict },
    ForbiddenError: { json: { message: "You are not authorized to access this resource" }, status: constants.httpStatusCodes.forbidden },
    InsufficientScopesError: { json: { message: "Insufficient scopes" }, status: constants.httpStatusCodes.forbidden },
};

/** function for handling errors  */
var errorHandler = function (errorName, response) {
    response.setHeader('content-type', 'application/problem+json;charset=utf-8');
    if (errorName.name === constants.mongodbValidationError) {
        response.status(constants.httpStatusCodes.unprocessableEntity).send({ message: errorName.message });
        return;
    }
    if(errorName.code === constants.mongodbDuplicateDataError){
        response.status(constants.httpStatusCodes.conflict).send({ message: errors['DuplicateDataError'].json.message});
        return;
    }
    if (errors[errorName]) {
        response.status(errors[errorName].status).send(errors[errorName].json);
        return;
    }
    
    var errResponse = errors["Runtime"].json;
    if (errorName.message) {
        errResponse.message = errorName.message;
    } else if (errorName) {
        errResponse.message = errorName;
    }

    response.status(constants.httpStatusCodes.internalError).send(errResponse);
};

exports.errorHandler = errorHandler;
