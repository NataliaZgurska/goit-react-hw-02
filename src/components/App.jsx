import { useEffect, useState } from 'react'
import Feedback from './Feedback/Feedback'
import Options from './Options/Options'
import Description from './Description/Description';
import Notification from './Notification/Notification';

const initialFeedback = {
	good: 0,
	neutral: 0,
	bad: 0
}


function App() {
  const [feedback, setFeedback] = useState(() => {
    const stringifiedFeedback = window.localStorage.getItem('feedbackValues');
    const parseFeedback = JSON.parse(stringifiedFeedback) ?? initialFeedback;
     if (parseFeedback !== null)  {
       return parseFeedback;
    }
    return initialFeedback;
  });

  const updateFeedback = (feedbackType) => {
    setFeedback({ ...feedback, [feedbackType]: feedback[feedbackType] + 1 });
}
  const totalFeedback = Object.values(feedback).reduce((acc, current) => acc + current, 0);
  const positiveFeedback = Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100)

  const resetFeedback = ()=>{setFeedback(initialFeedback)}

  
  useEffect(() => {
    window.localStorage.setItem('feedbackValues', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description />
      
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={ resetFeedback} />
     
      {totalFeedback !== 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={ positiveFeedback} /> :  <Notification />}
   
    </>
  )
}

export default App
