import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import React from "react";

const ImageCarousel = () => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const slides = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fchef.JPEG?alt=media&token=46229385-c095-44f6-8794-01a4645052c7",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fparadise-dynasty.JPEG?alt=media&token=3b2597d4-be44-4ba4-ada0-2a2e6e68d7a1",
    },
  ];

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);
  return (
    <div>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "1920px",
            maxHeight: "900px",
            objectFit: "cover",
            aspectRatio: "5 / 2",
            margin: "0 auto",
          },
        }}
      />
    </div>
  );
};

export default ImageCarousel;
