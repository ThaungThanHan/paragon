import * as React from "react";

function SvgTrendingFlat(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M22 12l-4-4v3H3v2h15v3l4-4z" />
    </svg>
  );
}

export default SvgTrendingFlat;
