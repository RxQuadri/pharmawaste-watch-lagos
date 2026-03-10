import { ArrowLeft, User, Phone, Clipboard, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecordIntake() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/pharmacy/dashboard'), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/pharmacy/dashboard" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Record New Intake</h1>
            <p className="text-gray-500 font-medium">Manually log a waste collection for a visitor.</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
             <Clipboard className="w-6 h-6" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Resident Info */}
              <div className="space-y-6">
                 <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Resident Details</h3>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-700 ml-1">Resident Full Name</label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Tunde Bakare" 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
                       <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input 
                            type="tel" 
                            required
                            placeholder="0812 345 6789" 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" 
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Waste Info */}
              <div className="space-y-6">
                 <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Waste Details</h3>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-700 ml-1">Waste Category</label>
                       <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all appearance-none cursor-pointer">
                          <option>Solid Medications</option>
                          <option>Empty Packaging</option>
                          <option>Mixed Waste</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-700 ml-1">Weight (kg)</label>
                       <input 
                         type="number" 
                         step="0.01"
                         required
                         placeholder="0.00" 
                         className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white text-sm font-bold transition-all" 
                       />
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                By processing this intake, you confirm that you have visually inspected the pharmaceutical waste and it meets the platform's safety guidelines for collection.
              </p>
           </div>

           <button 
             type="submit" 
             disabled={isSubmitting || isSuccess}
             className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center ${isSuccess ? 'bg-primary text-white' : 'bg-primary text-white hover:bg-accent active:scale-[0.98] shadow-primary/20'}`}
           >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <div className="flex items-center">
                   <CheckCircle2 className="w-5 h-5 mr-3" />
                   Intake Processed!
                </div>
              ) : (
                <div className="flex items-center">
                   <Save className="w-5 h-5 mr-3" />
                   Complete Intake
                </div>
              )}
           </button>
        </form>
      </div>

      <AnimatePresence>
         {isSuccess && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
             className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center z-50"
           >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                 <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                 <p className="font-black text-sm">Success!</p>
                 <p className="text-xs text-white/60">Points awarded to resident. Redirecting...</p>
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
