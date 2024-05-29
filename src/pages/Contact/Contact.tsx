import { InboxIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { BsGithub, BsTwitter } from "react-icons/bs"
import { LiaLinkedin } from "react-icons/lia"
import { Link } from "react-router-dom"



const Contact: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Have a question or want to work together? Fill out the form below or send me a message.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <h2 className="text-xl font-semibold">John Doe</h2>
                            <p className="text-gray-500 dark:text-gray-400">Frontend Developer</p>
                            <p className="text-gray-500 dark:text-gray-400">
                                I'm a passionate frontend developer with 5+ years of experience. I specialize in building modern,
                                responsive web applications using the latest technologies.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <h3 className="text-lg font-semibold">Contact Info</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <InboxIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                                        john@example.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
                                        +1 (234) 567-890
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <h3 className="text-lg font-semibold">Social</h3>
                            <div className="flex items-center gap-4">
                                <Link className="text-gray-500 hover:text-gray-900" to={'/'}>
                                    <BsTwitter className="h-6 w-6" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                                <Link className="text-gray-500 hover:text-gray-900" to={'/'}>
                                    <LiaLinkedin className="h-6 w-6" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                                <Link className="text-gray-500 hover:text-gray-900" to={'/'}>
                                    <BsGithub className="h-6 w-6" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <form className="grid gap-6">
                        <div className="grid gap-2">
                            <label htmlFor="name">Name</label>
                            <input id="name" placeholder="Enter your name" className="border-2 p-2 rounded-md outline-none" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <input id="email" placeholder="Enter your email" type="email" className="border-2 p-2 rounded-md outline-none" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" placeholder="Enter your message" rows={5} className="border-2 p-2 rounded-md outline-none" />
                        </div>
                        <button className="w-full border-2 py-2 bg-slate-800 text-white rounded-md" type="submit" >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Contact