import multer from "multer";
import path from "path";


const storage=multer.diskStorage({
  destination:"uploads/cv",
  filename:(req,file,cb)=>{
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

export const upload=multer({
  storage:storage,
  limits:{fileSize:5*1024*1024},
  fileFilter:(req,file,cb)=>{
    const filetypes=/docx|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Support only! (docx,pdf)'));
    }
  }
})

