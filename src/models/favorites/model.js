module.exports=(sequelize,DataTypes)=>sequelize.define('clothes',{
    catagory:{
        type:DataTypes.STRING,
        required:true
    },
    calories:{
        type:DataTypes.INTEGER,
        required:false,
    }
})