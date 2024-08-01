import { BoltIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/AuthContent'

const Login = () => {
    const auth = useAuth()
    const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // console.log(auth)
    // useEffect(() => {
    //     if (auth && auth.isLoggedin) {
    //         toast.success('User is logged in..')
    //         navigate('/');
    //     }
    // }, [auth]);

    // if email pass available then auto call login function
    useEffect(() => {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');

        if (email && password) {
            (async () => {
                try {
                    setLoading(true);
                    await auth?.login(email, password);
                    navigate('/');
                    // toast.success('Authentication successful');
                } catch (e: any) {
                    console.log(e.response.data.message);
                    // toast.error('Authentication failed!');
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [loading]);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            // toast.loading('Please wait...')
            if (alreadyHaveAccount) {
                await auth?.login(email, password)
                navigate('/')
                localStorage.clear()
                toast.success('Authenticaiton successful')
            } else {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                await auth?.signup(name, email, password)
                // toast.success('Please login to continue with')
                navigate('/login')
                setAlreadyHaveAccount(true)
                // await auth?.login(email, password)
            }
        } catch (e: any) {
            // console.log(e.response.data.message)
            toast.error('Authenticaiton failed!')
        } finally {
            setLoading(false)
        }
        // console.log(name, email, password)
        // console.log('form submitted')
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
                        {
                            loading ? 'Processing...' : <span>{alreadyHaveAccount ? 'Login' : 'Register'}</span>
                        }
                        <BoltIcon className="h-4 w-4 text-white" />
                    </button>
                    {
                        !alreadyHaveAccount ?
                            <p
                                className='text-center cursor-pointer text-gray-800 dark:text-gray-200'
                                onClick={() => setAlreadyHaveAccount(true)}
                            >
                                Already registered?
                                <span className=' font-bold ms-1'>Signin</span>
                            </p>
                            :

                            <p
                                className='text-center cursor-pointer text-gray-800 dark:text-gray-200'
                                onClick={() => setAlreadyHaveAccount(false)}
                            >
                                Don't have an account?
                                <span className=' font-bold ms-1'>Signup</span>
                            </p>

                    }
                </form>
            </div>
        </div>
    )
}

export default Login