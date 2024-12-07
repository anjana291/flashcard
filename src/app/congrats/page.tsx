"use client"
import { useRouter, useSearchParams } from "next/navigation";

export default function Finished() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const score = searchParams.get('score')
    
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 text-gray-800 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-600">
        Congratulations!
      </h1>
      <p className="text-lg sm:text-xl mt-4 text-center text-gray-600">
        You have completed the quiz successfully!
      </p>
      <div className="mt-6 text-center">
        <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Your Score: <span className="text-green-600">{score}</span>
        </p>
      </div>
      <div className="mt-8">
        <button
          onClick={() => router.push('/')} 
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
}
