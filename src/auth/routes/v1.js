const modelMiddleware=require('../middleware/model');
const express=require('express');
const router=express.Router();
router.param('model',modelMiddleware);
router.get('/:models',modelMiddleware,handleGetAll);
router.get('/:models/:id',modelMiddleware,handleGetOne);
router.post('/:models',modelMiddleware,handleCreate);
router.put('/:model/:id',modelMiddleware,handleUpdate);
router.delete('/:model/:id',modelMiddleware,handleDelete);
async function handleGetAll(req,res,next){
    try {
        let allRecords=await req.model.get();
    res.status(200).send(allRecords);
    } catch (error) {
        next(error);
    }
}
async function handleGetOne(req,res,next){
    const id=req.params.id;
    try {
        let record=await req.model.get(id);
        res.status(200).send(record);
    } catch (error) {
        next(error);
    }
}
async function handleCreate(req,res,next){
    const body=req.body;
    try {
        let record=await req.model.create(body);
        res.status(200).send(record);
    } catch (error) {
        next(error);
    }
}
async function handleUpdate(req,res,next){
    const body=req.body;
    const id=req.params.id;
    try {
        let record=await req.model.update(id,body);
        res.status(200).send(record);
    } catch (error) {
        next(error);
    }
}
async function handleDelete(req,res,next){
    const id=req.params.id;
    try {
        let record=await req.model.delete(id);
        res.status(200).send(record);
    } catch (error) {
        next(error);
    }
}
module.exports=router;
