export default function Welcome() {
    return (
        <div className="min-h-screen flex flex-col items-center py-8  bg-gray-100 text-gray-800">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-tr from-purple-900 via-fuchsia-800 to-violet-700 text-transparent bg-clip-text mb-6">
          Welcome to Our Quiz Platform!
        </h1>
          <p className="text-center text-lg mb-8">
            Anyone can participate in the quiz without needing to log in. Just follow the instructions below to get started.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold bg-gradient-to-tr from-purple-900 via-fuchsia-800 to-violet-700 text-transparent bg-clip-text  mb-4">
              How to Participate:
            </h2>
            <ul className="space-y-3">
              <li className="text-lg">
                <strong>Step 1:</strong> Select a category from the dropdown menu to choose a quiz.
              </li>
              <li className="text-lg">
                <strong>Step 2:</strong> Start answering questions in the quiz.
              </li>
              <li className="text-lg">
                <strong>Step 3:</strong> After completing the quiz, review your score.
              </li>
              <li className="text-lg">
                <strong>Step 4:</strong> Enjoy your learning experience, and feel free to try more quizzes!
              </li>
            </ul>
          </div>
  
        </div>
      </div>
    )
}