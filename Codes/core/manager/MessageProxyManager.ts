import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export default class MessageProxyManager {

    public static readonly instance: MessageProxyManager;

    private _proxyDic: object;

    public constructor() {
        this.init();
    }

    private init(): void {
        this._proxyDic = {};
    }

    public open(cls: any): void {
        if (!cls) return;

        let name = cls.name;
        if (this._proxyDic[name]) return;

        this._proxyDic[name] = new cls();
        this._proxyDic[name].open();
    }

    public close(cls: any): void {
        if (!cls) return;

        let name = cls.name;
        if (!this._proxyDic[name]) return;

        let proxy: any = this._proxyDic[name];
        proxy.close();
    }
}