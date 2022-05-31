/**
 * 状态基类
 */
export default class State {

    protected _owner: any;

    public constructor(owner: any) {
        this._owner = owner;
    }

    /**
     * 执行
     * @param param 参数
     */
    public execute(param?: any): void {

    }

    /**
     * 离开
     * @param param 参数
     */
    public leave(param?: any): void {

    }

    /**
     * 销毁
     */
    public dispose(): void {
        this._owner = null;
    }
}