import { BiSend } from 'react-icons/bi'

const Systemprompt = () => {
    return (
        <div className="py-4 w-full absolute bottom-2 left-0 p-4 bg-slate-200">
            {/* <p className="py-3">
      Any additional instruction?
    </p> */}
            <div className="flex items-center w-full gap-2">
                <input
                    className="flex-1 rounded-sm p-2 focus:outline-none bg-slate-100"
                    placeholder="additional instruction.."
                    type="text"
                />
                <button className="bg-black p-2 rounded-md">
                    <BiSend className="h-5 w-5 text-white" />
                    <span className="sr-only">Send</span>
                </button>
            </div>
        </div>
    )
}

export default Systemprompt