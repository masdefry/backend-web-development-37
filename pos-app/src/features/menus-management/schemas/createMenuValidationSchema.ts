import * as yup from 'yup';

export const createMenuValidationSchema = yup.object().shape({
    name: yup.string().required('Menu name is required'), 
    price: yup.number().required('Menu price is required').min(1).max(999999999), 
    description: yup.string().required('Menu description is required'), 
    isAvailable: yup.boolean().required('Menu available is required'), 
    images: yup.array().of(
        yup.mixed<File>()
        .test('fileSize', 'Maximum file size is 2mb', (file) => {
            if(!file) return true;

            const maximumSize = 2 * 1024 * 1024
            return file.size < maximumSize
        })
        .test('fileFormat', 'File format not accepted', (file) => {
            if(!file) return true; 
            const splittedFileName = file?.name?.split('.')
            const fileExtension = splittedFileName[splittedFileName?.length-1]
            const acceptedFileFormat = ['jpg', 'jpeg', 'png', 'webp', 'avg'];
            return acceptedFileFormat.includes(fileExtension)
        })
    )
})