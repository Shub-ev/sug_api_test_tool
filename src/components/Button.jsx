const Button = ({title, onClick}) => {
    return (
        <button onClick={onClick} className={"Button bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-all"}>{title}</button>
    )
};

export default Button;