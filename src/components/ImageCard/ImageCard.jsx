import styles from './ImageCard.module.css';

const ImageCard = ({ image }) => {
  return (
    <div>
      <img
        className={styles.cardImg}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
