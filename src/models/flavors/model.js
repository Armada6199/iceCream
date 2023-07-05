module.exports=(sequelize,DataTypes)=>sequelize.define('flavors',{
    name:{
        type:DataTypes.STRING,
        required:true
    },
    ingredients:{
        type: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
        required:false,
        defaultValue:['milk']
    }
});