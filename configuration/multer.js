import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path'
const uuid = nanoid(10);

const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,'upload');
    },
    filename : (req, file, cb) =>{
        cb(null, uuid + path.extname(file.originalname))
    }
});

export const upload = multer({ 
    storage : storage,
    fileFilter : (req, file, cb) => {
        if ( file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg are allowed'))
        }
    } 
});