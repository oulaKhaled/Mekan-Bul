var mongoose = require("mongoose");

var dbURI = 'mongodb+srv://mekan32:1234@mekanbul.dqyiuuw.mongodb.net/mekanbul?retryWrites=true&w=majority';

mongoose.connect(dbURI);

mongoose.connection.on("connected",function(){
    console.log(dbURI+" adresindeki veritabanına bağlanıldı.");
});

mongoose.connection.on("error",function(){
    console.log("Bağlantı sağlanamadı.");
});

mongoose.connection.on("disconnected",function(){
    console.log("Bağlantı kesildi.");
});


process.on("SIGINT", function(){
    mongoose.connection.close();
    console.log("Bağlantı Kapatıldı");
    process.exit(0);
});



require("./venue");