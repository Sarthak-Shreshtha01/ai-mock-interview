"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { FileText } from 'lucide-react';

const InterviewList = () => {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        user && GetInterviewList();
    } , [user])

    const GetInterviewList = async() => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy , user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id))
            setInterviewList(result);
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false);
        }
    }
 
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4845D2]"></div>
            </div>
        );
    }

    if (interviewList.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gray-100">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews yet</h3>
                <p className="text-gray-500">Create your first mock interview to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    Previous Interviews
                </h2>
                <span className="text-sm text-gray-500">
                    {interviewList.length} interview{interviewList.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviewList.map((interview) => (
                    <InterviewItemCard key={interview.mockId} interview={interview} />
                ))}
            </div>
        </div>
    )
}

export default InterviewList
