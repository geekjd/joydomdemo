import { INodeConstructor, IPoint } from '../interfaces/astar.interfaces';
import { MapGrid } from './MapGrid';

export class MapNode {
  readonly id: number;
  readonly position: IPoint;

  private fValue: number;
  private gValue: number;
  private hValue: number;
  private parentNode: MapNode;
  private isOnClosedList: boolean;
  private isOnOpenList: boolean;
  private isWalkable: boolean;
  public layer = 0;
  public GValueIndex = 0;
  public pathDebug = false;
  /**左下角高度 */
  public lb: number;
  /**左上角高度 */
  public lt: number;
  /**右上角高度 */
  public rt: number;
  /**右下角高度 */
  public rb: number;


  constructor(aParams: INodeConstructor) {
    this.id = aParams.id;
    this.position = aParams.position;

    this.hValue = 0;
    this.gValue = 0;
    this.fValue = 0;
    this.parentNode = undefined;
    this.isOnClosedList = false;
    this.isOnOpenList = false;
    this.isWalkable = aParams.walkable || true;
  }

  /**
   * Calculate or Recalculate the F value
   * This is a private function
   */
  private calculateFValue(): void {
    this.fValue = this.gValue + this.hValue;
  }

  /**
   * Set the g value of the node
   */
  public setGValue(gValue: number): void {
    this.gValue = gValue;
    // The G value has changed, so recalculate the f value
    this.calculateFValue();
  }

  /**
   * Set the h value of the node
   */
  public setHValue(hValue: number): void {
    this.hValue = hValue;
    // The H value has changed, so recalculate the f value
    this.calculateFValue();
  }

  /**
   * Reset the FGH values to zero
   */
  public setFGHValuesToZero(): void {
    this.fValue = this.gValue = this.hValue = 0;
  }

  /**
   * Getter functions
   */
  public getFValue(): number {
    return this.fValue;
  }

  public getGValue(): number {
    return this.gValue;
  }

  public getHValue(): number {
    return this.hValue;
  }

  public getParent(): MapNode {
    return this.parentNode;
  }

  public getIsOnClosedList(): boolean {
    return this.isOnClosedList;
  }

  public getIsOnOpenList(): boolean {
    return this.isOnOpenList;
  }

  public getIsWalkable(): boolean {
    return this.isWalkable;
  }

  /**
   * Setter functions
   */
  public setParent(parent: MapNode): void {
    this.parentNode = parent;
  }

  public setIsOnClosedList(isOnClosedList: boolean): void {
    this.isOnClosedList = isOnClosedList;
  }

  public setIsOnOpenList(isOnOpenList: boolean): void {
    this.isOnOpenList = isOnOpenList;
  }

  public setIsWalkable(isWalkable: boolean): void {
    this.isWalkable = isWalkable;
  }
}
