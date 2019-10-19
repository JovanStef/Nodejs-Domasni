errorHandler=(err,req,res,next)=>{
    var errObj = {
        status: err.status,
        error : {
            message:err.message
        }
    }
    res.status(err.status || 500).send(errObj);
}

module.exports = {
    errorHandler
}