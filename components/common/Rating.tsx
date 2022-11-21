import React from "react";
import { IoStarSharp, IoStarOutline, IoStarHalfOutline } from "react-icons/io5";

type Props = {
  votes: number;
};
const Rating: React.FC<Props> = ({ votes }) => {
  const score = String(votes / 2).split(".");
  const temp = new Array(5).fill("rating", 0);
  if (score.length === 1) {
    return (
      <ul className="text-xs flex items-start gap-1 text-neutral-500">
        {temp.map((star, index) => {
          if (index < Number(score[0])) {
            return (
              <li key={`${star}-${index}`}>
                <IoStarSharp className="mt-[1px]" />
              </li>
            );
          }
          return (
            <li key={`${star}-${index}`}>
              <IoStarOutline className="mt-[1px]" key={`${star}-${index}`} />
            </li>
          );
        })}
      </ul>
    );
  } else if (score.length === 2) {
    return (
      <ul className="text-xs flex items-start gap-1 text-neutral-500">
        {temp.map((star, index) => {
          if (index < Number(score[0])) {
            return (
              <li key={`${star}-${index}`}>
                <IoStarSharp className="mt-[1px]" key={`${star}-${index}`} />
              </li>
            );
          } else if (index === Number(score[0])) {
            return (
              <li key={`${star}-${index}`}>
                <IoStarHalfOutline
                  className="mt-[1px]"
                  key={`${star}-${index}`}
                />
              </li>
            );
          }
          return (
            <li key={`${star}-${index}`}>
              <IoStarOutline className="mt-[1px]" key={`${star}-${index}`} />
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className="text-xs flex items-start gap-1 text-yellow-500">
      {temp.map((star, index) => (
        <li key={`${star}-${index}`}>
          <IoStarOutline className="mt-[1px]" key={`${star}-${index}`} />
        </li>
      ))}
    </ul>
  );
};

export default Rating;
