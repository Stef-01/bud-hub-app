
import React, { useState } from 'react';
import { RepoForm } from './components/RepoForm';
import { OutputDisplay } from './components/OutputDisplay';
import { GitBranchIcon } from './components/icons/GitBranchIcon';
import { generateRepoGuidance } from './services/geminiService';
import type { RepoFormData, GeneratedContent } from './types';

const App: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: RepoFormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const content = await generateRepoGuidance(formData);
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-800 p-2 rounded-lg">
            <GitBranchIcon className="w-8 h-8 text-gray-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-200">GitHub Repo Creator</h1>
            <p className="text-gray-400">Generate git commands and a README with AI</p>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <RepoForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg">
            <OutputDisplay 
              content={generatedContent} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
