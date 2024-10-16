import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';


const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div>
      <ul className={styles.galleryList}>
        {images.length > 0 &&
          images.map(image => {
            return (
              <li className={styles.listItem} key={image.id}>
                <ImageCard image={image} onClick={() => onImageClick(image)} />
                <p>Likes:{image.likes}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ImageGallery;
