import { useContext, useEffect, useRef } from "react";
import { Placeholder } from "../styled";
import { PuzzleCaptchaContext } from "../const";

function ImagePlaceholder() {
  const {
    data: { image, isError, isReady },
    setPuzzleCaptchaContext,
  } = useContext(PuzzleCaptchaContext);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    imgRef.current && imgRef.current.setAttribute("src", image);
  }, [image]);

  useEffect(() => {
    if (isReady) {
      const imgElement = imgRef.current;
      if (imgElement) {
        setPuzzleCaptchaContext("boxSize", {
          width: imgElement.width,
          height: imgElement.height,
        });
        const resizeObserver = new ResizeObserver((elements) => {
          elements.map((element) => {
            setPuzzleCaptchaContext("boxSize", {
              width: element.contentRect.width,
              height: element.contentRect.height,
            });
          });
        });
        resizeObserver.observe(imgElement);
        return () => {
          resizeObserver.disconnect();
        };
      }
    }
  }, [isReady]);

  const handleError = () => {
    setPuzzleCaptchaContext("isError", true);
  };

  const handleLoad = () => {
    setPuzzleCaptchaContext("isReady", true);
  };

  if (isError) {
    return <p>Wrong image!</p>;
  }

  return (
    <Placeholder
      className={`placeholder ${isError ? "is-error" : ""}`}
      ref={imgRef}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

export default ImagePlaceholder;
