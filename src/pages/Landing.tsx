import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Activity, Users, Leaf, ArrowRight, Brain, Recycle, AlertTriangle, Layers, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Landing() {
  const [activeTab, setActiveTab] = useState<'Household' | 'Pharmacy' | 'Regulator'>('Household');

  return (
    <div className="min-h-screen bg-main-bg font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight mt-1">
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                PharmaWaste Watch
              </span>
              <span className="text-[10px] font-medium text-gray-900 mt-0.5">
                An Innovation of PharmaEco
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/signin" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hidden sm:inline-flex px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-accent transition-all shadow-sm shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 bg-light-green text-primary rounded-full text-sm font-semibold mb-6 shadow-sm border border-primary/20">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Protecting Lagos Communities
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Smarter Disposal,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Healthier Tomorrow.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
              Join the intelligent network connecting households, pharmacies, and regulators to track, recover, and safely dispose of unused, leftover and expired medicines in Lagos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-base font-medium rounded-xl hover:bg-accent transition-all shadow-lg shadow-primary/30 flex items-center justify-center group">
              Join the Network
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/signin" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-base font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center">
              Login to Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem & Impact Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              The Hidden Crisis in<br />Our Water Systems
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Improper disposal of unused, leftover and expired medicines in Lagos leads to active pharmaceutical ingredients contaiminating soil and public water supplies, contributing to environmental toxicity and antimicrobial resistance.
            </p>
            <div className="space-y-4 pt-4">
              {[
                { label: 'Unsafe Disposal', desc: 'Over 60% of households flush or trash medicines.' },
                { label: 'Water Risk', desc: 'Trace antibiotics found in urban drainage.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mr-4 flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.label}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Water Systems Protected', value: '12,000L', icon: <Leaf className="w-6 h-6 text-primary" /> },
              { label: 'Medicines Recovered', value: '450kg', icon: <Activity className="w-6 h-6 text-primary" /> },
              { label: 'Active Pharmacies', value: '180+', icon: <MapPin className="w-6 h-6 text-primary" /> },
              { label: 'Packaging Recycled', value: '2.5T', icon: <Recycle className="w-6 h-6 text-primary" /> }
            ].map((metric, i) => (
              <div key={i} className="bg-light-green/50 p-6 rounded-2xl border border-light-green flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                  {metric.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-primary mb-1">{metric.value}</h3>
                <p className="text-sm font-medium text-gray-700">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (Tabs) */}
      <section className="py-24 px-6 bg-main-bg">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 text-lg">A seamless workflow connecting all stakeholders to ensure zero pharmaceutical waste escapes into the environment.</p>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-gray-100 rounded-2xl shadow-inner max-w-md w-full">
              {(['Household', 'Pharmacy', 'Regulator'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-xl transition-all ${
                    activeTab === tab
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {activeTab === 'Household' && (
                <motion.div
                  key="household"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 items-center w-full"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-light-green text-primary rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">For Households</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                        <p className="text-gray-600">Snap a photo of unused, leftover and expired medicines using the Smart Report app.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                        <p className="text-gray-600">AI auto-classifies the waste and identifies nearby drop-off points.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                        <p className="text-gray-600">Drop off at verified pharmacies and earn 'Green Citizen' badges.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64 relative group">
                    <img src="/images/household.png" alt="Household user taking photo of medicine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'Pharmacy' && (
                <motion.div
                  key="pharmacy"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 items-center w-full"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-light-green text-primary rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">For Pharmacies</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                        <p className="text-gray-600">Register as an official collection node on the network map.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                        <p className="text-gray-600">Log incoming household waste quickly via the intuitive dashboard.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                        <p className="text-gray-600">Automate pickup requests when storage bins reach capacity.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64 relative group">
                    <img src="/images/pharmacy.png" alt="Pharmacist logging waste" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'Regulator' && (
                <motion.div
                  key="regulator"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 items-center w-full"
                >
                   <div className="space-y-6">
                    <div className="w-12 h-12 bg-light-green text-primary rounded-xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">For Regulators</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">1</span>
                        <p className="text-gray-600">Monitor Lagos across a centralized, real-time hotspot map.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">2</span>
                        <p className="text-gray-600">Receive predictive alerts on unclassified or high-risk reports.</p>
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mr-3 mt-0.5">3</span>
                        <p className="text-gray-600">Track end-to-end recovery metrics and compliance rates.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64 relative group">
                    <img src="/images/regulator.png" alt="Regulator monitoring map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="rounded-3xl shadow-2xl relative z-10 overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                <img src="/images/ai_core.png" alt="Intelligence at the core" className="w-full h-auto object-cover" />
             </div>
             {/* Decorative Elements */}
             <div className="absolute -z-10 top-1/2 -left-8 w-16 h-16 bg-accent rounded-full blur-xl opacity-50"></div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-light-green text-primary rounded-full text-sm font-semibold mb-2">
              <Brain className="w-4 h-4 mr-2" />
              Powered by AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Intelligence at the Core
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Our platform doesn't just record data—it analyzes it. Our smart algorithms ensure that regulators and pharmacies stay one step ahead of environmental risks.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { title: 'Waste Classification', desc: 'Instantly categorize uploads from blister packs to syrups with high confidence.', icon: <Layers /> },
                { title: 'Environmental Risk Scoring', desc: 'Predictive scoring prioritizing urgent pickups based on toxicity and proximity to water.', icon: <AlertTriangle /> },
                { title: 'Geospatial Hotspot Detection', desc: 'Real-time clustering reveals emerging dumping zones across Lagos.', icon: <MapPin /> }
              ].map((feature, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-light-green text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{feature.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to make an impact?</h2>
          <p className="text-primary-100 text-lg text-green-100 opacity-90 max-w-xl mx-auto">
            Whether you are a citizen looking to safely dispose of medicine, or a pharmacy acting as a collection hub, we need you.
          </p>
          <div className="pt-4 flex justify-center">
             <Link to="/signup" className="px-8 py-4 bg-white text-primary text-base font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg flex items-center">
               Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight mt-1 text-left">
              <span className="font-bold text-xl text-white tracking-tight">
                PharmaWaste Watch
              </span>
              <span className="text-[10px] font-medium text-white/70 mt-0.5">
                An Innovation of PharmaEco
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400 font-medium">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PharmaWaste Watch Lagos. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
