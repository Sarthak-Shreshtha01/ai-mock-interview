import React from 'react'
import {Lightbulb ,Volume2} from 'lucide-react'

const QuestionsSection = ({mockInterviewQuestion , activeQuestionIndex}) => {

  const textToSpeech=(text) => {
    if('speechSynthesis' in window ){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert("Sorry! Your Browser does not support speech Synthesis")
    }
  }


  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10  ' >
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5' >
        {Array.isArray(mockInterviewQuestion) && mockInterviewQuestion.map((question, index) => (
            <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index ? 'bg-primary text-white ' : 'bg-secondary' } `}  key={index}>Question #{index + 1}</h2>
        ))}
      </div>

       <h2 className='my-5 text-md md:text-lg ' >{mockInterviewQuestion[activeQuestionIndex]?.question }</h2>

        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}  />

        <div className='border rounded-lg p-5 bg-blue-100 mt-20 ' >
            <h2 className='flex gap-2 items-center ' >
                <Lightbulb />
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-2 ' >{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>

    </div>
  )
}

export default QuestionsSection
