import Link from "next/link";
import { FaYoutube, FaTelegram, FaInstagram } from "react-icons/fa";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
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
      <div className={styles.logo}>
        <Link href="/">CRS</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Главная</Link>
          </li>
          <li>
            <Link href="/equipment">Оборудование</Link>
          </li>
          <li>
            <Link href="/about">О нас</Link>
          </li>
          <li>
            <Link href="/contact">Контакты</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
