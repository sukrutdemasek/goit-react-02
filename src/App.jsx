import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description";
import Feedback from "./components/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification";

function App() {
  // Инициализация состояния с данными из localStorage
  const getInitialFeedback = () => {
    const storedFeedback = localStorage.getItem("feedback");
    return storedFeedback
      ? JSON.parse(storedFeedback) // Если данные есть, парсим их
      : { good: 0, neutral: 0, bad: 0 }; // Если данных нет, инициализируем нулями
  };

  const [feedback, setFeedback] = useState(getInitialFeedback);

  // Каждый раз, когда обновляется состояние feedback, сохраняем его в localStorage
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
