"use client"
import { addQuestionAPI } from "@/lib/allApi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function AddQuestion() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [questionDet, setQuestionDet] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        category: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])

    const handleCancel = () => {
        setQuestionDet({
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            answer: "",
            category: ""
        })
        setIsModalOpen(false)
    }

    const loggedInFunction = () => {
        if (isLoggedIn) {
            setIsModalOpen(true)
        }
        else {
            router.push('/login')
        }
    }

    const addQuestion = async () => {
        try {
            const { question, optionA, optionB, optionC, optionD, answer, category } = questionDet
            if (!question || !optionA || !optionB || !optionC || !optionD || !answer || !category) {
                toast.warning('Please fill all the fields')
            }
            else {
                const token = sessionStorage.getItem("token")
                if (token) {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                    const result = await addQuestionAPI(questionDet, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success(result.data.message)
                        setQuestionDet({
                            question: "",
                            optionA: "",
                            optionB: "",
                            optionC: "",
                            optionD: "",
                            answer: "",
                            category: ""
                        })
                    }
                    else if (result.status == 406) {
                        toast.error(result.response.data)
                    }
                }
                else {
                    alert('Unauthorized user')
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button
                className="bg-black text-white w-full sm:w-auto px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 transition" onClick={loggedInFunction}>
                Add Questions
            </button>

            {isModalOpen && <dialog id="my_modal_5" className="modal modal-top sm:modal-middle" open>
                <div className="modal-box w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
                    <div className='w-11/12 md:w-11/12 mx-auto rounded-md p-2 shadow-slate-950 shadow'>
                        <h1 className='text-center font-bold text-xl mt-2'>Add Question</h1>
                        <form className='mt-3 flex flex-col justify-center items-center rounded-md'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4'>
                                <div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Question" value={questionDet.question} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, question: e.target.value })} />
                                    </div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Option A" value={questionDet.optionA} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, optionA: e.target.value })} />
                                    </div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Option B" value={questionDet.optionB} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, optionB: e.target.value })} />
                                    </div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Option C" value={questionDet.optionC} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, optionC: e.target.value })} />
                                    </div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Option D" value={questionDet.optionD} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, optionD: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <div className='my-2'>
                                        <input type="text" placeholder="Answer" value={questionDet.answer} className="input input-bordered w-full focus:outline-none" onChange={(e) => setQuestionDet({ ...questionDet, answer: e.target.value })} />
                                    </div>
                                    <div className='my-2'>
                                        <select className="input input-bordered w-full focus:outline-none" value={questionDet.category} onChange={(e) => setQuestionDet({ ...questionDet, category: e.target.value })}>
                                            <option value="" disabled selected>Select</option>
                                            <option value="HTML">HTML</option>
                                            <option value="CSS">CSS</option>
                                            <option value="JavaScript">JavaScript</option>
                                            <option value="React.js">React.js</option>
                                            <option value="Node.js">Node.js</option>
                                            <option value="Angular">Angular</option>
                                            <option value="Vue.js">Vue.js</option>
                                            <option value="Express.js">Express.js</option>
                                            <option value="MongoDB">MongoDB</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='flex justify-end mt-3 p-2'>
                            <button className='btn btn-outline' onClick={handleCancel}>Cancel</button>
                            <button className='btn ms-1 bg-gradient-to-tr from-purple-900 via-fuchsia-800 to-violet-700 text-white' onClick={addQuestion}>Add</button>
                        </div>
                    </div>
                </div>
            </dialog>}
        </>
    )
}