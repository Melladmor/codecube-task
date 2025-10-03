import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, removeLocalStorageItem } from "../../utils";
import style from "./style.module.css";
import { useToaster } from "../../context/ToasterProvider";
import Button from "../Buttons/Button";
import { MdOutlineLogout } from "react-icons/md";
const Header = () => {
  const token = getLocalStorageItem<string>("token");
  const navigate = useNavigate();

  const toaster = useToaster();
  const logout = () => {
    removeLocalStorageItem("token");
    removeLocalStorageItem("user");
    toaster("Logout Success", "success");
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <div className={style.logo}>
        <div className={style.logo_icon}>C</div>
        <span className={style.logo_text}>Code Cube</span>
      </div>
      {token && (
        <Button type="button" onClick={logout} className={style.logout_btn}>
          <MdOutlineLogout size={14} />
        </Button>
      )}
    </header>
  );
};

export default Header;
