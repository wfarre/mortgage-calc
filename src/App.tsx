import { useState } from "react";
import ResultView from "./views/ResultView";
import FormView from "./views/FormView";

function App() {
  const [resetKey, setResetKey] = useState(0);
  const [monthlyRepayment, setMonthlyRepayment] = useState<string>("");
  const [totalRepayment, setTotalRepayment] = useState<string>("");
  const [isResult, setIsResult] = useState(false);

  const reset = () => {
    setIsResult(false);
  };

  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-10 font-sans">
      <div className=" flex flex-col md:flex-row bg-white sm:rounded-3xl overflow-hidden max-w-252 drop-shadow-2xl">
        <section className="p-6 sm:p-10 flex-1">
          <header className="flex justify-between items-center mb-10 flex-wrap h-7.5">
            <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
            <button
              onClick={handleReset}
              className=" underline text-slate-700 cursor-pointer"
            >
              Clear All
            </button>
          </header>
          <FormView
            key={resetKey}
            getResults={(monthly, total, result) => {
              setMonthlyRepayment(monthly || "");
              setTotalRepayment(total || "");
              setIsResult(result);
            }}
            reset={reset}
          />
        </section>

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
