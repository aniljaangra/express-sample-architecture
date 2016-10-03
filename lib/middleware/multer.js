/**
 * Created by thinksysuser on 30/9/16.
 */
const multer = require('multer'),
    path = require('path'),
    upload = multer({ dest: path.resolve('./uploads') });

//https://github.com/expressjs/multer

//===================================== Exports ===========================================================

module.exports = {

    single : _singleFile ,
    array : _fileArray ,
    fields : _randomFiles,
    any : upload.any
}


//===================================== Implementation ===========================================================

function _singleFile( key ) {
    return upload.single( key );
}

function _fileArray(key, count) {
    return upload.array( key , count );
}

function _randomFiles( array ) {
    return upload.fields( array );
}

