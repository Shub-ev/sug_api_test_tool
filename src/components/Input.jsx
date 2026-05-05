const Input = ({value, setValue, placeholder, type, className=""}) => {
    return (
        <>
            <input
                className={`inputComp bg-backgroundDark px-3 py-2 focus:outline-none ${className}`}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
            ></input>
        </>
    );
}

export default Input;