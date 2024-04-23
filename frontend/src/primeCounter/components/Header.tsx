import { css, keyframes } from "@emotion/react";
import IconButton from "./IconButton";
import MediaQueries from "../../styles/MediaQueries";

//----------------------------------------------------------------------------//

interface HeaderProps {
  children: [React.ReactElement, React.ReactElement];
  onLeftButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRightButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Header(props: HeaderProps) {
  return (
    <header css={STYLES.header}>
      <div css={[STYLES.centralize, STYLES.buttonLeftArea]}>
        <IconButton onClick={props.onLeftButtonClick}>
          {props.children[0]}
        </IconButton>
      </div>
      <div css={[STYLES.centralize, STYLES.logoArea]}>
        <span css={STYLES.logo}>
          desafio
          <span css={STYLES.logoAccent}>bridge_</span>
        </span>
      </div>
      <div css={[STYLES.centralize, STYLES.buttonRightArea]}>
        <IconButton onClick={props.onRightButtonClick}>
          {props.children[1]}
        </IconButton>
      </div>
    </header>
  );
}

//----------------------------------------------------------------------------//

const SLIDE_RIGHT_LEFT_ANIMATION = keyframes`
  0% {
    opacity: 0%;
    transform: translate(30px, 0);
  }

  100% {
    opacity: 100%;
    transform: translate(0, 0);
  }
`;

const STYLES = {
  header: css({
    width: "100%",
    height: `var( --g-header-height )`,
    display: "grid",
    padding: "1rem",

    gap: "0.5rem",
    gridTemplate: '"buttonLeft logo buttonRight"',
    gridTemplateColumns: "auto 1fr auto",

    [MediaQueries.MD]: {
      paddingInline: "3rem",

      gridTemplate: '"logo buttonLeft buttonRight"',
      gridTemplateColumns: "1fr auto auto",
    },
  }),

  centralize: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  logoArea: css({
    gridArea: "logo",

    [MediaQueries.MD]: {
      justifyContent: "left",
    },
  }),

  buttonLeftArea: css({
    gridArea: "buttonLeft",
  }),

  buttonRightArea: css({
    gridArea: "buttonRight",
  }),

  logo: css({
    fontSize: "min(6vw, 2rem)",
    fontWeight: "bold",
    fontFamily: "var( --g-font-family-logo )",
    letterSpacing: "-0.04em",
    animation: `${SLIDE_RIGHT_LEFT_ANIMATION} 2s cubic-bezier(0.22, 1, 0.36, 1)`,
  }),

  logoAccent: css({
    color: "var( --g-color-accent-0 )",
    paddingLeft: "0.1em",
  }),
};

//----------------------------------------------------------------------------//

export default Header;
