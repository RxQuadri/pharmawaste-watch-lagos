import { Map as MapIcon, Hexagon, Activity, ShieldAlert, ChevronDown, Check, Download, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegulatorMap() {
  const [timeFilter, setTimeFilter] = useState('Last 7 Days');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filterOptions = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days'];

  const hotspots = [
    { area: 'Ikeja', intensity: 'High', reports: 124, trend: '+15%' },
    { area: 'Surulere', intensity: 'Medium', reports: 86, trend: '+2%' },
    { area: 'Yaba', intensity: 'Medium', reports: 62, trend: '-5%' },
    { area: 'Lekki', intensity: 'Low', reports: 24, trend: '-10%' },
  ];

  // Close filter on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hotspot Monitoring Map</h1>
          <p className="text-gray-500 mt-1">AI-driven visualization of pharmaceutical waste density across Lagos.</p>
        </div>
        <div className="flex space-x-3 items-center">
           <div className="relative" ref={filterRef}>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold flex items-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                {timeFilter}
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                  >
                    {filterOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setTimeFilter(opt);
                          setIsFilterOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm font-bold text-left hover:bg-gray-50 flex items-center justify-between group"
                      >
                        <span className={timeFilter === opt ? 'text-primary' : 'text-gray-600'}>{opt}</span>
                        {timeFilter === opt && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
           
           <button 
             onClick={() => alert('Downloading Hotspot Coordinates CSV...')}
             className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center shadow-sm"
           >
             <Download className="w-4 h-4 mr-2" />
             Export Data
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden flex flex-col min-h-[500px] relative">
           <div className="absolute top-4 left-4 z-10 flex space-x-2">
             <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-semibold flex items-center">
               <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> High Risk
             </div>
             <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-semibold flex items-center">
               <span className="w-2 h-2 rounded-full bg-amber-500 mr-2"></span> Medium Risk
             </div>
             <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-semibold flex items-center">
               <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Low Risk
             </div>
           </div>

           {/* Abstract Map Visualization */}
           <div className="flex-1 rounded-xl overflow-hidden bg-slate-50 border border-gray-100 relative">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#168a5b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             {/* Simulating Map Nodes / Hotspots */}
             <div className="absolute top-1/4 left-1/3 p-4 flex flex-col items-center">
                <div className="w-24 h-24 bg-red-500/20 rounded-full animate-pulse flex items-center justify-center">
                   <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg border-2 border-white"></div>
                </div>
                <span className="mt-1 text-xs font-bold text-gray-900 bg-white/80 px-2 py-0.5 rounded shadow-sm">Ikeja Alert</span>
             </div>

             <div className="absolute bottom-1/3 right-1/4 p-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
                   <div className="w-6 h-6 bg-amber-500 rounded-full shadow-lg border-2 border-white"></div>
                </div>
                <span className="mt-1 text-xs font-bold text-gray-900 bg-white/80 px-2 py-0.5 rounded shadow-sm">Surulere</span>
             </div>

             <div className="absolute top-1/2 left-2/3 p-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                   <div className="w-5 h-5 bg-amber-500 rounded-full shadow-lg border-2 border-white"></div>
                </div>
                <span className="mt-1 text-xs font-bold text-gray-900 bg-white/80 px-2 py-0.5 rounded shadow-sm">Yaba</span>
             </div>

             <div className="absolute top-1/3 left-1/4 p-4 flex flex-col items-center cursor-pointer">
                <MapIcon className="w-8 h-8 text-primary drop-shadow-md" fill="#eaf7f0" />
             </div>
             <div className="absolute bottom-1/4 left-1/2 p-4 flex flex-col items-center cursor-pointer">
                <MapIcon className="w-8 h-8 text-primary drop-shadow-md" fill="#eaf7f0" />
             </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
               <Activity className="w-5 h-5 mr-2 text-primary" />
               Emerging Zones
            </h2>
            <div className="space-y-4">
              {hotspots.map((spot, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center">
                      <Hexagon className={`w-4 h-4 mr-1.5 ${spot.intensity === 'High' ? 'text-red-500 fill-red-500/20' : spot.intensity === 'Medium' ? 'text-amber-500 fill-amber-500/20' : 'text-green-500 fill-green-500/20'}`} />
                      {spot.area}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{spot.reports} recent reports</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${spot.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {spot.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl shadow-sm text-white p-6 relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-10">
               <ShieldAlert className="w-32 h-32" />
             </div>
             <h3 className="font-bold text-lg mb-2 relative z-10">AI Insight</h3>
             <p className="text-sm opacity-90 relative z-10">
               Based on location density, Ikeja is currently experiencing a 15% spike in unclassified liquid waste. Recommend immediate deployment of targeted collection drives in this zone to prevent drainage contamination.
             </p>
             <button 
               onClick={() => {
                 setShowToast(true);
                 setTimeout(() => setShowToast(false), 3000);
               }}
               className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-colors backdrop-blur relative z-10 flex items-center"
             >
               <Send className="w-4 h-4 mr-2" />
               Deploy Task Force
             </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center border border-white/10"
          >
             <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                <Check className="w-5 h-5 text-white" />
             </div>
             <div>
                <p className="font-bold text-sm">Deployment Successful</p>
                <p className="text-xs text-gray-400">Task Force successfully dispatched to target coordinates.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
