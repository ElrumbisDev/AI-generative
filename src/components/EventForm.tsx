'use client';

import { useState } from 'react';
import { Heart, Baby, Palette, MessageSquare } from 'lucide-react';
import { UploadedPhoto, VideoGenerationRequest } from '@/types';

interface EventFormProps {
  onSubmit: (data: Partial<VideoGenerationRequest>) => void;
  photos: UploadedPhoto[];
}

export default function EventForm({ onSubmit, photos }: EventFormProps) {
  const [eventType, setEventType] = useState<'wedding' | 'birth' | ''>('');
  const [style, setStyle] = useState<'romantic' | 'joyful' | 'elegant' | 'playful' | ''>('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (eventType && style && message.trim()) {
      onSubmit({
        photos,
        eventType: eventType as 'wedding' | 'birth',
        style: style as 'romantic' | 'joyful' | 'elegant' | 'playful',
        message: message.trim()
      });
    }
  };

  const eventTypes = [
    {
      id: 'wedding',
      label: 'Mariage',
      icon: Heart,
      description: 'Célébrez votre union avec une vidéo romantique',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 'birth',
      label: 'Naissance',
      icon: Baby,
      description: 'Immortalisez l\'arrivée de votre petit miracle',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const styles = [
    {
      id: 'romantic',
      label: 'Romantique',
      description: 'Doux et tendre, parfait pour les mariages',
      emoji: '💕'
    },
    {
      id: 'joyful',
      label: 'Joyeux',
      description: 'Énergique et festif, plein de bonheur',
      emoji: '🎉'
    },
    {
      id: 'elegant',
      label: 'Élégant',
      description: 'Sophistiqué et raffiné',
      emoji: '✨'
    },
    {
      id: 'playful',
      label: 'Ludique',
      description: 'Amusant et coloré, idéal pour les naissances',
      emoji: '🌈'
    }
  ];

  const isFormValid = eventType && style && message.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Event Type Selection */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-3 text-pink-500" />
          Type d'événement
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {eventTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setEventType(type.id as 'wedding' | 'birth')}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  eventType === type.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.gradient} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">
                      {type.label}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Selection */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Palette className="w-6 h-6 mr-3 text-purple-500" />
          Style de vidéo
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {styles.map((styleOption) => (
            <button
              key={styleOption.id}
              onClick={() => setStyle(styleOption.id as any)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                style === styleOption.id
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{styleOption.emoji}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {styleOption.label}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {styleOption.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MessageSquare className="w-6 h-6 mr-3 text-green-500" />
          Votre message personnel
        </h3>
        
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              eventType === 'wedding' 
                ? "Ex: Notre histoire d'amour commence ici, entourés de nos proches..."
                : eventType === 'birth'
                ? "Ex: Bienvenue dans ce monde merveilleux, petit ange..."
                : "Racontez votre histoire en quelques mots..."
            }
            className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-700"
            maxLength={300}
          />
          
          <div className="flex justify-between items-center text-sm">
            <p className="text-gray-500">
              Ce message apparaîtra dans votre vidéo
            </p>
            <span className={`${message.length > 250 ? 'text-orange-500' : 'text-gray-400'}`}>
              {message.length}/300
            </span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {eventType && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            💡 Suggestions de messages pour {eventType === 'wedding' ? 'mariage' : 'naissance'}
          </h4>
          <div className="space-y-2">
            {eventType === 'wedding' ? (
              <>
                <button
                  onClick={() => setMessage("Notre plus beau jour, entourés de ceux qui nous aiment le plus.")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 p-2 rounded"
                >
                  "Notre plus beau jour, entourés de ceux qui nous aiment le plus."
                </button>
                <button
                  onClick={() => setMessage("Deux cœurs qui ne font plus qu'un, pour l'éternité.")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 p-2 rounded"
                >
                  "Deux cœurs qui ne font plus qu'un, pour l'éternité."
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setMessage("Un petit miracle qui illumine nos vies à jamais.")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 p-2 rounded"
                >
                  "Un petit miracle qui illumine nos vies à jamais."
                </button>
                <button
                  onClick={() => setMessage("Bienvenue dans notre famille, petit ange si précieux.")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 p-2 rounded"
                >
                  "Bienvenue dans notre famille, petit ange si précieux."
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`px-8 py-4 rounded-full text-lg font-semibold transition-all transform ${
            isFormValid
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuer vers la prévisualisation
        </button>
      </div>
    </div>
  );
}