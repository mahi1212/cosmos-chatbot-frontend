
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContent"
import { getSettings, updateSettings } from "src/helpers/api-communicator"
import { Helmet } from "react-helmet";
import { IoIosLogOut } from "react-icons/io";
import { BsSave2Fill } from "react-icons/bs";
import { useAtom } from "jotai";
import {  usageAtom, usagePercentageAtom } from "src/store/jotai";
import { StarIcon } from "@heroicons/react/24/outline";
import { PiSmileyDuotone } from "react-icons/pi";

export default function Settings() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [limit, setLimit] = useState<number>(import.meta.env.VITE_FREE_TIER_TOKEN_LIMIT as number);
    const [settings, setSettings] = useState<any>({});
    const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number>(0);
    const [maxTokens, setMaxTokens] = useState<number>(0);
    const [usage, setUsage] = useAtom<number>(usageAtom);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
    // const [topP, setTopP] = useState<number>(0.9);
    // console.log(auth)
    useEffect(() => {
        async function fetchSettings() {
            // @ts-ignore
            if (auth?.user && auth.user._id) {
                try {
                    // @ts-ignore
                    const data = await getSettings(auth.user._id);
                    setSettings(data.settings);
                } catch (e: any) {
                    console.log(e.response.data.message);
                }
            }
        }
        fetchSettings();
    }, [auth?.user]);

    // console.log(settings)
    useEffect(() => {
        if (settings) {
            setSystemPrompt(settings.system_prompt ?? null);
            setModel(settings.gpt_version ?? null);
            setTemperature(settings.temperature ?? 0);
            setMaxTokens(settings.max_tokens ?? 0);
            setUsage(settings.token_usage ?? 0);
            setFrequencyPenalty(settings.frequency_penalty ?? 0);
            // setTopP(settings.top_p ?? 0.9);
        }
    }, [settings]);


    const handleUpdateSetting = async () => {

        const data: any = {};

        if (systemPrompt !== null) data.system_prompt = systemPrompt;
        if (model !== null) data.gpt_version = model;
        if (temperature !== 0) data.temperature = temperature;
        if (maxTokens !== 0) data.max_tokens = maxTokens;
        if (usage !== 0) data.token_usage = usage;
        if (frequencyPenalty !== 0) data.frequency_penalty = frequencyPenalty;
        // if (topP !== 0.9) data.top_p = topP;

        try {
            const response = await updateSettings(data);
            setSettings(response.settings);
            if (response.message === 'OK') {
                toast.success('Settings updated successfully');
            }
        } catch (e: any) {
            console.error('Failed to update settings', e);
        }
    };

    const [percentage, setPercentage] = useAtom(usagePercentageAtom)

    useEffect(() => {
        setPercentage((usage / limit) * 100);
    }, [usage]);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* for title of page using react Helmet*/}
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Settings - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className="space-y-8">
                <div className="flex gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 ">Settings</h1>
                    <p className="mt-2 text-gray-500 ">- Customize your AI chatbot settings.</p>
                </div>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3 text-gray-700 dark:text-gray-200">
                        <label className="block text-sm pb-2 font-medium " htmlFor="system-prompt">
                            COSMOS MEMBERSHIP
                        </label>
                        <div className="mt-1 flex gap-2">
                            {
                                settings?.tier == 'premium' ? <StarIcon className="w-6 h-6 text-yellow-500" /> :
                                    <PiSmileyDuotone className="w-6 h-6 text-green-600" />
                            }
                            <span className="font-semibold"> {settings?.tier?.toUpperCase()}</span> TIER
                        </div>
                    </div>
                    <div className="sm:col-span-3 text-gray-700 dark:text-gray-200">
                        <label className="block text-sm pb-2 font-medium " htmlFor="system-prompt">
                            MEMBERSHIP EXPIRATION DATE
                        </label>
                        <div className="mt-1">
                            {
                                settings?.tier == 'premium' ? new Date(settings.expireAt).toLocaleDateString() : 'N/A'
                            }
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label className="block text-sm pb-2 font-medium text-gray-700 dark:text-gray-200" htmlFor="system-prompt">
                            System Prompt
                        </label>
                        <div className="mt-1">
                            <textarea
                                onChange={(e) => setSystemPrompt(e.target.value)}
                                value={systemPrompt || ''}
                                className="block w-full rounded-md border-2 outline-none px-3 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                                id="system-prompt"
                                name="system-prompt"
                                placeholder="Enter your system prompt..."
                                rows={4}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                            This prompt will be used to initialize the AI's behavior.
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <label className="block text-sm pb-2 font-medium text-gray-700 dark:text-gray-200 " htmlFor="token">
                            Token Usage
                        </label>
                        <div className="mt-1 rounded-md border-2 outline-none border-dashed border-gray-300 px-6 py-[12px] text-gray-700 dark:text-gray-200">
                            {
                                settings?.tier == 'premium' ? 'You have unlimited plan. Feel free to use everything you need!' :
                                    <div className="flex justify-between">
                                        <p>TOKEN USED: {usage >= limit ? limit : usage}</p>
                                        <p>YOUR LIMIT: {limit} </p>
                                    </div>
                            }
                            
                            {
                                settings?.tier == 'free' &&
                                <div className="my-2 relative flex flex-col space-y-2">
                                    <p> You have reached <span className="font-bold">{Number(percentage.toFixed(2)) >= 100 ? 'maximum unit' : percentage.toFixed(2) + "%"}</span> of your token limit.</p>
                                    {/* make percentage of limit and usage token */}
                                    <div className="h-2 w-full bg-gray-300 rounded-md overflow-hidden">
                                        <div className="h-2 bg-indigo-500 rounded-md" style={{ width: `${percentage.toFixed(2)}%` }}></div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* model */}
                    <div className="sm:col-span-3">
                        <label className="block text-sm font-medium pb-2 text-gray-700 dark:text-gray-200" htmlFor="gpt-model">
                            GPT Model
                        </label>
                        <select
                            id="gpt-model"
                            name="gpt-model"
                            className="w-full border-2 outline-none border-dashed rounded-md py-1"
                            // defaultValue={settings?.model || 'gpt-3.5-turbo'}
                            onChange={(e) => setModel(e.target.value)}
                            value={model || 'gpt-3.5-turbo'}
                        >
                            {['gpt-3.5-turbo', 'gpt-4', 'gpt-4o'].map((model, index) => (
                                <option value={model} key={index} className="">
                                    {model}
                                </option>
                            ))}
                        </select>

                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
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
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 pb-2" htmlFor="max-tokens">
                            Max Tokens
                        </label>
                        <div className="mt-1">
                            <input
                                className="block w-full p-1 border-2 outline-none border-dashed rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm "
                                defaultValue={settings?.token_length || 1000}
                                id="max-tokens"
                                max={1000}
                                min={300}
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
                <div className="flex items-center justify-between w-full gap-4">
                    {
                        auth?.isLoggedin === true &&
                        <button
                            onClick={() => {
                                auth.logout();
                                navigate('/login');
                            }}
                            className="bg-black w-full flex justify-center items-center gap-2 hover:bg-white hover:border-black border-[1px] outline-none hover:text-black transition text-white font-medidarkum py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                            type="submit"
                        >
                            Logout
                            <IoIosLogOut className="w-5 h-5" />
                        </button>
                    }

                    <button
                        onClick={handleUpdateSetting}
                        className="bg-black w-full flex justify-center items-center gap-2 hover:bg-white hover:border-black border-[1px] outline-none hover:text-black transition text-white font-medidarkum py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                        type="submit"
                    >
                        Save Settings
                        <BsSave2Fill className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
