class Collection {
    constructor(model){
        this.model=model
    }
    get(id,onFavs=false){
        if(onFavs){
            console.log('on favsfffffffffffffffffffffffffffffffffffffffff')
            return this.model.findAll({ where:{UserId:id}})
        }
        if(id) return this.model.findOne({id});
        return this.model.findAll({});
    }
    create(record){
        console.log(this.model)
        return this.model.create(record);
 }
    update(id,data){
        return this.model.findOne({where:{id}}).then(record=>record.update(data))
 }
    delete(id){
        return this.model.destroy({where:{id}})
 }
}
module.exports=Collection