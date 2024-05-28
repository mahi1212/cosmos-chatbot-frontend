import { PiNewspaper } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiCustomerService2Line, RiRobot3Line } from "react-icons/ri";
import Typewriter from 'typewriter-effect';
import { useAuth } from "src/context/AuthContent";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const user = useAuth();
    console.log(user)
    return (
        <div className="bg-slate-100 rounded-md sm:p-4 p-2 ">
            <p className="flex items-center gap-2">
                <RiCustomerService2Line />
                Please Choose a service below
            </p>
            <div className="flex justify-between items-center cursor-pointer gap-4 mt-6 flex-col md:flex-row " >
                {/* rewriter assitant */}
                <div
                    className="border-2 p-4 flex flex-col gap-3 rounded-md border-slate-300 w-full hover:bg-slate-200 transition"
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
                </div>

                {/* personal assitant */}
                <div
                    className="border-2 p-4 flex flex-col gap-3 rounded-md border-slate-300 w-full hover:bg-slate-200 transition"
                    onClick={() => {
                        navigate('chats')
                    }}
                >
                    <p className="flex gap-2 items-center">
                        <RiRobot3Line />
                        Personal assistant
                    </p>

                    <Typewriter
                        options={{
                            strings: ['Chat with your personal assistant', 'Take preparation for IELTS exam', 'Boost your IELTS scores with expert tips', 'Your AI tutor for IELTS success',],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 10,

                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home