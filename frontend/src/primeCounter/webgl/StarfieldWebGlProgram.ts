import vertexCode from "./StarfieldVertex.glsl?raw";
import fragmentCode from "./StarfieldFragment.glsl?raw";
import rgba from "color-rgba";

//----------------------------------------------------------------------------//

class StarfieldWebGlProgram {
  private static MAX_DRAG = 500;

  private gl: WebGLRenderingContext;
  private time: number;
  private canvas: HTMLCanvasElement;
  private program: WebGLProgram;

  constructor(canvas: HTMLCanvasElement, initialCssColorVar: string) {
    this.canvas = canvas;
    this.time = 0;

    const gl = this.canvas.getContext("webgl");

    if (!gl) {
      throw Error("Couldnt create WebGL context");
    }

    this.gl = gl;
    this.program = gl.createProgram()!;

    this.attachShaderSource(vertexCode,   gl.VERTEX_SHADER);
    this.attachShaderSource(fragmentCode, gl.FRAGMENT_SHADER);

    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      throw Error("Couldnt link program:" + gl.getProgramInfoLog(this.program));
    }

    this.setupRectangleVertexData();
    this.refitViewport();
    this.recolorFromCss(initialCssColorVar);
    this.renderFrame(0);
  }

  //

  refitViewport() {
    const { gl, canvas, program } = this;
    const vmaxLocation = gl.getUniformLocation(program, "vmax");

    canvas.width  = Math.round(canvas.clientWidth  * window.devicePixelRatio);
    canvas.height = Math.round(canvas.clientHeight * window.devicePixelRatio);

    gl.useProgram(program);
    gl.uniform1f(vmaxLocation, Math.max(canvas.width, canvas.height));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  renderFrame(dt: number) {
    const { gl, program } = this;
    const timeLocation = gl.getUniformLocation(program, "time");

    this.time += 0.0003 * dt;

    gl.useProgram(program);
    gl.uniform1f(timeLocation, this.time);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  recolorFromCss(cssColorVar: string) {
    const { gl, program } = this;
    const dragLocation = gl.getUniformLocation(program, "drag");

    const style = window.getComputedStyle(document.documentElement);
  
    let [r, g, b, a] = rgba(style.getPropertyValue(cssColorVar))!;

    r = StarfieldWebGlProgram.MAX_DRAG - StarfieldWebGlProgram.MAX_DRAG * r / 255;
    g = StarfieldWebGlProgram.MAX_DRAG - StarfieldWebGlProgram.MAX_DRAG * g / 255;
    b = StarfieldWebGlProgram.MAX_DRAG - StarfieldWebGlProgram.MAX_DRAG * b / 255;
    a = Math.min(r, g, b);

    gl.useProgram(program);
    gl.uniform4f(dragLocation, r, g, b, a);
  }

  //

  private attachShaderSource(source: string, type: number) {
    const gl = this.gl;
    const shader = gl.createShader(type)!;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);

      gl.deleteShader(shader);

      throw Error("Couldnt compile shader:" + log);
    }

    gl.attachShader(this.program, shader);
  }

  private setupRectangleVertexData() {
    const gl = this.gl;
    const positions = [-1, -1  ,  1, -1  ,  -1, 1  ,  -1, 1  ,  1, -1  ,  1, 1];
    const positionBuffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(this.program, "a_position");

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  }
}

//----------------------------------------------------------------------------//

export default StarfieldWebGlProgram;