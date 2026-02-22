import React from "react";
import { formatter } from "../utils/utils";

type Props = {
  label: string;
  id: string;
  value?: string;
  onChange: (value: string) => void;
  max?: number;
  unitLeft?: string;
  unitRight?: string;
};

const AmountInput = (props: Props) => {
  const [displayValue, setDisplayValue] = React.useState(props.value || "");

  const formatValue = (val: string) =>
    formatter
      .format(Number(val || 0))
      .replace("£", "")
      .replace(".00", "");

  return (
    <div>
      <label className="flex flex-col text-slate-500 mb-3" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="border border-slate-500 flex rounded-sm overflow-hidden">
        {props.unitLeft && (
          <p className="px-4 py-3 bg-slate-100">{props.unitLeft}</p>
        )}
        <input
          type="text"
          inputMode="decimal"
          min={0}
          max={props.max ?? undefined}
          id={props.id}
          className="w-full text-slate-900 font-bold py-3 px-4"
          value={displayValue}
          onChange={(e) => {
            const val = e.target.value;
            if (isNaN(+val) && val !== ".") return;
            setDisplayValue(val);
            if (!isNaN(+val)) props.onChange(val);
          }}
          onFocus={() => setDisplayValue("")}
          onBlur={() => setDisplayValue(formatValue(props.value || ""))}
        />
        {props.unitRight && (
          <p className="px-4 py-3 bg-slate-100">{props.unitRight}</p>
        )}
      </div>
    </div>
  );
};

export default AmountInput;
