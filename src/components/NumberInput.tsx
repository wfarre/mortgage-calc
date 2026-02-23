import React from "react";

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
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="w-full">
      <label className="flex flex-col text-slate-700 mb-3" htmlFor={props.id}>
        {props.label}
      </label>
      <div
        className={`border ${isFocused ? "border-lime-custom" : props.error ? "border-red-500" : "border-slate-500"} flex rounded-sm overflow-hidden`}
      >
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={props.max}
          id={props.id}
          className="w-full text-slate-900 font-bold h-12 px-4 outline-none"
          value={props.value}
          onChange={(e) => {
            const val = e.target.value;
            if (props.max && +val > props.max) {
              props.onChange(String(props.max));
              return;
            }
            if (!isNaN(+val)) props.onChange(val);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {props.unit && (
          <p
            className={`px-4 h-12 flex items-center justify-center font-bold ${isFocused ? "bg-lime-custom" : props.error ? "bg-red-500 text-white" : "bg-slate-100 text-slate-900"}`}
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
