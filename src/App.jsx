import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';




function App() {
  const YOUR_ACCESS_KEY = 'myHNeFHoPkXbeMBmHoSmpyKTa-dnwJKGx5ag4R9Kc-s';
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [imageModal, setImageModal] = useState(null);
  const [perPage, setPerPage] = useState(30);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatePerPage = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const imagesPerRow = Math.floor(vw / 200);
      const rows = Math.floor(vh / 200);

      setPerPage(imagesPerRow * rows);
    };

    updatePerPage();
    window.addEventListener('resize', updatePerPage);

    return () => {
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`
        https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${searchTerm}&orientation=squarish&page=1&per_page=30`);
        if (data.results.length === 0) {
          throw new Error('No images found.');
        }
        setImages(data.results);
      } catch (err) {
        setError(err.message);
        toast.error('Error fetching images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, perPage]);

  useEffect(() => {
    const fetchMoreImages = async () => {
      if (!searchTerm || page === 1) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`
        https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${searchTerm}&orientation=squarish&page=${page}&per_page=${perPage}`);

        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (err) {
        console.log('err', err);
        setError(err.message);
        toast.error('Error fetching more images.');
      } finally {
        setLoading(false);
      }
    };

    fetchMoreImages();
  }, [page, searchTerm, perPage]);

  const handleSearch = term => {
    if (!term) {
      toast.error("'Please enter a search term'");

      return;
    }
    setSearchTerm(term);
    setImages([]);
    setPage(1);
    setError(null);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = image => {
    if (!imageModal || imageModal.id !== image.id) {
      setImageModal(image);
    }
  };

  const closeModal = () => {
    setImageModal(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      {imageModal && <ImageModal image={imageModal} onClose={closeModal} />}
    </>
  );
}

export default App;
