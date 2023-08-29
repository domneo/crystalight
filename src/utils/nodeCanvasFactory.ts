import Canvas from "canvas";

interface CanvasAndContextType {
  canvas: { width: number; height: number } | null;
  context: CanvasRenderingContext2D | null;
}
export class NodeCanvasFactory {
  create(width: number, height: number) {
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext("2d");
    return { canvas, context };
  }
  reset(canvasAndContext: CanvasAndContextType, width: number, height: number) {
    if (canvasAndContext.canvas) {
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }
  destroy(canvasAndContext: CanvasAndContextType) {
    if (canvasAndContext.canvas) {
      // Zeroing the width and height cause Firefox to release graphics
      // resources immediately, which can greatly reduce memory consumption.
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }
}
