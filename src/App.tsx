import "./App.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Outlet } from "react-router";

import { Wrapper } from "./components/Wrapper/Wrapper";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Breadcrumbs } from "./components/ui/Breadcrumps";

export const App = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <main className="flex-grow">
          <Breadcrumbs />
          <Outlet></Outlet>
        </main>
      </Wrapper>
      <Footer />
    </>
  );
};
