import React from "react";
type Props = {
  isResult: boolean;
  monthlyRepayment: string;
  totalRepayment: string;
};

const ResultView = (props: Props) => {
  return (
    <section className="flex-1 bg-slate-900 text-white p-6 sm:p-10 min-h-full gap-4 md:rounded-bl-[80px]">
      {props.isResult ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Your results</h2>
          <p className="text-slate-300">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>
          <div className="p-4 sm:p-8 bg-black/25 border-t-4 border-t-lime-custom rounded-lg mt-10">
            <figure>
              <figcaption className="text-slate-300">
                Your monthly repayments
              </figcaption>
              <p className="text-[40px] sm:text-[56px] text-lime-custom font-bold">
                £{props.monthlyRepayment}
              </p>
            </figure>

            <div className="h-px w-full bg-slate-300 my-4 sm:my-8 md:my-10" />
            {/* Divider */}

            <figure>
              <p className="text-slate-300 mb-2">
                Total you'll repay over the term
              </p>
              <p className="text-2xl font-bold">£{props.totalRepayment}</p>
            </figure>
          </div>
        </>
      ) : (
        <figure className="flex flex-col items-center justify-center text-center min-h-full gap-4">
          <img
            height={192}
            width={192}
            src="/assets/images/illustration-empty.svg"
            alt=""
          />
          <h2 className="text-2xl font-bold">Results shown here</h2>
          <figcaption className="text-slate-300">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </figcaption>
        </figure>
      )}
    </section>
  );
};

export default ResultView;
