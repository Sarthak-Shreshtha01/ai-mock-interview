"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Feedback = ({params}) => {
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetFeeback();
    },[])

    const GetFeeback = async() => {
        const result = await db.select().from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef , params.interviewId))
        .orderBy(UserAnswer.id);

        setFeedbackList(result);
    }

    let TotalRating = 0;
    feedbackList.forEach(element => {
        TotalRating = TotalRating + element?.rating;
    });
    
    const averageRating = TotalRating/feedbackList.length;

    return (
        <div className='min-h-screen bg-background p-8 md:p-12 max-w-4xl mx-auto'>
            <div className='space-y-6'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center space-y-3'
                >
                    <h2 className='text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent'>
                        Congratulations
                    </h2>
                    <h2 className='font-bold text-2xl text-foreground'>Here is Your Interview Feedback</h2>
                    <div className='inline-block bg-green-100 dark:bg-green-900/30 px-6 py-3 rounded-full'>
                        <h2 className='text-lg text-green-700 dark:text-green-400'>
                            Your Overall Rating is{' '}
                            <span className='font-bold text-2xl text-green-600 dark:text-green-500'>{averageRating.toFixed(1)}/10</span>
                        </h2>
                    </div>
                    <p className='text-muted-foreground max-w-2xl mx-auto'>
                        Here you can find the correct answers along with detailed feedback to help you improve your performance.
                    </p>
                </motion.div>

                <div className='space-y-4'>
                    {feedbackList && 
                    feedbackList.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Collapsible className="group">
                                <CollapsibleTrigger className='p-4 flex bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left justify-between items-center w-full border border-border'>
                                    <span className='font-medium text-foreground'>{item.question}</span>
                                    <ChevronsUpDown className='h-5 w-5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200' />
                                </CollapsibleTrigger>
                                <CollapsibleContent className='pt-4'>
                                    <div className='space-y-4'>
                                        <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800'>
                                            <h2 className='text-red-700 dark:text-red-400 font-semibold'>
                                                Rating: <span className='text-red-600 dark:text-red-500'>{item.rating}/10</span>
                                            </h2>
                                        </div>

                                        <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800'>
                                            <h2 className='text-red-700 dark:text-red-400 font-semibold mb-2'>Your Answer:</h2>
                                            <p className='text-red-800 dark:text-red-300'>{item.userAnswer}</p>
                                        </div>

                                        <div className='bg-green-100 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800'>
                                            <h2 className='text-green-700 dark:text-green-400 font-semibold mb-2'>Correct Answer:</h2>
                                            <p className='text-green-800 dark:text-green-300'>{item.correctAns}</p>
                                        </div>

                                        <div className='bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
                                            <h2 className='text-blue-700 dark:text-blue-400 font-semibold mb-2'>Feedback:</h2>
                                            <p className='text-blue-800 dark:text-blue-300'>{item.feedback}</p>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </motion.div>
                    ))}
                </div>

                <div className='flex justify-center pt-6'>
                    <Button 
                        onClick={() => router.replace('/dashboard')}
                        className='bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-200 hover:shadow-lg'
                    >
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Feedback

