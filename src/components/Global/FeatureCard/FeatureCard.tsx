import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

interface FeatureCardProps {
    title: string;
    icon: React.ReactNode;
    path: string;
    typewriterOptions: {
        strings: string[];
        autoStart: boolean;
        loop: boolean;
        deleteSpeed: number;
    };
    image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, path, typewriterOptions, image }) => {
    const navigate = useNavigate();

    return (
        <div
            className="border-2 p-4 flex flex-col gap-3 rounded-md border-slate-300 dark:border-gray-600 hover:bg-slate-200 dark:hover:bg-gray-800 w-full transition cursor-pointer"
            onClick={() => navigate(path)}
        >
            <p className="flex gap-2 items-center">
                {icon}
                {title}
            </p>
            <Typewriter
                options={typewriterOptions}
            />
            <img
                src={image}
                alt="image"
                className=' rounded-md h-[300px] object-fill'
            />
        </div>
    );
};

export default FeatureCard;
