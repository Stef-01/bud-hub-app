
import React, { useState } from 'react';
import type { GeneratedContent, GitCommand } from '../types';
import { CodeBlock } from './CodeBlock';
import { GitBranchIcon } from './icons/GitBranchIcon';

interface OutputDisplayProps {
  content: GeneratedContent | null;
  isLoading: boolean;
  error: string | null;
}

type Tab = 'commands' | 'readme';

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('commands');

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <div className="p-6 text-red-400">{error}</div>;
    }
    if (!content) {
      return <InitialState />;
    }

    return (
      <>
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-4 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('commands')}
              className={`${
                activeTab === 'commands'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Git Commands
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`${
                activeTab === 'readme'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              README.md
            </button>
          </nav>
        </div>
        <div className="p-6">
          {activeTab === 'commands' && (
            <div className="space-y-4">
              {content.gitCommands.map((cmd, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-400 mb-1">{cmd.explanation}</p>
                  <CodeBlock language="bash" code={cmd.command} />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'readme' && (
            <div>
              <CodeBlock language="markdown" code={content.readmeContent} />
            </div>
          )}
        </div>
      </>
    );
  };

  return <div className="h-full min-h-[500px]">{renderContent()}</div>;
};


const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
        <GitBranchIcon className="w-16 h-16 mb-4 text-gray-600"/>
        <h3 className="text-lg font-semibold text-gray-200">Ready to build?</h3>
        <p>Fill out the form to generate your repository setup instructions.</p>
    </div>
);


const LoadingSkeleton: React.FC = () => (
    <div className="p-6 animate-pulse">
        <div className="flex space-x-4 border-b border-gray-700 pb-4 mb-6">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
        </div>
    </div>
);
