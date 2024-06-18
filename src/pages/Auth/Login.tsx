import { BoltIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContent'

const Login = () => {
    const auth = useAuth()
    const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true)
    const navigate = useNavigate();
    // console.log(auth)
    // useEffect(() => {
    //     if (auth && auth.isLoggedin) {
    //         toast.success('User is logged in..')
    //         navigate('/');
    //     }
    // }, [auth]);
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log(alreadyHaveAccount)
        // if alreadyHaveAccount = true, then login
        // else register

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            // toast.loading('Please wait...')
            if (alreadyHaveAccount) {
                await auth?.login(email, password)
            } else {
                await auth?.signup(name, email, password)
            }
            navigate('/')
            toast.success('Authenticaiton successful')
        } catch (e: any) {
            console.log(e.response.data.message)
            toast.error('Login failed')
        }


        console.log(name, email, password)

        console.log('form submitted')
    }

    return (
        <div className="flex min-h-[75dvh] flex-col items-center justify-center">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white dark:bg-neutral-700 p-6 shadow-lg ">
                <div className="mb-8 flex items-center justify-center">
                    <BoltIcon className="h-12 w-12 text-gray-500 dark:text-gray-200" />
                    <h1 className="ml-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200">COSMOS AI</h1>
                </div>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    {
                        !alreadyHaveAccount &&
                        <div>
                            <p className='mb-2 ms-1 text-gray-800 dark:text-gray-200'>Name</p>
                            <input id="name" name='name' placeholder="Enter your name" type="text" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                        </div>
                    }
                    <div>
                        <p className='mb-2 ms-1 text-gray-800 dark:text-gray-200'>Email</p>
                        <input id="email" name='email' placeholder="Enter your email" type="email" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                    </div>
                    <div>
                        <p className='mb-2 ms-1 text-gray-800 dark:text-gray-200'>Password</p>
                        <input id="password" name='password' placeholder="Enter your password" type="password" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                    </div>
                    <button className="w-full bg-black dark:text-gray-200 dark:bg-neutral-900 text-gray-200 rounded-full py-2 flex gap-3 items-center justify-center" type="submit">
                        <span>{alreadyHaveAccount ? 'Login' : 'Register '}</span>
                        <BoltIcon className="h-4 w-4 text-white" />
                    </button>
                    {
                        !alreadyHaveAccount ?
                            <p
                                className='text-center cursor-pointer underline text-gray-800 dark:text-gray-200'
                                onClick={() => setAlreadyHaveAccount(true)}
                            >
                                Proceed with Signin
                            </p>
                            :

                            <p
                                className='text-center cursor-pointer underline text-gray-800 dark:text-gray-200'
                                onClick={() => setAlreadyHaveAccount(false)}
                            >
                                Don't have an account? Signup
                            </p>

                    }
                </form>
            </div>
        </div>
    )
}

export default Login