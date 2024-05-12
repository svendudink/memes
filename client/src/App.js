import './App.css';
import FileUploadForm from './helpers/fileUpload';
import React, { useState } from 'react';
import axios from 'axios';
import { ImageGrid } from './components/ImageGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUploadForm />
        <ImageGrid />

      </header>
    </div>
  );
}

export default App;
