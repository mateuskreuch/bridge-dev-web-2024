import { Fragment } from "react";
import { css } from "@emotion/react";
import { IconTrash, IconX } from "@tabler/icons-react";
import IconButton from "./IconButton";
import MediaQueries from "../../styles/MediaQueries";

//----------------------------------------------------------------------------//

interface ResultHistoryProps {
  show: boolean;
  onHide?: React.MouseEventHandler<HTMLButtonElement>;
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
  history: [string, string][];
}

function ResultHistory(props: ResultHistoryProps) {
  return (
    <div
      css={STYLES.container}
      style={{ right: props.show ? "0" : "var( --retracted )" }}
    >
      <div css={STYLES.header}>
        <IconButton onClick={props.onHide}>
          <IconX />
        </IconButton>
        <IconButton onClick={props.onClear}>
          <IconTrash />
        </IconButton>
      </div>
      <div css={STYLES.console}>
        <span css={STYLES.handle}>
          {STYLES.userName}@{STYLES.machineName}
        </span>
        :~$ show history<br />
        {
          props.history.length <= 0 ? (
            <>Não há histórico disponível<br /></>
          ) : (
            <div css={STYLES.history}>
              <span>NÚMERO</span>|<span>RESULTADO</span>
              {
                props.history.map((pair: string[], index: number) => (
                  <Fragment key={index}>
                    <span>{pair[0]}</span>|<span>{pair[1]}</span>
                  </Fragment>
                ))
              }
            </div>
          )
        }
        <span css={STYLES.handle}>
          {STYLES.userName}@{STYLES.machineName}
        </span>
        :~$
      </div>
    </div>
  );
}

//----------------------------------------------------------------------------//

const STYLES = {
  userName: "icountprimes",
  machineName: "ubuntu",

  container: css({
    "--border-size": "2px",
    "--width": "calc(100vw)",
    "--border-color": "var( --g-color-accent-1 )",
    "--retracted": "calc(-1 * var( --width ) - var( --border-size ))",

    top: "0",
    bottom: "0",
    position: "fixed",

    width: "var( --width )",
    outline: "var( --border-size ) solid var( --border-color )",
    fontFamily: "var( --g-font-family-monospace )",
    lineHeight: "1.1em",
    transition: `right 0.5s ease-in-out`,
    backgroundColor: "var( --g-color-primary )",

    [MediaQueries.MD]: {
      "--width": "42vw",
    },
  }),

  header: css({
    display: 'flex',
    borderBottom: "var( --border-size ) solid var( --border-color )",
  }),

  console: css({
    padding: "1rem",
  }),

  handle: css({
    color: "var( --g-color-accent-0 )",
  }),

  history: css({
    display: "grid",
    overflow: "auto",
    maxWidth: "500px",
    maxHeight: "70vh",
    justifyItems: "center",
    gridTemplateColumns: "1fr auto 1fr",

    "span:nth-of-type(4n - 1), span:nth-of-type(4n)": {
      color: "var( --g-color-text-1 )",
    },

    "::-webkit-scrollbar": {
      width: "10px",
      backgroundColor: "var( --g-color-primary )",
    },
    "::-webkit-scrollbar-thumb": {
      border: "var( --border-size ) solid var( --g-color-accent-1 )",
      borderRadius: "2px",
    },
  }),
};

//----------------------------------------------------------------------------//

export default ResultHistory;
