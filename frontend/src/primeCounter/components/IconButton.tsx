import { ButtonHTMLAttributes } from "react";
import { css, keyframes } from "@emotion/react";

//----------------------------------------------------------------------------//

function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button css={STYLES.button} {...props}>
      {props.children}
    </button>
  )
}

//----------------------------------------------------------------------------//

const BUTTON_ANIMATION = keyframes`
    0% { transform: rotate(  0deg); }
  100% { transform: rotate(360deg); }
`;

const STYLES = {
  button: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "var( --g-color-text-0 )",
    backgroundColor: "transparent",

    border: "none",
    cursor: "pointer",
    padding: "0.75rem",
    userSelect: "none",

    ":not(:disabled):focus > *": {
      animation: `${BUTTON_ANIMATION} 0.4s ease-in-out`,
    },
    ":not(:disabled):active > *": {
      animation: "none",
    },

    "@media (hover: hover)": {
      ":not(:disabled):hover > *": {
        transform: "scale(130%)",
      },
    },
  }),
}

//----------------------------------------------------------------------------//

export default IconButton;
