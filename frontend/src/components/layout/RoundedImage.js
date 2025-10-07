import styles from './RoundedImage.module.css'

function RoundedImage({src, alt, size = 'medium'}) {
    return (
        <img
            className={`${styles.rounded_image} ${styles[size]}`}
            src={src}
            alt={alt}
        />
    )
}

export default RoundedImage