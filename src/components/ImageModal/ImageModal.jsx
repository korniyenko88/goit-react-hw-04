import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal isOpen={!!image} onRequestClose={onClose} className={styles.modal}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          ✖
        </button>
        <h2>{image.description || image.alt_description}</h2>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.image}
        />
        <p>Likes: {image.likes}</p>
        <p>Photographer: {image.user.name}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
