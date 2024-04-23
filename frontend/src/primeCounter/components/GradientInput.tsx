import { FormEvent, RefObject, useMemo, useRef } from "react";
import { css } from "@emotion/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import IconButton from "./IconButton";

//----------------------------------------------------------------------------//

interface GradientInputProps {
  type?: React.HTMLInputTypeAttribute;
  gradient: string[];
  inputMode?: "search" | "text" | "none" | "email" | "tel" | "url" | "numeric"
            | "decimal";
  onSubmit: (value: string) => void;
  maskHook?: (ref: RefObject<HTMLInputElement>) => void;
}

function GradientInput(props: GradientInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerStyle = useMemo(() => STYLES.container(props.gradient),
                                 [props.gradient]);

  if (props.maskHook)
    props.maskHook(inputRef);

  const submitWithValue = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit(inputRef.current!.value);
  };

  return (
    <form css={containerStyle} autoComplete="off" onSubmit={submitWithValue}>
      <input
        ref={inputRef}
        css={STYLES.input}
        type={props.type}
        inputMode={props.inputMode}
      />
      <IconButton css={STYLES.button} type="submit">
        <IconArrowNarrowRight css={STYLES.icon} />
      </IconButton>
    </form>
  );
}

//----------------------------------------------------------------------------//

const STYLES = {
  container: (gradient: string[]) => css({
    "--button-width": "2.75rem",
    "--border-size": "2px",
    "--color-transition-time": "0.5s",

    position: "relative",

    svg: {
      color: gradient[gradient.length - 1],
    },
    ":focus-within svg": {
      color: gradient[0],
    },
    "input:not(:disabled)": {
      borderImage: `linear-gradient(to right, ${gradient.join(",")}) 1`,
    },
    ":focus-within input:not(:disabled)": {
      borderImage: `linear-gradient(to right, ${gradient
        .slice()
        .reverse()
        .join(",")}) 1`,
    },
  }),

  icon: css({
    transition: `color var( --color-transition-time ) ease-in-out`,
  }),

  button: css({
    padding: '0',
    top: "var( --border-size  )",
    right: "var( --border-size  )",
    bottom: "var( --border-size  )",
    position: "absolute",
    width: "var( --button-width )",
  }),

  input: css({
    width: "100%",
    padding: "0.65rem",
    paddingRight: "var( --button-width )",
    borderWidth: "var( --border-size )",

    color: "inherit",
    outline: "none",
    fontSize: "var( --g-step--1 )",
    lineHeight: '1.25em',
    backgroundColor: "var( --g-color-primary )",

    boxShadow: "0 0 0.5rem var( --g-color-primary )",
    transition: `border-image var( --color-transition-time ) ease-in-out`,
  }),
};

//----------------------------------------------------------------------------//

export default GradientInput;
