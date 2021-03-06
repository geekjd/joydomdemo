export class Util {
    public static timeScale = 1;
    private static _recordFrame: number = 0;
    private static _deltaTime: number = 30;
    private static _deltaTimeSec: number = 0.016;
    public static get deltaTime(): number {
        if (this._recordFrame != Laya.timer.currFrame) {
            this._deltaTime = Math.min(Laya.timer.delta, 100);
            this._deltaTimeSec = this._deltaTime * 0.001;
            this._recordFrame = Laya.timer.currFrame;
        }
        return this._deltaTime * this.timeScale;
    }

    public static get deltaTimeSec(): number {
        if (this._recordFrame != Laya.timer.currFrame) {
            this._deltaTime = Math.min(Laya.timer.delta, 100);
            this._deltaTimeSec = this._deltaTime * 0.001;
            this._recordFrame = Laya.timer.currFrame;
        }
        var d: Laya.TrailSprite3D;
        return this._deltaTimeSec * this.timeScale;
    }
}