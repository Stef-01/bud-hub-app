
import React, { useState } from 'react';
import type { RepoFormData } from '../types';

interface RepoFormProps {
  onGenerate: (formData: RepoFormData) => void;
  isLoading: boolean;
}

const gitignoreOptions = ["None", "Node", "Python", "React", "Vue", "Java", "Go"];
const licenseOptions = ["None", "MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"];

export const RepoForm: React.FC<RepoFormProps> = ({ onGenerate, isLoading }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [includeReadme, setIncludeReadme] = useState(true);
  const [gitignore, setGitignore] = useState('Node');
  const [license, setLicense] = useState('MIT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onGenerate({
      name,
      description,
      visibility,
      includeReadme,
      gitignore: gitignore.toLowerCase(),
      license: license.toLowerCase()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="repo-name" className="block text-sm font-medium text-gray-200 mb-1">Repository Name</label>
        <input
          id="repo-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.replace(/\s+/g, '-'))}
          placeholder="my-awesome-project"
          required
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        />
      </div>
      
      <div>
        <label htmlFor="repo-description" className="block text-sm font-medium text-gray-200 mb-1">Description (Optional)</label>
        <textarea
          id="repo-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="A short description of your project."
          className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-200 mb-2">Visibility</span>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={() => setVisibility('public')} className="form-radio h-4 w-4 text-blue-600 bg-gray-900 border-gray-600 focus:ring-blue-500" />
            <span>Public</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="visibility" value="private" checked={visibility === 'private'} onChange={() => setVisibility('private')} className="form-radio h-4 w-4 text-blue-600 bg-gray-900 border-gray-600 focus:ring-blue-500" />
            <span>Private</span>
          </label>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="readme" name="readme" type="checkbox" checked={includeReadme} onChange={(e) => setIncludeReadme(e.target.checked)} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-600 rounded bg-gray-900" />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="readme" className="font-medium text-gray-200">Initialize with a README</label>
          <p className="text-gray-400">This is where you can write a long description for your project.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gitignore" className="block text-sm font-medium text-gray-200 mb-1">Add .gitignore</label>
          <select id="gitignore" value={gitignore} onChange={(e) => setGitignore(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200">
            {gitignoreOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="license" className="block text-sm font-medium text-gray-200 mb-1">Choose a license</label>
          <select id="license" value={license} onChange={(e) => setLicense(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200">
            {licenseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || !name}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Generating...' : 'Generate Guidance'}
        </button>
      </div>
    </form>
  );
};
