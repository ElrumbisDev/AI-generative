'use client';

import { useState } from 'react';
import { Heart, Baby, Sparkles, Play } from 'lucide-react';
import PhotoUpload from '@/components/PhotoUpload';
import EventForm from '@/components/EventForm';
import VideoPreview from '@/components/VideoPreview';
import AnimatedContainer, { FadeInWhenVisible, ScaleOnHover, FloatingAnimation } from '@/components/AnimatedContainer';
import { UploadedPhoto, VideoGenerationRequest } from '@/types';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [eventData, setEventData] = useState<Partial<VideoGenerationRequest>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handlePhotosUploaded = (uploadedPhotos: UploadedPhoto[]) => {
    setPhotos(uploadedPhotos);
    if (uploadedPhotos.length > 0) {
      setCurrentStep(2);
    }
  };

  const handleEventDataSubmitted = (data: Partial<VideoGenerationRequest>) => {
    setEventData(data);
    setCurrentStep(3);
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    try {
      const formData = new FormData();
      photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo.file);
      });
      formData.append('eventType', eventData.eventType || '');
      formData.append('message', eventData.message || '');
      formData.append('style', eventData.style || '');

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setVideoUrl(result.videoUrl);
        setCurrentStep(4);
      }
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <AnimatedContainer className="text-center mb-8 md:mb-12">
          <FloatingAnimation>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Chapter AI ✨
            </h1>
          </FloatingAnimation>
          <AnimatedContainer delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Transformez vos plus beaux souvenirs en vidéos magiques avec l'intelligence artificielle
            </p>
          </AnimatedContainer>
        </AnimatedContainer>

        {/* Progress Steps */}
        <FadeInWhenVisible className="flex justify-center mb-8 md:mb-12 overflow-x-auto px-4">
          <div className="flex items-center space-x-2 md:space-x-4 min-w-max">
            {[1, 2, 3, 4].map((step) => (
              <AnimatedContainer 
                key={step} 
                delay={0.1 * step}
                className="flex items-center"
              >
                <ScaleOnHover>
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 text-sm md:text-base ${
                      currentStep >= step
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                </ScaleOnHover>
                {step < 4 && (
                  <div
                    className={`w-8 md:w-16 h-1 mx-1 md:mx-2 transition-all duration-500 ${
                      currentStep > step ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </AnimatedContainer>
            ))}
          </div>
        </FadeInWhenVisible>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <AnimatedContainer className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
              <div className="text-center mb-8">
                <FloatingAnimation>
                  <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                </FloatingAnimation>
                <AnimatedContainer delay={0.2}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Choisissez vos photos
                  </h2>
                  <p className="text-gray-600">
                    Sélectionnez jusqu'à 10 photos de votre événement spécial
                  </p>
                </AnimatedContainer>
              </div>
              <FadeInWhenVisible>
                <PhotoUpload onPhotosUploaded={handlePhotosUploaded} />
              </FadeInWhenVisible>
            </AnimatedContainer>
          )}

          {currentStep === 2 && (
            <AnimatedContainer className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
              <div className="text-center mb-8">
                <FloatingAnimation>
                  <div className="flex justify-center mb-4">
                    <Heart className="w-8 h-8 text-pink-500 mr-2" />
                    <Baby className="w-8 h-8 text-blue-500" />
                  </div>
                </FloatingAnimation>
                <AnimatedContainer delay={0.2}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Personnalisez votre vidéo
                  </h2>
                  <p className="text-gray-600">
                    Choisissez le type d'événement et ajoutez votre message personnel
                  </p>
                </AnimatedContainer>
              </div>
              <FadeInWhenVisible>
                <EventForm 
                  onSubmit={handleEventDataSubmitted}
                  photos={photos}
                />
              </FadeInWhenVisible>
            </AnimatedContainer>
          )}

          {currentStep === 3 && (
            <AnimatedContainer className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
              <div className="text-center mb-8">
                <FloatingAnimation>
                  <Play className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </FloatingAnimation>
                <AnimatedContainer delay={0.2}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Prévisualisation
                  </h2>
                  <p className="text-gray-600">
                    Vérifiez vos paramètres avant de générer votre vidéo
                  </p>
                </AnimatedContainer>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Vos photos ({photos.length})</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {photos.slice(0, 6).map((photo) => (
                      <img
                        key={photo.id}
                        src={photo.preview}
                        alt="Preview"
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                    {photos.length > 6 && (
                      <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                        +{photos.length - 6} autres
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Paramètres</h3>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Type:</strong> {eventData.eventType === 'wedding' ? 'Mariage' : 'Naissance'}</p>
                    <p><strong>Style:</strong> {eventData.style}</p>
                    <p><strong>Message:</strong> {eventData.message}</p>
                  </div>
                </div>
              </div>

              <FadeInWhenVisible className="text-center">
                <ScaleOnHover>
                  <button
                    onClick={handleGenerateVideo}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isGenerating ? 'Génération en cours...' : 'Générer ma vidéo magique ✨'}
                  </button>
                </ScaleOnHover>
              </FadeInWhenVisible>
            </AnimatedContainer>
          )}

          {currentStep === 4 && videoUrl && (
            <AnimatedContainer className="bg-white rounded-3xl shadow-xl p-4 md:p-8">
              <VideoPreview videoUrl={videoUrl} />
            </AnimatedContainer>
          )}
        </div>
      </div>
    </div>
  );
}
