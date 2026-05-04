import {useEffect, useState, useRef} from "react";

const DropMenu = ({value, options, onChange}) => {
    const [open, setOpen] = useState(false);
    const dropMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropMenuRef.current && !dropMenuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropMenuRef} className={"dropMenuComp relative w-fit"}>
            <div
                onClick={() => setOpen(!open)}
                className={"bg-backgroundDark text-sm px-3 py-2 cursor-pointer flex gap-2 justify-between items-center"}
            >
                <span>{value}</span>
                <span>▼</span>
            </div>

            {/**/}
            {open && (
                <div className={"absolute bg-backgroundDark border border-white/15 rounded-md shadow-lg z-10"}>
                    {options && options.map((opt) => (
                        <div
                            key={opt}
                             onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={"px-3 py-2 text-sm hover:bg-background cursor-pointer"}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropMenu;