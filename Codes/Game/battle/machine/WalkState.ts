import Enemy from "../avatar/Enemy";
import ActionType from "../enum/ActionType";
import State from "./State"

/**
 * 走路状态
 */
export default class WalkState extends State {
    public constructor(owner: any) {
        super(owner);
    }

    public execute(param?: any): void {
        let owner: Enemy = this._owner;
        owner.play(ActionType.walk);
    }
}