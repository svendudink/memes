import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ImageGrid() {
    const [images, setImages] = useState([]);

  useEffect(() => {
        axios.get('http://localhost:4000/images')
            .then(response => {
                console.log('Response:', response.data);
                setImages(response.data); // data is directly available through response.data
            })
            .catch(error => {
                console.error('There was a problem with the axios operation:', error);
            });
    }, []); // The empty array ensures this effect only runs once after the initial render


    return (
        <div>
            <h1>MemeOnly</h1>
            <ul>
                {images.map((img, index) => (
                    <li key={index}>
                        <img src={`https://yourgreenphone.de/${img.imageUrl}`} alt={img.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
}


