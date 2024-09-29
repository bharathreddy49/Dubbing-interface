
import React from 'react';
import { AppProvider } from './AppContext';
import VideoPlayer from './VideoPlayer';
import AudioRecorder from './AudioRecorder';
import DialogueManager from './DialogueManager';

const DubbingInterface = () => {
  return (
    <AppProvider>
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="mb-6">
          <VideoPlayer />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AudioRecorder />
          <DialogueManager />
        </div>
      </div>
    </AppProvider>
  );
};

export default DubbingInterface;