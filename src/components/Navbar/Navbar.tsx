import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import uploadIcon from "../../assets/icons/upload.svg";
import generateIcon from "../../assets/icons/generate.svg";
import historyIcon from "../../assets/icons/history.svg";
import styles from "./Navbar.module.css";

const links: { to: string; title: string; icon: string }[] = [
  {
    to: "/",
    title: "CSV Аналитик",
    icon: uploadIcon,
  },
  {
    to: "/generator",
    title: "CSV Генератор",
    icon: generateIcon,
  },
  {
    to: "/history",
    title: "История",
    icon: historyIcon,
  },
];

export const Navbar = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logo_section}>
          <img src={logo} alt="Межгалактическая аналитика logo" />
          <div className={styles.title}>Межгалактическая аналитика</div>
        </div>

        <ul className={styles.links}>
          {links.map((link) => {
            return (
              <li key={link.title}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.link_active : ""}`
                  }
                  to={link.to}
                >
                  <img src={link.icon} />
                  {link.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
