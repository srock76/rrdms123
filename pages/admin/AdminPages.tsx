import React, { useState } from 'react';
import { useApp } from '../../context';
import { Button, Input, TextArea, Icon } from '../../components/Shared';
import { generateBlogContent } from '../../services/geminiService';
import { BlogPost } from '../../types';

// --- Blog Manager ---
export const PostManager = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentPost({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      imageUrl: `https://picsum.photos/800/400?random=${Date.now()}`,
      content: '',
      title: '',
      excerpt: '',
      category: 'General'
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentPost.title) return;
    
    // Simple slug generator
    const slug = currentPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    
    const payload = { ...currentPost, slug } as BlogPost;
    
    if (state.posts.find(p => p.id === currentPost.id)) {
      dispatch({ type: 'UPDATE_POST', payload });
    } else {
      dispatch({ type: 'ADD_POST', payload });
    }
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this post?')) {
        dispatch({ type: 'DELETE_POST', payload: id });
    }
  }

  const handleGeminiGenerate = async () => {
    if (!currentPost.title) {
      alert("Please enter a title first to generate content.");
      return;
    }
    setGenerating(true);
    try {
      const content = await generateBlogContent(currentPost.title);
      setCurrentPost(prev => ({ ...prev, content, excerpt: content.substring(0, 150) + '...' }));
    } catch (e) {
      alert("Failed to generate content. Please check API Key.");
    } finally {
      setGenerating(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Post</h2>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
        <div className="space-y-4">
          <Input 
            label="Title" 
            value={currentPost.title || ''} 
            onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Author" 
              value={currentPost.author || ''} 
              onChange={e => setCurrentPost({...currentPost, author: e.target.value})}
            />
            <Input 
              label="Category" 
              value={currentPost.category || ''} 
              onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
            />
          </div>
          
          <div className="flex justify-end">
             <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleGeminiGenerate} 
                isLoading={generating}
                className="mb-2"
                type="button"
             >
                <Icon name="Sparkles" size={16} className="mr-2" />
                Auto-Write with Gemini
             </Button>
          </div>

          <TextArea 
            label="Content (Markdown Supported)" 
            rows={15} 
            value={currentPost.content || ''} 
            onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
          />
           <Input 
              label="Image URL" 
              value={currentPost.imageUrl || ''} 
              onChange={e => setCurrentPost({...currentPost, imageUrl: e.target.value})}
            />
          <div className="flex justify-end pt-4">
             <Button onClick={handleSave}>Save Post</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Button onClick={handleCreate}>
          <Icon name="Plus" size={20} className="mr-2" /> New Post
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {state.posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{post.title}</td>
                <td className="px-6 py-4 text-gray-600">{post.category}</td>
                <td className="px-6 py-4 text-gray-600">{post.date}</td>
                <td className="px-6 py-4">
                   <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                     {post.status}
                   </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="p-2">
                    <Icon name="Edit2" size={14} />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(post.id)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 border-none">
                    <Icon name="Trash" size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Settings Manager ---
export const SettingsManager = () => {
  const { state, dispatch } = useApp();
  const { config } = state;
  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (field: string, value: string) => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_CONFIG', payload: localConfig });
    alert('Settings Saved!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <h3 className="text-xl font-bold border-b pb-2">General Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Agency Name" value={localConfig.name} onChange={e => handleChange('name', e.target.value)} />
          <Input label="Email" value={localConfig.email} onChange={e => handleChange('email', e.target.value)} />
          <Input label="Phone" value={localConfig.phone} onChange={e => handleChange('phone', e.target.value)} />
          <Input label="Address" value={localConfig.address} onChange={e => handleChange('address', e.target.value)} />
        </div>
        <TextArea label="Site Description" value={localConfig.description} onChange={e => handleChange('description', e.target.value)} />

        <h3 className="text-xl font-bold border-b pb-2 pt-4">Theme & Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={localConfig.primaryColor} 
                onChange={e => handleChange('primaryColor', e.target.value)} 
                className="h-10 w-20 p-1 rounded border"
              />
              <span className="text-sm text-gray-500">{localConfig.primaryColor}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color (Dark)</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={localConfig.secondaryColor} 
                onChange={e => handleChange('secondaryColor', e.target.value)} 
                className="h-10 w-20 p-1 rounded border"
              />
              <span className="text-sm text-gray-500">{localConfig.secondaryColor}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t flex justify-end">
          <Button onClick={handleSave} size="lg">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

// --- Lead Manager ---
export const LeadManager = () => {
    const { state, dispatch } = useApp();

    const handleStatusUpdate = (id: string, status: 'new' | 'contacted' | 'closed') => {
        dispatch({ type: 'UPDATE_LEAD_STATUS', payload: { id, status } });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {state.leads.map(lead => (
                            <tr key={lead.id}>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{lead.name}</div>
                                    <div className="text-sm text-gray-500">{lead.company}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div>{lead.email}</div>
                                    <div>{lead.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{lead.message}</td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={lead.status}
                                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value as any)}
                                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
