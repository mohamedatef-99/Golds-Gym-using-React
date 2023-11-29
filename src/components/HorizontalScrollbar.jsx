import { useRef } from "react";

import { Typography } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import LeftArrowIcon from "../assets/icons/left-arrow.png";

const RightArrow = ({ scrollNext }) => (
  <Typography onClick={scrollNext} className="right-arrow">
    <img src={RightArrowIcon} alt="right-arrow" />
  </Typography>
);

const LeftArrow = ({ scrollPrev }) => (
  <Typography onClick={scrollPrev} className="left-arrow">
    <img src={LeftArrowIcon} alt="left-arrow" />
  </Typography>
);

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      const scrollAmount = 3 * 310;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const scrollAmount = -3 * 310;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          overflowX: "auto",
          display: "flex",
          maxWidth: "100%",
          WebkitOverflowScrolling: "touch",
          position: "relative",
        }}
        ref={scrollRef}
      >
        {data.map((item, index) => (
          <div
            key={item.id || item}
            style={{
              position: "relative",
              minWidth: "300px",
              marginRight: index === data.length - 1 ? "0" : "10px",
            }}
          >
            {bodyParts ? (
              <BodyPart
                item={item}
                setBodyPart={setBodyPart}
                bodyPart={bodyPart}
              />
            ) : (
              <ExerciseCard exercise={item} />
            )}
          </div>
        ))}
      </div>
      <div style={{ position: "relative", top: "0", left: "0" }}>
        <LeftArrow scrollPrev={scrollPrev} />
      </div>
      <div style={{ position: "absolute", bottom: "0", right: "0" }}>
        <RightArrow scrollNext={scrollNext} />
      </div>
    </div>
  );
};
export default HorizontalScrollbar;
