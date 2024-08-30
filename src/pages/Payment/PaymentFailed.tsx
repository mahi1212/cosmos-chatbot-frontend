import { useNavigate } from "react-router-dom"

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <svg
              className="h-12 w-12 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01m6.938-10.642a9 9 0 11-13.856 0 9 9 0 0113.856 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Payment Failed</h2>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-center text-gray-600">
            We're sorry, but your payment could not be processed. Please check
            your payment details and try again.
          </p>

        </div>
        <div className="p-6 flex flex-col space-y-2">
          <button
            onClick={() => navigate('/pricing')}
            className="w-full bg-blue-600 text-white rounded-md py-2 flex items-center justify-center">
            Try Again
            <svg
              className="ml-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="w-full bg-transparent border border-blue-600 text-blue-600 rounded-md py-2">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed