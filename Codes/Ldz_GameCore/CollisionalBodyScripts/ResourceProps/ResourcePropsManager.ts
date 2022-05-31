export default class ResourcePropsManager {
    private static _Instance: ResourcePropsManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): ResourcePropsManager {
        if (!this._Instance) {
            this._Instance = new ResourcePropsManager();
        }
        return this._Instance;
    }

    Init() {

    }
}