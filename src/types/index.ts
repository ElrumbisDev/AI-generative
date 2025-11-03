export interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
}

export interface VideoGenerationRequest {
  photos: UploadedPhoto[];
  eventType: 'wedding' | 'birth';
  message: string;
  style: 'romantic' | 'joyful' | 'elegant' | 'playful';
}

export interface VideoGenerationResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
  jobId?: string;
}

export interface APIProvider {
  name: string;
  description: string;
  endpoint: string;
  requiredParams: string[];
}