import ColorGenerator from "./components/color-gen";
import Footer from "./components/footer";
import Header from "./components/header";
import Mockups from "./components/mockups";

export default function Home() {
  return (
    <>
      <Header />
      <Mockups />
      <ColorGenerator />
      {/* <Footer /> */}
    </>      
  );
}
