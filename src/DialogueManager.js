
import React from 'react';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';

const DialogueManager = () => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Original Dialogue</label>
        <Input type="text" placeholder="Hello, how are you?" className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Translated Dialogue</label>
        <Input type="text" placeholder="Hola, ¿cómo estás?" className="mt-1 block w-full" />
      </div>
      <div className="flex justify-between">
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default DialogueManager;