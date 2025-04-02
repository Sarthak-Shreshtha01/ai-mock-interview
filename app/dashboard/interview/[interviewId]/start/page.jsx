"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import QuestionsSection from "./_components/QuestionsSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"
import { Button } from '@/components/ui/button';
import Link from 'next/link'

const StartInterview = ({params}) => {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(()=> {
    getInterviewDetails();
  } , []);

  const getInterviewDetails = async() => {
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId , params.interviewId ));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp.questions);
    if (result.length > 0) {
        setInterviewData(result[0]);
    } else {
        console.error("No interview data found for the given ID.");
    }
}

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mock Interview Session</h1>
          <p className="text-muted-foreground">Question {activeQuestionIndex + 1} of {mockInterviewQuestion?.length}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-card rounded-xl shadow-lg p-6 border border-border'>
          {/* Questions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Current Question</h2>
            <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />
          </div>

          {/* Video/Audio Recording */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Record Your Answer</h2>
            <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData} />
          </div>
        </div>

        <div className='flex justify-end gap-4 mt-8'>
          {activeQuestionIndex > 0 && (
            <Button 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              variant="outline"
              className="px-6"
            >
              Previous Question
            </Button>
          )}
          {activeQuestionIndex < mockInterviewQuestion?.length - 1 ? (
            <Button 
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="px-6 bg-primary hover:bg-primary/90"
            >
              Next Question
            </Button>
          ) : (
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
              <Button className="px-6 bg-green-600 hover:bg-green-700">
                End Interview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default StartInterview
