type Props = {
  title: string;
  onClick?: () => void;
};

function Button({title, onClick}: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-amber-600 py-2 px-4 rounded-xl w-full">
      {title}
    </button>
  );
}

export default Button;
