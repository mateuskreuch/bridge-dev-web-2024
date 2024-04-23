import { useEffect, useRef } from "react";
import StarfieldWebGlProgram from "../webgl/StarfieldWebGlProgram";

//----------------------------------------------------------------------------//

interface StarfieldProps {
  className?: string;
  animationSpeed: number;
}

function Starfield(props: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef<StarfieldWebGlProgram>();

  useEffect(() => {
    try {
      programRef.current = new StarfieldWebGlProgram(canvasRef.current!,
                                                  CSS_COLOR_VARIABLE);
    }
    catch (error) {
      console.error((error as Error).message);
      window.alert("Algo deu errado ao preparar certos efeitos. "
                 + "É possível que seu navegador não suporte WebGL.");
      return;
    }

    // When the WebGL context is destroyed the canvas flashes white, so hide it
    const beforeUnload = () => {
      canvasRef.current!.style.display = "none";
    };

    // Resize viewport when container size changes
    const resizeObserver = new ResizeObserver(() => {
      programRef.current!.refitViewport();
      programRef.current!.renderFrame(0);
    });

    // Recolor when CSS changes
    const mutationObserver = new MutationObserver(() => {
      programRef.current!.recolorFromCss(CSS_COLOR_VARIABLE);
      programRef.current!.renderFrame(0);
    });

    // Hook everything up
    window.addEventListener("beforeunload", beforeUnload);
    resizeObserver.observe(canvasRef.current!.parentElement!);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"]
    });

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    }
  }, []);

  // Begin animation loop
  useEffect(() => {
    if (props.animationSpeed <= 0)
      return;

    let handleId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime > 0) {
        const dt = props.animationSpeed * (time - lastTime);

        programRef.current?.renderFrame(dt);
      }

      lastTime = time;
      handleId = requestAnimationFrame(animate);
    }

    animate(0);

    return () => cancelAnimationFrame(handleId);
  }, [props.animationSpeed]);

  return (
    <canvas ref={canvasRef} className={props.className} />
  );
}

//----------------------------------------------------------------------------//

const CSS_COLOR_VARIABLE = "--g-color-accent--1"

//----------------------------------------------------------------------------//

export default Starfield;
