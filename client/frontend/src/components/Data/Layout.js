import Button from "@mui/material/Button";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Button variant="outlined">
          <Link to="/category">CategoryData</Link>
        </Button>
      </div>
      <div style={{ margin: "10px" }}>
        <Button variant="outlined">
          <Link to="/product">ProductData</Link>
        </Button>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
