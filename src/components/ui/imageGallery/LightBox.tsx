import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download, Fullscreen } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface LightBoxProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  slides: { src: string }[];
}
const LightBox = ({ index, setIndex, slides }: LightBoxProps): JSX.Element => {
  return (
    <div>
      <Lightbox
        plugins={[Download, Fullscreen]}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
};

export default LightBox;
