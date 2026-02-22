import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NumberInput from "./components/NumberInput";
import RadioButton from "./components/RadioButton";

function App() {
  const [mortgageType, setMortgageType] = useState<string>("");
  const [mortgageAmount, setMortgageAmount] = useState<string>("");
  const [mortgageTerm, setMortgageTerm] = useState<string | null>("");
  const [interestRate, setInterestRate] = useState<string | null>("");

  const [isResult, setIsResult] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-10 ">
      <div className=" flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden">
        <div className="p-6 sm:p-10 flex-1">
          <div className="flex justify-between items-center mb-10 flex-wrap">
            <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
            <button>Clear All</button>
          </div>

          <form className="space-y-6">
            <fieldset>
              <NumberInput
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
                value={mortgageTerm}
                onChange={(value) => setMortgageTerm(value)}
              />
              <NumberInput
                label="Interest Rate"
                id="rate"
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

            <button className="w-full sm:max-w-78.5 font-bold text-lg text-slate-900 py-4 bg-lime-custom rounded-4xl">
              Calculate Repayments
            </button>
          </form>
        </div>

        <div className="flex-1 bg-slate-900 text-white p-6 sm:p-10 min-h-full gap-4 md:rounded-bl-[80px]">
          {isResult ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your results</h2>
              <p className="text-slate-300">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>
              <div className="p-8 bg-black/25 border-t-4 border-t-lime-custom rounded-lg mt-10">
                <p className="text-slate-300">Your monthly repayments</p>
                <p className="text-[56px] text-lime-custom font-bold">
                  £1,797.74
                </p>

                <div className="h-px w-full bg-slate-300 my-10"></div>
                <p className="text-slate-300 mb-2">
                  Total you'll repay over the term
                </p>
                <p className="text-2xl font-bold">£539,322.94</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center text-center">
              <img src="/assets/images/illustration-empty.svg" alt="" />
              <h2 className="text-2xl font-bold">Results shown here</h2>
              <p className="text-slate-300">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Empty results end --> */}

      {/* <!-- Completed results start --> */}

      {/* Your results

  Your results are shown below based on the information you provided. 
  To adjust the results, edit the form and click “calculate repayments” again.

  Your monthly repayments

  Total you'll repay over the termß */}
    </div>
  );
}

export default App;
