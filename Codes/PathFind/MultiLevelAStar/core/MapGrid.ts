import { MapNode } from './MapNode';
import { IGridConstructor, IPoint } from '../interfaces/astar.interfaces';

type CornerType = "lb" | "lt" | "rt" | "rb";

export class MapGrid {
  // General properties
  readonly width: number;
  readonly height: number;
  readonly numberOfFields: number;

  // The node grid
  private gridNodes: MapNode[][];

  constructor(aParams: IGridConstructor) {
    // Set the general properties
    if (aParams.width && aParams.height) {
      this.width = aParams.width;
      this.height = aParams.height;
      this.numberOfFields = this.width * this.height;
    } else if (aParams.matrix) {
      this.width = aParams.matrix[0].length;
      this.height = aParams.matrix.length;
      this.numberOfFields = this.width * this.height;
    }

    // Create and generate the matrix
    this.gridNodes = this.buildGridWithNodes(
      aParams.matrix || undefined,
      this.width,
      this.height,
      aParams.densityOfObstacles || 0
    );
  }

  /**
   * Build grid, fill it with nodes and return it.
   * @param matrix [ 0 or 1: 0 = walkable; 1 = not walkable ]
   * @param width [grid width]
   * @param height [grid height]
   * @param densityOfObstacles [density of non walkable fields]
   */
  private buildGridWithNodes(
    matrix: number[][],
    width: number,
    height: number,
    densityOfObstacles?: number
  ): MapNode[][] {
    const newGrid: MapNode[][] = [];
    let id: number = 0;

    // Generate an empty matrix
    for (let y = 0; y < height; y++) {
      newGrid[y] = [];
      for (let x = 0; x < width; x++) {
        newGrid[y][x] = new MapNode({
          id: id,
          position: { x: x, y: y }
        });

        id++;
      }
    }

    /**
     * If we have not loaded a predefined matrix,
     * loop through our grid and set random obstacles.
     */
    if (matrix === undefined) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // const rndNumber = Math.floor(Math.random() * 10) + 1;
          // if (rndNumber > 10 - densityOfObstacles) {
          //   newGrid[y][x].setIsWalkable(false);
          // } else {
          newGrid[y][x].setIsWalkable(true);
          // }
        }
      }

      return newGrid;
    }

    return newGrid;
  }

  /**
   * Return a specific node.
   * @param position [position on the grid]
   */
  public getNodeAt(x: number, y: number): MapNode {
    if (y < 0 || x < 0 || y >= this.height || x >= this.width) return null;
    return this.gridNodes[y][x];
  }

  public GeneratorCornerHeight() {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        let node = this.gridNodes[y][x];
        let layer = node.layer;
        let xl = x - 1;
        let yb = y - 1;
        let xr = x + 1;
        let yt = y + 1;
        let nl = this.getNodeAt(xl, y);
        let nlt = this.getNodeAt(xl, yt);
        let nt = this.getNodeAt(x, yt);
        let nrt = this.getNodeAt(xr, yt);
        let nr = this.getNodeAt(xr, y);
        let nrb = this.getNodeAt(xr, yb);
        let nb = this.getNodeAt(x, yb);
        let nlb = this.getNodeAt(xl, yb);

        if (nb) { layer = Math.max(nb.layer, layer) }
        if (nlb) { layer = Math.max(nlb.layer, layer) }
        if (nl) { layer = Math.max(nl.layer, layer) }
        node.lb = layer;
        layer = node.layer;


        if (nl) { layer = Math.max(nl.layer, layer) }
        if (nlt) { layer = Math.max(nlt.layer, layer) }
        if (nt) { layer = Math.max(nt.layer, layer) }
        node.lt = layer;
        layer = node.layer;


        if (nt) { layer = Math.max(nt.layer, layer) }
        if (nrt) { layer = Math.max(nrt.layer, layer) }
        if (nr) { layer = Math.max(nr.layer, layer) }
        node.rt = layer;
        layer = node.layer;


        if (nr) { layer = Math.max(nr.layer, layer) }
        if (nrb) { layer = Math.max(nrb.layer, layer) }
        if (nb) { layer = Math.max(nb.layer, layer) }
        node.rb = layer;
      }
    }
  }

  /**
   * Check if specific node walkable.
   * @param position [position on the grid]
   */
  public isWalkableAt(x: number, y: number): boolean {
    return this.gridNodes[y][x].getIsWalkable();
  }

  public isCanCrossLayer(x1: number, y1: number, x2: number, y2: number, layer: number): boolean {
    let layer2 = this.gridNodes[y2][x2].layer;
    let layer3 = this.getNodeAt(x1, y2).layer;
    let layer4 = this.getNodeAt(x2, y1).layer;
    if (x1 != x2 && y1 != y2 && (layer != layer2 || layer != layer3 || layer != layer4)) {
      if (layer % 5 == 0) {
        return false;
      }
      let min = Math.min(layer, layer2, layer3, layer4);
      let max = Math.max(layer, layer2, layer3, layer4)
      if (Math.abs(max - min) > 1) {
        return false;
      }
      // return false;

    }
    return Math.abs(layer2 - layer) <= 1
  }

  /**
   * Check if specific node is on the grid.
   * @param position [position on the grid]
   */
  private isOnTheGrid(position: IPoint): boolean {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    );
  }

  /**
   * Get surrounding nodes.
   * @param currentXPos [x-position on the grid]
   * @param currentYPos [y-position on the grid]
   * @param diagnonalMovementAllowed [is diagnonal movement allowed?]
   */
  public getSurroundingNodes(
    currentPosition: IPoint,
    diagnonalMovementAllowed: boolean
  ): MapNode[] {
    const surroundingNodes: MapNode[] = [];
    let layer = this.gridNodes[currentPosition.y][currentPosition.x].layer;
    for (var y = currentPosition.y - 1; y <= currentPosition.y + 1; y++) {
      for (var x = currentPosition.x - 1; x <= currentPosition.x + 1; x++) {
        if (this.isOnTheGrid({ x, y })) {
          if (this.isWalkableAt(x, y) && this.isCanCrossLayer(currentPosition.x, currentPosition.y, x, y, layer)) {
            if (diagnonalMovementAllowed) {
              surroundingNodes.push(this.getNodeAt(x, y));
            } else {
              if (x == currentPosition.x || y == currentPosition.y) {
                surroundingNodes.push(this.getNodeAt(x, y));
              }
            }
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
    }

    return surroundingNodes;
  }

  public setGrid(newGrid: MapNode[][]): void {
    this.gridNodes = newGrid;
  }

  /**
   * Reset the grid
   */
  public resetGrid(): void {
    for (let y = 0; y < this.gridNodes.length; y++) {
      for (let x = 0; x < this.gridNodes[y].length; x++) {
        this.gridNodes[y][x].setIsOnClosedList(false);
        this.gridNodes[y][x].setIsOnOpenList(false);
        this.gridNodes[y][x].setParent(undefined);
        this.gridNodes[y][x].setFGHValuesToZero();
      }
    }
  }

  /**
   * Get all the nodes of the grid.
   */
  public getGridNodes(): MapNode[][] {
    return this.gridNodes;
  }

  /**
   * Get a clone of the grid
   */
  public clone(): MapNode[][] {
    const cloneGrid: MapNode[][] = [];
    let id: number = 0;

    for (let y = 0; y < this.height; y++) {
      cloneGrid[y] = [];
      for (let x = 0; x < this.width; x++) {
        cloneGrid[y][x] = new MapNode({
          id: id,
          position: { x: x, y: y },
          walkable: this.gridNodes[y][x].getIsWalkable()
        });

        id++;
      }
    }
    return cloneGrid;
  }
}
