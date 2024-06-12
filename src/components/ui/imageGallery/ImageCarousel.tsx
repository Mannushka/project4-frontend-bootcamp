import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import { useState } from "react";
interface ImageCarouselProps {
  slides: { src: string }[];
}

const ImageCarousel = ({ slides }: ImageCarouselProps) => {
  const [index, setIndex] = useState<number>(0);

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
            aspectRatio: "5 / 2",
            margin: "0 auto",
          },
        }}
      />
    </div>
  );
};

export default ImageCarousel;
