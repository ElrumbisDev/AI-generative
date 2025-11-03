'use client';

import { useState } from 'react';
import { Download, Share2, RotateCcw, Play, CheckCircle } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
}

export default function VideoPreview({ videoUrl }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'ma-video-memorymagic.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Votre vidéo est prête ! ✨
        </h2>
        <p className="text-gray-600 text-lg">
          L'IA a créé une vidéo magique à partir de vos souvenirs
        </p>
      </div>

      {/* Video Player */}
      <div className="relative max-w-4xl mx-auto">
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <video
            src={videoUrl}
            controls
            className="w-full h-full"
            poster="/video-poster.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        </div>
        
        {/* Play overlay for better UX */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
            <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5" />
          Télécharger la vidéo
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
        >
          <Share2 className="w-5 h-5" />
          Partager
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-3 bg-gray-100 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all border-2 border-gray-200"
        >
          <RotateCcw className="w-5 h-5" />
          Créer une nouvelle vidéo
        </button>
      </div>

      {/* Video Info */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          📊 Informations sur votre vidéo
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600">HD</div>
            <div className="text-sm text-gray-600">Qualité 1080p</div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">~2-3min</div>
            <div className="text-sm text-gray-600">Durée optimale</div>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">MP4</div>
            <div className="text-sm text-gray-600">Format universel</div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          💡 Conseils pour partager votre vidéo
        </h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Parfait pour Instagram, Facebook, et WhatsApp</li>
          <li>• Idéal pour les faire-parts numériques</li>
          <li>• Peut être projeté lors de votre événement</li>
          <li>• Conservez une copie dans le cloud pour la postérité</li>
        </ul>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Partager votre vidéo
            </h3>
            
            <div className="space-y-4">
              <button
                onClick={() => copyToClipboard(videoUrl)}
                className="w-full p-4 bg-gray-100 rounded-xl text-left hover:bg-gray-200 transition-colors"
              >
                <div className="font-semibold text-gray-800">Copier le lien</div>
                <div className="text-sm text-gray-600 truncate">{videoUrl}</div>
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="p-3 bg-blue-100 rounded-xl text-blue-600 font-semibold hover:bg-blue-200 transition-colors">
                  Facebook
                </button>
                <button className="p-3 bg-green-100 rounded-xl text-green-600 font-semibold hover:bg-green-200 transition-colors">
                  WhatsApp
                </button>
                <button className="p-3 bg-pink-100 rounded-xl text-pink-600 font-semibold hover:bg-pink-200 transition-colors">
                  Instagram
                </button>
                <button className="p-3 bg-purple-100 rounded-xl text-purple-600 font-semibold hover:bg-purple-200 transition-colors">
                  Email
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-6 py-3 bg-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}