import {useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import DropMenu from "../components/DropMenu.jsx";
import Output from "../components/Output.jsx";
import BodyOption from "../components/BodyOption.jsx";
import AuthOption from "../components/AuthOption.jsx";
import ParamOption from "../components/ParamOption.jsx";
import HeaderOption from "../components/HeaderOption.jsx";

const HomePage = () => {
    const [url, setUrl] = useState("");
    const [method, setMethod] = useState("GET");
    const [response, setResponse] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Params");
    const [bodyContent, setBodyContent] = useState("");
    const [bodyType, setBodyType] = useState("JSON");

    const options = ["Params", "Body", "Auth", "Headers"];

    const optionsTab = [
        <ParamOption/>,
        <BodyOption bodyContent={bodyContent} setBodyContent={setBodyContent} bodyType={bodyType} setBodyType={setBodyType} />,
        <AuthOption/>,
        <HeaderOption/>,
    ]

    const handleUrlSubmit = async (e) => {
        e.preventDefault();
        console.log("Body Content", bodyContent);
        console.log("Body Type", bodyType);
        const res = await window.api.apiRequest(url, method, bodyType, bodyContent);
        console.log(res);
        setResponse(res);
    }

    return (
      <div className={"HomePage h-screen flex flex-col min-h-0"}>
          {/* API CALL */}
          <div className={"flex flex-row"}>
              <DropMenu options={["GET", "POST", "PUT", "DELETE"]} value={method} onChange={setMethod} />
              <form onSubmit={handleUrlSubmit} className={"flex flex-row w-full"}>
                  <Input value={url} setValue={setUrl} placeholder={"https://api.product.com/search"} type={"text"}/>
                  <Button onClick={handleUrlSubmit} title={"Send"}/>
              </form>
          </div>

          <div className="RequestSection flex flex-col flex-1 min-h-0">
              {/* TABS */}
              <div className="APIOptions flex border-b border-white/20">
                  {options.map((option) => (
                      <div
                          key={option}
                          className={`px-4 py-2 cursor-pointer ${
                              selectedOption === option
                                  ? "bg-backgroundDark"
                                  : "bg-background"
                          } hover:bg-backgroundDark`}
                          onClick={() => setSelectedOption(option)}
                      >
                <span className="text-sm text-white/80">
                    {option}
                </span>
                      </div>
                  ))}
              </div>

              {/* TAB CONTENT */}
              <div className="flex-1 min-h-0">
                  {optionsTab[options.indexOf(selectedOption)]}
              </div>
          </div>

          {/* OUTPUT */}
          <Output response={response} />
      </div>
    );
}

export default HomePage;