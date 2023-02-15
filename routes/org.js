const express = require('express')
const router = express.Router()
const multer  = require('multer');
const path = require('path');


 
function fileFilter (req, file, callback) {


    try {

        const acceptedExtension = ['.jpg','.png', '.gif', '.webp', '.bmp'];
         const fileExtension = path.extname(file.originalname).toLocaleLowerCase();
         console.log(fileExtension);
         callback(null, acceptedExtension.includes(fileExtension));

    }catch(error){

            callback(error);
    }


}


const uploadPath =  path.join(process.cwd() , "public",  "profile_pic");

const storage =  multer.diskStorage({
    destination: function(req, file, callback){
       callback(null,uploadPath ) 
    },
    filename: function(req, file, callback){
        callback(null, Date.now()+path.extname(file.originalname))
    }
});

const uploads = multer({ 
    storage:storage,
    limits:{
        fieldSize: 2*1024 *1024,
    },
    fileFilter:fileFilter
});




const { read,create,update,searchUerById, deleteUser , upload } = require('../controllers/org');

router.get('/read', read);
router.post('/create', create);
router.get('/search/:id', searchUerById);

router.put('/update/:id', update);
router.delete('/delete/:id', deleteUser);
router.put('/upload/:id/profilePic', uploads.single('profilePic'),upload)

router.post('/login', require('../auth/token'));

module.exports = router;
