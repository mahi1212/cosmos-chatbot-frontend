import { BoltIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from 'src/context/AuthContent'

const Login = () => {
    const auth = useAuth() 
    const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(false)

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // console.log(alreadyHaveAccount)
        // if alreadyHaveAccount = true, then login
        // else register

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try{
            // toast.loading('Please wait...')
            await auth?.login(email, password)
            toast.success('Login successful')
        }catch(e: any) {
            console.log(e.response.data.message)
            toast.error('Login failed')
        }


        console.log(name, email, password)

        console.log('form submitted')
    }

    return (
        <div className="flex min-h-[75dvh] flex-col items-center justify-center bg-slate-100 ">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg ">
                <div className="mb-8 flex items-center justify-center">
                    <BoltIcon className="h-12 w-12 text-gray-500 " />
                    <h1 className="ml-2 text-3xl font-bold tracking-tight text-gray-900 ">COSMOS AI</h1>
                </div>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    {
                        !alreadyHaveAccount &&
                        <div>
                            <p className='mb-2 ms-1'>Name</p>
                            <input id="name" name='name' placeholder="Enter your name" type="text" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                        </div>
                    }
                    <div>
                        <p className='mb-2 ms-1'>Email</p>
                        <input id="email" name='email' placeholder="Enter your email" type="email" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                    </div>
                    <div>
                        <p className='mb-2 ms-1'>Password</p>
                        <input id="password" name='password' placeholder="Enter your password" type="password" className='w-full border-2 rounded-full px-4 py-1 outline-none' />
                    </div>
                    <button className="w-full bg-black text-white rounded-full py-2 flex gap-3 items-center justify-center" type="submit">
                        <span>{alreadyHaveAccount ? 'Login' : 'Register '}</span>
                        <BoltIcon className="h-4 w-4 text-white" />
                    </button>
                    {
                        !alreadyHaveAccount ?
                            <p
                                className='text-center cursor-pointer pb-1 underline'
                                onClick={() => setAlreadyHaveAccount(true)}
                            >
                                Proceed with Signin
                            </p>
                            :

                            <p
                                className='text-center cursor-pointer'
                                onClick={() => setAlreadyHaveAccount(false)}
                            >
                                Already have an account?
                            </p>

                    }
                </form>
            </div>
        </div>
    )
}

export default Login