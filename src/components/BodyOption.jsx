import DropMenu from "./DropMenu.jsx";
import {Editor} from "@monaco-editor/react";

const BodyOption = ({bodyContent, setBodyContent, bodyType="No body", setBodyType}) => {

    const bodyOptions = [
        "No body", "JSON", "XML", "Plain text"
    ]

    const getLanguage = () => {
        switch (bodyType) {
            case "JSON": return "json";
            case "XML": return "xml";
            case "Plain text": return "plaintext";
            default: return "plaintext";
        }
    }

    return (
        <div className={"BodyOption h-full flex flex-col min-h-0"}>
            {/* TYPE SELECT */}
            <div className={"flex border-b-[1px] border-white/15 bg-backgroundDark"}>
                <DropMenu options={bodyOptions} value={bodyType} onChange={setBodyType}/>
            </div>
            {bodyType !== "No body" && (
                <div className={"flex-1 min-h-0 overflow-hidden"}>
                    <Editor
                        height={"100%"}
                        language={getLanguage()}
                        value={bodyContent}
                        onChange={(value) => setBodyContent(value)}
                        theme={"vs-dark"}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default BodyOption;