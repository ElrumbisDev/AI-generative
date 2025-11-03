'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedPhoto } from '@/types';

interface PhotoUploadProps {
  onPhotosUploaded: (photos: UploadedPhoto[]) => void;
}

export default function PhotoUpload({ onPhotosUploaded }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: UploadedPhoto[] = acceptedFiles.slice(0, 10 - photos.length).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file)
    }));

    const updatedPhotos = [...photos, ...newPhotos];
    setPhotos(updatedPhotos);
    onPhotosUploaded(updatedPhotos);
  }, [photos, onPhotosUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 10 - photos.length,
    disabled: photos.length >= 10
  });

  const removePhoto = (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(updatedPhotos);
    onPhotosUploaded(updatedPhotos);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-3xl p-4 md:p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : photos.length >= 10
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          {photos.length >= 10 ? (
            <div>
              <p className="text-lg font-semibold text-gray-500">
                Limite atteinte (10 photos maximum)
              </p>
              <p className="text-gray-400">
                Supprimez une photo pour en ajouter une nouvelle
              </p>
            </div>
          ) : (
            <div>
              <p className="text-base md:text-lg font-semibold text-gray-700">
                {isDragActive ? 'Déposez vos photos ici' : 'Glissez vos photos ici ou cliquez pour sélectionner'}
              </p>
              <p className="text-sm md:text-base text-gray-500">
                Formats supportés: JPEG, PNG, GIF, WebP ({10 - photos.length} photos restantes)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Photos sélectionnées ({photos.length}/10)
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {photos.map((photo, index) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
                  <img
                    src={photo.preview}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => removePhoto(photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* Photo number */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          {photos.length > 0 && photos.length < 10 && (
            <div className="text-center">
              <p className="text-sm text-gray-500">
                💡 Ajoutez plus de photos pour créer une vidéo plus riche !
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
          Conseils pour de meilleures vidéos
        </h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Choisissez des photos de bonne qualité (minimum 1080p recommandé)</li>
          <li>• Variez les angles et les moments pour plus de dynamisme</li>
          <li>• Privilégiez les photos avec de bonnes expressions et émotions</li>
          <li>• Évitez les photos floues ou trop sombres</li>
        </ul>
      </div>
    </div>
  );
}