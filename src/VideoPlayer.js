
import React, { useRef } from 'react';
import { Button } from './components/ui/Button';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Video Container with full screen */}
      <div className="w-full h-screen max-w-full mx-auto">
        <video
          ref={videoRef}
          className="w-full h-full object-cover" // Ensures the video covers the full screen
          controls
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Buttons for control */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
      </div>
    </div>
  );
};

export default VideoPlayer;



