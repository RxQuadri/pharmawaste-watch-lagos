import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Building, ShieldCheck, Mail, Lock, MapPin, Briefcase } from 'lucide-react';

type Role = 'Household' | 'Pharmacy' | 'Regulator';

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('Household');
  
  // Shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Role specific fields
  const [location, setLocation] = useState(''); // Household
  const [businessName, setBusinessName] = useState(''); // Pharmacy
  const [licenseNumber, setLicenseNumber] = useState(''); // Pharmacy
  const [address, setAddress] = useState(''); // Pharmacy
  const [agencyId, setAgencyId] = useState(''); // Regulator

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'Household') navigate('/household');
    if (role === 'Pharmacy') navigate('/pharmacy');
    if (role === 'Regulator') navigate('/regulator');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mb-6">
        <UserPlus className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h2>
      <p className="text-gray-500 mb-8 text-center text-sm">
        Join the network to protect Lagos from pharmaceutical waste.
      </p>

      {/* Role Selection */}
      <div className="w-full flex space-x-2 mb-8 bg-gray-50 p-1 rounded-xl">
        {(['Household', 'Pharmacy', 'Regulator'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center transition-all ${
              role === r
                ? 'bg-white text-primary shadow-sm border border-gray-100'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {r === 'Household' && <User className="w-4 h-4 mr-2" />}
            {r === 'Pharmacy' && <Building className="w-4 h-4 mr-2" />}
            {r === 'Regulator' && <ShieldCheck className="w-4 h-4 mr-2" />}
            {r}
          </button>
        ))}
      </div>

      <form onSubmit={handleSignUp} className="w-full space-y-4">
        {/* Core Info - Differs slightly by role, but "name" is common or split */}
        {role === 'Household' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        {role === 'Household' && (
           <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Local Government Area / Location</label>
           <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <MapPin className="h-5 w-5 text-gray-400" />
             </div>
             <input
               type="text"
               required
               className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
               placeholder="e.g. Ikeja, Surulere"
               value={location}
               onChange={(e) => setLocation(e.target.value)}
             />
           </div>
         </div>
        )}

        {role === 'Pharmacy' && (
           <>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Building className="h-5 w-5 text-gray-400" />
               </div>
               <input
                 type="text"
                 required
                 className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                 placeholder="HealthPlus Pharmacy"
                 value={businessName}
                 onChange={(e) => setBusinessName(e.target.value)}
               />
             </div>
           </div>
           
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Briefcase className="h-5 w-5 text-gray-400" />
               </div>
               <input
                 type="text"
                 required
                 className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                 placeholder="PCN/1234/LAG"
                 value={licenseNumber}
                 onChange={(e) => setLicenseNumber(e.target.value)}
               />
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <MapPin className="h-5 w-5 text-gray-400" />
               </div>
               <input
                 type="text"
                 required
                 className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                 placeholder="12 Broad St, Lagos Island"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
               />
             </div>
           </div>
           </>
        )}

        {role === 'Regulator' && (
           <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Agency ID Badge</label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <ShieldCheck className="h-5 w-5 text-gray-400" />
               </div>
               <input
                 type="text"
                 required
                 className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white"
                 placeholder="NAFDAC-LD-202"
                 value={agencyId}
                 onChange={(e) => setAgencyId(e.target.value)}
               />
             </div>
           </div>
           </>
        )}

        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 focus:bg-white transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors mt-6"
        >
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/signin" className="font-medium text-primary hover:text-accent">
          Sign In
        </Link>
      </p>
    </div>
  );
}
