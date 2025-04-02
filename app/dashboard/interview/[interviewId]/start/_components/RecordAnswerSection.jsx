"use client"

import React, { useEffect, useState } from 'react'
import Webcam from "react-webcam"
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment'
import { UserAnswer } from '@/utils/schema';


const RecordAnswerSection = ({mockInterviewQuestion ,activeQuestionIndex ,interviewData }) => {

  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const [userAnswer, setUserAnswer] = useState('')

  useEffect(()=> {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns +result?.transcript )
    ) )
  } , [results]);

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10 ){
      UpdateUserAnswer();
    }

  } , [userAnswer] )

  
  const StartStopRecording= async() => {
    if(isRecording){
      stopSpeechToText();
      
    }
    else{
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async() => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer: " + userAnswer + ". Please provide a detailed analysis comparing the question and the user's answer. Include a JSON response with the following structure: {\"rating\": \"<rating_value>\", \"feedback\": \"<feedback_text>\", \"improvements\": [\"<improvement_1>\", \"<improvement_2>\", \"<improvement_3>\", \"<improvement_4>\", \"<improvement_5>\"]}. The rating should reflect the quality of the answer, the feedback should highlight strengths and weaknesses, and the improvements should suggest specific areas where the user can enhance their response based on the content of the question and the user's answer.Give only the JSON";

    const result = await chatSession.sendMessage(feedbackPrompt)

    const mockJsonResponse = (result.response.text()).replace('```json' ,'').replace('```' , '');

    console.log(mockJsonResponse);
    console.log(interviewData);

    const JsonFeedbackResp = JSON.parse(mockJsonResponse);
    
    const resp = await db.insert(UserAnswer).values({
      mockIdRef : interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns : mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAnswer: userAnswer,
      feedback : JsonFeedbackResp?.feedback,
      rating : JsonFeedbackResp?.rating,
      userEmail : user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().format('DD-MM-YYYY'),
    });

    if(resp){
      toast('User Answer recorded Successfully');
      setUserAnswer('');
      setResults([]);
    }
    setResults([]);

    setLoading(false);
  }

  return (

    <div className='flex items-center justify-center flex-col ' >
      <div className='flex flex-col justify-center items-center mt-20 rounded-lg p-5 bg-secondary' >
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' alt='Webcam' />
        <Webcam mirrored={false} 
        style={{
          height:300 ,
          width:'100%',
          zIndex:10,
        }}
        />
      </div>
      
        <Button disabled={loading}
         className="my-10" variant="outline" onClick={StartStopRecording}  >

          {isRecording ? 
          <h2 className='text-red-600 flex gap-2 ' >
            <Mic /> Stop Recording....
          </h2> 
          :
          'Record Answer'
          }

        </Button>

        <Button onClick= {()=> console.log(userAnswer)} >Show User Answer</Button>

        

    </div>
  )
}

export default RecordAnswerSection
