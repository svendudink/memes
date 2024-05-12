import React, { useState } from 'react'
import axios from 'axios';

function FileUploadForm({ currentProductObj }) {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (files.length === 0) {
      alert('Please select one or more files first!')
      return
    }
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('http://34.32.30.215:80/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
      const dataText = await response.text(); // Get response text
        const data = JSON.parse(dataText); // Parse text to JSON
        console.log(data);
     await  data.files.forEach(async (file) => {
    try {
        await axios.post('http://localhost:4000/data', {
            name: file.originalName,
            value: file.path, // Assuming you want to send the path as value; update as necessary
            imageUrl: file.uploadedName
        });
        console.log("Data posted successfully for:", file.originalName);
    } catch (error) {
        console.error("Failed to post data for:", file.originalName, error);
    }
});
        console.log(data);
        alert('Images uploaded successfully')
        let parsedData = JSON.parse(data)
    
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Upload error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="images" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default FileUploadForm
