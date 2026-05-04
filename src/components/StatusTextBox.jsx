const StatusTextBox = ({ statusCode }) => {
    const code = Number(statusCode);

    const getStatusInfo = (code) => {
        if (code >= 200 && code < 300) {
            return { text: "OK", color: "bg-green-500" };
        }

        if (code >= 300 && code < 400) {
            return { text: "REDIRECT", color: "bg-blue-500" };
        }

        if (code === 400) {
            return { text: "BAD REQUEST", color: "bg-yellow-500" };
        }

        if (code === 401) {
            return { text: "UNAUTHORIZED", color: "bg-yellow-600" };
        }

        if (code === 403) {
            return { text: "FORBIDDEN", color: "bg-orange-500" };
        }

        if (code === 404) {
            return { text: "NOT FOUND", color: "bg-orange-500" };
        }

        if (code >= 400 && code < 500) {
            return { text: "CLIENT ERROR", color: "bg-yellow-500" };
        }

        if (code >= 500) {
            return { text: "SERVER ERROR", color: "bg-red-500" };
        }

        return { text: "Error", color: "bg-red-500" };
    };

    const status = getStatusInfo(code);

    return (
        <div className="flex items-center gap-2">
            <span className={`font-semibold text-white text-xs h-full px-4 py-1 rounded ${status.color}`}>
                {status.text}
            </span>
        </div>
    );
};

export default StatusTextBox;