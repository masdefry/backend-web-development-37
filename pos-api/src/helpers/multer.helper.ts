import { Request } from "express";
import multer, { FileFilterCallback } from "multer"
import path from "path"
import { cwd } from "process"

export function multerUpload(
    directory: string, 
    uniqueFileName: string, 
    allowedFileFormat: string[], 
    diskStorage: 'disk' | 'memory'
){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const mainDirectory = path.join(cwd()); 
            cb(null, `${mainDirectory}/${directory}`)
        },
        filename: function (req, file, cb) {
            const arrayOriginalname = file?.originalname?.split('.');
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
            cb(null, `${uniqueFileName}-${uniqueSuffix}.${arrayOriginalname[arrayOriginalname?.length-1]}`) // IMG-MENU-UNIQUESUFIX
        }
    });

    function fileFilter (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        const arrayOriginalname = file?.originalname?.split('.');
        
        if(!allowedFileFormat.includes(arrayOriginalname[arrayOriginalname?.length-1])){
            return cb(new Error(`Format file not accepted`))
        }

        cb(null, true)
    }

    return multer({storage, fileFilter, limits: {fileSize: 1 * 1024 * 1024}})
}