import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    heidth: '400px',
  },
};

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      style={customStyles}
      overlayClassName={styles.overlay}
    >
      <button onClick={onClose} className={styles.closeButton}>
        ✖
      </button>
      <h2>{image.description || image.alt_description}</h2>
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>Likes: {image.likes}</p>
      <p>Photographer: {image.user.name}</p>
    </Modal>
  );
};

export default ImageModal;
