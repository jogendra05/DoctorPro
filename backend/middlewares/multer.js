import multer from "multer";

const storage = multer.diskStorage({
    finename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const upload = multer({storage})

export default upload