import * as React from "react";

function SvgFrontHand(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M18.5 8v7H18c-1.65 0-3 1.35-3 3h-1c0-2.04 1.53-3.72 3.5-3.97V2H15v9h-1V0h-2.5v11h-1V1.5H8V12H7V4.5H4.5v11.25c0 4.56 3.69 8.25 8.25 8.25S21 20.31 21 15.75V8h-2.5z" />
    </svg>
  );
}

export default SvgFrontHand;
