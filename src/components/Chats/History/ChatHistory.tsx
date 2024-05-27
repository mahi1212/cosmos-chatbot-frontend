
const ChatHistory: React.FC = () => {

    const history = [
        {
            title: "Suggest me some name of headphone",
            sub_title: "Asus, TUF, Corsair"
        },
        {
            title: "What are the best programming languages to learn in 2024?",
            sub_title: "Python, JavaScript, Go, Rust"
        },
        {
            title: "Recommend some good books on personal finance",
            sub_title: "Rich Dad Poor Dad, The Intelligent Investor, Your Money or Your Life"
        },
        // {
        //     title: "What's the best way to stay fit?",
        //     sub_title: "Regular exercise, Balanced diet, Adequate sleep"
        // },
        // {
        //     title: "Suggest popular travel destinations for 2024",
        //     sub_title: "Japan, Italy, New Zealand, Canada"
        // },
        // {
        //     title: "Recommend some good books on personal finance",
        //     sub_title: "Rich Dad Poor Dad, The Intelligent Investor, Your Money or Your Life"
        // },
        // {
        //     title: "What's the best way to stay fit?",
        //     sub_title: "Regular exercise, Balanced diet, Adequate sleep"
        // },
        // {
        //     title: "Suggest popular travel destinations for 2024",
        //     sub_title: "Japan, Italy, New Zealand, Canada"
        // },
        {
            title: "What are some effective time management techniques?",
            sub_title: "Pomodoro Technique, Eisenhower Matrix, Time Blocking"
        },
        {
            title: "Recommend some high-quality laptops for gaming",
            sub_title: "Alienware, Razer Blade, ASUS ROG, MSI"
        },
        {
            title: "What are the benefits of meditation?",
            sub_title: "Reduced stress, Improved concentration, Enhanced self-awareness"
        },
        {
            title: "Best practices for remote working?",
            sub_title: "Set a schedule, Create a dedicated workspace, Take regular breaks"
        },
        {
            title: "What are the top cryptocurrencies to invest in?",
            sub_title: "Bitcoin, Ethereum, Cardano, Solana"
        }
    ];


    return (
        <div className="py-2">
            {
                history.map((item, index) => {
                    return <div
                        key={index}
                        className="bg-slate-100 mb-2 p-2 rounded-sm text-sm cursor-pointer"
                    >
                        {item.title}
                    </div>
                })
            }
        </div>
    )
}

export default ChatHistory