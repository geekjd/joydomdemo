import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MoveAccordingByDirection from "../AuxiliaryCombatScript/MoveScripts/MoveAccordingByDirection";
import Boom from "../AuxiliaryCombatScript/RangeAttack/Boom";
import SkillManager from "../SkillBase/SkillManager";

/**火球术 */
export default class FireBall extends Laya.Script3D {

    m_SkillType: SkillType;
    m_MoveAccordingByDirection: MoveAccordingByDirection;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_CampType: CampType;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    Ishow: boolean = true;
    onAwake() {
        this.m_SkillType = SkillType.WordPos;
        this.m_MoveAccordingByDirection = new MoveAccordingByDirection();
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
        //this.m_MoveAccordingByDirection.EndMoveFunction = Laya.Handler.create(this, this.EndMove, null, false);
    }
    onStart() {

    }
    InitData(TempDamageData: DamageData, TarGetObjPos: Laya.Vector3, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        this.m_CampType = this.m_DamageData.m_SelfSc.m_CampType;
        this.SelefS3D.transform.position = this.m_DamageData.m_SelfSc.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        if (!this.m_MoveAccordingByDirection) return console.log("CatapultArrow初始化失败");
        let Dir = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.subtract(TarGetObjPos, this.SelefS3D.transform.position, Dir);
        Dir.y = 0;
        this.m_MoveAccordingByDirection.InitData(this.SelefS3D, Dir);
        this.Ishow = IsShow;
        ApkDefine.FindObjEffect(this.SelefS3D, this.Ishow);
    }
    EndMove() {
        // this.SelefS3D.destroy();
    }
    onUpdate() {
        if (!this.m_MoveAccordingByDirection) return;
        this.m_MoveAccordingByDirection.UpdateMove();
    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {
        let Obj = Con.owner as Laya.Sprite3D;
        let Magic: MagicCubeSource = Obj.getComponent(MagicCubeSource);
        if ((Magic != null && !Magic.IsDie) &&
            ((Magic.m_CampType != this.m_CampType) || (Magic.m_CampType == CampType.Yellow_Camp))
        ) {
            if (Magic == this.m_DamageData.m_SelfSc) return;
            /**生成爆炸特效 */
            this.LodeEffects();
        } else if (Magic == null) {
            this.LodeEffects();
        }
    }
    LodeEffects() {
        let Url = EssentialResUrls.PrefabURL(this.SkillModeNameTwo);
        if (this.m_DamageData.m_SelfSc != null && this.SelefS3D != null && !this.SelefS3D.destroyed) {
            let SelfPos = this.SelefS3D.transform.position.clone();
            ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
                if (this.m_DamageData.m_SelfSc != null && this.SelefS3D != null && !this.SelefS3D.destroyed) {
                    let TempBoom = ResLoad.GetRes(Url) as Laya.Sprite3D;
                    GlobalD3Environment.Scene3D.addChild(TempBoom);
                    ApkDefine.FindObjEffect(TempBoom, this.Ishow);
                    //SelfPos.y;
                    TempBoom.transform.position = SelfPos;
                    let Sc: Boom = TempBoom.addComponent(Boom);
                    Sc.InitSkill(this.m_DamageData);
                    this.SelefS3D.destroy();
                } else {
                    this.m_DamageData.m_SelfSc.m_AnimatorManager.m_TargetObj = null;
                }
            }));
        }
    }

    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {

    }
}