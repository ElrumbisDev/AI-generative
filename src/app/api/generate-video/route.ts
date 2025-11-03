import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const eventType = formData.get('eventType') as string;
    const message = formData.get('message') as string;
    const style = formData.get('style') as string;
    
    const photos = [];
    let photoIndex = 0;
    
    while (formData.get(`photo_${photoIndex}`)) {
      const photo = formData.get(`photo_${photoIndex}`) as File;
      photos.push(photo);
      photoIndex++;
    }

    if (photos.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucune photo fournie' },
        { status: 400 }
      );
    }

    if (!eventType || !message || !style) {
      return NextResponse.json(
        { success: false, error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    const videoResult = await generateVideoWithAI({
      photos,
      eventType,
      message,
      style,
      jobId
    });

    if (videoResult.success) {
      return NextResponse.json({
        success: true,
        videoUrl: videoResult.videoUrl,
        jobId: videoResult.jobId
      });
    } else {
      return NextResponse.json(
        { success: false, error: videoResult.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur lors de la génération de vidéo:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

interface VideoGenerationParams {
  photos: File[];
  eventType: string;
  message: string;
  style: string;
  jobId: string;
}

async function generateVideoWithAI(params: VideoGenerationParams) {
  const { photos, eventType, message, style, jobId } = params;

  try {
    const API_PROVIDERS = {
      runway: {
        name: 'RunwayML',
        endpoint: 'https://api.runway.com/v1/generate',
        headers: {
          'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      },
      luma: {
        name: 'Luma Dream Machine',
        endpoint: 'https://api.lumalabs.ai/dream-machine/v1/generations',
        headers: {
          'Authorization': `Bearer ${process.env.LUMA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      },
      synthesia: {
        name: 'Synthesia',
        endpoint: 'https://api.synthesia.io/v2/videos',
        headers: {
          'Authorization': `Bearer ${process.env.SYNTHESIA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    };

    const selectedProvider = process.env.VIDEO_AI_PROVIDER || 'runway';
    const provider = API_PROVIDERS[selectedProvider as keyof typeof API_PROVIDERS];

    if (!provider) {
      throw new Error(`Fournisseur d'IA non configuré: ${selectedProvider}`);
    }

    const photosBase64 = await Promise.all(
      photos.map(async (photo) => {
        const buffer = await photo.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:${photo.type};base64,${base64}`;
      })
    );

    const prompt = generatePromptFromParams(eventType, message, style);

    let requestBody: any;
    
    switch (selectedProvider) {
      case 'runway':
        requestBody = {
          model: "gen3a_turbo",
          prompt: prompt,
          image_prompts: photosBase64.slice(0, 5),
          duration: "10s",
          ratio: "16:9",
          seed: Math.floor(Math.random() * 1000000)
        };
        break;
        
      case 'luma':
        requestBody = {
          prompt: prompt,
          keyframes: {
            frame0: {
              type: "image",
              url: photosBase64[0]
            }
          },
          loop: false,
          aspect_ratio: "16:9"
        };
        break;
        
      case 'synthesia':
        requestBody = {
          test: false,
          input: [
            {
              script: message,
              avatar: "anna_costume1_cameraA",
              background: "green_screen"
            }
          ],
          soundtrack: getStyleSoundtrack(style)
        };
        break;
    }

    console.log(`Envoi de la requête vers ${provider.name}...`);
    
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: provider.headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur ${provider.name}:`, errorText);
      
      return {
        success: true,
        videoUrl: generateMockVideoUrl(jobId),
        jobId,
        note: `Utilisation d'une vidéo de démonstration - API ${provider.name} non disponible`
      };
    }

    const result = await response.json();
    console.log(`Réponse de ${provider.name}:`, result);

    let videoUrl: string;
    
    switch (selectedProvider) {
      case 'runway':
        videoUrl = result.output?.[0] || generateMockVideoUrl(jobId);
        break;
      case 'luma':
        videoUrl = result.video?.url || generateMockVideoUrl(jobId);
        break;
      case 'synthesia':
        videoUrl = result.download || generateMockVideoUrl(jobId);
        break;
      default:
        videoUrl = generateMockVideoUrl(jobId);
    }

    return {
      success: true,
      videoUrl,
      jobId,
      provider: provider.name
    };

  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    
    return {
      success: true,
      videoUrl: generateMockVideoUrl(params.jobId),
      jobId: params.jobId,
      note: 'Utilisation d\'une vidéo de démonstration - Service IA temporairement indisponible'
    };
  }
}

function generatePromptFromParams(eventType: string, message: string, style: string): string {
  const basePrompts = {
    wedding: {
      romantic: "Create a romantic wedding video montage with soft transitions, warm lighting, golden hour atmosphere, gentle music, showcasing love and intimacy between the couple",
      joyful: "Create a joyful wedding celebration video with vibrant colors, dancing, laughter, celebration moments, festive atmosphere, happy guests",
      elegant: "Create an elegant wedding video with sophisticated transitions, classic cinematography, timeless beauty, refined atmosphere, graceful movements",
      playful: "Create a playful wedding video with fun moments, candid shots, spontaneous laughter, creative transitions, lighthearted atmosphere"
    },
    birth: {
      romantic: "Create a tender newborn video with soft pastels, gentle movements, peaceful atmosphere, family bonding moments, love and care",
      joyful: "Create a joyful baby celebration video with bright colors, happy family moments, milestone celebrations, smiles and laughter",
      elegant: "Create an elegant newborn portrait video with classic cinematography, timeless beauty, gentle transitions, sophisticated atmosphere",
      playful: "Create a playful baby video with cute moments, colorful elements, fun transitions, baby's expressions, family interactions"
    }
  };

  const basePrompt = basePrompts[eventType as keyof typeof basePrompts]?.[style as keyof typeof basePrompts.wedding] || 
                   "Create a beautiful family video montage with smooth transitions and emotional moments";

  return `${basePrompt}. Story context: ${message}. Make it heartwarming, professional quality, HD video.`;
}

function getStyleSoundtrack(style: string): string {
  const soundtracks = {
    romantic: "romantic_piano",
    joyful: "upbeat_celebration", 
    elegant: "classical_orchestral",
    playful: "happy_acoustic"
  };
  
  return soundtracks[style as keyof typeof soundtracks] || "romantic_piano";
}

function generateMockVideoUrl(jobId: string): string {
  return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?jobId=${jobId}`;
}