import InstanceT from "src/_T/Ts/InstanceT";
import BattleScene from "../Scene/BattleScene";
import LoaderManager from "./LoaderManager";

@InstanceT.DecorateInstance()
export default class SceneManager {
    public static readonly instance: SceneManager;

    private _sceneDic: object;

    private _obiterDic: object;

    private _mapId: number;

    private _param: any;

    private _scene: BattleScene;

    public constructor() {
        this.init();
    }

    private init(): void {
        this._sceneDic = {};
        this._obiterDic = {};
    }

    /**
     * 添加场景
     * @param type 场景类型
     * @param scene 
     */
    public addScene(type: number, scene: BattleScene): void {
        this._sceneDic[type] = scene;
    }

    public addObiter(type: number, scene: BattleScene): void {
        this._obiterDic[type] = scene;
    }

    /**
     * 进入某个场景
     * @param mapId 
     * @param isEffect 
     * @param param 
     */
    public enter(mapId: number, isEffect: boolean = true, param?: any[]): void {
        this._mapId = mapId;
        this._param = param;

        LoaderManager.instance.load("" + mapId, Handler.create(this, this.__completeHandler));
    }

    private __completeHandler(): void {
        console.log("场景配置文件加载完成");

        this.switchNext();
    }

    private switchNext(): void {
        this._scene = this.create(0);
        this._scene.enter()

        //抛出事件
    }

    private create(type: number): BattleScene {
        let cls = this._sceneDic[type] || BattleScene;
        return new cls(this._param);
    }
}