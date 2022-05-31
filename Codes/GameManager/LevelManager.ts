import { LevelDataProxy } from "src/Game/ConfigProxy/LevelDataProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import SceneManager from "src/Game/Scene/SceneManager";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import SceneNode from "src/_T/D3/scene/SceneNode";
import MesManager from "src/_T/Mes/MesManager";

/**
 * 关卡管理类，负责关卡，Player的加载
 */
export class LevelManager {
    /**  当前关卡     */
    public static level: SceneNode;
    /** 当前场景*/
    public static env: SceneNode;
    /**保存已经加载背景*/
    public static _envDict: { [index: number]: SceneNode } = {};
    static ExclamatoryMarkMaterial: any;

    /***
   * 加载场景下的节点
   * @param nodeName
   * @param sceneName
   * @param onProgress - 加载进度回调
   * @constructor
   */
    public static LoadNode(nodeName: string, sceneName: string, onProgress?: Laya.Handler) {
        let s = SceneManager.instance.getScene(sceneName);
        if (s == null) {
            console.error("获取场景配置Json失败：", sceneName);
            return;
        }
        let node = s.getSceneNode(nodeName);
        if (node) {
            return node.asyncBuild(onProgress);
        } else {
            console.error("加载节点失败:", nodeName, sceneName);
        }
    }
    /**
     * 加载关卡
     * @param index 关卡记录
     * @param onComplete 关卡加载完成的回调
     * @param scene 关卡所属场景
     * @constructor
     */
    public static LoadLevel(index: number, onComplete: Laya.Handler = null, TempEUIEvent: EUIEvent, isopenAd: boolean = false, scene = "Scene",) {
        console.log("加载关卡:", LevelDataProxy.instance.dataList[index]);
        MesManager.event(TempEUIEvent, [0])
        //读取对应的关卡
        let l = LevelDataProxy.instance.dataList[index].level;
        //加载关卡
        let level = "Level_" + l;
        if (LevelManager.level) {
            LevelManager.level.delete();
        }
        MesManager.event(ESceneEvent.LevelDestroy);
        let hander = Laya.Handler.create(this, (progress) => MesManager.event(TempEUIEvent, [progress, isopenAd]), null, false);
        this.LoadNode(level, scene, hander).then(
            node => {
                LevelManager.OnLoadLevelComplete(node);
                if (onComplete) {
                    onComplete.runWith(node);
                }
            });
    }

    public static OnLoadLevelComplete(level: SceneNode) {
        LevelManager.level = level;
        level.scene.setEnvironment();
        Laya.timer.once(500, this, () => {
            MesManager.event(ESceneEvent.LevelLoadComplete);
            // 示例：LevelManager.AddComponent(level.prefabs[_AllPrefabsNames.Wooden_Box], Box);
        });
    }
    private static AddComponent(list: Laya.Node[], script) {
        if (list && (list.length > 0)) {
            list.forEach(obj => obj.addComponent(script));
        }
    }
}