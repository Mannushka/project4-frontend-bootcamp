import React from "react";
import "./Images.css";
interface ImageGridProps {
  images: Image[];
  // onClick: () => void;
}
interface Image {
  id: number;
  photo: string;
}

export const ImageGrid = ({ images }: ImageGridProps): JSX.Element => {
  const imageList = images.map((image) => (
    <div key={image.id} className="image">
      <img src={image.photo} alt="photo  " />
    </div>
  ));
  return (
    <div className="images-container">{images.length ? imageList : null}</div>
  );
};
