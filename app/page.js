import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Clock, Target, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Master Your Interview Skills with
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Practice with our AI-powered mock interviews. Get instant feedback, improve your responses, and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard/how">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Our AI Mock Interviews?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <Brain className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Feedback</h3>
              <p className="text-muted-foreground">
                Get detailed, personalized feedback on your responses from our advanced AI system.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Practice Anytime</h3>
              <p className="text-muted-foreground">
                Access mock interviews 24/7 and practice at your own pace and convenience.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Job-Specific Questions</h3>
              <p className="text-muted-foreground">
                Practice with questions tailored to your target job role and experience level.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Real Interview Experience</h3>
              <p className="text-muted-foreground">
                Simulate real interview conditions with our AI interviewer for authentic practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of professionals who have improved their interview skills with our AI-powered platform.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Mock Interview Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
