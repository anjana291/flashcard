import { CategoryContext } from "@/context/CategoryContext";
import { getQuestionsAPI } from "@/lib/allApi";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type FlashCardProps = {
    selectedCategory: string;
}
export default function FlashCard({ selectedCategory }: FlashCardProps) {
    const context = useContext(CategoryContext)

    if (!context) {
        throw new Error("CategoryContext must be used within a CategoryProvider")
    }

    const { setSelectedCategory } = context
    const [questionsArr, setQuestionsArr] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [flipped, setFlipped] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [score,setScore]=useState(0)
    const router =useRouter()

    useEffect(() => {
        getCategoryQuestion()
    }, [selectedCategory])

    const getCategoryQuestion = async () => {
        const reqBody: { selectedCategory: string } = { selectedCategory }
        const result = await getQuestionsAPI(reqBody)
        console.log(result);

        if (result.status == 200 && result.data.length > 0) {
            const shuffledArray = shuffleArrFn(result.data)
            console.log('shuffledArray:', shuffledArray);
            setQuestionsArr(shuffledArray)
        }
        else {
            setQuestionsArr([]) 
        }

    }

    const shuffleArrFn = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5)
    }

    const handleNextQuestion = () => {
        if (answered) {
            setQuestionIndex((prev) => prev + 1)
            setSelectedOption("")
            setAnswered(false)
            setFlipped(false)
        }
    }

    const handleOptionSelect = (option: string) => {
        // alert(option)
        setFlipped(true)
        setSelectedOption(option)
        setAnswered(true)

        if(option === currentQuestion?.answer){
            setScore((prev)=>prev+1)
            setIsCorrect(true)
        }
        else {
            setIsCorrect(false)
        }
    }

    const handleFinish=()=>{
        router.push(`/congrats?score=${score}`);
        setSelectedCategory("")
    }

    const currentQuestion = questionsArr[questionIndex]
    const isLastQuestion = questionIndex === questionsArr.length - 1
    console.log(currentQuestion);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800 p-4 sm:p-6 lg:p-4">
            <h2 className="text-xl sm:text-2xl font-bold sm:my-5 text-center">
                {selectedCategory} Quiz
            </h2>
            {questionsArr.length === 0 ? (
                <p className="text-lg sm:text-xl font-semibold mt-4 text-center text-gray-600">
                    No questions to display.
                </p>
            ) : (
                <>
                    <h2 className="text-lg sm:text-xl lg:text-xl font-bold my-2 sm:my-5 text-center">
                        Score: {score}/{questionsArr.length}
                    </h2>

                    {currentQuestion && (
                        <div
                            className={`flip-card relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-[240px] sm:h-[280px] lg:h-[320px] perspective-[1000px] ${flipped ? "flip-enabled" : ""
                                }`}>
                            <div
                                className={`flip-card-inner absolute inset-0 text-center transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""
                                    }`}>
                                <div className="flip-card-front absolute inset-0 bg-white text-black p-4 sm:p-5 lg:p-6 shadow-md rounded-lg">
                                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold my-3">
                                        {currentQuestion?.question}
                                    </h3>
                                    <div className="space-y-2 mt-2">
                                        <button
                                            className="w-full p-2 sm:p-3 text-left border rounded-lg"
                                            onClick={() => handleOptionSelect(currentQuestion?.optionA)}>
                                            {currentQuestion?.optionA}
                                        </button>
                                        <button
                                            className="w-full p-2 sm:p-3 text-left border rounded-lg"
                                            onClick={() => handleOptionSelect(currentQuestion?.optionB)}>
                                            {currentQuestion?.optionB}
                                        </button>
                                        <button
                                            className="w-full p-2 sm:p-3 text-left border rounded-lg"
                                            onClick={() => handleOptionSelect(currentQuestion?.optionC)}>
                                            {currentQuestion?.optionC}
                                        </button>
                                        <button
                                            className="w-full p-2 sm:p-3 text-left border rounded-lg"
                                            onClick={() => handleOptionSelect(currentQuestion?.optionD)}>
                                            {currentQuestion?.optionD}
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="flip-card-back absolute inset-0 text-white flex items-center justify-center transform rotate-y-180 backface-hidden rounded-lg bg-gray-800">
                                    <p className="font-bold text-lg sm:text-xl lg:text-2xl p-2">
                                        Answer: {currentQuestion?.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLastQuestion ? (
                        <button
                            className="p-2 sm:p-3 bg-black text-white font-semibold mt-7 sm:mt-8 lg:mt-10 rounded-lg hover:bg-gray-800"
                            onClick={handleFinish}>
                            Finish
                        </button>
                    ) : (
                        <button
                            className="p-2 sm:p-3 bg-black text-white font-semibold mt-7 sm:mt-8 lg:mt-10 rounded-lg hover:bg-gray-800"
                            onClick={handleNextQuestion}
                            disabled={!answered}>
                            Next ▷
                        </button>
                    )}
                </>
            )}
        </div>


    )
}