const modelMiddleware=require('../middleware/model');
const acl=require("../../auth/middleware/acl");
const basic=require('../middleware/basic');
const barer=require('../middleware/bearer');
const express=require('express');
const router=express.Router();
router.param('models',modelMiddleware);
router.get('/:models',barer,handleGetAll);
router.get('/:models/:id',barer,handleGetOne);
router.post('/:models',barer,acl('create'),handleCreate);
router.put('/:models/:id',barer,acl('update'),handleUpdate);
router.delete('/:models/:id',barer,acl('delete'),handleDelete);

async function handleGetAll(req,res,next){
    try {
        console.log(req.model);
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
