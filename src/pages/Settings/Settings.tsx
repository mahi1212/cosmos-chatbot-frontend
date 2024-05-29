
import { useAuth } from "src/context/AuthContent"

export default function Settings() {
    const auth = useAuth()
    console.log(auth)
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
                <div className="flex w-full  justify-between">
                    <div className="flex gap-4">
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="mt-2 text-gray-500 ">- Customize your AI chatbot settings.</p>
                    </div>
                    <div className="flex items-center">
                        {
                            auth?.isLoggedin === true &&
                            <button
                                onClick={auth.logout}
                                className="bg-black hover:bg-white hover:border-black border-2 outline-none hover:text-black transition text-white font-medidarkum py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                                type="submit"
                            >
                                Logout
                            </button>
                        }


                        <button
                            className="bg-black hover:bg-white hover:border-black border-2 outline-none hover:text-black transition text-white font-medidarkum py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                            type="submit"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="system-prompt">
                            System Prompt
                        </label>
                        <div className="mt-1">
                            <textarea
                                className="block w-full rounded-md border-2 outline-none p-1 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                                id="system-prompt"
                                name="system-prompt"
                                placeholder="Enter your system prompt..."
                                rows={4}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            This prompt will be used to initialize the AI's behavior.
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="file-upload">
                            Upload File
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 outline-none border-dashed border-gray-300 px-6 pt-5 pb-6 ">
                            <div className="space-y-1 text-center">
                                <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 ">
                                    <label
                                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        htmlFor="file-upload"
                                    >
                                        <span>Upload a file</span>
                                        <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500 ">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="gpt-model">
                            GPT Model
                        </label>
                        <div className="mt-1">
                            <select id="gpt-model" name="gpt-model" className="w-full border-2 outline-none border-dashed rounded-md py-1" defaultValue="gpt-3.5-turbo">
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                                <option value="gpt-4">GPT-4</option>
                                <option value="davinci">Davinci</option>
                            </select>

                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            Choose the GPT model to use for your chatbot.
                        </p>
                    </div>
                    {/* <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="temperature">
                            Temperature
                        </label>
                        <div className="mt-1">
                            <Slider
                                aria-label="Temperature"
                                defaultValue={[0.5]}
                                id="temperature"
                                max={1}
                                min={0}
                                name="temperature"
                                step={0.1}
                            />

                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            Adjust the temperature to control the creativity and randomness of the AI's responses.
                        </p>
                    </div> */}
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="max-tokens">
                            Max Tokens
                        </label>
                        <div className="mt-1">
                            <input
                                className="block w-full p-1 border-2 outline-none border-dashed rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                                defaultValue={1024}
                                id="max-tokens"
                                max={4096}
                                min={1}
                                name="max-tokens"
                                type="number"
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            Set the maximum number of tokens the AI can generate in a single response.
                        </p>
                    </div>
                    {/* <div className="sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 " htmlFor="top-p">
                            Top P
                        </label>
                        <div className="mt-1">
                            <Slider aria-label="Top P" defaultValue={[0.9]} id="top-p" max={1} min={0} name="top-p" step={0.1} />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                            Adjust the Top P to control the diversity of the AI's responses.
                        </p>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

function CloudUploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
        </svg>
    )
}