import { useState } from 'react';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function GeneratePost() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Motivational');
  const [count, setCount] = useState(1);
  const [generatedPosts, setGeneratedPosts] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, tone, count }),
      });
      
      if (!res.ok) throw new Error('Generation failed');
      
      const data = await res.json();
      setGeneratedPosts(data);
    } catch (error) {
      console.error(error);
      alert('Failed to generate posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Wand2 className="text-purple-600" />
          AI Post Generator
        </h2>
        
        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What should the posts be about?
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
              placeholder="e.g., 5 tips for productivity, why you should start a business, funny cat memes..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Facebook</option>
                <option>X (Twitter)</option>
                <option>YouTube Shorts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Motivational</option>
                <option>Funny</option>
                <option>Professional</option>
                <option>Educational</option>
                <option>Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Posts</label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Generating Magic...
              </>
            ) : (
              <>
                <Wand2 size={20} /> Generate {count} Posts
              </>
            )}
          </button>
        </form>
      </div>

      {generatedPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Generated Results</h3>
          <div className="grid grid-cols-1 gap-4">
            {generatedPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyToClipboard(post.content, post.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedId === post.id ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-md">{post.platform}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md">{post.tone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
