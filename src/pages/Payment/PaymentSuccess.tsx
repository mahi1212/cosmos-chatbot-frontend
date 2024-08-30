import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      navigate("/settings")
    }
  }, [countdown])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center">Payment Successful</h2>
        </div>
        <div className="p-4 text-center">
          <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <p className="text-lg mb-4">Thank you for your payment!</p>
          <p className="text-sm font-semibold">
            Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
          </p>
        </div>
        <div className="p-4 flex justify-center">
          
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-indigo-600"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess