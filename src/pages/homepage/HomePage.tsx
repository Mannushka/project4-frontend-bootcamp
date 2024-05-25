import ImageCarousel from "../../components/ui/imageGallery/ImageCarousel";
import "./HomePage.css";

const HomePage = (): JSX.Element => {
  const homepafeSlides = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fchef.JPEG?alt=media&token=46229385-c095-44f6-8794-01a4645052c7",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fparadise-dynasty.JPEG?alt=media&token=3b2597d4-be44-4ba4-ada0-2a2e6e68d7a1",
    },
  ];
  return (
    <div className="home-page-container">
      <ImageCarousel slides={homepafeSlides} />
    </div>
  );
};

export default HomePage;
