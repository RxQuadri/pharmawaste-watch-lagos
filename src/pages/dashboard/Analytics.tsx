import { TrendingUp, Download, Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Analytics() {
  const [isExporting, setIsExporting] = useState(false);
  const [expandedKpi, setExpandedKpi] = useState<number | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('PharmaWaste Environmental Impact Report (PDF) has been generated and downloaded to your local drive.');
    }, 2000);
  };

  const kpis = [
    { label: 'CO2 Emission Avoided', value: '14.2 Tons', trend: 'up', color: 'primary', details: 'Equivalent to planting 645 trees across the Lagos Metropolitan area.' },
    { label: 'Toxic Chem Sequestration', value: '840 kg', trend: 'up', color: 'accent', details: 'Prevented from entering groundwater reserves in Mainland and Island districts.' },
    { label: 'Illegal Disposal Prevention', value: '92%', trend: 'up', color: 'green', details: 'Successfully diverted from public drainages through the take-back program.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Environmental Analytics</h1>
          <p className="text-gray-500 mt-1">Advanced data visualization for sustainability and impact metrics.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={`flex items-center px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-accent transition-all shadow-lg shadow-primary/20 ${isExporting ? 'opacity-70 cursor-wait' : ''}`}
        >
          {isExporting ? (
             <>
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
               Processing...
             </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Sustainability Trends</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Waste Recovery Volume (kg)</p>
            </div>
            <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% MoM
            </div>
          </div>
          <div className="h-64 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden px-8">
             {/* Abstract Chart with labels */}
             <div className="flex items-end space-x-4 h-48 w-full pb-2 relative z-10">
                {[40, 65, 45, 90, 55, 75, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                    <div 
                      className="w-full bg-primary/20 rounded-t-lg transition-all duration-700 hover:bg-primary cursor-pointer relative" 
                      style={{ height: `${h}%` }}
                      onClick={() => alert(`Week ${i + 1}: ${h * 10}kg recovered`)}
                    >
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h*10}kg
                       </div>
                    </div>
                    <span className="text-[8px] font-black text-gray-400 mt-2 uppercase tracking-tighter">Wk {i+1}</span>
                  </div>
                ))}
             </div>
             
             {/* Grid Lines */}
             <div className="absolute inset-0 px-8 py-10 flex flex-col justify-between opacity-30">
                {[1,2,3,4].map(l => <div key={l} className="w-full border-t border-dashed border-gray-200" />)}
             </div>

             <p className="absolute text-[10px] font-black text-primary uppercase tracking-widest top-4 right-6 opacity-30 italic">Live Feed</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <h3 className="text-lg font-bold text-gray-900 mb-6">Key Performance Indicators</h3>
           <div className="space-y-4">
              {kpis.map((kpi, i) => (
                <div key={i} className="group">
                  <button 
                    onClick={() => setExpandedKpi(expandedKpi === i ? null : i)}
                    className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${expandedKpi === i ? 'bg-primary/5 ring-1 ring-primary/20' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                       <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
                          <p className="text-lg font-bold text-gray-900 mt-0.5">{kpi.value}</p>
                       </div>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${expandedKpi === i ? 'bg-primary text-white rotate-180' : 'bg-white text-gray-400'}`}>
                       <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  {expandedKpi === i && (
                    <div className="px-4 py-3 bg-white/50 animate-in slide-in-from-top-2 duration-300">
                       <p className="text-xs text-gray-500 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-3">
                          {kpi.details}
                       </p>
                    </div>
                  )}
                </div>
              ))}
           </div>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <div className="flex items-center space-x-2 mb-3">
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] font-black uppercase rounded-lg border border-primary/30">Intelligence Core</span>
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Active Training...</span>
               </div>
               <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Neural Link: AI Prediction Model</h3>
               <p className="text-gray-400 text-sm max-w-md">Our Neural Sync model predicts a further 8% optimization in waste collection routes for the Surulere-Iponri corridor next quarter based on current volume trends.</p>
            </div>
            <div className="flex items-center space-x-6">
               <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Accuracy</p>
                  <p className="text-2xl font-black italic">98.4%</p>
               </div>
               <Calendar className="w-12 h-12 text-primary opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>
    </div>
  );
}
