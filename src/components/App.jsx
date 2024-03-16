import { useEffect, useState } from 'react'
import Feedback from './Feedback/Feedback'
import Options from './Options/Options'

const initialFeedback = {
	good: 0,
	neutral: 0,
	bad: 0
}


function App() {
  const [feedback, setFeedback] = useState(() => {
    const stringifiedFeedback = localStorage.getItem('feedbackValues');
    const parseFeedback = JSON.parse(stringifiedFeedback) ?? initialFeedback;
    return parseFeedback;
  });

  const updateFeedback = (feedbackType) => {
 setFeedback({ ...feedback, [feedbackType]: feedback[feedbackType] + 1 });
}
  const totalFeedback = Object.values(feedback).reduce((acc, current) => acc + current, 0);
  const positiveFeedback = Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100)

  const resetFeedback = ()=>{setFeedback(initialFeedback)}

  useEffect(() => {
    localStorage.setItem('feedbackValues', JSON.stringify(feedback))
  });
  return (
    <>
      <h1>Sip Happens Café</h1>
      <p>Please leave your feedback about our service by selecting one of the options below.</p>
      
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={ resetFeedback} />
     
      {totalFeedback !== 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={ positiveFeedback} /> : <p>No feedback yet</p>}
    
    </>
  )
}

export default App
