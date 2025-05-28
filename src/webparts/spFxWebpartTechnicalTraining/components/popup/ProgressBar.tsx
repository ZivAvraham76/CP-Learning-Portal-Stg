import * as React from "react";

interface ProgressBarProps {
  coursePercentageComplete: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ coursePercentageComplete }) => {
  const progressBar =
    coursePercentageComplete > 0 && coursePercentageComplete <= 8
      ? "w-1/12"
      : coursePercentageComplete > 8 && coursePercentageComplete <= 16
        ? "w-2/12"
        : coursePercentageComplete > 16 && coursePercentageComplete <= 25
          ? "w-3/12"
          : coursePercentageComplete > 25 && coursePercentageComplete <= 33
            ? "w-4/12"
            : coursePercentageComplete > 33 && coursePercentageComplete <= 41
              ? "w-5/12"
              : coursePercentageComplete > 41 && coursePercentageComplete <= 50
                ? "w-6/12"
                : coursePercentageComplete > 50 &&
                  coursePercentageComplete <= 58
                  ? "w-7/12"
                  : coursePercentageComplete > 58 &&
                    coursePercentageComplete <= 66
                    ? "w-8/12"
                    : coursePercentageComplete > 66 &&
                      coursePercentageComplete <= 75
                      ? "w-9/12"
                      : coursePercentageComplete > 75 &&
                        coursePercentageComplete <= 83
                        ? "w-10/12"
                        : coursePercentageComplete > 83 &&
                          coursePercentageComplete < 100
                          ? "w-11/12"
                          : coursePercentageComplete === 100
                            ? "w-full"
                            : "hidden";
  return (
    <div className="border-[#607d8a] h-5 w-full rounded-xl border p-1">
      <div className={`bg-[#41273C] h-full rounded-xl bg-gradient-to-r ${progressBar}`} />
    </div>
  );
};

export default ProgressBar;
