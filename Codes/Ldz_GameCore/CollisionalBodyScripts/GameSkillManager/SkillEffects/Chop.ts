import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import Boom from "../AuxiliaryCombatScript/RangeAttack/Boom";
import SkillManager from "../SkillBase/SkillManager";

/**斩击 */
export default class Chop extends Laya.Script3D {

    m_SkillType: SkillType;
    //m_MoveAccordingByDirection: MoveAccordingByWordPos;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_CampType: CampType;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    Ishow: boolean = true;
    onAwake() {
        this.m_SkillType = SkillType.WordPos;
        //this.m_MoveAccordingByDirection = new MoveAccordingByWordPos();
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
        //this.m_MoveAccordingByDirection.EndMoveFunction = Laya.Handler.create(this, this.EndMove, null, false);
    }
    onStart() {

    }
    InitData(TempDamageData: DamageData, TarGetObjPos: Laya.Vector3, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        let OwnerScript = this.m_DamageData.m_SelfSc;
        this.m_CampType = OwnerScript.m_CampType;
        this.SelefS3D.transform.position = OwnerScript.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        let Sc: Boom = this.SelefS3D.addComponent(Boom);
        Sc.InitSkill(this.m_DamageData);
        this.Ishow = IsShow;
        ApkDefine.FindObjEffect(this.SelefS3D, this.Ishow);
        //if (!this.m_MoveAccordingByDirection) return console.log("CatapultArrow初始化失败");
        //this.m_MoveAccordingByDirection.InitData(this.SelefS3D, TarGetObjPos);
    }
    EndMove() {
        this.SelefS3D.destroy();
    }
    onUpdate() {
        // if (!this.m_MoveAccordingByDirection) return;
        // this.m_MoveAccordingByDirection.UpdateMove();
    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {

    }
    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {

    }
}