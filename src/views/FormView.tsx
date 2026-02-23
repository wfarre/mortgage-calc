import { useState } from "react";
import AmountInput from "../components/AmountInput";
import NumberInput from "../components/NumberInput";
import RadioButton from "../components/RadioButton";

type MortgageType = "repayment" | "interest-only" | "";

type Props = {
  getResults: (
    monthly: string | undefined,
    total: string | undefined,
    result: boolean,
  ) => void;
  reset: () => void;
};

const FormView = (props: Props) => {
  const [mortgageType, setMortgageType] = useState<MortgageType>("");
  const [mortgageAmount, setMortgageAmount] = useState<string>("");
  const [mortgageTerm, setMortgageTerm] = useState<string | undefined>("");
  const [interestRate, setInterestRate] = useState<string | undefined>("");

  const [error, setError] = useState({
    mortgageAmount: false,
    mortgageTerm: false,
    interestRate: false,
    mortgageType: false,
  });

  const checkIfEmptyInput = () => {
    const newError = {
      mortgageAmount: mortgageAmount === "",
      mortgageTerm: mortgageTerm === "",
      interestRate: interestRate === "",
      mortgageType: mortgageType === "",
    };
    setError(newError);
    return newError;
  };

  const calculateRepayments = () => {
    const newError = checkIfEmptyInput();

    if (Object.values(newError).some((err) => err)) {
      props.getResults(undefined, undefined, false);
      return;
    }

    const totalInterest =
      Number(mortgageAmount) *
      (Number(interestRate) / 100) *
      Number(mortgageTerm);

    const totalRepayment =
      mortgageType === "repayment"
        ? Number(mortgageAmount) + totalInterest
        : totalInterest;
    const monthlyRepayment = totalRepayment / (Number(mortgageTerm) * 12);

    return props.getResults(
      monthlyRepayment.toFixed(2),
      totalRepayment.toFixed(2),
      true,
    );
  };
  return (
    <form className="space-y-6">
      <fieldset>
        <AmountInput
          label="Mortgage Amount"
          id="amount"
          unit="£"
          value={mortgageAmount}
          onChange={(value) => {
            setError((prev) => ({ ...prev, mortgageAmount: false }));
            setMortgageAmount(value);
          }}
          error={error.mortgageAmount}
        />
      </fieldset>

      <fieldset className="flex gap-5 flex-col sm:flex-row">
        <NumberInput
          label="Mortgage Term"
          id="term"
          unit="years"
          max={100}
          value={mortgageTerm}
          onChange={(value) => {
            setError((prev) => ({ ...prev, mortgageTerm: false }));
            setMortgageTerm(value);
          }}
          error={error.mortgageTerm}
        />
        <NumberInput
          label="Interest Rate"
          id="rate"
          max={100}
          unit="%"
          value={interestRate}
          onChange={(value) => {
            setError((prev) => ({ ...prev, interestRate: false }));
            setInterestRate(value);
          }}
          error={error.interestRate}
        />
      </fieldset>

      <fieldset>
        <legend className="pb-3 text-slate-500">Mortgage Type</legend>
        <RadioButton
          className="mb-2"
          label="Repayment"
          id="repayment"
          name="type"
          value="repayment"
          checked={mortgageType === "repayment"}
          onChange={() => {
            setError((prev) => ({ ...prev, mortgageType: false }));
            setMortgageType("repayment");
          }}
        />
        <RadioButton
          label="Interest Only"
          id="interest-only"
          name="type"
          value="interest-only"
          checked={mortgageType === "interest-only"}
          onChange={() => {
            setError((prev) => ({ ...prev, mortgageType: false }));
            setMortgageType("interest-only");
          }}
        />
        {error.mortgageType && (
          <span className="text-red-500 mt-3 text-sm">
            This field is required
          </span>
        )}
      </fieldset>

      <button
        type="button"
        onClick={calculateRepayments}
        className="w-full flex items-center justify-center gap-3 sm:max-w-78.5 font-bold text-lg text-slate-900 py-4 bg-lime-custom rounded-4xl"
      >
        <img src="/assets/images/icon-calculator.svg" alt="Calculator icon" />
        Calculate Repayments
      </button>
    </form>
  );
};

export default FormView;
