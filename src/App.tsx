import { useState } from "react";
import NumberInput from "./components/NumberInput";
import RadioButton from "./components/RadioButton";
import AmountInput from "./components/AmountInput";
import ResultView from "./views/ResultView";
// import CalculatiorIcon from "/assets/icons/calculator.svg";

type MortgageType = "repayment" | "interest-only";

function App() {
  const [mortgageType, setMortgageType] = useState<MortgageType>("repayment");
  const [mortgageAmount, setMortgageAmount] = useState<string>("");
  const [mortgageTerm, setMortgageTerm] = useState<string | undefined>("");
  const [interestRate, setInterestRate] = useState<string | undefined>("");

  const [monthlyRepayment, setMonthlyRepayment] = useState<string>("");
  const [totalRepayment, setTotalRepayment] = useState<string>("");

  const reset = () => {
    setMortgageType("repayment");
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMonthlyRepayment("");
    setTotalRepayment("");
    setIsResult(false);
  };

  const calculateRepayments = () => {
    const totalInterest =
      Number(mortgageAmount) *
      (Number(interestRate) / 100) *
      Number(mortgageTerm);

    const totalRepayment =
      mortgageType === "repayment"
        ? Number(mortgageAmount) + totalInterest
        : totalInterest;
    const monthlyRepayment = totalRepayment / (Number(mortgageTerm) * 12);

    setMonthlyRepayment(monthlyRepayment.toFixed(2));
    setTotalRepayment(totalRepayment.toFixed(2));
    setIsResult(true);
  };

  const [isResult, setIsResult] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-10 ">
      <div className=" flex flex-col md:flex-row bg-white sm:rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-10 flex-1">
          <div className="flex justify-between items-center mb-10 flex-wrap">
            <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
            <button
              onClick={reset}
              className=" underline text-slate-700 cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <form className="space-y-6">
            <fieldset>
              <AmountInput
                label="Mortgage Amount"
                id="amount"
                unitLeft="£"
                value={mortgageAmount}
                onChange={(value) => setMortgageAmount(value)}
              />
            </fieldset>

            <fieldset className="flex gap-5 flex-col sm:flex-row">
              <NumberInput
                label="Mortgage Term"
                id="term"
                unitRight="years"
                max={100}
                value={mortgageTerm}
                onChange={(value) => setMortgageTerm(value)}
              />
              <NumberInput
                label="Interest Rate"
                id="rate"
                max={100}
                unitRight="%"
                value={interestRate}
                onChange={(value) => setInterestRate(value)}
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
                  setMortgageType("interest-only");
                }}
              />
            </fieldset>

            <button
              type="button"
              onClick={calculateRepayments}
              className="w-full flex items-center justify-center gap-3 sm:max-w-78.5 font-bold text-lg text-slate-900 py-4 bg-lime-custom rounded-4xl"
            >
              <img
                src="/assets/images/icon-calculator.svg"
                alt="Calculator icon"
              />
              Calculate Repayments
            </button>
          </form>
        </div>

        <ResultView
          isResult={isResult}
          monthlyRepayment={monthlyRepayment}
          totalRepayment={totalRepayment}
        />
      </div>
    </div>
  );
}

export default App;
