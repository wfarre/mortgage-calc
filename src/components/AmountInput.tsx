import React from "react";
import { formatter } from "../utils/utils";

type Props = {
  label: string;
  id: string;
  value?: string;
  onChange: (value: string) => void;
  unit?: string;
  error?: boolean;
};

const AmountInput = (props: Props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const formatValue = (val: string) =>
    val === ""
      ? ""
      : formatter.format(Number(val)).replace("£", "").replace(".00", "");

  const [displayValue, setDisplayValue] = React.useState(
    formatValue(props.value || ""),
  );

  return (
    <div>
      <label className="flex flex-col text-slate-500 mb-3" htmlFor={props.id}>
        {props.label}
      </label>
      <div
        className={`border ${isFocused ? "border-lime-custom" : props.error ? "border-red-500" : "border-slate-500"} flex rounded-sm overflow-hidden`}
      >
        {props.unit && (
          <p
            className={`px-4 h-12 flex items-center justify-center font-bold ${isFocused ? "bg-lime-custom" : props.error ? "bg-red-500 text-white" : "bg-slate-100 text-slate-900"}`}
          >
            {props.unit}
          </p>
        )}
        <input
          type="text"
          inputMode="decimal"
          id={props.id}
          className="w-full text-slate-900 font-bold h-12 px-4 outline-none"
          value={displayValue}
          onChange={(e) => {
            const val = e.target.value;
            if (isNaN(+val) && val !== ".") return;
            setDisplayValue(val);
            if (!isNaN(+val)) props.onChange(val);
          }}
          onFocus={() => {
            setIsFocused(true);
            setDisplayValue("");
          }}
          onBlur={() => {
            setIsFocused(false);
            setDisplayValue(formatValue(props.value || ""));
          }}
        />
      </div>
      {props.error && (
        <span className="text-red-500 mt-3 text-sm">
          This field is required
        </span>
      )}
    </div>
  );
};

export default AmountInput;
