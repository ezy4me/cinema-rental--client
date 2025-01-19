import Link from "next/link";
import { FaInstagram, FaYoutube, FaTelegram } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <Link href="/">Cinema Rental Studio</Link>
          </div>
        </div>

        <div className={styles.links}>
          <ul className={styles.linkList}>
            <li>
              <Link href="/equipment">Оборудование</Link>
            </li>
          </ul>
        </div>

        <div className={styles.social}>
          <div className={styles.title}>Мы в социальных сетях</div>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Cinema Rental Studio. Все права
          защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
