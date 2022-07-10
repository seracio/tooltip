import "./index.css";
import { useTooltip } from "./index";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const MyComponent = () => {
  const [targetIndex, set] = useState(-1);
  const [Tooltip, root] = useTooltip({
    enterCb: (el) => set(+el.getAttribute("data-tooltip-index")),
    leaveCb: (el) => set(-1),
  });

  const size = 500;
  const data = [
    {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
    {
      x: 300,
      y: 200,
      width: 50,
      height: 80,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
      }}
      ref={root}
    >
      <Tooltip />
      <svg preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          return (
            <rect
              style={{ cursor: "pointer" }}
              key={i}
              data-tooltip={`rect number ${i + 1}`}
              data-tooltip-index={i}
              {...d}
              fill={targetIndex === i ? "red" : "blue"}
            />
          );
        })}
      </svg>
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as any);

root.render(<MyComponent />);
