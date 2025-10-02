import { useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils";
import style from "./style.module.css";
const Header = () => {
  const token = getToken();
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <div className={style.logo}>
        <div className={style.logo_icon}>C</div>
        <span className={style.logo_text}>Code Cube</span>
      </div>
      {token && (
        <button className={style.logout_btn} onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
