logger = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} --${new Date()}`)
    next()
  };

errorHandler=(err,req,res,next)=>{
    var errObj = {
        status: err.status,
        error : {
            message:err.message
        }
    }
    res.status(err.status || 500).send(errObj);
};

errorWrongRoute = (req, res, next) => {
    var error = new Error('Route not found!');
    error.status = 404;
    next(error);
  };



module.exports = {
    logger,
    errorHandler,
    errorWrongRoute
}