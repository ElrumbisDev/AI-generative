// Global type declarations for Chapter AI

declare global {
  interface Window {
    // Add any window extensions here if needed
  }
  
  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      VIDEO_AI_PROVIDER?: string;
      RUNWAY_API_KEY?: string;
      LUMA_API_KEY?: string;
      SYNTHESIA_API_KEY?: string;
      OPENAI_API_KEY?: string;
      NEXT_PUBLIC_APP_URL?: string;
    }
  }
}

// File upload types
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

export {};