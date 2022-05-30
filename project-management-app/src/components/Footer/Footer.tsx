import './Footer.css';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__item">© 2022</span>
      <span className="footer__item teammate_name">Pavel</span>
      <a
        className="footer__item"
        href="https://github.com/pavelguest"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon />
      </a>
      <span className="footer__item teammate_name">Alena</span>
      <a
        className="footer__item"
        href="https://github.com/ElemartA"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon />
      </a>
      <span className="footer__item teammate_name">Sergei</span>
      <a
        className="footer__item"
        href="https://github.com/Essonti"
        target="_blank"
        rel="noreferrer"
      >
        <GitHubIcon />
      </a>
      <a
        className="footer__item footer__item_right"
        href="https://rs.school/react/"
        target="_blank"
        rel="noreferrer"
      >
        The Rolling Scopes
      </a>
    </footer>
  );
};
