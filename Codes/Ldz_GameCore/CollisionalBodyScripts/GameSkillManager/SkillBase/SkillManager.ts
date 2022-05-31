import { HeroSkillDataProxy } from "src/Game/ConfigProxy/HeroSkillDataProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { _HeroSkillConfig } from "src/Game/_config/_HeroSkillConfig";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MyObjectPool from "src/Ldz_GameCore/GeneralScripts/MyObjectPool";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MagicCubeSourceTypeManager from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSourceTypeManager";
import NavMeshAgent from "src/Ldz_GameCore/NavMesh/NavMeshAgent";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import { CameraUtils } from "src/_T/Utils/CameraUtils";
import SkillTypeManager from "./SkillTypeManager";

/**技能管理器 */
export default class SkillManager {


    private static _Instance: SkillManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): SkillManager {
        if (!this._Instance) {
            this._Instance = new SkillManager();
        }
        return this._Instance;
    }
    private _Target: Laya.Camera;
    public get Target(): Laya.Camera {
        return this._Target;
    }
    public set Target(value: Laya.Camera) {
        this._Target = value;
    }
    /**初始化技能管理器 */
    InitSkillManager() {
        MesManager.on(ESceneEvent.ReleaseSkills, this, this.ReleaseSkills);
        MesManager.on(ESceneEvent.ReleasePet, this, this.ReleasePet);

    }
    /**创建技能 */
    CreatorSkill() {

    }
    /**释放技能 */
    ReleaseSkills(SkillMiscID: number, m_DamageData: DamageData) {

        let SkillInfo: _HeroSkillConfig.DataType = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(SkillMiscID);
        if (SkillInfo == null) { return console.log("没有当前技能_技能ID", SkillMiscID); }
        let Url = EssentialResUrls.PrefabURL(SkillInfo.SkillModeName);
        let SkillObj = m_DamageData.m_SelfSc.m_SceneSprite3d;
        let Target: Laya.Sprite3D = m_DamageData.m_SelfSc.m_AnimatorManager.m_TargetObj;
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            if (Target != null && !Target.destroyed) {
                let TargetPos = Target.transform.position;
                let DIr = new Laya.Vector3();
                SkillObj.transform.rotationEuler.cloneTo(DIr);
                let Boom = ResLoad.GetRes(Url) as Laya.Sprite3D;
                GlobalD3Environment.Scene3D.addChild(Boom);
                let Sc = Boom.addComponent(SkillTypeManager.Instance.GetTypeByName(SkillInfo.SkillScriptName));
                Sc.SkillModeNameTwo = SkillInfo.SkillModeNameTwo ? SkillInfo.SkillModeNameTwo : "";
                Boom.transform.rotationEuler = DIr;
                let IsShow = true;
                if (this._Target != null) {
                    // let Dic = this.GetTargetDisByWordPos(this._Camera.position.clone(), Value);
                    let ScenePos = new Laya.Vector3();
                    CameraUtils.WorldToScreen2(this.Target, TargetPos, ScenePos);
                    if (ScenePos.x < 0 || ScenePos.y < 0 || ScenePos.x > Laya.stage.width || ScenePos.y > Laya.stage.height) {
                        IsShow = false;
                    }
                }
                switch (Sc.m_SkillType) {
                    case SkillType.Target:
                        Sc.InitData(m_DamageData, Target, IsShow);
                        break;
                    case SkillType.Direction:
                        Sc.InitData(m_DamageData, TargetPos, IsShow);
                        break;
                    case SkillType.WordPos:
                        Sc.InitData(m_DamageData, TargetPos, IsShow);
                        break;
                }
            } else {
                Target = null;
            }
        }));
    }

    /**释放宠物 */
    ReleasePet(SkillMiscID: number, m_DamageData: DamageData) {

        let SkillInfo: _HeroSkillConfig.DataType = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(SkillMiscID);
        if (SkillInfo == null) { return console.log("没有当前技能_技能ID", SkillMiscID); }

        let SkillObj = m_DamageData.m_SelfSc.m_SceneSprite3d;
        let Target: Laya.Sprite3D = m_DamageData.m_SelfSc.m_AnimatorManager.m_TargetObj;

        let Url = EssentialResUrls.PrefabURL(SkillInfo.SkillModeName);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Player = MyObjectPool.Instance.GetObjectByPool(SkillInfo.SkillModeName);
            let IsOne = false;
            let ScTempbee: MagicCubeSource = Player.getComponent(MagicCubeSource);
            if (ScTempbee == null) {
                IsOne = true;
                ScTempbee = Player.addComponent(MagicCubeSourceTypeManager.Instance.GetTypeByName(SkillInfo.SkillScriptName));
            }
            if (ScTempbee != null) {
                ScTempbee.Init(1);
                ScTempbee.m_CampType = m_DamageData.m_SelfSc.m_CampType;
                ScTempbee.m_WorkType = m_DamageData.m_SelfSc.m_WorkType;
                //BattleRoomCon.Instance.m_GamePathFinder.players.addChild(Player);
                Player.transform.position = m_DamageData.AttackPos.clone();
                Player.transform.position = Player.transform.position;
                if (IsOne) {
                    ScTempbee.m_FinderAgent = new NavMeshAgent(Player);//new FinderAgent(BattleRoomCon.Instance.m_GamePathFinder.finder, Player, BattleRoomCon.Instance.m_GamePathFinder.simulator, 5, 0.3, false);
                    ScTempbee.m_FinderAgent.Init(ScTempbee.m_WorkType);
                    //BattleRoomCon.Instance.m_GamePathFinder.agentMap.push(ScTempbee.m_FinderAgent);
                }
                // ScTempbee.m_FinderAgent.agent.position = new Vector2D(Player.transform.localPositionX, Player.transform.localPositionZ);
                // ScTempbee.m_FinderAgent.lastPos = new Vector2D(Player.transform.localPositionX, Player.transform.localPositionZ);
                ScTempbee.m_TargetDamageData = m_DamageData;
            }
        }));
    }
    // public static FindObjEffect(Obj: Laya.Node, IsShow: boolean) {
    //     let MeshSprite = Obj instanceof Laya.MeshSprite3D;
    //     if (MeshSprite) {
    //         (Obj as Laya.MeshSprite3D).meshRenderer.enable = IsShow;
    //     }
    //     let ShuriKenPartic = Obj instanceof Laya.ShuriKenParticle3D;
    //     if (ShuriKenPartic) {
    //         (Obj as Laya.ShuriKenParticle3D).particleRenderer.enable = IsShow;
    //     }
    //     // if (!IsShow) {
    //     //     console.log(Obj);
    //     // }
    //     for (let i = 0; i < Obj.numChildren; i++) {
    //         let TempObj = Obj.getChildAt(i);
    //         SkillManager.FindObjEffect(TempObj, IsShow);
    //     }
    // }

}