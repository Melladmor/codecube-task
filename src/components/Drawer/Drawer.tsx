import type { DrawerT } from "./type";
import style from "./style.module.css";

type Props = DrawerT;

const Drawer = ({ children, isOpen, toggleDrawer, title }: Props) => {
  return (
    <div>
      <div
        className={`${style.overlay} ${isOpen ? style.open : ""}`}
        onClick={toggleDrawer}
      />

      <div className={`${style.drawer} ${isOpen ? style.open : ""}`}>
        <div className={style.drawerHeader}>
          <h2 className={style.drawerTitle}>{title}</h2>
          <button className={style.closeButton} onClick={toggleDrawer}>
            ✕
          </button>
        </div>

        <div className={style.drawerContent}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
