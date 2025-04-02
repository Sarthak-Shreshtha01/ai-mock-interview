import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, Briefcase } from 'lucide-react';

const InterviewItemCard = ({interview}) => {
  return (
    <div className='group bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all duration-300'>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-foreground capitalize group-hover:text-primary transition-colors duration-200'>
              {interview?.jobPosition}
            </h2>
            <div className='flex items-center mt-1 text-sm text-muted-foreground'>
              <Briefcase className='w-4 h-4 mr-1' />
              <span>{interview.jobExperience} Years Experience</span>
            </div>
          </div>
          <div className='text-xs text-muted-foreground flex items-center'>
            <Calendar className='w-3 h-3 mr-1' />
            {interview.createdAt}
          </div>
        </div>

        <p className='text-sm text-muted-foreground line-clamp-2'>
          {interview.jobDesc}
        </p>

        <div className='flex flex-wrap items-center justify-between pt-4 border-t border-border'>
          <Link href={'/dashboard/interview/' + interview?.mockId +"/feedback"} className='flex-1 mr-2'>
            <Button 
              variant="outline" 
              className='w-full hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors duration-200'
            >
              View Feedback
            </Button>
          </Link>
          <Link href={'/dashboard/interview/' + interview?.mockId +"/start"} className='flex-1 ml-2'>
            <Button 
              className='w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200'
            >
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InterviewItemCard
