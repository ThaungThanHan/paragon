import * as React from "react";

function SvgTapas(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M22 10V1h-8v9c0 1.86 1.28 3.41 3 3.86V21h-2v2h6v-2h-2v-7.14c1.72-.45 3-2 3-3.86zm-2-7v3h-4V3h4zM10 9H8V8h2a2.5 2.5 0 000-5H8V1H6v2H4a2.5 2.5 0 000 5h2v1H4a2.5 2.5 0 000 5h2v9h2v-9h2a2.5 2.5 0 000-5z" />
    </svg>
  );
}

export default SvgTapas;
