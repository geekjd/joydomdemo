import State from "./State";

export default class BaseMachine {

    /**状态列表 */
    protected _stateDic: Object;
    /**状态机主人 */
    protected _owner: any;

    /**当前状态 */
    private _currentState: number;

    public constructor(owner: any) {
        this._owner = owner;

        this._stateDic = {};

        this.init();
    }

    protected init(): void {
        this.initState();
        this.enterState(this.defalutState);
    }

    protected initState(): void { }

    /**
     * 添加状态
     * @param state 状态枚举
     * @param handler 状态处理
     */
    protected addState(state: number, handler: State): void {
        if (this._stateDic[state]) {
            console.warn("重复添加状态：" + state);
            return;
        }
        this._stateDic[state] = handler;
    }

    /**
     * 移除状态
     * @param state 状态枚举
     */
    protected removeState(state: number): void {
        if (!this._stateDic[state]) {
            console.warn("移除一个不存在的状态");
            return;
        }
        let handler: State = this._stateDic[state];
        handler.dispose();
        delete this._stateDic[state];
    }

    /**
     * 进入某个状态
     * @param state 状态枚举
     */
    public enterState(state: number, param?: any): void {
        if (this._currentState) {
            this.leaveState(this._currentState);
        }
        let handler: State = this._stateDic[state];
        handler.execute(param);
    }

    /**
     * 离开某个状态
     * @param state 状态枚举
     */
    public leaveState(state: number, param?: any): void {
        let handler: State = this._stateDic[state];
        handler.leave(param);
    }

    /**
     * 销毁
     */
    public dispose(): void {
        for (let state in this._stateDic) {
            let handler: State = this._stateDic[~~state];
            if (~~state == this._currentState) {
                handler.leave();
            }
            handler.dispose();
        }
        this._stateDic = null;
    }

    public get currentState(): number {
        return this._currentState;
    }

    public get defalutState(): number {
        return 0;
    }
}