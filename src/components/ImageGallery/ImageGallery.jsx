import styles from './ImageGallery.module.css'

const ImageGallery = () => {
  return (
    <div>
      <ul className={styles.galleryList}>
	{/* Набір елементів списку із зображеннями */}
	<li className={styles.listItem}>
		<div>
		  <img className={styles.listImg} src="" alt="" />
		</div>
	</li>
</ul>

    </div>
  )
}

export default ImageGallery
