"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Webcam from 'react-webcam'
import Link from 'next/link'


const Interview = ({params}) => {

    const [interviewData, setInterviewData] = useState([]);
    const [webCamEnabled, setWebCamEnabled] = useState();

    useEffect(()=> {
        console.log(params.interviewId);
        getInterviewDetails();
    } , [])

    const getInterviewDetails = async() => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId , params.interviewId ));

        setInterviewData(result[0])
    }


  return (
    <div className='my-10 ' >
      <h2 className='font-bold text-2xl ' >
        Let's get Started
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5' >

        {/* Information Section */}
        <div className='flex flex-col my-5 gap-5   '>
            <div className='p-5 rounded-lg flex flex-col border gap-5 ' >
                <h2 className='text-lg'>
                    <strong>Job Role/Job Position : {interviewData.jobPosition}</strong>
                </h2>
                <h2 className='text-lg'>
                    <strong>Job Descrption/Tech Stack : {interviewData.jobDesc}</strong>
                </h2>
                <h2 className='text-lg'>
                    <strong>Years Of Experience : {interviewData.jobExperience}</strong>
                </h2>
            </div>

            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100   ' >
                <h2 className='flex gap-2 items-center text-yellow-500' >
                    <Lightbulb /><strong>Information</strong>
                </h2>

                <h2 className='mt-3 text-yellow-500 ' >
                    {process.env.NEXT_PUBLIC_INFORMATION}
                </h2>
            </div>

        </div>


        {/* Camera Section */}
        <div>
            {webCamEnabled ? 
            <Webcam
            onUserMedia= {()=> setWebCamEnabled(true)}
            onUserMediaError = { () => setWebCamEnabled(false)}
            // mirrored={true}
            style={{
                height:300,
                width:300,
            }} /> 
            :
            <>
                <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-4xl' />
                <Button onClick={()=>setWebCamEnabled(true)} className='cursor-pointer'  >Enable Web Cam and MicroPhone</Button>
            </>
            }
        </div>

      </div>

      <div className='flex justify-end items-end' >
        <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
            <Button className='cursor-pointer' >Start Interview</Button>
        </Link>
      </div>


    </div>
  )
}

export default Interview
