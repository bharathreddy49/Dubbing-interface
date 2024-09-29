
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './components/ui/Button';
import WaveSurfer from 'wavesurfer.js';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [waveform, setWaveform] = useState(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const streamRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    // Initialize WaveSurfer for waveform visualization
    waveSurferRef.current = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#ddd',
      progressColor: '#4CAF50',
      backend: 'MediaElement',
      height: 100,
      responsive: true
    });
    setWaveform(waveSurferRef.current);
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/ogg; codecs=opus' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      waveSurferRef.current.load(audioUrl); // Load audio to waveform
      stopMicrophone();
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const stopMicrophone = () => {
    // Stop all audio tracks to turn off the microphone
    streamRef.current.getTracks().forEach(track => track.stop());
  };

  const playRecording = () => {
    if (waveSurferRef.current) {
      waveSurferRef.current.playPause(); // Toggle play/pause on waveform
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Audio Recorder</h2>

      <div className="flex justify-center space-x-4">
        {/* Start/Stop button based on isRecording state */}
        <Button 
          onClick={isRecording ? stopRecording : startRecording} 
          className={isRecording ? 'bg-red-500' : 'bg-green-500'}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>

        {/* Play button */}
        {audioUrl && (
          <Button className="bg-blue-500" onClick={playRecording}>
            {waveform && waveform.isPlaying() ? 'Pause' : 'Play'}
          </Button>
        )}
      </div>

      {/* Display waveform container */}
      <div id="waveform" className="mt-4"></div>

      {/* Display audio player if audio is recorded */}
      {audioUrl && (
        <div className="mt-2">
          <audio id="audio" src={audioUrl} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

