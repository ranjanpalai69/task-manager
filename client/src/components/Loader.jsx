

import styles from "../styles/Loader.module.css"
function Loader({text}) {
  return (
    <>

      <div className={styles._main_loader_container}>
        
      <div className={styles.loader_container}>
        {text}
        <div className={`${styles.loader_sector} ${styles.loader_sector_red}`}></div>
        <div className={`${styles.loader_sector} ${styles.loader_sector_blue}`}></div>
        <div className={`${styles.loader_sector} ${styles.loader_sector_green}`}></div>
      </div>
      </div>
    </>
  );
}

export default Loader;
