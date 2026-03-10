import { TrendingUp, Leaf, Recycle, Users, ArrowUpRight, BarChart3, PieChart, Activity } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RecoveryMetrics() {
  const [period, setPeriod] = useState('Monthly');

  const getStats = (p: string) => {
    if (p === 'Monthly') return [
      { title: 'CO2 Saved', value: '42.8kg', detail: 'Equivalent to 3 trees planted', icon: <Leaf className="w-6 h-6 text-green-500" /> },
      { title: 'Landfill Diverted', value: '156.2kg', detail: 'Since Jan 2026', icon: <Recycle className="w-6 h-6 text-primary" /> },
      { title: 'Community Reach', value: '112', detail: 'Active households participating', icon: <Users className="w-6 h-6 text-blue-500" /> },
      { title: 'Recycling Rate', value: '94%', detail: 'High efficiency hub', icon: <TrendingUp className="w-6 h-6 text-amber-500" /> },
    ];
    if (p === 'Quarterly') return [
      { title: 'CO2 Saved', value: '128.4kg', detail: 'Equivalent to 9 trees planted', icon: <Leaf className="w-6 h-6 text-green-500" /> },
      { title: 'Landfill Diverted', value: '468.6kg', detail: 'Since Jan 2026', icon: <Recycle className="w-6 h-6 text-primary" /> },
      { title: 'Community Reach', value: '342', detail: 'Active households participating', icon: <Users className="w-6 h-6 text-blue-500" /> },
      { title: 'Recycling Rate', value: '91%', detail: 'High efficiency hub', icon: <TrendingUp className="w-6 h-6 text-amber-500" /> },
    ];
    return [
      { title: 'CO2 Saved', value: '512.1kg', detail: 'Equivalent to 36 trees planted', icon: <Leaf className="w-6 h-6 text-green-500" /> },
      { title: 'Landfill Diverted', value: '1.8 tons', detail: 'Total for year', icon: <Recycle className="w-6 h-6 text-primary" /> },
      { title: 'Community Reach', value: '1.2k', detail: 'Active households participating', icon: <Users className="w-6 h-6 text-blue-500" /> },
      { title: 'Recycling Rate', value: '88%', detail: 'High efficiency hub', icon: <TrendingUp className="w-6 h-6 text-amber-500" /> },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recovery Metrics</h1>
          <p className="text-gray-500 mt-1">Analyze your environmental impact and hub performance.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
           {['Monthly', 'Quarterly', 'Yearly'].map((p) => (
             <button 
               key={p}
               onClick={() => setPeriod(p)}
               className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all ${period === p ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               {p}
             </button>
           ))}
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStats(period).map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
            </div>
            <div>
               <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{card.title}</h3>
               <p className="text-2xl font-black text-gray-900 mt-1">{card.value}</p>
               <p className="text-xs text-gray-400 font-medium mt-1">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collection Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
           <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-gray-900">Collection Trend</h3>
                <p className="text-sm text-gray-500 font-medium">kg recovered per week</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-300" />
           </div>
           
           <div className="h-64 flex items-end justify-between gap-4 px-4 bg-gray-50/50 rounded-2xl p-6 border border-gray-50">
              {[
                { label: 'W1', value: 45 },
                { label: 'W2', value: 65 },
                { label: 'W3', value: 30 },
                { label: 'W4', value: 85 },
                { label: 'W5', value: 55 },
                { label: 'W6', value: 75 },
                { label: 'W7', value: 95 },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative h-full">
                   {/* Tooltip on hover */}
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-black z-10">
                      {item.value}kg
                   </div>
                   
                   <div className="w-full flex-1 flex items-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${item.value}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="w-full bg-primary rounded-t-lg relative overflow-hidden group-hover:bg-accent transition-colors"
                      >
                         <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter shrink-0">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-gray-900">Waste Type Breakdown</h3>
              <PieChart className="w-5 h-5 text-gray-300" />
           </div>
           
           <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                 <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3" />
                    <span className="text-sm font-bold text-gray-700">Solid Medications</span>
                 </div>
                 <span className="text-sm font-black text-gray-900">65%</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-400 rounded-full mr-3" />
                    <span className="text-sm font-bold text-gray-700">Empty Packaging</span>
                 </div>
                 <span className="text-sm font-black text-gray-900">25%</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-200 rounded-full mr-3" />
                    <span className="text-sm font-bold text-gray-700">Unknown/Mixed</span>
                 </div>
                 <span className="text-sm font-black text-gray-900">10%</span>
              </div>
           </div>

           <div className="mt-8 pt-8 border-t border-gray-50">
              <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                 <Activity className="w-5 h-5 text-primary mr-3" />
                 <p className="text-xs font-medium text-gray-600 leading-relaxed">
                   Your hub is in the top <span className="text-primary font-black">5%</span> of performers in the Mushin district this month.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
