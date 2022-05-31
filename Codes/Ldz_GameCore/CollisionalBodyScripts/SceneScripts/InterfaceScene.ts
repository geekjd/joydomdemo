import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import SceneNode from "src/_T/D3/scene/SceneNode";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MyObjectPool from "../GeneralScripts/MyObjectPool";
import { RodmControl } from "../PlayerCore/RodmControl";
import ShaderManager from "../ShaderScripts/ShaderManager";

export default class InterfaceScene {
    constructor() { }

    /**是否加载完成 */
    IsLodeBcak: boolean;
    /**环境路径 */
    Evl: string;
    /**人物节点 */

    /**人物旋转(脚本 Or 对象) */

    /**场景节点 */
    ScenelevelNode: Laya.Sprite3D;
    /**环境节点 */
    EnvironmentNode: Laya.Sprite3D;
    /**人物节点 */
    CharacterNode: Laya.Sprite3D;

    RoleObj: Laya.Sprite3D;

    InitInterface(level: SceneNode) {
        this.IsLodeBcak = false;
        /**获取场景节点 */
        let scene = GlobalD3Environment.Scene3D;
        this.ScenelevelNode = scene.getChildByName("").getChildAt(0).getChildAt(0) as Laya.Sprite3D;
        this.CharacterNode = level.prefabs[_AllPrefabsNames.PlayerPrant][0];
        MyObjectPool.Instance.SetItemPrant(this.CharacterNode);
        this.EnvironmentNode = level.prefabs[_AllPrefabsNames.Environment][0];
        /**加载环境 */
        let Url = EssentialResUrls.PrefabURL("Plan" /**this.Evl */);
        ResLoad.Load3D(Url, Laya.Handler.create(this, this.LodeEvl, [Url]));
        this.SwitchCharacters(HunterGameDataMediator.instance.data.SelectHunterSkinName);
        /**添加事件 */
        MesManager.on(ESceneEvent.RotateCharacter, this, this.RotateCharacter);
        MesManager.on(ESceneEvent.SwitchCharacter, this, this.SwitchCharacters);

    }


    /**加载环境回调 */
    LodeEvl(Url: string) {
        let Evl = ResLoad.GetRes(Url);
        this.EnvironmentNode.addChild(Evl);
    }
    /**加载人物回调 */
    LodeCharacter(SoliderName: string, Url: string) {
        let Character: Laya.Sprite3D = ResLoad.GetRes(Url) as Laya.Sprite3D;
        let TempCoSp = Character.getChildByName("TirggerCollider");
        if (TempCoSp != null) {
            let TempMesh = TempCoSp as Laya.MeshSprite3D;
            TempMesh.meshRenderer.enable = false;
        }
        this.CharacterNode.addChild(Character);
        let TempRodmControl: RodmControl = Character.addComponent(RodmControl);
        let Mesh = Character.getChildAt(0) as Laya.SkinnedMeshSprite3D;
        let Matr: Laya.Material[] = [];
        Matr.push(Mesh.skinnedMeshRenderer.sharedMaterials[0]);
        Mesh.skinnedMeshRenderer.sharedMaterials = Matr;
        if (TempRodmControl.m_Animator != null) {
            try {
                TempRodmControl.m_Animator.play(TempRodmControl.IdleName);
            } catch {

            }
        }
        Character.transform.localPosition = new Laya.Vector3(0, 0, 0);
        this.RoleObj = Character;
        this.IsLodeBcak = true;
    }

    /**旋转角色单位  */
    RotateCharacter(Dir: number) {
        if (Dir == 0) return;
        if (Dir < 0) {
            this.CharacterNode.transform.localPositionY -= 1;
            return;
        }
        if (Dir > 0) {
            this.CharacterNode.transform.localPositionY += 1;
            return;
        }
    }
    SwitchCharacters(HeronName: string) {
        /**加载角色 */
        console.log(HeronName);
//        HeronName = "x1";
        if (this.RoleObj != null) {
            this.RoleObj.destroy();
            this.RoleObj = null;
        }
        let CharacterUrl = EssentialResUrls.PrefabURL(HeronName);
        ResLoad.Load3D(CharacterUrl, Laya.Handler.create(this, this.LodeCharacter, [HeronName, CharacterUrl]));
    }

}