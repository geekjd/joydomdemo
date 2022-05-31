import AStarNodeCard from "./AStarNodeCard";

export enum emRoadNodeState {
    /**不能走（障碍物例如墙壁之类的） */
    RNS_CANT_PASS,
    /**能走还没有走 */
    RNS_CAN_PASS,
    /**已经走过了 */
    RNS_PASSED,
    /**确定为路径点 */
    RNS_PATH_NODE,
    /**关闭 */
    RNS_CLOSE,
    /**打开 */
    RNS_OPEN,
}
export default class AStarNode {
    // Start is called before the first frame update
    public Index_X: number;
    public Index_Y: number;
    public index: number;
    public Fatherindex: number;
    public State: emRoadNodeState;

    public row: number;
    public col: number;
    public G: number = 0;
    public H: number = 0;
    public F: number = 0;

    public WordPos: Laya.Vector3;

    public itemCard: AStarNodeCard;
    /**左 */
    public GetLeftNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y, this.Index_X - 1);
    }
    /**左上 */
    public GetLeftUPNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y + 1, this.Index_X - 1);
    }
    /**左上 */
    public GetLeftDownNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y - 1, this.Index_X - 1);
    }
    /**右 */
    public GetRightNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y, this.Index_X + 1);
    }
    /**右 */
    public GetRightUpNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y + 1, this.Index_X + 1);
    }
    /**右 */
    public GetRightDownNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y - 1, this.Index_X + 1);
    }
    /**上 */
    public GetUpNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y + 1, this.Index_X);
    }
    /**下 */
    public GetDownNodeList(): AStarNode {
        return this.itemCard.GetNode(this.Index_Y - 1, this.Index_X);
    }

    public CheckWordPos(T_WordPos: Laya.Vector3): boolean {
        let Dic = Laya.Vector3.distance(this.WordPos, T_WordPos);
        //console.log(Dic);
        if (Dic < 20) {
            return true
        }
        return false;
    }
}
