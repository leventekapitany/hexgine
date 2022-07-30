import {
  InstancedMesh,
  MeshBasicMaterial,
  Matrix4,
  Color,
  Vector2,
} from 'three';
import { Hexagon } from '../../geometry/hexagon';

export default class Chunk extends InstancedMesh {
  rows: number;
  columns: number;
  hex: Hexagon;
  offset: Vector2;

  constructor(
    rows: number,
    columns: number,
    offset: Vector2 = new Vector2(0, 0),
  ) {
    const hexa = new Hexagon(0.5);
    const material = new MeshBasicMaterial({
      color: new Color(Math.random(), Math.random(), Math.random()),
    });
    const instanceCount = rows * columns;

    const MAX_INSTANCE_COUNT = 10000;
    super(hexa, material, Math.min(MAX_INSTANCE_COUNT, instanceCount));

    if (instanceCount > MAX_INSTANCE_COUNT) {
      console.error('instance count exceeds maximum value');
    }

    this.rows = rows;
    this.columns = columns;
    this.hex = hexa;
    this.offset = offset;

    this.setMatrices();
  }

  private setMatrices() {
    let i = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        const currentRowD = r % 2 ? this.hex.rowDistance : 0;
        const x = c * this.hex.dX + currentRowD;
        const y = r * this.hex.dY;

        const matrix = new Matrix4();
        matrix.setPosition(x + this.offset.x, 0, y + this.offset.y);

        this.setMatrixAt(i, matrix);

        this.setColorAt(i, new Color(0.6, 0.2, 0.2));

        i += 1;
      }
    }
  }

  get dX(): number {
    return this.columns * this.hex.dX;
  }

  get dY(): number {
    return this.rows * this.hex.dY;
  }
}