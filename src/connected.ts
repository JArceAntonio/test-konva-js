import Konva from "konva";
import { StageConfig } from "konva/lib/Stage";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const SQUARE_WIDTH = 100;

const config: StageConfig = {
  container: "app",
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

const stage = new Konva.Stage(config);

const layer = new Konva.Layer();

const firstRect = new Konva.Rect({
  x: 20,
  y: 20,
  width: SQUARE_WIDTH,
  height: SQUARE_WIDTH,
  fill: "#dcdcdc",
  draggable: true,
});
const secondRect = new Konva.Rect({
  x: 240,
  y: 30,
  width: SQUARE_WIDTH,
  height: SQUARE_WIDTH,
  fill: "#aD8390",
  draggable: true,
});

const line = new Konva.Line({
  points: [
    firstRect.x() + firstRect.width(),
    firstRect.y() + firstRect.height() / 2,
    secondRect.x(),
    secondRect.y() + secondRect.height() / 2,
  ],
  stroke: "blue",
  strokeWidth: 4,
  lineCap: "round",
  lineJoin: "round",
  dash: [19, 10, 0.001, 10],
});

firstRect.on("dragmove", () => {
  if (firstRect.x() > secondRect.x() + SQUARE_WIDTH / 2) {
    let pointsToDraw = [
      secondRect.x() + secondRect.width(),
      secondRect.y() + secondRect.height() / 2,
    ];

    let distanceDifference = firstRect.x() - (secondRect.x() + SQUARE_WIDTH);

    if (distanceDifference > 300) {
      let segmentDistance = distanceDifference / 2;
      pointsToDraw.push(
        secondRect.x() + secondRect.width() + segmentDistance,
        secondRect.y() + secondRect.height() / 2,
        secondRect.x() + secondRect.width() + segmentDistance,
        firstRect.y() + firstRect.height() / 2
      );
    }

    pointsToDraw.push(firstRect.x(), firstRect.y() + firstRect.height() / 2);

    line.points(pointsToDraw);
  } else {
    console.log("redraw else");
    let pointsToDraw = [
      firstRect.x() + firstRect.width(),
      firstRect.y() + firstRect.height() / 2,
    ];

    let distanceDifference = secondRect.x() - firstRect.x() - SQUARE_WIDTH;

    if (distanceDifference > 300) {
      let segmentDistance = distanceDifference / 2;
      pointsToDraw.push(
        firstRect.x() + firstRect.width() + segmentDistance,
        firstRect.y() + firstRect.height() / 2,
        firstRect.x() + firstRect.width() + segmentDistance,
        secondRect.y() + secondRect.height() / 2
      );
    }

    pointsToDraw.push(secondRect.x(), secondRect.y() + secondRect.height() / 2);
    line.points(pointsToDraw);
  }

  // line.batchDraw();
});

secondRect.on("dragmove", () => {
  if (secondRect.x() > firstRect.x() + SQUARE_WIDTH / 2) {
    line.points([
      firstRect.x() + firstRect.width(),
      firstRect.y() + firstRect.height() / 2,
      secondRect.x(),
      secondRect.y() + secondRect.height() / 2,
    ]);
  } else {
    line.points([
      firstRect.x(),
      firstRect.y() + firstRect.height() / 2,
      secondRect.x() + secondRect.width(),
      secondRect.y() + secondRect.height() / 2,
    ]);
  }

  // line.batchDraw();
});

line.on("mouseenter", () => {
  console.log("mouseenter");
  line.setAttr("stroke", "lightblue");
  // line.batchDraw();
});
line.on("mouseleave", () => {
  console.log("mouseleave");
  line.setAttr("stroke", "blue");
  // line.batchDraw();
});

layer.add(firstRect);
layer.add(secondRect);
layer.add(line);

stage.add(layer);
