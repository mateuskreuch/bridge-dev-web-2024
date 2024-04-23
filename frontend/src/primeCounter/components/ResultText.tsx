import { css, keyframes } from "@emotion/react";

//----------------------------------------------------------------------------//

interface StarTextProps {
  label?: string;
  children?: string;
}

function ResultText(props: StarTextProps) {
  return (
    <div css={STYLES.container}>
      <div css={STYLES.mainText}>
        {
          // Split the letters to cause self-shadowing
          (props.children ?? "")
            .split("")
            .map((letter: string, index: number) => (
              <span css={STYLES.letter} key={index}>
                {letter}
              </span>
            ))
        }
      </div>
      {
        props.children ? <p css={STYLES.label}>{props.label}</p> : null
      }
    </div>
  );
}

//----------------------------------------------------------------------------//

const POP_IN_ANIMATION = keyframes`
    0% { transform: scaleY(  0%); }
   90% { transform: scaleY(  6%); }
   93% { transform: scaleY( 90%); }
   96% { transform: scaleY(130%); }
  100% { transform: scaleY(100%); }
`;

const FADE_IN_ANIMATION = keyframes`
    0% { opacity:   0%; }
  100% { opacity: 100%; }
`;

const STYLES = {
  container: css({
    maxWidth: "100%",
  }),

  mainText: css({
    display: "flex",
    justifyContent: "center",

    fontSize: "min(31vw, 176px)",
    textAlign: "center",
    whiteSpace: "nowrap",
    paddingLeft: "0.08em",
  }),

  letter: css({
    display: "inline-block",
    paddingBottom: "1rem",
    lineHeight: "0.43em",
    fontFamily: '"Micro 5", Courier, sans-serif',
    textShadow: `0 0 0.02em var( --g-color-accent--2 ),
                 0 0 0.06em var( --g-color-accent--2 ),
                 0 0 0.16em var( --g-color-accent-0  ),
                 0 0 0.20em var( --g-color-accent-2  )`,

    transform: "scaleY(0%)",
    animation: `${POP_IN_ANIMATION} 0.5s ease-in forwards`,
  }),

  label: css({
    textAlign: "center",
    fontFamily: "var( --g-font-family-monospace )",

    opacity: "0%",
    animation: `${FADE_IN_ANIMATION} 0.5s ease-in forwards`,
    animationDelay: "0.5s",
  }),
};

//----------------------------------------------------------------------------//

export default ResultText;
