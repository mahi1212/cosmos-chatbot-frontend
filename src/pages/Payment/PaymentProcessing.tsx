import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { makePayment } from "src/helpers/api-communicator";

const PaymentProcessing = () => {
    // take session id from url
    const sessionId = window.location.search.split('=')[1];
    const navigate = useNavigate();
    useEffect(() => {
        // send sessionId to backend to verify payment
        if(!sessionId) {
            navigate('/payment-failed')
            return
        }
        makePayment(sessionId).then((data) => {
            console.log(data)
            navigate('/payment-success')
            toast.success('Make payment successfull', { id: 'making-payments' })
        }).catch((e) => {
            console.log(e.response.data.message)
            if (e.response.data.message === 'Token not found in cookies') {
                toast.error('Please login first')
                navigate('/login')
            } else {
                toast.error('Payment failed')
                navigate('/payment-failed')
            }

        }).finally(() => {
            toast.dismiss('making-payments')
        })

    }, [sessionId])

    // send session id to backend to verify payment

    // if payment is not verified, keep showing payment processing
    // if payment is verified, redirect to payment success or payment failed page
    return (
        <div>
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Payment processing - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <p className="text-center">Payment Processing. Please do not refresh the page.</p>
        </div>
    )
}

export default PaymentProcessing