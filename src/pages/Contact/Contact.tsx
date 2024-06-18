import { InboxIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { useRef, useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { BsGithub } from "react-icons/bs"
import { LiaLinkedin } from "react-icons/lia"
import { Link } from "react-router-dom"
import emailjs from '@emailjs/browser';


const Contact: React.FC = () => {

    const form = useRef<HTMLFormElement | null>(null);

    const handleSendMail = (e: React.FormEvent) => {
        e.preventDefault();
        // validate form by checking if name, email and message is not empty
        if (form.current) {
            const formData = new FormData(form.current);
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            const message = formData.get('message') as string;
            if (!name || !email || !message || name === '' || email === '' || message === '' || !email.includes('@') || name.trim() === '' || email.trim() === '' || message.trim() === '') {
                toast.error('Please provide required data');
                return;
            }

            if (form.current !== null) {
                emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
                    .then((result) => {
                        console.log(result.text);
                    },  
                        (error) => {
                            console.log(error.text);
                            toast.error('Something went wrong, please try again later');
                        });
            }
            toast.success('Message sent successfully');
            form.current.reset();
        };
    };

    return (
        <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
            {/* for title of page using react Helmet*/}
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Contact - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-black dark:text-gray-200">Get in Touch</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Have a question or want to work together? Fill out the form below or send me a message.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <h2 className="text-xl font-semibold text-black dark:text-gray-200">Mahinur Rahman</h2>
                            <p className="text-gray-500 dark:text-gray-400">Full stack Developer (React + Typescript + Node + Express + Docker)</p>
                            <p className="text-gray-500 dark:text-gray-400">
                                I'm a passionate frontend developer with 2+ years of experience. I specialize in building modern,
                                responsive web applications using the latest technologies.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <h3 className="text-lg font-semibold text-black dark:text-gray-200">Contact Info</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <InboxIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                        // send email
                                        href="mailto:dev.mahinur.rahman@gmail.com"
                                    >
                                        dev.mahinur.rahman@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                                        // call the number
                                        href="tel:+8801778287079"
                                    >
                                        +8801778287079
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <h3 className="text-lg font-semibold text-black dark:text-gray-200">Social</h3>
                            <div className="flex items-center gap-4">
                                <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300" to={'https://www.linkedin.com/in/mahinur-rahman-14102a218/'}>
                                    <LiaLinkedin className="h-8 w-8" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300" to={'https://github.com/mahi1212'}>
                                    <BsGithub className="h-6 w-6" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <form className="grid gap-6" ref={form} onSubmit={handleSendMail}>
                        <div className="grid gap-2">
                            <label htmlFor="name" className="dark:text-gray-400 text-gray-500">Name*</label>
                            <input id="name" name="name" placeholder="Enter your name" className="border-2 border-gray-100 dark:border-gray-400 text-black dark:text-white p-2 rounded-md outline-none bg-white dark:bg-neutral-700" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="dark:text-gray-400 text-gray-500">Email*</label>
                            <input id="email" name="email" placeholder="Enter your email" type="email" className="border-2 border-gray-100 dark:border-gray-400 text-black dark:text-white p-2 rounded-md outline-none bg-white dark:bg-neutral-700" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="message" className="dark:text-gray-400 text-gray-500">Message*</label>
                            <textarea id="message" name="message" placeholder="Enter your message" rows={5} className="border-2 border-gray-100 dark:border-gray-400 text-black dark:text-white p-2 rounded-md outline-none bg-white dark:bg-neutral-700" />
                        </div>
                        <button className="w-full border-2 border-white dark:border-gray-400 py-2 bg-slate-800 text-white dark:text-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-slate-900 transition" type="submit">
                            SEND MESSAGE
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>

                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Contact