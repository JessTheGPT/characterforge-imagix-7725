interface LandingProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

const Landing = ({ onGetStarted, onSignIn, onSignUp }: LandingProps) => {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 50%, #FFB6C1 100%)'
    }}>
      {/* Header */}
      <header className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-800">
              PhotoMe AI
            </a>
            <ul className="hidden md:flex gap-12 items-center">
              <li>
                <a href="#features" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <div className="font-semibold text-sm">How It Works</div>
                  <div className="text-xs text-gray-600">Simple 3-step process</div>
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <div className="font-semibold text-sm">Why Choose Us</div>
                  <div className="text-xs text-gray-600">Skip the technical complexity</div>
                </a>
              </li>
              <li>
                <a href="#examples" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <div className="font-semibold text-sm">Examples</div>
                  <div className="text-xs text-gray-600">See what's possible</div>
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <div className="font-semibold text-sm">Pricing</div>
                  <div className="text-xs text-gray-600">Simple, transparent costs</div>
                </a>
              </li>
            </ul>
            <div className="flex gap-3">
              <button 
                onClick={onSignIn}
                className="px-4 py-2 text-gray-800 border border-gray-300 rounded-md hover:bg-white/50 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onSignUp}
                className="px-4 py-2 text-white bg-pink-500 hover:bg-pink-600 rounded-md transition-colors"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
          {/* Left Section */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
                AI PHOTO GENERATION MADE SIMPLE
              </p>
              <h1 className="text-6xl lg:text-7xl font-black text-gray-800 leading-none mb-6">
                Create Yourself in Any Scene.
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
                No need to learn LoRA training, prompt engineering, or technical parameters. 
                We handle all the complexity behind the scenes so you can focus on creating amazing photos of yourself.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>❌</span>
                <span>Skip learning complex LoRA models</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>❌</span>
                <span>No trial and error with parameters</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <span>✅</span>
                <span>Professional results, first time</span>
              </div>
            </div>

            <button 
              onClick={onGetStarted}
              className="w-36 h-36 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg self-start"
              style={{
                background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)',
                boxShadow: '0 10px 30px rgba(255, 105, 180, 0.3)'
              }}
            >
              Get Started
            </button>

            <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-8 h-72 flex items-center justify-center text-4xl text-gray-400">
              🎨 STUNNING PHOTOS DONE.
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-8 text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl text-white"
                   style={{ background: 'linear-gradient(45deg, #FF69B4, #87CEEB)' }}>
                🎨
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">PhotoMe AI</h2>
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                Professional AI Photo Generation
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Auto LoRA Training</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We automatically handle the complex LoRA model training from your photos
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Smart Prompting</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our system optimizes prompts and parameters so you don't have to learn them
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Professional Results</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Get high-quality photos without the expensive trial and error process
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Complexity Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-10 my-16">
          <h2 className="text-4xl font-black text-gray-800 text-center mb-4">
            The Complexity We Handle For You
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Traditional AI photo generation requires deep technical knowledge. We abstract it all away.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h4 className="text-lg font-bold text-red-600 mb-6">❌ The Traditional Way</h4>
              <div className="space-y-3">
                {[
                  'Learn LoRA architecture and training',
                  'Understand dataset preparation',
                  'Configure training parameters',
                  'Master prompt engineering',
                  'Tune inference steps (20-50+)',
                  'Adjust guidance scale (7-15)',
                  'Write negative prompts',
                  'Waste money on failed attempts',
                  'Spend hours learning and experimenting'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-red-500">🔧</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-green-600 mb-6">✅ With PhotoMe AI</h4>
              <div className="space-y-3">
                {[
                  'Upload 5-10 photos of yourself',
                  'Describe what you want in plain English',
                  'Get professional results in minutes',
                  'Perfect parameters automatically set',
                  'No technical knowledge required',
                  'Predictable, transparent pricing',
                  'Unlimited revisions included',
                  'Works on any device',
                  'Consistent, high-quality results'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="text-green-500">📸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16" id="features">
          <h2 className="text-5xl font-black text-gray-800 text-center mb-4">How It Works</h2>
          <p className="text-gray-600 text-center mb-12">
            We've simplified the entire process into three simple steps. No technical expertise required.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Upload Your Photos',
                description: 'Share 5-10 clear photos of yourself. We\'ll automatically optimize them for training.'
              },
              {
                number: '02',
                title: 'Describe Your Vision',
                description: 'Tell us what you want in plain English - we handle all the complex prompt engineering.'
              },
              {
                number: '03',
                title: 'Get Perfect Results',
                description: 'Receive professional-quality AI photos with perfect parameters set automatically.'
              }
            ].map((step, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-8 text-center">
                <div className="text-2xl font-bold text-pink-500 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-10 text-center my-16">
          <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
            "I tried doing this myself for weeks - learning about LoRA training, prompt engineering, all the technical stuff. 
            PhotoMe AI gave me better results in 10 minutes than I got in weeks of trying!"
          </p>
          <p className="text-sm font-semibold text-gray-600">- Sarah, Content Creator</p>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <button 
            onClick={onGetStarted}
            className="px-10 py-4 text-white font-semibold rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #FF69B4, #FFB6C1)',
              boxShadow: '0 10px 30px rgba(255, 105, 180, 0.3)'
            }}
          >
            Start Creating Your Photos Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default Landing;