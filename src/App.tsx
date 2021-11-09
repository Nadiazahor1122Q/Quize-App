import React,{ useState } from 'react';
import  { GlobalStyle, Wrapper }  from './App.styles';
import {QuestionCard} from './Components/QuestionCard/QuestionCard';
import {fetchQuestions,Difficulty,QuestionState} from './API';



const TOTAL_QUESTIONS =10;

type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
  
}


function App() {
  const[loading, setLoading] = useState(false);
  const[questions, setQuestions] =useState<QuestionState[]>([]);
  const[number, setNumber] =useState(0);
  const[userAnwers, setUserAnwers] =useState<AnswerObject[]>([]);
  const[score, setScore]= useState(0);
  const[gameOver, setGameOver] =useState(true);
  const [win,setWin]=useState(false);

console.log(questions);

  

  const startQuiz =async()=>{;
  setLoading(true);
  setGameOver(false);
  const newQuestions = await fetchQuestions(TOTAL_QUESTIONS,Difficulty.EASY);
  setQuestions(newQuestions);
  setScore(0);
  setUserAnwers([])
  setNumber(0)
  setLoading(false)
  }
  const nextQuestion  = async()=>{
     const nextQuestion =number + 1;
     if(nextQuestion === TOTAL_QUESTIONS){
       setGameOver(true)
     }else{
       setNumber(nextQuestion)
     }
  };

  const CheckAnswer =(e:React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      const answer =e.currentTarget.value;
      const  correct = questions[number].correct_answer === answer;
    if(correct) {
      setScore(prev => prev +1)
      // if(prev +1 == questions.length){
      //   setWin(true);
      // }
    }


    if(number+1 === TOTAL_QUESTIONS){
      return setGameOver(true)
    }

      const answerObjcet ={
       question:questions[number].question,
       answer,
       correct,
       correctAnswer:questions[number].correct_answer
      }
      setUserAnwers(prev=>[...prev,answerObjcet])
    }
  };

  
  return (
    <>
    <GlobalStyle/>

      
{
  score == questions.length && score > 0 && <img className="win" src="/image/download.png" />
}
    <Wrapper>

  <h1>Quiz</h1>
  { gameOver || userAnwers.length === TOTAL_QUESTIONS ?(
    <button className="start" onClick={startQuiz}>
        Begin Quinz
      </button> ): null }
      {!gameOver ?( 
      <p className="score">
        Score:{score}
      </p>) :null }
      {loading ?(
      <p>
       Loading
      </p>) :null }
      {!loading && !gameOver ?(
     
     number <= questions.length && !gameOver && <QuestionCard
      questionNum ={number + 1} 
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnwers ? userAnwers[number] : undefined}
      callback={CheckAnswer}

  /> ): null }
   {!gameOver && !loading && userAnwers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?(
      <button className="next" onClick={nextQuestion}>
        Next
      </button>):null }
      </Wrapper>
    </>
  );
}

export default App;
