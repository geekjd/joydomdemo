import ItemLodeManager from "src/Ldz_GameCore/ItemScriptsManager/ItemLodeManager";
import TaskManager from "src/Ldz_GameCore/TaskSystem/TaskManager";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import SkillManager from "src/Ldz_GameCore/GameSkillManager/SkillBase/SkillManager";
import Game3DSceneManager from "./Game3DSceneManager";
import MyObjectPool from "src/Ldz_GameCore/GeneralScripts/MyObjectPool";

export default class GameManager {
    private constructor() { };
    private static _Instance: GameManager;
    public static get Instance(): GameManager {
        if (this._Instance == null) { this._Instance = new GameManager(); }
        return GameManager._Instance;
    }
    SceneManagerSc: Game3DSceneManager;

    /**游戏开始 */
    public StarGame() {
        console.log("进入StarGame");

        // ResourceManager.systemResourceManager.autoRelease = true
        // ResourceManager.systemResourceManager.autoReleaseMaxSize
        //PSS.GetInfo();
        MyObjectPool.Instance.InitObjectsOne();
        TaskManager.Instance.InitTask();
        ItemLodeManager.Instance.InitEvent();
        SkillManager.Instance.InitSkillManager();
        HunterHeroInfoDataMediator.instance.ReadMemory();
        let SceneScript = new Laya.Sprite3D("ScriptsManager");
        GlobalD3Environment.Scene3D.addChild(SceneScript);
        this.SceneManagerSc = SceneScript.addComponent(Game3DSceneManager);
        this.SceneManagerSc.Init();
        this.SceneManagerSc.LodeStarScene();
    }

}