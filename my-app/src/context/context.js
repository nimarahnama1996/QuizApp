import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''

const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [waiting,setWaiting] = useState(true)
    const [loading,setLoadig] = useState(false)
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [error, setError] = useState(false)
    const [isModalOpen,setIsModalOpen] = useState(false)


    const fetchQuestions = async (url) => {
        setLoadig(true)
        setWaiting(false)

        const response = await axios(url).catch((err) => 
            console.log(err));

        if (response) {
            const data = response.data.results
            if (data.length > 0) {
                setQuestions(data)
                setLoadig(false)
                setWaiting(false)
                setError(false)
            } else{
                setWaiting(true)
                setError(true)
            }
        }else{
            setWaiting(true)
        }
       
    }

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex +1

            if (index > questions.length -1) {
                return 0
            }else{
                return index
            }
            
        })
    }


    const checkAnswer = (value) => {
    if (value) {
        setCorrect((oldState) => oldState +1)
    }
    nextQuestion()
    }

    useEffect(() => {
        fetchQuestions(tempUrl)
    }, [])


  return <AppContext.Provider 
           value={{waiting,loading,questions,index,correct,error,isModalOpen,nextQuestion,checkAnswer}}>
           {children}   
        </AppContext.Provider>
}



export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider}