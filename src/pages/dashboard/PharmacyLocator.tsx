import { MapPin, Search, Star, Phone, Navigation } from 'lucide-react';

export default function PharmacyLocator() {
  const pharmacies = [
    { name: 'Medplus (Mushin)', address: '12 Agege Motor Road, Lagos', dist: '1.2km', open: 'Until 9:00 PM', rating: 4.8, phone: '+2348001234567' },
    { name: 'Alpha Pharmacy (Ikeja)', address: '28 Allen Avenue, Lagos', dist: '3.5km', open: 'Open 24/7', rating: 4.9, phone: '+2348007654321' },
    { name: 'HealthPlus (Surulere)', address: 'Ogunlana Drive, Lagos', dist: '5.0km', open: 'Until 10:00 PM', rating: 4.7, phone: '+2348001122334' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Pharmacy</h1>
          <p className="text-gray-500 mt-1">Locate a registered collection node near you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        <div className="lg:col-span-1 flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search area..." className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm" />
          </div>
          <div className="space-y-3">
            {pharmacies.map((p, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{p.name}</h3>
                  <div className="flex items-center text-xs text-amber-500 bg-amber-50 px-2 rounded-lg font-bold"><Star className="w-3 h-3 mr-1 fill-amber-500" />{p.rating}</div>
                </div>
                <p className="text-xs text-gray-500 mb-4 flex items-start"><MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />{p.address}</p>
                <div className="flex gap-2 pt-2 border-t border-gray-50">
                  <a 
                    href={`tel:${p.phone}`}
                    className="flex-1 py-2 bg-light-green text-primary rounded-lg text-xs font-bold transition-colors hover:bg-green-100 flex items-center justify-center"
                  >
                    <Phone className="w-3 h-3 mr-1.5" />
                    Call
                  </a>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + p.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-primary text-white rounded-lg text-xs font-bold transition-colors hover:bg-accent flex items-center justify-center"
                  >
                    <Navigation className="w-3 h-3 mr-1.5" />
                    Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden relative shadow-sm h-[600px] lg:h-auto">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15856.966465437812!2d3.3444!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c2ae4b9986d%3A0xc3f3453303c6a49a!2sMushin%2C%20Lagos!5e0!3m2!1sen!2sng!4v1710000000000!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mushin Lagos Map"
            />
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/50 text-xs font-bold text-gray-600 flex items-center">
               <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
               Live Lagos Recovery Network
            </div>
        </div>
      </div>
    </div>
  );
}
