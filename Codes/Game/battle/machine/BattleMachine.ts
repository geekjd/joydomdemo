import AttackState from "./AttackState";
import BaseMachine from "./BaseMachine";
import DieState from "./DieState";
import IdleState from "./IdleState";
import RunState from "./RunState";
import WalkState from "./WalkState";

/**
 * 战斗状态机
 */
export default class BattleMachine extends BaseMachine {
    public constructor(owner: any) {
        super(owner);
    }

    protected initState(): void {
        this.addState(BattleState.idle, new IdleState(this._owner));
        this.addState(BattleState.walk, new WalkState(this._owner));
        this.addState(BattleState.run, new RunState(this._owner));
        this.addState(BattleState.attack, new AttackState(this._owner));
        this.addState(BattleState.die, new DieState(this._owner));
    }

    public get defalutState(): number {
        return BattleState.idle;
    }
}