import Konva from "konva";
import { StageConfig } from "konva/lib/Stage";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const config: StageConfig = {
  container: "app",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

let stage = new Konva.Stage(config);

const layer = new Konva.Layer();

const firstRect = new Konva.Rect({
  x: 20,
  y: 20,
  width: 100,
  height: 50,
  fill: "green",
  stroke: "black",
  strokeWidth: 4,
  draggable: true,
});

firstRect.on("mouseover", function () {
  document.body.style.cursor = "pointer";
});

firstRect.on("mouseout", function () {
  document.body.style.cursor = "default";
});

layer.add(firstRect);

const secondRect = new Konva.Rect({
  x: 150,
  y: 40,
  width: 100,
  height: 50,
  fill: "red",
  shadowBlur: 10,
  cornerRadius: 10,
});

layer.add(secondRect);

const thirdRect = new Konva.Rect({
  x: 50,
  y: 120,
  width: 100,
  height: 100,
  fill: "blue",
  cornerRadius: [0, 10, 20, 30],
});

layer.add(thirdRect);

stage.add(layer);
