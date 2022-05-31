import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MoveAccordingByTarget from "../AuxiliaryCombatScript/MoveScripts/MoveAccordingByTarget";
import SkillManager from "../SkillBase/SkillManager";

/**手里剑 */
export default class Swordhand extends Laya.Script3D {

    /**弹射个数*/
    m_SkillType: SkillType;
    CatapultCount: number = 3;
    m_MoveAccordingByTarget: MoveAccordingByTarget;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_TriggerEnter: Map<Laya.Sprite3D, Laya.Sprite3D>;
    m_CampType: CampType;
    AttackMap: Map<Laya.Sprite3D, Laya.Sprite3D>;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    Ishow: boolean = true;

    onAwake() {
        this.m_SkillType = SkillType.Target;
        this.m_TriggerEnter = new Map<Laya.Sprite3D, Laya.Sprite3D>();
        this.AttackMap = new Map<Laya.Sprite3D, Laya.Sprite3D>();
        this.m_MoveAccordingByTarget = new MoveAccordingByTarget();
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
        this.m_MoveAccordingByTarget.EndMoveFunction = Laya.Handler.create(this, this.AttackTarget, null, false);
    }
    InitData(TempDamageData: DamageData, TarGetObj: Laya.Sprite3D, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        let OwnerScript = this.m_DamageData.m_SelfSc; //SelefObj.getComponent(MagicCubeSource);
        this.m_CampType = OwnerScript.m_CampType;
        this.SelefS3D.transform.position = OwnerScript.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position.y = 0.8;
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        if (!this.m_MoveAccordingByTarget) return console.log("CatapultArrow初始化失败");
        this.m_MoveAccordingByTarget.InitData(this.SelefS3D, TarGetObj);
        this.Ishow = IsShow;
        ApkDefine.FindObjEffect(this.SelefS3D, this.Ishow);
    }
    onUpdate() {
        if (!this.m_MoveAccordingByTarget) return;
        this.m_MoveAccordingByTarget.UpdateMove();
    }
    /**攻击目标 切换单位 */
    AttackTarget(TempObj: Laya.Sprite3D) {
        if (TempObj != null) {
            let TempSc: MagicCubeSource = TempObj.getComponent(MagicCubeSource);
            TempSc.BeAttacked(this.m_DamageData);
            this.AttackMap.set(TempObj, TempObj);
        }
        this.SelefS3D.destroy();
    }
}