const models=require('../../models');
module.exports=(req,res,next)=>{
const modelName=req.params.models;
if(models[modelName]){
    req.model=models[modelName];
    next()
}else next('Invalid Model')
}