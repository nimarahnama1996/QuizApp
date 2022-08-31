import React from 'react';


import './App.css';
import Loading from './components/Loading';
import Modal from './components/Modal';
import SetupForm from './components/SetupForm';
import { useGlobalContext } from './context/context';



function App() {

  const {waiting,loading,questions,index,correct,nextQuestion,checkAnswer} = useGlobalContext()

  if(waiting){
    return <SetupForm/>
  }

  if(loading){
    return <Loading/>
  }

  console.log(questions);

  const { question, incorrect_answers, correct_answer } = questions[index]

  const answers = [...incorrect_answers, correct_answer]

  return (
    <main>
     <Modal/>
     <section className='quiz'>
      <p className='correct-answers'>
        Correct answers : {correct}/{index}
      </p>

      <article className='container'>
     <h2 dangerouslySetInnerHTML={{__html: question}}/>

     <div className='btn-container'>
      {answers.map((answer,index) => {
        return (
          <button 
           key={index} 
           className='answer-btn' 
           dangerouslySetInnerHTML={{__html: answer}}
           onClick={() => checkAnswer(correct_answer === answer)}
            />
        )
      })}
     </div>

      </article>

      <button className='next-question' onClick={nextQuestion}>Next question</button>
     </section>
    </main>
  )



  return (
    <div className="App">
      
    </div>
  );
}

export default App;
