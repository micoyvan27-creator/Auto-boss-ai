import { useState, useEffect } from 'react';
import { Copy, Check, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CopyPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAll = () => {
    const allText = posts.map(p => p.content).join('\n\n---\n\n');
    navigator.clipboard.writeText(allText);
    alert('All posts copied to clipboard!');
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Copy Posts</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and copy your generated content</p>
        </div>
        <button
          onClick={copyAll}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
        >
          <Copy size={18} />
          Copy All Posts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
            <div className="flex-1 mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  post.platform === 'Instagram' ? 'bg-pink-50 text-pink-600' :
                  post.platform === 'Twitter' ? 'bg-blue-50 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {post.platform}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap line-clamp-6 hover:line-clamp-none transition-all">
                {post.content}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center gap-2">
              <button
                onClick={() => copyToClipboard(post.content, post.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                  copiedId === post.id 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {copiedId === post.id ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </button>
              {/* Placeholder for delete/schedule actions */}
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500">No posts generated yet.</p>
          <a href="/dashboard/generate" className="text-blue-600 font-medium hover:underline mt-2 inline-block">
            Generate your first post
          </a>
        </div>
      )}
    </div>
  );
}
