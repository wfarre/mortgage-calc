type Props = {
  label: string;
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
};

const RadioButton = (props: Props) => {
  return (
    <div className={`flex items-center w-full ${props.className || ""}`}>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        className="hidden"
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label
        htmlFor={props.id}
        className={`flex w-full items-center cursor-pointer text-slate-900 px-4 h-12 border rounded-lg hover:bg-gray-100 font-bold text-lg ${
          props.checked
            ? "border-lime-custom bg-lime-custom/15"
            : "border-slate-500"
        }`}
      >
        <span
          className={`w-[19.5px] h-[19.5px] border-2 rounded-full mr-2 flex items-center justify-center ${
            props.checked ? "border-lime-custom" : "border-slate-500"
          }`}
        >
          <span
            className={`w-3 h-3 rounded-full bg-lime-custom ${
              props.checked ? "block" : "hidden"
            }`}
          ></span>
        </span>
        {props.label}
      </label>
    </div>
  );
};

export default RadioButton;
