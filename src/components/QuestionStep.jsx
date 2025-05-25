import React, { useState } from "react";

function QuestionStep({ stepData, onSelect }) {
  const [yearValue, setYearValue] = useState(stepData.default || 2000);

  return (
    <div className="question-step">
      <h2>{stepData.question}</h2>

      {stepData.type === "slider" ? (
        <div className="range-selector">
          <label>
            Обраний рік: {yearValue}
            <input
              type="range"
              min={stepData.min}
              max={stepData.max}
              value={yearValue}
              onChange={(e) => setYearValue(Number(e.target.value))}
            />
          </label>
          <br />
          <button onClick={() => onSelect(stepData.key, yearValue)}>Обрати</button>
        </div>
      ) : (
        <div className="options">
          {stepData.options.map((option) => (
            <button key={option} onClick={() => onSelect(stepData.key, option)}>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionStep;
