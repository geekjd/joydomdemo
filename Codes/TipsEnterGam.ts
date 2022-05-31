export class TipsEnterGam {
    private static _i: TipsEnterGam;
    /** 单例 */
    public static get instance(): TipsEnterGam {
        if (!this._i) {
            this._i = new TipsEnterGam();
        }
        return this._i;
    }
    public SDKData: string[];

}