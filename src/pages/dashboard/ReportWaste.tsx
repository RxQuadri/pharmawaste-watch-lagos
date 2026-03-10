import { useState, useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { Camera, CheckCircle2, Sparkles, AlertCircle, RefreshCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HouseholdReport() {
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pin, setPin] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [aiResult, setAiResult] = useState<{ category: string; risk: string; points: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    startAIScan(file.name);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const startAIScan = (fileName: string) => {
    setIsScanning(true);
    setAiResult(null);
    
    // 3-second mock AI analysis
    setTimeout(() => {
      const isSolid = fileName.toLowerCase().includes('tablet') || fileName.toLowerCase().includes('pill') || Math.random() > 0.5;
      
      const result = {
        category: isSolid ? 'Solid Medications (Tablets/Capsules)' : 'Empty Packaging (Blister packs/Bottles)',
        risk: isSolid ? 'Requires Safe Disposal' : 'Recyclability: High',
        points: isSolid ? 50 : 20
      };
      
      setAiResult(result);
      setCategory(result.category);
      setIsScanning(false);
    }, 3000);
  };

  const handleGeneratePin = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    // Final PIN generation
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(generatedPin);
  };

  const resetScan = () => {
    setImagePreview(null);
    setAiResult(null);
    setIsScanning(false);
    setCategory('');
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-12">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center md:justify-start">
          <Sparkles className="w-8 h-8 text-primary mr-3" />
          AI Smart Scan
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Use our AI to classify your waste and earn maximum points.</p>
      </div>

      <AnimatePresence mode="wait">
        {!pin ? (
          <motion.div
            key="scanner-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 overflow-hidden relative"
          >
            {!imagePreview && !isScanning ? (
              /* Drag & Drop Zone */
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-4 border-dashed border-gray-100 rounded-[1.5rem] p-12 text-center hover:border-primary/30 hover:bg-light-green/20 transition-all group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleInputChange} 
                  accept="image/*" 
                />
                <div className="w-20 h-20 bg-light-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Photo for AI Scan</h3>
                <p className="text-gray-500 max-w-xs mx-auto">Drag and drop a clear photo of your medicine or packaging to start detection.</p>
                <div className="mt-8">
                  <span className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 group-hover:bg-accent transition-colors">Select Image</span>
                </div>
              </div>
            ) : isScanning ? (
              /* Scanning UI */
              <div className="relative py-12 text-center">
                <div className="relative w-64 h-64 mx-auto rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                  {imagePreview && (
                    <img src={imagePreview} alt="Scanning" className="w-full h-full object-cover blur-[2px]" />
                  )}
                  {/* Laser Scan Animation */}
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_rgba(22,138,91,1)] z-10"
                  />
                  <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                </div>
                <div className="mt-8 flex flex-col items-center">
                  <RefreshCcw className="w-8 h-8 text-primary animate-spin mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Analyzing Image... {category ? '' : ''}</h3>
                  <p className="text-gray-500 mt-2">Our AI is classifying the medication and assessing risks.</p>
                </div>
              </div>
            ) : (
              /* AI Results Card */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-primary bg-light-green px-4 py-2 rounded-full border border-primary/10">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">AI Analysis Complete</span>
                  </div>
                  <button onClick={resetScan} className="text-gray-400 hover:text-red-500 transition-colors">
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 shrink-0">
                      {imagePreview && <img src={imagePreview} alt="Result" className="w-full h-full object-cover" />}
                   </div>
                   <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detected Category</span>
                        <h4 className="text-2xl font-black text-gray-900 leading-tight">{aiResult?.category}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                         <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${
                           aiResult?.risk.includes('High') ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                         }`}>
                           {aiResult?.risk ?? ''}
                         </span>
                         <span className="px-4 py-1.5 rounded-full text-xs font-black bg-light-green text-primary border border-primary/10">
                           Estimated Points: +{aiResult?.points ?? 0}
                         </span>
                      </div>

                      <div className="pt-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Adjust Quantity</label>
                        <div className="flex items-center space-x-4">
                          <input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-24 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:ring-primary focus:border-primary transition-all"
                          />
                          <span className="text-sm text-gray-500 font-medium">Items / Packs</span>
                        </div>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={handleGeneratePin}
                    className="w-full flex justify-center items-center py-5 px-4 rounded-[1.25rem] shadow-2xl shadow-primary/30 text-lg font-black text-white bg-primary hover:bg-accent hover:-translate-y-1 active:translate-y-0 transition-all"
                  >
                    Confirm & Generate PIN
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] shadow-2xl border-2 border-primary/10 p-8 text-center"
          >
            <div className="w-24 h-24 bg-light-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2 capitalize">Waste Logged!</h2>
            <p className="text-gray-500 mb-10 text-lg">Your unique drop-off PIN is ready.</p>
            
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[1.5rem] p-8 mb-8 inline-block">
              <span className="text-6xl font-mono font-black tracking-[0.3em] text-primary">{pin}</span>
            </div>
            
            <div className="bg-light-green/30 rounded-xl p-5 border border-primary/10 mb-8 text-left flex items-start">
               <AlertCircle className="w-6 h-6 text-primary mr-4 shrink-0 mt-1" />
               <p className="text-gray-700 font-bold leading-relaxed">
                 Present this PIN to the verified pharmacy during drop-off. Once verified, your <span className="text-primary">+{aiResult?.points || 50} points</span> will be added to your account.
               </p>
            </div>

            <button
               onClick={() => {
                 setPin(null);
                 resetScan();
               }}
               className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 font-black rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Log Another Waste Item
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
