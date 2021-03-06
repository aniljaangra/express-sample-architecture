/**
 * Created by thinksysuser on 26/9/16.
 */

const dbConfig  = require("./env").db.mongodb,
    mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect( dbConfig.host , { user : dbConfig.userName , pass : dbConfig.password } );


mongoose.connection.on( 'connected' , () => console.log("MongoDB Successfully Connected") );
mongoose.connection.on( 'error' , ( err ) => console.log("Error Connecting MongoDB" , err ) );




