const errorHandler = (error, req, res, next) => {
    // default error
    let status = 500;
    let data = {
        message: "Internal Server Error",
    };
    if (error.status) {
        status = error.status;
    }

    if (error.message) {
        data.message = error.message;
    }

    return res.status(status).send(data);
};

export { errorHandler };
