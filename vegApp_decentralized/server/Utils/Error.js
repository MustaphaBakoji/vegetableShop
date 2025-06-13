class GlobalError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.status = statusCode
        if (process.env.NODE_ENV === "development")
            Error.captureStackTrace(this, this.constructor)

    }
}

module.exports = GlobalError