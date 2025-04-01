"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'

import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([]);

    const router = useRouter();

    const {user} = useUser();

    const onSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        console.log({jobPosition,jobDesc,jobExperience,});

        const InputPrompt = `job position: ${jobPosition} , job Descrption:${jobDesc} , year of experience: ${jobExperience}
You are an AI trained to generate the best interview questions and answers based on job requirements. Given the job position, job description, and required years of experience, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} high-quality interview questions along with their ideal answers.

Output Format:
Provide the response in valid JSON format with the following structure:

{
  "job_position": "Software Engineer",
  "job_description": "Responsible for developing and maintaining web applications using React and Node.js. Must have experience in building RESTful APIs, optimizing database queries, and working with cloud platforms like AWS.",
  "years_of_experience": 3,
  "questions": [
    {
      "question": "What are the key principles of RESTful API design?",
      "answer": "RESTful API design follows six main principles: statelessness, client-server architecture, cacheability, layered system, code on demand (optional), and uniform interface. These principles ensure scalability, simplicity, and performance in web services."
    },
    {
      "question": "How would you optimize a slow database query?",
      "answer": "To optimize a slow query, I would analyze execution plans, add appropriate indexes, normalize or denormalize tables based on use cases, partition large tables, and use caching strategies to reduce database load."
    }
  ]
}
`
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (result.response.text()).replace('```json' ,'').replace('```' , '');

        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp : MockJsonResp,
                jobDesc,
                jobExperience,
                jobPosition,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY')
            }).returning({mockId : MockInterview.mockId})
    
            console.log("Inserting Id:" , resp)

            if(resp){
                setOpenDialog(false);
                router.push('dashboard/interview/' + resp[0]?.mockId )
            }
        }
        else{
            console.log("ERRORRRR");
        }


        setLoading(false);

    }

    return (
        <div>
            <div 
                className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-200'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl  ' >
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl'>
                                Tell us more about your job interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit} >
                                <div>
                                    <h2>
                                        Please provide detailed information about the job position, including the role, required experience, and any specific skills or qualifications that are important for the interview.
                                    </h2>

                                    <div className='mt-7 my-3' >
                                        <label htmlFor="">Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack developer " required onChange={(event) => setJobPosition(event.target.value)} />
                                    </div>
                                    
                                    <div className='mt-7 my-3' >
                                        <label htmlFor="">Job Description/Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, MongoDB, NodeJs, etc " required onChange={(event)=> setJobDesc(event.target.value)} />
                                    </div>

                                    <div className='mt-7 my-3' >
                                        <label htmlFor="">Years of Experience</label>
                                        <Input placeholder="Ex.5" type={Number} max={50} 
                                        onChange={(event)=>setJobExperience(event.target.value)} />
                                    </div>
                                    

                                    <div className='flex gap-5 justify-end ' >
                                        <Button  type="button" variant="ghost" onClick={()=> setOpenDialog(false)} >Cancel</Button>
                                        <Button type="submit" disabled={loading} >

                                            {
                                                loading ? <> <LoaderCircle className='animate-spin' /> Generating from AI </>
                                                :
                                                'Start Interview'
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview
