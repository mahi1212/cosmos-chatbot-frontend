import { useAtomValue } from "jotai";
import { useState } from "react"
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { BsRobot } from "react-icons/bs";
import { HiLanguage } from "react-icons/hi2";
import { PiRocketLaunch } from "react-icons/pi";
import LanguageSelector from "src/components/Translator/Language/LanguageSelector";
import { selectedLanguageAtom } from "src/store/jotai";

const Translator = () => {
    const [text, setText] = useState<string>('');
    const [translatedText, setTranslatedText] = useState<string>('');
    // const [language, setLanguage] = useState<string>('');
    const selectedLanguage = useAtomValue(selectedLanguageAtom)
    console.log(selectedLanguage)

    const handleTranslate = () => {
        if (text.trim().length === 0) {
            toast.error('Please enter text to translate!');
            return;
        }
        toast.success('Translation successful!');
        // toast.promise(
        //     fetch('https://api.funtranslations.com/translate/yoda.json', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             text: text,
        //         }),
        //     })
        //         .then((res) => res.json())
        //         .then((data) => {
        //             setTranslatedText(data.contents.translated);
        //         }),
        //     {
        //         loading: 'Translating...',
        //         success: 'Translation successful!',
        //         error: 'Failed to translate!',
        //     }
        // );
    }

    const handleCopyButton = () => {
        if (translatedText.trim().length === 0) {
            toast.error('Nothing to copy!');
            return;
        }
        navigator.clipboard.writeText(translatedText);
        toast.success('Text copied to clipboard!');
    }

    const handlePasteButton = () => {
        //    check if permission is granted
        if (!navigator.clipboard) {
            toast.error('Clipboard access denied!');
            return;
        }

        navigator.clipboard.readText().then(
            clipText => {
                if (clipText.trim().length === 0) {
                    toast.error('Please copy some text to paste!');
                    return;
                }
                setText(clipText);
                toast.success('Text pasted!');
            }
        ).catch(
            err => {
                toast.error('Failed to paste text!');
                console.log('navigator error ', err);
            });

    }

    // console.log(text);
    return (
        <div className="h-full bg-slate-100 dark:bg-neutral-700 sm:p-4 p-2 relative rounded-md overflow-hidden">
            {/* Helmet for SEO */}
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Premium AI Translator - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className="pb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 dark:text-gray-200 text-black">
                <p className="uppercase text-center md:text-start my-3 md:my-0">
                    AI Translator / Rewriter / Detector
                </p>
                <div className="uppercase flex items-start justify-between w-full gap-4">
                    <LanguageSelector />
                    <p className=" text-nowrap">Target language  </p>

                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-full pb-10">
                <div className="w-full relative">
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Enter any language text to translate here.."
                        className="bg-slate-200 rounded outline-none p-2 w-full h-full resize-none"
                    />

                    <div className="absolute bottom-2 right-2 text-white flex gap-2">
                        <button
                            className=" bg-slate-500 rounded-md p-2"
                            onClick={handlePasteButton}
                        >
                            Paste
                            📋
                        </button>

                        {/* translate button */}
                        <button
                            className=" bg-slate-500 rounded-md p-2"
                            onClick={handleTranslate}
                        >
                            Translate
                            ✨
                        </button>
                        <button
                            className=" bg-slate-500 rounded-md p-2"
                            onClick={handleTranslate}
                        >
                            Detect AI
                            ✨
                        </button>
                    </div>


                </div>

                <div className="w-full relative">
                    <textarea
                        onChange={(e) => {
                            setTranslatedText(e.target.value)
                        }}
                        value={translatedText}
                        // placeholder={language !== "" ? "Select a language to translate your text.." : ""}
                        className="bg-slate-200 rounded outline-none p-2 w-full h-full resize-none placeholder-orange-400"
                    />
                    {/* if translated text not available - show warning */}
                    {
                        translatedText.length === 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-center w-full">
                                <BsRobot className="text-5xl text-slate-500" />
                                <p className="text-slate-500 w-full">Anytime at your service commander..</p>
                            </div>
                        )
                    }
                    {/* if translated text available - copy and rewrite button */}
                    {
                        translatedText.length !== 0 &&
                        <div className="absolute bottom-2 right-2 text-white flex gap-2">
                            {/* copy button */}
                            <button
                                className=" bg-slate-500 rounded-md p-2"
                                onClick={handleCopyButton}
                            >
                                Copy
                                📋
                            </button>

                            <button
                                className=" bg-slate-500 rounded-md p-2 text-nowrap flex items-center gap-2"
                            >
                                Rewrite
                                <PiRocketLaunch className="text-yellow-400 text-xl animate-bounce" />
                            </button>
                        </div>
                    }

                </div>
            </div>
        </div >
    )
}

export default Translator