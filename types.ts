
export interface RepoFormData {
  name: string;
  description: string;
  visibility: 'public' | 'private';
  includeReadme: boolean;
  gitignore: string;
  license: string;
}

export interface GitCommand {
  command: string;
  explanation: string;
}

export interface GeneratedContent {
  gitCommands: GitCommand[];
  readmeContent: string;
}
