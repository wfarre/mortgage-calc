import React from "react";

type Props = {
  label: string;
  id: string;
  value?: number;
  onChange: (value: number) => void;
  unitLeft?: string;
  unitRight?: string;
};

const NumberInput = (props: Props) => {
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
          pattern="[0-9]*"
          id={props.id}
          className=" w-full text-slate-900 font-bold py-3 px-4"
          value={props.value ?? 0}
          onChange={(e) => {
            props.onChange(Number(e.target.value));
          }}
        />
        {props.unitRight && (
          <p className="px-4 py-3 bg-slate-100">{props.unitRight}</p>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
