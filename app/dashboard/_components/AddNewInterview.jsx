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
import { LoaderCircle, Plus } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import {v4 as uuidv4} from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([]);

    const router = useRouter();
    const {user} = useUser();

    const onSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        
        try {
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
        
                if(resp){
                    setOpenDialog(false);
                    router.push('dashboard/interview/' + resp[0]?.mockId )
                }
            }
        } catch (error) {
            console.error("Error creating interview:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div 
                className='group relative p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-[#4845D2] hover:bg-[#4845D2]/5 transition-all duration-300 cursor-pointer'
                onClick={() => setOpenDialog(true)}
            >
                <div className='flex flex-col items-center justify-center text-center'>
                    <div className='p-3 rounded-full bg-[#4845D2]/10 group-hover:bg-[#4845D2]/20 transition-colors duration-300'>
                        <Plus className='w-8 h-8 text-[#4845D2]' />
                    </div>
                    <h2 className='mt-4 text-lg font-semibold text-gray-900'>Create New Interview</h2>
                    <p className='mt-2 text-sm text-gray-500'>Start a new AI-powered mock interview session</p>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-bold text-gray-900 dark:text-white'>
                            Create New Interview
                        </DialogTitle>
                        <DialogDescription className='text-gray-600 dark:text-white'>
                            <form onSubmit={onSubmit} className='mt-6 space-y-6'>
                                <div className='space-y-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                                            Job Role/Position
                                        </label>
                                        <Input 
                                            placeholder="e.g., Full Stack Developer" 
                                            required 
                                            value={jobPosition}
                                            onChange={(e) => setJobPosition(e.target.value)}
                                            className='w-full'
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                                            Job Description/Tech Stack
                                        </label>
                                        <Textarea 
                                            placeholder="e.g., React, Node.js, MongoDB, AWS" 
                                            required 
                                            value={jobDesc}
                                            onChange={(e) => setJobDesc(e.target.value)}
                                            className='min-h-[100px]'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
                                            Years of Experience
                                        </label>
                                        <Input 
                                            placeholder="e.g., 5" 
                                            type="number" 
                                            min="0"
                                            max="50"
                                            value={jobExperience}
                                            onChange={(e) => setJobExperience(e.target.value)}
                                            className='w-full'
                                        />
                                    </div>
                                </div>

                                <div className='flex justify-end space-x-4 pt-4'>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setOpenDialog(false)}
                                        className='px-6'
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={loading}
                                        className='px-6 bg-[#4845D2] dark:text-white hover:bg-[#4845D2]/90'
                                    >
                                        {loading ? (
                                            <div className='flex items-center space-x-2'>
                                                <LoaderCircle className='w-4 h-4 animate-spin' />
                                                <span>Generating Interview...</span>
                                            </div>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
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
