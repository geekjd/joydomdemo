/**
 * 网络数据处理逻辑基类
 */
export default class MessageProxy {

    private _isOpen: boolean;

    public constructor() {

    }

    public open(): void {
        if (this._isOpen) return;

        this.addEvent();
        this._isOpen = true;
    }

    public close(): void {
        if (!this._isOpen) return;
        this.removeEvent();
        this._isOpen = false;
    }

    protected addEvent(): void {

    }

    protected removeEvent(): void {

    }
}