module.exports=(sequelize,DataTypes)=>sequelize.define('favorites',{
    name:{
        type:DataTypes.STRING,
        required:true
    },
});