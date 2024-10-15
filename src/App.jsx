import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Toast from 'react-hot-toast';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
// import ImageModal from './components/ImageModal/ImageModal';
// import Loader from './components/Loader/Loader';
// import ErrorMessage from './components/ErrorMessage/ErrorMessage';
// import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

function App() {
  const YOUR_QUERY = 'cars';
  const YOUR_ACCESS_KEY = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`
          https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${YOUR_QUERY}&orientation=squarish&&per_page=30`);
        console.log(data);
        setImages(data.results); 
      } catch (err) {
        console.log('err', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <SearchBar />
      <ImageGallery images={images} />
    </>
  );
}

export default App;
