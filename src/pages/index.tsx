import { MouseEvent, TouchEvent, useState } from "react";
import styles from "./index.less";

const level = 3;

function isAdjacent(index1: number, index2: number) {
  const row1 = Math.floor(index1 / level);
  const col1 = index1 % level;
  const row2 = Math.floor(index2 / level);
  const col2 = index2 % level;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

// const data = new Array(level * level).fill(0).map((_, index) => index);
const data = [8, 3, 1, 5, 2, 7, 6, 4, 0];
// const data = [1, 2, 3, 4, 5, 6, 7, 0, 8];
const obj = [1, 2, 3, 4, 5, 6, 7, 8, 0];

export default function HomePage() {
  const [list, setList] = useState(data);

  const handleShuffle = (
    index: number,
    e: MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const zeroIndex = list.indexOf(0);

    if (isAdjacent(index, zeroIndex)) {
      const newList = [...list];
      [newList[index], newList[zeroIndex]] = [
        newList[zeroIndex],
        newList[index],
      ];
      setList(newList);
      console.log(JSON.stringify(newList));
      if (newList.toString() === obj.toString()) {
        alert("You win!");
      }
    }
  };

  return (
    <div>
      <div className={styles.items}>
        {data.map((i) => {
          const index = list.indexOf(i);
          const x = (i - 1) % level;
          const y = Math.floor((i - 1) / level);
          const backgroundPosition = `${(x / (level - 1)) * 100}% ${(y / (level - 1)) * 100}%`;

          return (
            <div
              key={i}
              className={styles.item}
              style={{
                width: `${100 / level}%`,
                height: `${100 / level}%`,
                left: `${(index % level) * (100 / level)}%`,
                top: `${Math.floor(index / level) * (100 / level)}%`,
                backgroundImage: "url(/images/1.webp)",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${level * 100}% ${level * 100}%`,
                backgroundPosition: backgroundPosition,
              }}
              onClick={(e) => handleShuffle(index, e)}
              onTouchEnd={(e) => handleShuffle(index, e)}
            ></div>
          );
        })}
      </div>
      <img style={{ width: 200 }} src="/images/1.webp" alt="" />

      {/* {JSON.stringify(list)} */}
    </div>
  );
}
