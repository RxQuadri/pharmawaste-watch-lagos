import { Map as MapIcon, ShieldAlert, BarChart3, Users, ChevronRight, X, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RegulatorDashboard() {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const stats = [
    { title: 'Active Hotspots', value: '6', icon: <MapIcon className="w-6 h-6 text-red-500" />, trend: 'Needs investigation' },
    { title: 'High Risk Reports', value: '42', icon: <ShieldAlert className="w-6 h-6 text-amber-500" />, trend: 'Last 7 days' },
    { title: 'Total Recovered (kg)', value: '1,240', icon: <BarChart3 className="w-6 h-6 text-primary" />, trend: '+8% vs last month' },
    { title: 'Compliant Pharmacies', value: '89%', icon: <Users className="w-6 h-6 text-primary" />, trend: 'Out of 450 registered' },
  ];

  const alerts = [
    { 
      id: 1, 
      title: 'Cluster Detected: Ikeja', 
      location: 'Ikeja',
      desc: 'AI flagged a 40% increase in antibiotic disposal near public drainage systems.',
      details: 'Multiple reports from the Ikeja industrial area indicate improper disposal of bulk expired liquid medications. High risk of groundwater contamination.',
      severity: 'High'
    },
    { 
      id: 2, 
      title: 'Anomaly Detected: Mushin', 
      location: 'Mushin',
      desc: 'Irregularities flagged in community pharmacy collection volumes compared to baseline.',
      details: 'Data shows a 60% drop in expected returns from registered hubs in Mushin. Suspected unauthorized disposal routes are being monitored.',
      severity: 'Medium'
    },
    { 
      id: 3, 
      title: 'Hotspot Warning: Yaba', 
      location: 'Yaba',
      desc: 'High concentration of expired liquid waste reported by households.',
      details: 'Residential clusters in Yaba are consistently reporting uncollected pharmaceutical waste. Primary schools in the vicinity are at risk.',
      severity: 'Medium'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulator Command Center</h1>
          <p className="text-gray-500 mt-1">Monitor Lagos-wide waste reports, AI hotspot predictions, and compliance.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stylized SVG Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-900">Lagos AI Hotspot Overview</h2>
             <button 
               onClick={() => navigate('/regulator/map')}
               className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center"
             >
               Open Map
               <ChevronRight className="w-4 h-4 ml-1" />
             </button>
          </div>
          <div className="flex-1 bg-slate-900 rounded-2xl border border-gray-800 relative overflow-hidden group">
             {/* Simple SVG Map of Lagos (stylized path) */}
             <svg className="absolute inset-0 w-full h-full opacity-40 p-4" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 350C100 350 150 400 200 400C250 400 300 380 350 380C400 380 450 420 500 420C550 420 600 350 750 350" stroke="#168a5b" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M100 100C150 120 200 80 250 80C300 80 350 120 400 150C450 180 500 150 550 150C600 150 650 200 700 250L750 350H50L100 100Z" fill="#168a5b" fillOpacity="0.1" stroke="#168a5b" strokeWidth="1" />
             </svg>

             {/* Pulse Points */}
             <div className="absolute top-1/2 left-1/4">
                <div className="relative">
                   <div className="absolute -inset-4 bg-red-500 rounded-full animate-ping opacity-25" />
                   <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg" />
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-red-100 whitespace-nowrap bg-red-500/20 px-2 py-0.5 rounded backdrop-blur-sm">IKEJA ALERT</span>
                </div>
             </div>

             <div className="absolute top-2/3 left-1/2">
                <div className="relative">
                   <div className="absolute -inset-3 bg-amber-500 rounded-full animate-ping opacity-25" />
                   <div className="w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg" />
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-amber-100 whitespace-nowrap bg-amber-500/20 px-2 py-0.5 rounded backdrop-blur-sm">MUSHIN HUB</span>
                </div>
             </div>

             <div className="absolute top-1/3 left-2/3">
                <div className="relative">
                   <div className="absolute -inset-3 bg-primary rounded-full animate-ping opacity-25" />
                   <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg" />
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary-100 whitespace-nowrap bg-primary/20 px-2 py-0.5 rounded backdrop-blur-sm">LEKKI STABLE</span>
                </div>
             </div>

             {/* Map Overlay Text */}
             <div className="absolute bottom-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Live AI Monitoring</p>
                <p className="text-white text-sm font-bold">Scanning 450+ Disposal Hubs</p>
             </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
             High Risk Alerts
             <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[10px] font-black rounded-lg uppercase underline decoration-2 underline-offset-2">Live</span>
          </h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${alert.id === 1 ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                 <div className="flex items-start">
                    <ShieldAlert className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${alert.id === 1 ? 'text-red-500' : 'text-amber-500'}`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">{alert.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{alert.desc}</p>
                      <button 
                        onClick={() => setSelectedAlert(alert)}
                        className={`mt-3 text-xs font-black uppercase tracking-wider flex items-center ${alert.id === 1 ? 'text-red-600 hover:text-red-700' : 'text-amber-600 hover:text-amber-700'}`}
                      >
                        Investigate
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident details Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
             >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                   <h3 className="text-xl font-black text-gray-900">Incident Report Details</h3>
                   <button onClick={() => setSelectedAlert(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X className="w-5 h-5 text-gray-400" />
                   </button>
                </div>
                <div className="p-8 space-y-6">
                   <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedAlert.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                         <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Severity: {selectedAlert.severity}</p>
                         <h4 className="text-lg font-black text-gray-900">{selectedAlert.location} Area Cluster</h4>
                      </div>
                   </div>

                   <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-gray-700 font-medium leading-relaxed">
                        {selectedAlert.details}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                         <p className="text-[10px] font-black text-gray-400 uppercase">Detection Time</p>
                         <p className="text-sm font-bold text-gray-900">14:32 PM Today</p>
                      </div>
                      <div className="p-4 bg-white border border-gray-100 rounded-2xl">
                         <p className="text-[10px] font-black text-gray-400 uppercase">Confidence Score</p>
                         <p className="text-sm font-bold text-primary">94% Neural Sync</p>
                      </div>
                   </div>

                   <div className="flex space-x-4">
                      <button 
                        onClick={() => setSelectedAlert(null)}
                        className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
                      >
                         Dismiss
                      </button>
                      <button 
                         onClick={() => {
                           alert('Dispatching Field Agent to Location...');
                           setSelectedAlert(null);
                         }}
                         className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent transition-all"
                      >
                         Take Action
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
