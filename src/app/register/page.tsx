"use client"
import Link from "next/link";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { registerAPI } from "@/lib/allApi";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must  contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must  contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must  contain at least one number')
                .matches(/[@$!%*?&]/, 'Password must  contain at least one special character (@$!%*?&)')
                .required('Password is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await registerAPI(values)
                console.log(result);
                if (result.status == 200) {
                    toast.success(result.data.message)
                    router.push('/login')
                    resetForm()
                }
                else{
                    toast.error(result.response.data.message)
                    resetForm()
                }
            } catch (error) {
                console.error("Registration Failed:", error);
            }
        }
    })
    return (
        <>
            <div className="bg-slate-200 py-20 h-screen">
                <div className="md:w-4/12 w-11/12 bg-white mx-auto flex flex-col items-center justify-center p-5">
                    <p className="font-bold text-xl">Register Here</p>
                    <div className="flex w-full mt-7">
                        <button className="border border-l w-1/2 p-2 text-slate-500">LOGIN</button>
                        <button className="border border-l w-1/2 p-2 text-white bg-teal-700">REGISTER</button>
                    </div>
                    <form className="mt-5 w-full bg-slate-200 p-7 border border-slate-700" onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Email ID *"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
                            {formik.touched.email && formik.errors.email &&
                                (<div className="text-red-500">{formik.errors.email}</div>)}
                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Password *"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none" />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-500">{formik.errors.password}</div>
                            )}
                        </div>


                        <div className="flex justify-center mt-5">
                            <button type="submit" className="w-1/2 p-2 text-white bg-teal-700 rounded-md">Register</button>
                        </div>
                        <p className="text-center mt-5 text-sm"><span>New User? </span><Link href={'/login'}><span className="text-red-800 underline cursor-pointer">Login</span></Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}