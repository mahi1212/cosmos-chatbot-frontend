import { useRef, useState } from "react";

const Rewrite: React.FC = () => {
    const [text, setText] = useState("");
    const [isLoading, setLoading] = useState(false);
    const eventSource = useRef<EventSource | null>(null);

    function handleFetchRewrite() {
        if (!text) {
            alert("Please enter a text to rewrite");
            return;
        }

        setLoading(true);

        // when event source closes stream, i close
        if (eventSource.current) {
            eventSource.current.close();
        }

        //init event source
        eventSource.current = new EventSource(`http://localhost:5000/rewrite?post=${encodeURIComponent(text)}`);

        eventSource.current.onmessage = function (event) {
            const part = JSON.parse(event.data);
            setText(prevText => prevText + part);
        }

        eventSource.current.onerror = function () {
            if (eventSource.current) {
                eventSource.current.close();
            }
            setLoading(false);
        };
        eventSource.current.onopen = () => {
            setText('');
        }

    };


    return (
        <div>
            <textarea
                className="bg-green-300"
                value={text}
                onChange={(e) => setText(e.target.value)}
                cols={50}
                rows={10}
            />
            <button onClick={handleFetchRewrite} disabled={isLoading} className="bg-red-300">
                {isLoading ? 'Rewriting...' : 'Rewrite this with OpenAI'}
            </button>
        </div>
    )
}

export default Rewrite