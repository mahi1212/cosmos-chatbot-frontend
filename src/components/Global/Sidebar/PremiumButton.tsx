import { MdWorkspacePremium } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const PremiumButton = () => {
    const navigate = useNavigate();
    
    return (
        <div className="py-2 w-full absolute bottom-1 left-0 p-4">
            <p 
            className="text-center text-white dark:text-gray-300 bg-black py-2 rounded-md uppercase flex justify-center items-center gap-2 cursor-pointer"
                onClick={() => {
                    navigate('pricing')
                }}
            >
                Upgrade to premium
                <MdWorkspacePremium />
            </p>
        </div>
    )
}

export default PremiumButton