const Input = ({value, setValue, placeholder, type}) => {
    return (
        <>
            <input
                className={"inputComp w-full bg-backgroundDark px-3 py-2 focus:outline-none"}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
            ></input>
        </>
    );
}

export default Input;