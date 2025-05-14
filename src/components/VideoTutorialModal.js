import React from 'react';

const VideoTutorialModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-2xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-bold">Tutorial</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="aspect-w-16 aspect-h-9">
            {videoUrl ? (
              <iframe 
                src={videoUrl} 
                className="w-full h-96" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                title="Video tutorial"
              />
            ) : (
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                <p className="text-gray-500">Video no disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorialModal;