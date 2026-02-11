'use client';

import { createMenuValidationSchema } from "@/features/menus-management/schemas/createMenuValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useFormik } from "formik"

export default function CreateNewMenuPage(){

    const formik = useFormik({
        initialValues: {
            name: '', 
            price: 0, 
            description: '', 
            images: [] as File[], 
            isAvailable: false 
        }, 
        validationSchema: createMenuValidationSchema,
        onSubmit: async({name, price, description, images, isAvailable}) => {
            try {
                const fd = new FormData(); 
                fd.append('name', name);
                fd.append('price', price.toString());
                fd.append('description', description);
                fd.append('isAvailable', isAvailable.toString());
                images?.forEach((image: File) => {
                    fd.append('imagesMenu', image)
                });

                const res = await axiosInstance.post('/menus', fd)
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
    })

    return(
        <>
            <h2 className="text-2xl font-bold mb-4">Create New Menu</h2>
            <form onSubmit={formik?.handleSubmit}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Menu Name</legend>
                    <input 
                    name="name"
                    onChange={formik?.handleChange}
                    type="text" className="input w-full" placeholder="Type here" />
                    <p className="label">{formik?.errors?.name}</p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Price</legend>
                    <input 
                    name="price"
                    onChange={formik?.handleChange}
                    type="text" className="input w-full" placeholder="Type here" />
                    <p className="label">{formik?.errors?.price}</p>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea 
                    name="description"
                    onChange={formik?.handleChange}
                    className="textarea h-24 w-full" placeholder="Menu description"></textarea>
                    <div className="label">{formik?.errors?.description}</div>
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Menu Image(s)</legend>
                    <input 
                    name="images"
                    onChange={(e) => {
                        if(e?.currentTarget?.files){
                            formik?.setFieldValue(
                                'images', 
                                Array.from(e?.currentTarget?.files) // [{file1}]
                            )
                        }
                    }}
                    type="file" className="file-input w-full" multiple />
                    <label className="label">{Array.isArray(formik.errors.images)
              ? formik.errors.images.join(', ')
              : formik.errors.images}</label>
                </fieldset>

                <div className="form-control mb-3">
                <label className="label cursor-pointer justify-start gap-3">
                    <input 
                    name="isAvailable"
                    onChange={formik?.handleChange}
                    checked={formik?.values?.isAvailable}
                    type="checkbox" className="toggle toggle-primary" />
                    <span className="label-text">Is Available</span>
                </label>
                </div>

                <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                    Save Menu
                </button>
                </div>
            </form>
        </>
    )
}