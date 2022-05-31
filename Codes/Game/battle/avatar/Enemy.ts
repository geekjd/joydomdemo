import BaseMachine from "../machine/BaseMachine";
import BattleMachine from "../machine/BattleMachine";
import Avatar from "./Avatar";

/**
 * 具有实体的场景对象，加入状态机
 */
export default class Enemy extends Avatar {

    /**状态机 */
    protected _stateMachine: BattleMachine;

    public constructor() {
        super();
    }

    protected init(): void {
        super.init();

        this.initModel();
        this.initMachine();
    }

    /**
     * 初始化模型
     */
    protected initModel(): void {

    }

    /**
     * 初始化状态机
     */
    protected initMachine(): void {
        this._stateMachine = new BattleMachine(this);
    }

    /**
     * 播放动作
     */
    public play(action: string): void {

    }

    public dispose(): void {
        if (this._stateMachine) {
            this._stateMachine.dispose();
            this._stateMachine = null;
        }
        super.dispose();
    }
}