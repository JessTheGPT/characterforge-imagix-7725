interface LandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

const Landing = ({ onGetStarted, onSignIn, onSignUp }: LandingProps) => {
  return (
    <div className="min-h-screen bg-landing-background text-landing-foreground">
      {/* Header */}
      <header className="border-b border-landing-border bg-landing-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-landing-foreground">
              PhotoMe AI
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-landing-muted-foreground hover:text-landing-foreground transition-colors text-sm font-medium">
                How It Works
              </a>
              <a href="#examples" className="text-landing-muted-foreground hover:text-landing-foreground transition-colors text-sm font-medium">
                Examples
              </a>
              <a href="#pricing" className="text-landing-muted-foreground hover:text-landing-foreground transition-colors text-sm font-medium">
                Pricing
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={onSignIn}
                className="px-4 py-2 text-sm font-medium text-landing-foreground hover:bg-landing-muted transition-colors rounded-md"
              >
                Sign In
              </button>
              <button 
                onClick={onSignUp}
                className="px-4 py-2 text-sm font-medium bg-landing-accent text-white hover:bg-landing-accent/90 transition-colors rounded-md"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-landing-accent-light text-landing-accent">
                  AI Photo Generation Made Simple
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-landing-foreground leading-tight">
                  Create Yourself in 
                  <span className="text-landing-accent"> Any Scene</span>
                </h1>
                <p className="text-lg text-landing-muted-foreground max-w-xl">
                  Skip the technical complexity of LoRA training and prompt engineering. 
                  We handle everything behind the scenes so you can focus on creating amazing photos.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-landing-muted-foreground">
                  <span className="mr-3 text-red-500">✗</span>
                  No complex model training required
                </div>
                <div className="flex items-center text-sm text-landing-muted-foreground">
                  <span className="mr-3 text-red-500">✗</span>
                  No trial and error with parameters
                </div>
                <div className="flex items-center text-sm font-medium text-landing-foreground">
                  <span className="mr-3 text-green-500">✓</span>
                  Professional results, guaranteed
                </div>
              </div>

              <button 
                onClick={onGetStarted}
                className="inline-flex items-center px-8 py-4 bg-landing-accent text-white font-semibold rounded-lg hover:bg-landing-accent/90 transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Get Started Free
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-landing-card border border-landing-border rounded-2xl p-8 text-center shadow-sm">
                <div className="w-20 h-20 bg-gradient-to-br from-landing-accent to-pink-400 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl">
                  🎨
                </div>
                <h3 className="text-xl font-semibold text-landing-foreground mb-2">PhotoMe AI</h3>
                <p className="text-sm text-landing-muted-foreground">Professional AI Photo Generation</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-landing-card border border-landing-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-landing-foreground mb-2">Auto LoRA Training</h4>
                  <p className="text-sm text-landing-muted-foreground">
                    Automatically handle complex model training from your photos
                  </p>
                </div>
                <div className="bg-landing-card border border-landing-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-landing-foreground mb-2">Smart Prompting</h4>
                  <p className="text-sm text-landing-muted-foreground">
                    Optimized prompts and parameters - no technical knowledge required
                  </p>
                </div>
                <div className="bg-landing-card border border-landing-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-landing-foreground mb-2">Professional Results</h4>
                  <p className="text-sm text-landing-muted-foreground">
                    High-quality photos without expensive trial and error
                  </p>
                </div>
              </div>
            </div>
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