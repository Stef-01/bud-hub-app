
import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-md relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md text-gray-400 hover:bg-gray-600 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {isCopied ? (
          <CheckIcon className="w-5 h-5 text-green-500" />
        ) : (
          <CopyIcon className="w-5 h-5" />
        )}
      </button>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto font-mono">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
