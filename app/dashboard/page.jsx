import React from 'react'
import { UserButton } from '@clerk/nextjs'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList';

const Dashboard = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Create and start your AI Mock Interview sessions
          </p>
        </div>
        <UserButton />
      </div>

      <div className="bg-card rounded-lg shadow-sm p-6 mb-8 border">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Start New Interview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AddNewInterview />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-sm p-6 border">
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard
