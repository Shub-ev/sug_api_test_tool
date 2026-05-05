import { useRef, useState } from "react";
import StatusTextBox from "./StatusTextBox.jsx";

const Output = ({ response }) => {
    const [componentHeight, setComponentHeight] = useState(200);
    const startYRef = useRef(0);
    const startWithRef = useRef(0);

    const usMouseDownHandler = (e) => {
        document.body.style.userSelect = "none";

        startYRef.current = e.clientY;
        startWithRef.current = componentHeight;

        const mouseMoveHandler = (e) => {
            const deltaY = startYRef.current - e.clientY;
            const newHeight = startWithRef.current + deltaY;

            if(newHeight > 200) setComponentHeight(newHeight);
        }

        const mouseUpHandler = () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
        }

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    if (!response) {
        return (
            <div className="Output mt-auto border-[1px] border-white/15" style={{height: `${componentHeight}px`}}>
                <div
                    className="h-1 w-full cursor-row-resize bg-backgroundDark"
                    onMouseDown={usMouseDownHandler}
                />
                <div className="Header bg-backgroundDark px-2 py-1">
                    <span>Output</span>
                </div>
                <div className="p-4 text-sm text-gray-400">
                    No response yet
                </div>
            </div>
        );
    }

    const isHtml =
        response.type?.includes("text/html") ||
        (typeof response.data === "string" &&
            response.data.includes("<html"));

    return (
        <div
            className="Output mt-auto border-[1px] border-white/15 flex flex-col"
            style={{ height: `${componentHeight}px` }}
        >
            {/* RESIZE HANDLE */}
            <div
                className="h-1 w-full cursor-row-resize bg-backgroundDark"
                onMouseDown={usMouseDownHandler}
            />

            {/* HEADER */}
            <div className="Header bg-backgroundDark px-2 py-1 flex flex-row justify-between items-center">
                <span>Output</span>
                <StatusTextBox statusCode={response.status}/>
            </div>

            {/* CONTENT */}
            <div className="flex-1 text-textPrimary text-sm px-4 py-4 overflow-auto">

                {response.error ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
                        <div className="text-red-400 font-medium mb-2">
                            {response.data?.error || "Request Failed"} ({response.status})
                        </div>

                        <pre className="text-red-300 text-sm whitespace-pre-wrap break-all">
                            {JSON.stringify(response.data, null, 2)}
                        </pre>
                    </div>
                ) : isHtml ? (
                    <iframe
                        srcDoc={response.data}
                        className="w-full h-full border bg-white"
                    />
                ) : (
                    <pre className="w-full overflow-auto whitespace-pre-wrap break-all">
                        {JSON.stringify(response.data ?? {}, null, 2)}
                    </pre>
                )}

            </div>
        </div>
    );
};

export default Output;