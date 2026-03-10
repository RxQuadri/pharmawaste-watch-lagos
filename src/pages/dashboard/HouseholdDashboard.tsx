import { Activity, Pill, PackageCheck, AlertCircle, Shield, Award, Trophy, ChevronRight, X, Star, CheckCircle2 } from 'lucide-react';
import { calculateBadgeStatus } from '../../utils/gamification';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HouseholdDashboard() {
  const stats = [
    { title: 'Total Reports', value: '12', icon: <Activity className="w-6 h-6 text-primary" />, trend: '+2 this month' },
    { title: 'Medicines Disposed', value: '45', icon: <Pill className="w-6 h-6 text-primary" />, trend: 'items' },
    { title: 'Safe Collections', value: '8', icon: <PackageCheck className="w-6 h-6 text-primary" />, trend: 'Successful pickups' },
    { title: 'Pending Actions', value: '1', icon: <AlertCircle className="w-6 h-6 text-amber-500" />, trend: 'Requires attention' },
  ];

  // Dummy user data
  const totalPoints = 320;
  const badgeStatus = calculateBadgeStatus(totalPoints);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);

  const achievements = [
    { title: 'Dropped off 2 Bottles of Syrup', date: 'Mar 2, 2026', points: '+40' },
    { title: 'Dropped off 5 Blister Packs', date: 'Feb 10, 2026', points: '+50' },
    { title: 'Profile Setup Bonus', date: 'Jan 15, 2026', points: '+50' },
  ];

  const rewardTiers = [
    { title: 'Seedling', range: '0 - 50 pts', desc: 'Welcome status, basic platform access.', icon: <Star className="w-5 h-5" />, min: 0 },
    { title: 'Eco-Warrior', range: '51 - 200 pts', desc: 'Name featured on a local community leaderboard.', icon: <Shield className="w-5 h-5" />, min: 51 },
    { title: 'Green Citizen', range: '201 - 500 pts', desc: 'Digital certificate of environmental impact.', icon: <Award className="w-5 h-5" />, min: 201 },
    { title: 'Lagos Guardian', range: '500+ pts', desc: 'Small discount on non-prescription items at partner pharmacies.', icon: <Trophy className="w-5 h-5" />, min: 501 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Household Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your recent activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Rewards Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-primary/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-light-green rounded-bl-full -z-10 opacity-50"></div>
            
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-lg font-bold text-gray-900 flex items-center">
                 <Trophy className="w-5 h-5 mr-2 text-primary" />
                 Rewards Status
               </h2>
               <button 
                onClick={() => setShowRewardsModal(true)}
                className="text-sm font-bold text-primary hover:text-accent transition-colors"
               >
                 View All Rewards
               </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white border-4 border-white flex-shrink-0 relative">
                <Shield className="w-10 h-10" />
                <div className="absolute -bottom-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gray-800">
                  {badgeStatus.currentBadge}
                </div>
              </div>

              <div className="flex-1 w-full space-y-3 pt-2">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-sm font-bold text-gray-900">Current Tier: {badgeStatus.currentBadge}</p>
                     <p className="text-xs text-gray-500 mt-0.5">
                       {badgeStatus.nextBadge ? `Earn ${badgeStatus.pointsToNext} more points to unlock ${badgeStatus.nextBadge}` : 'Maximum tier reached!'}
                     </p>
                   </div>
                   {badgeStatus.nextBadge && (
                     <div className="text-xs font-bold text-primary bg-light-green px-2 py-1 rounded-md">
                       {badgeStatus.progressPercentage.toFixed(0)}%
                     </div>
                   )}
                </div>
                
                {badgeStatus.nextBadge && (
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-1000 relative" 
                      style={{ width: `${badgeStatus.progressPercentage}%` }}
                    >
                       <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Recent Achievements
              </h2>
              <button 
                onClick={() => setShowAllAchievements(true)}
                className="text-sm font-medium text-primary hover:text-accent flex items-center"
              >
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="space-y-4 flex-1">
               {achievements.map((achievement, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mr-4">
                        <PackageCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{achievement.date}</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary bg-light-green px-3 py-1 rounded-full text-sm">
                      {achievement.points}
                    </span>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Nearby Drop-off Points</h2>
          <div className="space-y-4">
            {[
              { name: 'Medplus Pharmacy (Mushin)', dist: '1.2km' },
              { name: 'Alpha Pharmacy (Ikeja)', dist: '3.5km' },
              { name: 'HealthPlus (Surulere)', dist: '5.0km' }
            ].map((pharmacy, i) => (
              <div key={i} className="flex items-start p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                 <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 mr-3 flex-shrink-0">
                   <PackageCheck className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <h4 className="text-sm font-medium text-gray-900">{pharmacy.name}</h4>
                   <p className="text-xs text-gray-500 mt-0.5">{pharmacy.dist} away • Open</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Modal */}
      <AnimatePresence>
        {showAllAchievements && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowAllAchievements(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-light-green rounded-2xl flex items-center justify-center mr-4">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">All Achievements</h3>
                      <p className="text-sm text-gray-500">Your journey to a cleaner Lagos</p>
                    </div>
                </div>
                <button 
                  onClick={() => setShowAllAchievements(false)}
                  className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4 custom-scrollbar">
                {[...achievements, 
                  { title: 'First Recycling Node Shared', date: 'Jan 10, 2026', points: '+20' },
                  { title: 'Consistency King (7 day streak)', date: 'Dec 28, 2025', points: '+100' },
                  { title: 'Referral Bonus: Ayo B.', date: 'Dec 15, 2025', points: '+60' }
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 mr-4 text-primary">
                        <Star className="w-5 h-5 fill-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{a.title}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{a.date}</p>
                      </div>
                    </div>
                    <span className="font-black text-primary text-sm">
                      {a.points}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => setShowAllAchievements(false)}
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-accent transition-all"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rewards Tier Modal */}
      <AnimatePresence>
        {showRewardsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setShowRewardsModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-primary/5 shrink-0">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">Your Path to Lagos Guardian</h3>
                      <p className="text-sm text-gray-500">Earn points to unlock exclusive city benefits</p>
                    </div>
                </div>
                <button 
                  onClick={() => setShowRewardsModal(false)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 gap-4">
                    {rewardTiers.map((tier) => {
                      const isActive = badgeStatus.currentBadge === tier.title;
                      const isLocked = totalPoints < tier.min;
                      
                      return (
                        <div 
                          key={tier.title} 
                          className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
                            isActive 
                              ? 'bg-light-green border-primary shadow-lg shadow-primary/10' 
                              : isLocked 
                                ? 'bg-gray-50 border-gray-100 opacity-60 grayscale-[0.5]' 
                                : 'bg-white border-gray-100 hover:border-primary/20 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 shrink-0 ${
                                isActive ? 'bg-primary text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 shadow-sm'
                              }`}>
                                {tier.icon}
                              </div>
                              <div>
                                <div className="flex items-center space-x-3">
                                  <h4 className={`text-lg font-black ${isActive ? 'text-primary' : 'text-gray-900'}`}>{tier.title}</h4>
                                  {isActive && (
                                    <span className="flex items-center px-2 py-0.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                      <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                                      Active
                                    </span>
                                  )}
                                  {isLocked && (
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Locked
                                    </span>
                                  )}
                                </div>
                                <p className={`text-xs font-bold mt-0.5 ${isActive ? 'text-primary/70' : 'text-gray-400'}`}>{tier.range}</p>
                                <p className={`text-sm mt-3 leading-relaxed ${isActive ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{tier.desc}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                 <div className="flex items-center">
                    <div className="text-right mr-4">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Balance</p>
                       <p className="text-xl font-black text-primary">{totalPoints} PTS</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setShowRewardsModal(false)}
                   className="px-8 py-4 bg-gray-900 text-white font-black rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95"
                 >
                   Got it!
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
