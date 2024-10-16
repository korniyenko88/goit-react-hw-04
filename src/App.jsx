import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

// import Toast from 'react-hot-toast';
// import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const YOUR_ACCESS_KEY = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [imageModal, setImageModal] = useState(null);
  useEffect(() => {
    const fetchImages = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`
        https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${searchTerm}&orientation=squarish&page=1&per_page=30`);

        setImages(data.results);
      } catch (err) {
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm]);

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (!searchTerm || page === 1) {
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(`
        https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${searchTerm}&orientation=squarish&page=${page}&per_page=30`);

        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (err) {
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoreImages();
  }, [page, searchTerm]);

  const handleSearch = term => {
    setSearchTerm(term);
    setImages([]);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = image => {
    setImageModal(image);
  };

  const closeModal = () => {
    setImageModal(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {imageModal && <ImageModal image={imageModal} onClose={closeModal} />}
    </>
  );
}

export default App;
