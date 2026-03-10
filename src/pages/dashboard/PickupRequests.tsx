import { Truck, Calendar, MapPin, User, CheckCircle2, Clock, ChevronRight, Download, AlertCircle, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockPickups = [
  { 
    id: 'PKP-782', 
    date: 'Mar 12, 2026', 
    time: '14:30', 
    status: 'Scheduled', 
    driver: 'Sunday Akpan', 
    vehicle: 'Lagos Waste Logistics - Van 04',
    items: '12kg (Solid Meds)',
    location: 'Medplus Mushin - Main Loading Dock'
  },
  { 
    id: 'PKP-755', 
    date: 'Mar 05, 2026', 
    time: '10:15', 
    status: 'Completed', 
    driver: 'Boluwatife John', 
    vehicle: 'Lagos Waste Logistics - Van 02',
    items: '8.5kg (Packaging)',
    location: 'Medplus Mushin - Main Loading Dock'
  },
  { 
    id: 'PKP-721', 
    date: 'Feb 26, 2026', 
    time: '16:00', 
    status: 'Completed', 
    driver: 'Chukwuma Obi', 
    vehicle: 'Lagos Waste Logistics - Truck 09',
    items: '22kg (Mixed)',
    location: 'Medplus Mushin - Main Loading Dock'
  },
];

export default function PickupRequests() {
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pickup Requests</h1>
          <p className="text-gray-500 mt-1">Track and manage bulk waste collection by logistics partners.</p>
        </div>
        <div className="flex space-x-3">
           <button 
             onClick={() => setIsHistoryOpen(true)}
             className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center"
           >
             <Calendar className="w-4 h-4 mr-2 text-primary" />
             Schedule History
           </button>
           <button 
             onClick={() => setIsNewRequestOpen(true)}
             className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 flex items-center"
           >
             <Plus className="w-4 h-4 mr-2" />
             New Request
           </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isNewRequestOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900">New Pickup Request</h3>
                <button onClick={() => { setIsNewRequestOpen(false); setRequestStatus('idle'); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-8">
                {requestStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">Request Submitted!</h4>
                    <p className="text-gray-500 mb-8">A logistics partner will confirm your window shortly.</p>
                    <button 
                      onClick={() => setIsNewRequestOpen(false)}
                      className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Waste Volume (Estimated kg)</label>
                       <input type="number" placeholder="Enter weight..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Pickup Date</label>
                       <input type="date" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold" />
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start">
                       <AlertCircle className="w-5 h-5 text-amber-500 mr-3 mt-0.5 shrink-0" />
                       <p className="text-xs text-amber-700 font-medium">Please ensure all hazardous items are separated and labeled as per Lagos Environmental guidelines.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setRequestStatus('submitting');
                        setTimeout(() => setRequestStatus('success'), 1500);
                      }}
                      disabled={requestStatus === 'submitting'}
                      className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent transition-all flex items-center justify-center disabled:opacity-50"
                    >
                      {requestStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : 'Confirm Request'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {isHistoryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white h-full w-full max-w-md absolute right-0 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <h3 className="text-xl font-black text-gray-900">Schedule History</h3>
                <button onClick={() => setIsHistoryOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {[
                  { date: 'Mar 15, 2026', status: 'Scheduled', agent: 'LAWMA Plus' },
                  { date: 'Feb 28, 2026', status: 'Completed', agent: 'Eco-Express' },
                  { date: 'Feb 12, 2026', status: 'Completed', agent: 'LAWMA Plus' },
                  { date: 'Jan 25, 2026', status: 'Completed', agent: 'Green Logistics' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-primary/30 transition-all">
                    <div className="flex items-center">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${item.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-600'}`}>
                          {item.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">{item.date}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase">{item.agent}</p>
                       </div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.status === 'Completed' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-600'}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                ))}
                
                <button 
                  onClick={() => alert('Downloading full history...')}
                  className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 font-bold rounded-2xl hover:border-primary hover:text-primary transition-all flex items-center justify-center"
                >
                   <Download className="w-4 h-4 mr-2" />
                   Download Full History (PDF)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Active Request Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center md:justify-between gap-6">
         <div className="flex items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-primary/10 mr-5 shadow-sm">
               <Truck className="w-7 h-7 text-primary" />
            </div>
            <div>
               <h3 className="font-black text-gray-900 leading-tight">Next Pickup Scheduled</h3>
               <p className="text-sm text-gray-500 font-medium">Your next window is in 2 days (Mar 12)</p>
            </div>
         </div>
         <div className="flex items-center space-x-8">
            <div className="text-center md:text-left">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned Driver</p>
               <p className="text-sm font-black text-gray-900">Sunday Akpan</p>
            </div>
            <div className="text-center md:text-left">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
               <p className="text-sm font-black text-primary uppercase">14:30 - 15:00</p>
            </div>
         </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 flex items-center">
           Request History
           <span className="ml-3 px-2 py-0.5 bg-gray-100 text-[10px] font-black rounded-lg text-gray-500 uppercase">Total 12</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
           {mockPickups.map((pickup) => (
             <div key={pickup.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-primary/30 transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex-1">
                      <div className="flex items-center justify-between md:justify-start md:space-x-4 mb-4">
                         <span className="text-xs font-black text-primary px-2 py-1 bg-primary/5 rounded-lg border border-primary/10">#{pickup.id}</span>
                         <div className="flex items-center">
                            {pickup.status === 'Completed' ? (
                              <div className="flex items-center text-primary">
                                 <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                 <span className="text-xs font-black uppercase tracking-wider">Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-500">
                                 <Clock className="w-4 h-4 mr-1.5" />
                                 <span className="text-xs font-black uppercase tracking-wider">Scheduled</span>
                              </div>
                            )}
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                         <div className="flex items-start">
                            <Calendar className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Pickup Date</p>
                               <p className="text-sm font-bold text-gray-900">{pickup.date}</p>
                            </div>
                         </div>
                         <div className="flex items-start">
                            <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Collection Point</p>
                               <p className="text-sm font-bold text-gray-900 truncate max-w-[150px]">{pickup.location}</p>
                            </div>
                         </div>
                         <div className="flex items-start">
                            <User className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Personnel</p>
                               <p className="text-sm font-bold text-gray-900">{pickup.driver}</p>
                            </div>
                         </div>
                         <div className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-gray-400 mr-3 mt-0.5" />
                            <div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Volume</p>
                               <p className="text-sm font-bold text-gray-900">{pickup.items}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex md:flex-col justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                      <button 
                        onClick={() => alert(`Downloading manifest for ${pickup.id}...`)}
                        className="flex-1 md:flex-none px-4 py-2 text-xs font-black text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-center"
                      >
                         Manifest
                         <ChevronRight className="w-3 h-3 ml-1" />
                      </button>
                      <button 
                        onClick={() => alert('Connecting to logistics help desk...')}
                        className="flex-1 md:flex-none px-4 py-2 text-xs font-black text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
                      >
                        Support
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
