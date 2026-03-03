import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Video, CheckCircle2 } from 'lucide-react';

const platformsList = [
  { name: 'Instagram', icon: Instagram, connected: false },
  { name: 'TikTok', icon: Video, connected: true },
  { name: 'Facebook', icon: Facebook, connected: false },
  { name: 'X (Twitter)', icon: Twitter, connected: false },
  { name: 'YouTube Shorts', icon: Youtube, connected: false },
];

export default function Platforms() {
  const [platforms, setPlatforms] = useState(platformsList);

  const toggleConnection = (index: number) => {
    const newPlatforms = [...platforms];
    newPlatforms[index].connected = !newPlatforms[index].connected;
    setPlatforms(newPlatforms);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Connected Platforms</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your social media connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform, index) => (
          <div key={platform.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${platform.connected ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'}`}>
                <platform.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                <p className="text-xs text-gray-500">{platform.connected ? 'Connected' : 'Not connected'}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleConnection(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                platform.connected 
                  ? 'bg-green-50 text-green-600 border border-green-100' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {platform.connected ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
