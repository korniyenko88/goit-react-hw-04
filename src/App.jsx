import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  const YOUR_ACCESS_KEY = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const { data } = await axios.get(`https://api.unsplash.com/photos/?client_id=${YOUR_ACCESS_KEY}`);
        setImg( data.urls.small);
        console.log("data: ", data);
      } catch (error) {
        console.error("Error fetching the images: ", error);
      }
    };
    
    fetchImg();
  }, []);

  return (
    <>
      <SearchBar />
      <ImageGallery />
    </>
  );
}

export default App;