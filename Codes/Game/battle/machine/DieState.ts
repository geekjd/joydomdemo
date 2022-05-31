import Enemy from "../avatar/Enemy";
import ActionType from "../enum/ActionType";
import State from "./State"

/**
 * 跑步状态
 */
export default class DieState extends State {
    public constructor(owner: any) {
        super(owner);
    }

    public execute(param?: any): void {
        let owner: Enemy = this._owner;
        owner.play(ActionType.die);
    }
}