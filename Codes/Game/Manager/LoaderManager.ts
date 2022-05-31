import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export default class LoaderManager {
    public static readonly instance: LoaderManager;

    public constructor() {
    }

    public load(url: string | string[] | laya.net.loadItem[], complete?: laya.utils.Handler | null, progress?: laya.utils.Handler | null): void {
        Laya.loader.load(url, complete, progress)
    }
}