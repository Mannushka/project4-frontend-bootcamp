import "./Images.css";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LightBox from "./LightBox";

interface ImageGridProps {
  images: Image[];
}
interface Image {
  id: number;
  photo: string;
}

export const ImageGrid = ({ images }: ImageGridProps): JSX.Element => {
  const [index, setIndex] = useState<number>(-1);
  const imageList = images.map((image, index) => (
    <div
      key={image.id}
      className="image"
      onClick={() => handleClickImage(index)}
    >
      <img src={image.photo} alt="photo" />
    </div>
  ));
  const slides = images.map((image) => ({ src: image.photo }));

  const handleClickImage = (index: number) => {
    setIndex(index);
  };

  return (
    <div className="images-container">
      {images.length ? imageList : null}
      <LightBox index={index} setIndex={setIndex} slides={slides} />
    </div>
  );
};
