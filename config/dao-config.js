/**
 * Created by thinksysuser on 26/9/16.
 */

const dbConfig  = require("./env").db.mongo,
    mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect( dbConfig.host , { user : dbConfig.userName , pass : dbConfig.password } );


mongoose.connection.on( 'connected' , () => console.log("Successfully Connected") );
mongoose.connection.on( 'error' , () => console.log("Successfully Connected") );




