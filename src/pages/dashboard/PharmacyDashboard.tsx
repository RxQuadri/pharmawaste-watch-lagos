import { AlertCircle, FileText, CheckCircle2, TrendingUp, Medal, Trophy, Calendar, Download, Plus, X, Award } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function PharmacyDashboard() {
  const navigate = useNavigate();
  const [showTiersModal, setShowTiersModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [pickupDate, setPickupDate] = useState('');

  const stats = [
    { title: 'Pending Collections', value: '24', icon: <AlertCircle className="w-6 h-6 text-amber-500" />, trend: 'Action required' },
    { title: 'Processed Intake', value: '156', icon: <CheckCircle2 className="w-6 h-6 text-primary" />, trend: '+12% vs last month' },
    { title: 'Active Requests', value: '3', icon: <FileText className="w-6 h-6 text-primary" />, trend: 'Awaiting distributor' },
    { title: 'Recovery Score', value: '94%', icon: <TrendingUp className="w-6 h-6 text-primary" />, trend: 'Excellent rating' },
  ];

  const tiers = [
    { name: 'Pilot Participant', range: '0 - 10kg', benefit: 'Official collection bin provided.', icon: <Award className="w-6 h-6" />, pts: 0 },
    { name: 'Community Hub', range: '11 - 50kg', benefit: 'Featured on the public "Find a Pharmacy" map as a trusted partner.', icon: <Medal className="w-6 h-6" />, pts: 11 },
    { name: 'Zero-Waste Champion', range: '51 - 100kg', benefit: 'Priority waste pickups and digital certificate.', icon: <Trophy className="w-6 h-6" />, pts: 51 },
    { name: 'Sustainability Leader', range: '100+ kg', benefit: 'Plaque of recognition from the State environmental board.', icon: <Trophy className="w-6 h-6 text-amber-500" />, pts: 100 },
  ];

  const currentWeight = 32.5; // kg
  const currentTierIndex = 1;

  const handleDownloadReport = () => {
    alert('Downloading Weekly Collection CSV...');
  };

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Waste pickup request submitted for ${pickupDate}`);
    setShowPickupModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Operations</h1>
          <p className="text-gray-500 mt-1">Manage intake, collections, and track your recovery metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
           <button 
             onClick={() => setShowPickupModal(true)}
             className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center"
           >
             <Calendar className="w-4 h-4 mr-2 text-primary" />
             Schedule Pickup
           </button>
           <button 
             onClick={() => navigate('/pharmacy/record-intake')}
             className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 flex items-center"
           >
             <Plus className="w-4 h-4 mr-2" />
             Record Intake
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats and Hub Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.slice(0, 2).map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-light-green rounded-xl flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-2">{stat.trend}</p>
              </div>
            ))}
          </div>

          {/* Collection Hub Status Card */}
          <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Medal className="w-32 h-32" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                     <Medal className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Collection Hub Status</h2>
                    <p className="text-white/70 text-sm">Tier: {tiers[currentTierIndex].name}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-4xl font-black">{currentWeight} <span className="text-lg font-normal text-white/60">kg collected</span></p>
                    </div>
                    <button 
                      onClick={() => setShowTiersModal(true)}
                      className="text-sm font-bold bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10"
                    >
                      View All Tiers
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-3 bg-black/20 rounded-full overflow-hidden border border-white/10">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(currentWeight / 50) * 100}%` }}
                         className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                       />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-white/60 uppercase tracking-widest">
                       <span>{tiers[currentTierIndex].pts}kg (Min)</span>
                       <span>Target: 50kg</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Recent Queue */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Recent Intake Queue</h2>
              <Link to="/pharmacy/history" className="text-sm font-medium text-primary hover:text-accent">View all</Link>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 mr-4">
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Intake #{2040 + i}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Household Drop-off • 2 items</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      Pending
                    </span>
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick actions and remaining stats */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
             {stats.slice(2, 4).map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-light-green rounded-xl flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-2">{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 font-black uppercase tracking-tight">Management Actions</h2>
            <div className="space-y-4">
              <Link to="/pharmacy/record-intake" className="w-full py-4 px-4 bg-primary/5 text-primary border border-primary/10 rounded-2xl text-sm font-black hover:bg-primary/10 transition-all flex items-center justify-center uppercase tracking-widest">
                <Plus className="w-5 h-5 mr-3" />
                Record New Intake
              </Link>
              <button 
                onClick={() => setShowPickupModal(true)}
                className="w-full py-4 px-4 bg-gray-50 border border-gray-100 text-gray-900 rounded-2xl text-sm font-black hover:bg-gray-100 transition-all flex items-center justify-center uppercase tracking-widest"
              >
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                Request Pickup
              </button>
              <button 
                onClick={handleDownloadReport}
                className="w-full py-4 px-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all flex items-center justify-center uppercase tracking-widest"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pharmacy Tiers Modal */}
      <AnimatePresence>
        {showTiersModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTiersModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="fixed inset-0 m-auto w-full max-w-lg h-fit max-h-[90vh] bg-white rounded-[32px] shadow-2xl z-[110] overflow-hidden flex flex-col p-8"
            >
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Pharmacy Tiers</h2>
                    <p className="text-gray-500">Your path to a Zero-Waste Leader</p>
                  </div>
                  <button onClick={() => setShowTiersModal(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {tiers.map((tier, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border transition-all ${idx === currentTierIndex ? 'bg-light-green border-primary shadow-md scale-[1.02]' : 'bg-gray-50 border-gray-100'}`}>
                       <div className="flex items-start justify-between">
                         <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${idx === currentTierIndex ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                               {tier.icon}
                            </div>
                            <div>
                               <div className="flex items-center">
                                  <h4 className="font-black text-gray-900">{tier.name}</h4>
                                  {idx === currentTierIndex && <span className="ml-2 px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-wider">Current</span>}
                               </div>
                               <p className="text-xs font-bold text-primary tracking-widest uppercase mt-1">{tier.range}</p>
                            </div>
                         </div>
                       </div>
                       <p className="text-sm text-gray-600 mt-4 leading-relaxed font-medium">{tier.benefit}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pickup Request Modal */}
      <AnimatePresence>
        {showPickupModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPickupModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-[32px] shadow-2xl z-[110] overflow-hidden flex flex-col p-8"
            >
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Schedule Waste Pickup</h2>
                  <button onClick={() => setShowPickupModal(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>

               <form onSubmit={handlePickupSubmit} className="space-y-6">
                 <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Select Pickup Date</label>
                    <input 
                      type="date" 
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-gray-900 font-bold transition-all"
                    />
                 </div>
                 <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 font-medium leading-relaxed">
                      Please ensure all waste items are securely bagged and tagged with your hub's unique identifier before the logistics partner arrives.
                    </p>
                 </div>
                 <button 
                   type="submit"
                   className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:bg-accent transition-all uppercase tracking-widest"
                 >
                   Submit Request
                 </button>
               </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
