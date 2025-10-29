
import { GoogleGenAI, Type } from "@google/genai";
import type { RepoFormData, GeneratedContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (formData: RepoFormData): string => {
  return `
    You are an expert assistant for GitHub. A user wants to create a new repository with the following details:
    - Repository Name: ${formData.name}
    - Description: ${formData.description}
    - Visibility: ${formData.visibility}
    - Initialize with README: ${formData.includeReadme ? 'Yes' : 'No'}
    - .gitignore template: ${formData.gitignore !== 'none' ? formData.gitignore : 'None'}
    - License: ${formData.license !== 'none' ? formData.license : 'None'}

    Based on these details, please provide two things in a JSON object:
    1.  'gitCommands': An array of objects, where each object contains a 'command' and an 'explanation'. These commands should guide the user through initializing a local Git repository, adding files, creating an initial commit, and pushing to a new GitHub repository. Include placeholders like <YOUR-USERNAME>.
    2.  'readmeContent': A well-structured sample 'README.md' file content in Markdown format. The README should include the repository name as a title, the description, and placeholders for sections like 'Installation', 'Usage', and 'Contributing'. If a license is chosen, include a 'License' section referencing it.
  `;
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    gitCommands: {
      type: Type.ARRAY,
      description: "A list of git commands and their explanations.",
      items: {
        type: Type.OBJECT,
        properties: {
          command: { type: Type.STRING, description: "The git command to be executed." },
          explanation: { type: Type.STRING, description: "A brief explanation of what the command does." }
        },
        required: ["command", "explanation"]
      }
    },
    readmeContent: {
      type: Type.STRING,
      description: "The full content for the README.md file in Markdown format."
    }
  },
  required: ["gitCommands", "readmeContent"]
};

export const generateRepoGuidance = async (formData: RepoFormData): Promise<GeneratedContent> => {
  const prompt = generatePrompt(formData);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.3,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse: GeneratedContent = JSON.parse(jsonString);

    return parsedResponse;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
