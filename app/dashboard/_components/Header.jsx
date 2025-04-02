"use client"
import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

const Header = () => {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='sticky top-0 z-50 bg-background border-b shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Image src="/logo.svg" width={40} height={40} alt="logo" className='rounded-lg' />
            <span className='ml-2 text-xl font-semibold text-foreground'>AI Mock Interview</span>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center space-x-8'>
            <li>
              <a href="/dashboard" className={`text-sm font-medium transition-colors duration-200 ${
                path === "/dashboard" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/dashboard/questions" className={`text-sm font-medium transition-colors duration-200 ${
                path === "/dashboard/questions" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}>
                Questions
              </a>
            </li>
            <li>
              <a href="/dashboard/upgrade" className={`text-sm font-medium transition-colors duration-200 ${
                path === "/dashboard/upgrade" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}>
                Upgrade
              </a>
            </li>
            <li>
              <a href="/dashboard/how" className={`text-sm font-medium transition-colors duration-200 ${
                path === "/dashboard/how" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary"
              }`}>
                How it Works
              </a>
            </li>
          </ul>

          <div className='flex items-center space-x-4'>
            <ThemeToggle />
            <button 
              className='md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 bg-background border-t'>
            <a href="/dashboard" className={`block px-3 py-2 rounded-md text-base font-medium ${
              path === "/dashboard" 
                ? "text-primary bg-accent" 
                : "text-muted-foreground hover:text-primary hover:bg-accent"
            }`}>
              Dashboard
            </a>
            <a href="/dashboard/questions" className={`block px-3 py-2 rounded-md text-base font-medium ${
              path === "/dashboard/questions" 
                ? "text-primary bg-accent" 
                : "text-muted-foreground hover:text-primary hover:bg-accent"
            }`}>
              Questions
            </a>
            <a href="/dashboard/upgrade" className={`block px-3 py-2 rounded-md text-base font-medium ${
              path === "/dashboard/upgrade" 
                ? "text-primary bg-accent" 
                : "text-muted-foreground hover:text-primary hover:bg-accent"
            }`}>
              Upgrade
            </a>
            <a href="/dashboard/how" className={`block px-3 py-2 rounded-md text-base font-medium ${
              path === "/dashboard/how" 
                ? "text-primary bg-accent" 
                : "text-muted-foreground hover:text-primary hover:bg-accent"
            }`}>
              How it Works
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header