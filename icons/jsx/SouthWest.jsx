import * as React from "react";

function SvgSouthWest(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z" />
    </svg>
  );
}

export default SvgSouthWest;
