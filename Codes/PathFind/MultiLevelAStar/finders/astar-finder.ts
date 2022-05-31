import { backtrace, minBy, remove } from '../core/util';
import { calculateHeuristic } from '../core/heuristic';
import { MapGrid } from '../core/MapGrid';
import {
  IAStarFinderConstructor,
  IPoint
} from '../interfaces/astar.interfaces';
import { MapNode } from '../core/MapNode';
import { Heuristic } from '../types/astar.types';

export class AStarFinder {
  // Grid
  private grid: MapGrid;

  // Lists
  private closedList: MapNode[];
  private openList: MapNode[];

  // Pathway variables
  readonly diagonalAllowed: boolean;
  private heuristic: Heuristic;
  readonly includeStartNode: boolean;
  readonly includeEndNode: boolean;
  private weight: number;

  constructor(aParams: IAStarFinderConstructor) {
    // Create grid
    this.grid = new MapGrid({
      width: aParams.grid.width,
      height: aParams.grid.height,
      matrix: aParams.grid.matrix || undefined,
      densityOfObstacles: aParams.grid.densityOfObstacles || 0
    });

    // Init lists
    this.closedList = [];
    this.openList = [];

    // Set diagonal boolean
    this.diagonalAllowed =
      aParams.diagonalAllowed !== undefined ? aParams.diagonalAllowed : true;

    // Set heuristic function
    this.heuristic = aParams.heuristic ? aParams.heuristic : 'Manhattan';

    // Set if start node included
    this.includeStartNode =
      aParams.includeStartNode !== undefined ? aParams.includeStartNode : true;

    // Set if end node included
    this.includeEndNode =
      aParams.includeEndNode !== undefined ? aParams.includeEndNode : true;

    // Set weight
    this.weight = aParams.weight || 1;
  }

  public findPath(startPosition: IPoint, endPosition: IPoint): number[][] {
    // Reset lists
    this.closedList = [];
    this.openList = [];

    // Reset grid
    this.grid.resetGrid();

    const startNode = this.grid.getNodeAt(startPosition.x, startPosition.y);
    const endNode = this.grid.getNodeAt(endPosition.x, endPosition.y);

    // Break if start and/or end position is/are not walkable
    if (
      !this.grid.isWalkableAt(endPosition.x, endPosition.y) ||
      !this.grid.isWalkableAt(startPosition.x, startPosition.y)
    ) {
      // Path could not be created because the start and/or end position is/are not walkable.
      return [];
    }

    // Push start node into open list
    startNode.setIsOnOpenList(true);
    this.openList.push(startNode);

    // Loop through the grid
    // Set the FGH values of non walkable nodes to zero and push them on the closed list
    // Set the H value for walkable nodes
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        let node = this.grid.getNodeAt(x, y);
        if (!this.grid.isWalkableAt(x, y)) {
          // OK, this node is not walkable
          // Set FGH values to zero
          node.setFGHValuesToZero();
          // Put on closed list
          node.setIsOnClosedList(true);
          this.closedList.push(node);
        } else {
          // OK, this node is walkable
          // Calculate the H value with the corresponding heuristic function
          node.setHValue(
            calculateHeuristic(
              this.heuristic,
              node.position,
              endNode.position,
              this.weight
            )
          );
        }
      }
    }

    // As long the open list is not empty, continue searching a path
    while (this.openList.length !== 0) {
      // Get node with lowest f value
      const currentNode: MapNode = minBy(this.openList, (o) => {
        return o.getFValue();
      });

      // Move current node from open list to closed list
      currentNode.setIsOnOpenList(false);
      remove(this.openList, currentNode);

      currentNode.setIsOnClosedList(true);
      this.closedList.push(currentNode);

      // End of path is reached
      if (currentNode === endNode) {
        return backtrace(endNode, this.includeStartNode, this.includeEndNode);
      }

      // Get neighbors
      const neighbors = this.grid.getSurroundingNodes(
        currentNode.position,
        this.diagonalAllowed
      );

      // Loop through all the neighbors
      for (let i in neighbors) {
        const neightbor = neighbors[i];

        // Continue if node on closed list
        if (neightbor.getIsOnClosedList()) {
          continue;
        }

        if (neightbor.position.x !== currentNode.position.x &&
          neightbor.position.y !== currentNode.position.y) {
          if (!this.getGrid().isWalkableAt(currentNode.position.x, neightbor.position.y) ||
            !this.getGrid().isWalkableAt(neightbor.position.x, currentNode.position.y)) {
            continue;
          }
          let layer = currentNode.layer;
          let layer1 = this.getGrid().getNodeAt(currentNode.position.x, neightbor.position.y).layer;
          let layer2 = this.getGrid().getNodeAt(neightbor.position.x, currentNode.position.y).layer;
          if (layer != layer1 || layer != layer2) {
            // continue;
          }

        }

        // Calculate the g value of the neightbor
        let nextGValue = currentNode.getGValue();
        if (neightbor.position.x == currentNode.position.x ||
          neightbor.position.y == currentNode.position.y) {
          nextGValue += this.weight;
        } else {
          nextGValue += this.weight * 1.41421;
        }


        // Is the neighbor not on open list OR
        // can it be reached with lower g value from current position
        if (
          !neightbor.getIsOnOpenList() ||
          nextGValue < neightbor.getGValue()
        ) {
          neightbor.setGValue(nextGValue + neightbor.GValueIndex * 0.02);
          neightbor.setParent(currentNode);

          if (!neightbor.getIsOnOpenList()) {
            neightbor.setIsOnOpenList(true);
            this.openList.push(neightbor);
          } else {
            // okay this is a better way, so change the parent
            neightbor.setParent(currentNode);
          }
        }
      }
    }
    // Path could not be created
    return [];
  }

  /**
   * Set the heuristic to be used for pathfinding.
   * @param newHeuristic
   */
  public setHeuristic(newHeuristic: Heuristic): void {
    this.heuristic = newHeuristic;
  }

  /**
   * Set the weight for the heuristic function.
   * @param newWeight
   */
  public setWeight(newWeight: number): void {
    this.weight = newWeight;
  }

  /**
   * Get a copy/clone of the grid.
   */
  public getGridClone(): MapNode[][] {
    return this.grid.clone();
  }

  /**
   * Get the current grid
   */
  public getGrid(): MapGrid {
    return this.grid;
  }
}
