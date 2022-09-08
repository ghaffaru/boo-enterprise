
exports.returnErrors = (errors, res, next) => {

    if (!errors.isEmpty()) {

        errorObj = {}

        errors.array().forEach(err => {

            errorObj[err.param] = err.msg

        })
       
        res.status(400).json(errorObj);
        
    }else {
        next();
    }
    
}