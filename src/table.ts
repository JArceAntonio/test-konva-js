import Konva from "konva";
import { v4 as uuid } from "uuid";

type RowProp = {
  id: string;
  columnName: string;
  columnType: string;
  isPrimaryKey?: boolean;
};

const properties: RowProp[] = [
  { id: uuid(), columnName: "id", columnType: "int", isPrimaryKey: true },
  { id: uuid(), columnName: "number", columnType: "int" },
  { id: uuid(), columnName: "date", columnType: "date" },
  { id: uuid(), columnName: "tax", columnType: "string(1)" },
  { id: uuid(), columnName: "business_partner_id", columnType: "int" },
  { id: uuid(), columnName: "amount", columnType: "decimal(8, 2)" },
  { id: uuid(), columnName: "paid_to_date", columnType: "decimal(8, 2)" },
  { id: uuid(), columnName: "crated_by", columnType: "int" },
  { id: uuid(), columnName: "canceled_at", columnType: "timestamp" },
  { id: uuid(), columnName: "canceled_by", columnType: "int" },
  { id: uuid(), columnName: "synced_at", columnType: "timestamp" },
];

const TABLE_WIDTH = 250;

const FONT_FAMILY = "Helvetica";

function createRow(prop: RowProp, position: number) {
  const x = 20;
  const y = 30 * position + 20;

  const rowGroup = new Konva.Group({
    x,
    y,
  });
  const columnNameText = new Konva.Text({
    // x,
    // y,
    text: prop.columnName,
    fontSize: 12,
    fontStyle: prop.isPrimaryKey ? "bold" : "normal",
    fontFamily: FONT_FAMILY,
    fill: "#6c6c6c",
    padding: 9,
    width: TABLE_WIDTH,
    align: "left",
  });

  const columnTypeText = new Konva.Text({
    // x,
    // y,
    text: prop.columnType,
    fontSize: 12,
    fontStyle: prop.isPrimaryKey ? "bold" : "normal",
    fontFamily: FONT_FAMILY,
    fill: "#8c8c8c",
    padding: 9,
    width: TABLE_WIDTH,
    height: 30,
    align: "right",
  });

  const columnBox = new Konva.Rect({
    // x,
    // y,
    width: TABLE_WIDTH,
    height: 30,
    fill: "#fff",
  });

  const columnLine = new Konva.Line({
    points: [0, 30 - 1, TABLE_WIDTH, 30 - 1],
    width: TABLE_WIDTH,
    strokeWidth: 0.5,
    stroke: "#8c8c8c",
  });

  rowGroup.add(columnBox);
  rowGroup.add(columnLine);

  rowGroup.add(columnNameText);
  rowGroup.add(columnTypeText);

  return rowGroup;
}

const stage = new Konva.Stage({
  width: window.innerWidth,
  height: window.innerHeight,
  container: "app",
});

const mainLayer = new Konva.Layer();

const tableGroup = new Konva.Group({
  draggable: true,
});

const tableHeaderGroup = new Konva.Group({
  x: 20,
  y: 20,
});

const tableHeaderRect = new Konva.Rect({
  // x: 20,
  // y: 20,
  width: TABLE_WIDTH,
  height: 30,
  fill: "#295E8B",
});

const tableHeaderText = new Konva.Text({
  // x: 20,
  // y: 20,
  text: "invoices",
  fontSize: 12,
  fontFamily: FONT_FAMILY,
  fontStyle: "bold",
  fill: "#fff",
  padding: 9,
  width: tableHeaderRect.width(),
  align: "left",
});

tableHeaderGroup.add(tableHeaderRect);
tableHeaderGroup.add(tableHeaderText);

tableGroup.add(tableHeaderGroup);

tableGroup.on("mouseover", () => {
  document.body.style.cursor = "pointer";
});

tableGroup.on("mouseout", () => {
  document.body.style.cursor = "default";
});

properties.forEach((propertie, index) => {
  const propertyGroup = createRow(propertie, index + 1);
  tableGroup.add(propertyGroup);
});

mainLayer.add(tableGroup);

stage.add(mainLayer);
