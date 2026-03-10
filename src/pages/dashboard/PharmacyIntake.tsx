import { useState } from 'react';
import { PackageCheck, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PharmacyIntake() {
  const [pin, setPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setError('PIN must be exactly 4 digits.');
      return;
    }

    setError('');
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      setPin('');
      
      // Auto-hide success modal/toast after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Record Waste Intake</h1>
        <p className="text-gray-500 mt-1">Verify household drop-offs and credit users their environmental points.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center mb-8">
             <div className="w-16 h-16 bg-light-green rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
               <KeyRound className="w-8 h-8" />
             </div>
          </div>
          
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Enter Drop-off PIN</h2>
            <p className="text-sm text-gray-500">Ask the citizen for the 4-digit verification code from their app.</p>
          </div>

          <div>
            <input
              type="text"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="0000"
              className="block w-full text-center text-4xl tracking-[1em] font-mono py-4 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary bg-gray-50 focus:bg-white transition-colors"
            />
            {error && <p className="mt-2 text-sm text-red-600 text-center flex items-center justify-center"><AlertCircle className="w-4 h-4 mr-1" /> {error}</p>}
          </div>

          <button
            type="submit"
            disabled={isVerifying || pin.length !== 4}
            className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/30 text-base font-bold text-white bg-primary hover:bg-accent focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isVerifying ? (
               <span className="flex items-center">
                 <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Verifying...
               </span>
            ) : (
               <span className="flex items-center">
                 <PackageCheck className="w-5 h-5 mr-2" />
                 Verify & Credit User
               </span>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex"
          >
            <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-gray-800 pointer-events-auto">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-bold text-base">Drop-off Verified!</p>
                <p className="text-gray-400 text-sm mt-0.5">Points have been credited to the user's account.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
