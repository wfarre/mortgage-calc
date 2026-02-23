type Props = {
  label: string;
  id: string;
  value?: string;
  onChange: (value: string) => void;
  max?: number;
  unit?: string;
  error?: boolean;
};

const NumberInput = (props: Props) => {
  return (
    <div className="w-full">
      <label className="flex flex-col text-slate-500 mb-3" htmlFor={props.id}>
        {props.label}
      </label>
      <div
        className={`border ${props.error ? "border-red-500" : "border-slate-500"} flex rounded-sm overflow-hidden`}
      >
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={props.max}
          id={props.id}
          className="w-full text-slate-900 font-bold py-3 px-4"
          value={props.value}
          onChange={(e) => {
            const val = e.target.value;
            if (props.max && +val > props.max) {
              props.onChange(String(props.max));
              return;
            }
            if (!isNaN(+val)) props.onChange(val);
          }}
        />
        {props.unit && (
          <p
            className={`px-4 py-3 ${props.error ? "bg-red-500 text-white" : "bg-slate-100"}`}
          >
            {props.unit}
          </p>
        )}
      </div>
      {props.error && (
        <span className="text-red-500 mt-3 text-sm">
          This field is required
        </span>
      )}
    </div>
  );
};

export default NumberInput;
