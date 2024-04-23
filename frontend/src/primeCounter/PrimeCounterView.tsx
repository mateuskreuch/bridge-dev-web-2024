import { css, keyframes } from "@emotion/react";
import {
  IconList,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled
} from "@tabler/icons-react";
import astronautSrc from "../assets/astronaut.png";
import MediaQueries from "../styles/MediaQueries";
import ErrorColorMap from "../styles/ErrorColorMap";
import Header from "./components/Header";
import Starfield from "./components/Starfield";
import ResultText from "./components/ResultText";
import GradientInput from "./components/GradientInput";
import ResultHistory from "./components/ResultHistory";
import fetchPrimeCount from "./services/fetchPrimeCount";
import PrimeCounterValidator from "./Validator";
import useStarfield from "./hooks/useStarfield";
import useResultText from "./hooks/useResultText";
import useResultHistory from "./hooks/useResultHistory";
import useNumberInputMask from "./hooks/useNumberInputMask";

//----------------------------------------------------------------------------//

function PrimeCounterView() {
  const starfield     = useStarfield();
  const resultText    = useResultText(STYLES.greeting);
  const resultHistory = useResultHistory();

  const displayResult = (result: string, label: string) => {
    resultText.set(result, label);
    starfield.changeSpeed(1, STYLES.starfieldNormalizeDelay);
  };

  const fetchAndDisplayPrimeCount = async (value: string) => {
    starfield.changeSpeed(STYLES.starfieldFastSpeed);

    let k;
    let data;

    try {
      PrimeCounterValidator.validateFetchPrimeCountInput(value);

      k = Number.parseInt(value);
      data = await fetchPrimeCount(k);
    }
    catch (error) {
      displayResult("inválido", (error as Error).message.toLowerCase());
      ErrorColorMap.apply();
      return;
    }

    const count = data.count.toString();

    displayResult(count, data.time);
    resultHistory.addEntry(k.toString(), count);
    ErrorColorMap.remove();
  };

  return (
    <>
      <Header
        onLeftButtonClick={starfield.toggle}
        onRightButtonClick={() => resultHistory.setShow(true)}
      >
        {starfield.speed <= 0 ? <IconPlayerPlayFilled />
                              : <IconPlayerPauseFilled />}
        <IconList />
      </Header>
      <main css={STYLES.grid}>
        <div css={STYLES.cell}>
          <div>
            <h1 css={STYLES.shadowOnText}>
              Contador de Números Primos 7.0
            </h1>
            <p css={[STYLES.shadowOnText, STYLES.description]}>
              Insira um número abaixo para descobrir quantos números
              primos menores que o número inserido existem.
            </p>
            <GradientInput
              gradient={STYLES.inputGradient}
              type="text"
              inputMode="numeric"
              maskHook={useNumberInputMask}
              onSubmit={fetchAndDisplayPrimeCount}
            />
          </div>
        </div>
        <div css={STYLES.cell}>
          <ResultText key={resultText.key} label={resultText.label}>
            {resultText.result}
          </ResultText>
        </div>
      </main>
      <ResultHistory
        show={resultHistory.show}
        onHide={() => resultHistory.setShow(false)}
        onClear={resultHistory.clear}
        history={resultHistory.history}
      />
      <img css={STYLES.astronaut} src={astronautSrc} alt="Astronauta" />
      <Starfield css={STYLES.starfield} animationSpeed={starfield.speed} />
    </>
  )
}

//----------------------------------------------------------------------------//

const ROTATE_ANIMATION = keyframes`
    0% { transform: rotate(  0deg); }
  100% { transform: rotate(360deg); }
`;

const STYLES = {
  greeting: "^_^",
  starfieldFastSpeed: 8,
  starfieldNormalizeDelay: 500,

  inputGradient: [
    "var( --g-color-text-0 )",
    "var( --g-color-accent-0 )",
    "var( --g-color-accent-1 )"
  ],

  grid: css({
    "--rows": "2",
    "--columns": "1",

    display: "grid",
    marginBlock: "7vh",
    justifyContent: "center",

    columnGap: "14vw",
    gridTemplateRows: "repeat(var( --rows    ), 1fr)",
    gridTemplateColumns: "repeat(var( --columns ), minmax(0, 500px))",

    [MediaQueries.MD]: {
      "--rows": "1",
      "--columns": "2",

      height: `calc(100vh - 2*var( --g-header-height ))`,
      marginBlock: "0",
    },
  }),

  cell: css({
    padding: "2rem",
    display: "flex",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  }),

  shadowOnText: css({
    "--size": "0.4em",

    textShadow: `0 0 var( --size ) var( --g-color-primary ),  
                 0 0 var( --size ) var( --g-color-primary ),
                 0 0 var( --size ) var( --g-color-primary )`,
  }),

  description: css({
    textAlign: "justify",
    marginBlock: "1rem 1.5rem",
  }),

  astronaut: css({
    right: "15vw",
    top: "32vw",
    zIndex: "-99",
    position: "absolute",
    animation: `${ROTATE_ANIMATION} 6s linear infinite`,
    userSelect: "none",
  }),

  starfield: css({
    top: "0",
    width: "100%",
    height: "100%",
    zIndex: "-99",
    position: "fixed",
  }),
};

//----------------------------------------------------------------------------//

export default PrimeCounterView;
