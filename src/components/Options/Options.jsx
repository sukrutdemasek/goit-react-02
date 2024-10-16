import "./Options.css";
export default function Options({ totalFeedback, onFeedback, clearFeedback }) {
  return (
    <div className="options">
      <button className="feedbackButton" onClick={() => onFeedback("good")}>
        Good
      </button>
      <button className="feedbackButton" onClick={() => onFeedback("neutral")}>
        Neutral
      </button>
      <button className="feedbackButton" onClick={() => onFeedback("bad")}>
        Bad
      </button>
      {totalFeedback > 0 && <button className="feedbackButton" onClick={() => clearFeedback()}>
        Reset
      </button>}
    </div>
  );
}
