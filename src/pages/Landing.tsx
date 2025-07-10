import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveCard } from '@/components/ui/interactive-card';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

interface LandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted, onSignIn, onSignUp }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <nav className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-foreground">PhotoMe AI</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                How It Works
              </a>
              <a href="#examples" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Examples
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                Pricing
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                onClick={onSignIn}
                variant="ghost"
                size="sm"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUp}
                variant="default"
                size="sm"
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <MotionWrapper type="slideUp" className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Photo Generation Made Simple
                </motion.div>
                
                <h1 className="text-display-lg font-bold text-foreground leading-tight">
                  Create Yourself in{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Any Scene
                  </span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Skip the technical complexity of LoRA training and prompt engineering. 
                  We handle everything behind the scenes so you can focus on creating amazing photos.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <X className="h-5 w-5 mr-3 text-destructive" />
                  No complex model training required
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <X className="h-5 w-5 mr-3 text-destructive" />
                  No trial and error with parameters
                </div>
                <div className="flex items-center text-sm font-medium text-foreground">
                  <CheckCircle className="h-5 w-5 mr-3 text-success" />
                  Professional results, guaranteed
                </div>
              </div>

              <Button 
                onClick={onGetStarted}
                variant="gradient"
                size="lg"
                className="group gap-2"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </MotionWrapper>

            {/* Right Column - Visual */}
            <MotionWrapper type="slideLeft" delay={0.3} className="space-y-6">
              <InteractiveCard variant="glass" className="p-8 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl"
                >
                  🎨
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">PhotoMe AI</h3>
                <p className="text-sm text-muted-foreground">Professional AI Photo Generation</p>
              </InteractiveCard>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    title: "Auto LoRA Training",
                    description: "Automatically handle complex model training from your photos",
                    delay: 0.1
                  },
                  {
                    title: "Smart Prompting", 
                    description: "Optimized prompts and parameters - no technical knowledge required",
                    delay: 0.2
                  },
                  {
                    title: "Professional Results",
                    description: "High-quality photos without expensive trial and error",
                    delay: 0.3
                  }
                ].map((feature, index) => (
                  <MotionWrapper key={index} type="slideUp" delay={feature.delay}>
                    <InteractiveCard variant="glass" className="p-6">
                      <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </InteractiveCard>
                  </MotionWrapper>
                ))}
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-24 bg-landing-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-landing-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-landing-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create professional AI photos of yourself
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Upload Photos',
                description: 'Share 5-10 clear photos of yourself. We automatically optimize them for training.'
              },
              {
                number: '02',
                title: 'Describe Your Vision',
                description: 'Tell us what you want in plain English. We handle the complex prompt engineering.'
              },
              {
                number: '03',
                title: 'Get Perfect Results',
                description: 'Receive professional-quality AI photos with perfect parameters automatically set.'
              }
            ].map((step, index) => (
              <div key={index} className="bg-landing-card border border-landing-border rounded-xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 bg-landing-accent text-white rounded-lg mx-auto mb-6 flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-landing-foreground mb-3">{step.title}</h3>
                <p className="text-landing-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-landing-card border border-landing-border rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-landing-foreground mb-4">
                Skip The Technical Complexity
              </h2>
              <p className="text-lg text-landing-muted-foreground">
                Traditional AI photo generation requires deep expertise. We handle it all for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-6 flex items-center">
                  <span className="mr-2">❌</span>
                  The Traditional Way
                </h3>
                <div className="space-y-3">
                  {[
                    'Learn LoRA architecture and training',
                    'Understand dataset preparation',
                    'Configure training parameters',
                    'Master prompt engineering',
                    'Tune inference steps (20-50+)',
                    'Adjust guidance scale (7-15)',
                    'Write negative prompts',
                    'Waste money on failed attempts'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-landing-muted-foreground">
                      <span className="mr-3 text-red-500">•</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-6 flex items-center">
                  <span className="mr-2">✅</span>
                  With PhotoMe AI
                </h3>
                <div className="space-y-3">
                  {[
                    'Upload 5-10 photos of yourself',
                    'Describe what you want in plain English',
                    'Get professional results in minutes',
                    'Perfect parameters automatically set',
                    'No technical knowledge required',
                    'Predictable, transparent pricing',
                    'Unlimited revisions included',
                    'Consistent, high-quality results'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center text-landing-muted-foreground">
                      <span className="mr-3 text-green-500">•</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-landing-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-landing-card border border-landing-border rounded-2xl p-8 lg:p-12 shadow-sm">
            <blockquote className="text-xl lg:text-2xl font-medium text-landing-foreground mb-6 leading-relaxed">
              "I tried doing this myself for weeks - learning about LoRA training, prompt engineering, all the technical stuff. 
              PhotoMe AI gave me better results in 10 minutes than I got in weeks of trying!"
            </blockquote>
            <cite className="text-landing-muted-foreground font-medium">— Sarah, Content Creator</cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-landing-foreground mb-6">
            Ready to Create Amazing Photos?
          </h2>
          <p className="text-lg text-landing-muted-foreground mb-8">
            Join thousands of creators who've discovered the easiest way to generate professional AI photos.
          </p>
          <button 
            onClick={onGetStarted}
            className="inline-flex items-center px-8 py-4 bg-landing-accent text-white font-semibold rounded-lg hover:bg-landing-accent/90 transition-all transform hover:scale-105 hover:shadow-lg text-lg"
          >
            Start Creating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;