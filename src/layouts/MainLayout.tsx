import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

type Props = {};

const MainLayout = (props: Props) => {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
