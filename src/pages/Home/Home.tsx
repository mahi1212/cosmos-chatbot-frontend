import { RiCustomerService2Line, RiRobot3Line } from "react-icons/ri";
import { Helmet } from "react-helmet";
import { PiNewspaper } from "react-icons/pi";
import FeatureCard from "src/components/Global/FeatureCard/FeatureCard";
import ChatbotImage from "src/assets/images/chatbot_ui_one.jpg";
import TranslatorImage from "src/assets/images/translator_ui_two.jpg";

const Home: React.FC = () => {
    return (
        <div className="bg-slate-100 dark:bg-neutral-800 rounded-md sm:p-4 p-2 text-gray-900 dark:text-gray-100">
            {/* for title of page using react Helmet*/}
            <Helmet>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Home - Cosmos AI </title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            
            <p className="flex items-center gap-2">
                <RiCustomerService2Line />
                Please Choose a service below
            </p>
            <div className="flex justify-between items-center cursor-pointer gap-4 mt-6 flex-col md:flex-row " >
                {/* rewriter assitant */}
                {/* <div
                    className="border-2 p-4 flex flex-col gap-3 rounded-md border-slate-300 dark:border-gray-600 hover:bg-slate-200 dark:hover:bg-gray-800 w-full transition"
                    onClick={() => {
                        navigate('rewrite')
                    }}
                >
                    <p className="flex gap-2 items-center">
                        <PiNewspaper /> 
                        Rewrite anything
                    </p>
                    <Typewriter
                        options={{
                            strings: ['Rewrite any social media post', 'Our AI is highly trained with relevent data', 'Enhance your message with smart rewriting', 'Say goodbye to writer’s block'],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 10,

                        }}
                    />
                </div> */}

                <FeatureCard
                    title="Personal Assistant"
                    icon={<RiRobot3Line />}
                    path="chats"
                    typewriterOptions={{
                        strings: [
                            'Chat with your personal assistant',
                            'Take preparation for IELTS exam',
                            'Boost your IELTS scores with expert tips',
                            'Your AI tutor for IELTS success'
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 10,
                    }}
                    image={ChatbotImage}
                />
                <FeatureCard
                    title="AI Translator"
                    icon={<PiNewspaper />}
                    path="translator"
                    typewriterOptions={{
                        strings: [
                            'Translate with trained language model',
                            'No more Google searching',
                            'Simple and fast translation',
                            'Say goodbye to language barrier'
                        ],
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 10,
                    }}
                    image={TranslatorImage}
                />
            </div>
        </div>
    )
}

export default Home