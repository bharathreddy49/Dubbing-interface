import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);

  return (
    <AppContext.Provider value={{
      isPlaying, setIsPlaying,
      isRecording, setIsRecording,
      currentDialogue, setCurrentDialogue,
      audioBlob, setAudioBlob
    }}>
      {children}
    </AppContext.Provider>
  );
};