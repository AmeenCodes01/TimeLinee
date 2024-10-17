type Props = {
  title: string;
  onClick?: () => void;
};

function Button({title, onClick}: Props) {
  return (
    <button onClick={onClick} className="bg-amber-600 p-8 rounded-xl">
      {title}
    </button>
  );
}

export default Button;
