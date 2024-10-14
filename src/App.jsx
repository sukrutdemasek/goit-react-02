import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description";
import Feedback from "./components/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification";

function App() {
  const getInitialFeedback = () => {
    const storedFeedback = localStorage.getItem("feedback");
    return storedFeedback
      ? JSON.parse(storedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  };

  const [feedback, setFeedback] = useState(getInitialFeedback);

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const total = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = total > 0 ? (feedback.good / total) * 100 : 0;

  const updateFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

  const clearFeedback = () => {
   
    if (feedback.good > 0 || feedback.neutral > 0 || feedback.bad > 0) {
      setFeedback({
        good: 0,
        neutral: 0,
        bad: 0,
      });
      localStorage.setItem(
        "feedback",
        JSON.stringify({
          good: 0,
          neutral: 0,
          bad: 0,
        })
      );
    }
  };

  return (
    <div>
      <Description />
      <Options onFeedback={updateFeedback} clearFeedback={clearFeedback} />
      {total > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={total}
          positive={positivePercentage}
        />
      ) : (
        <Notification message={"No feedback yet"} />
      )}
    </div>
  );
}

export default App;
