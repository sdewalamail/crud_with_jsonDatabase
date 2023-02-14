const express = require('express')
const router = express.Router()
const multer  = require('multer');
const path = require('path');



const uploadPath =  path.join(process.cwd() , "public",  "profile_pic");

const storage =  multer.diskStorage({
    destination: function(req, file, callback){
       callback(null,uploadPath ) 
    },
    filename: function(req, file, callback){
        callback(null, Date.now()+path.extname(file.originalname))
    }
})
const uploads = multer({ storage:storage});




const { read,create,update,searchUerById, deleteUser , upload } = require('../controllers/org');

router.get('/read', read);
router.post('/create', create);
router.get('/search/:id', searchUerById);

router.put('/update/:id', update);
router.delete('/delete/:id', deleteUser);
router.put('/upload/:id/profilePic', uploads.single('profilePic'),upload)

module.exports = router;
