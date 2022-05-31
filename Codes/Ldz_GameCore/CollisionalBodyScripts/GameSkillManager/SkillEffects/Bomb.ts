import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import ParabolicMovement from "../AuxiliaryCombatScript/MoveScripts/ParabolicMovement";
import Boom from "../AuxiliaryCombatScript/RangeAttack/Boom";
import SkillManager from "../SkillBase/SkillManager";
import SkillTypeManager from "../SkillBase/SkillTypeManager";

/**炸弹 */
export default class Bomb extends Laya.Script3D {

    m_SkillType: SkillType;
    m_ParabolicMovement: ParabolicMovement;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_CampType: CampType;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    IsOne: boolean = true;
    Ishow: boolean = true;
    onAwake() {
        this.m_SkillType = SkillType.WordPos;
        this.m_ParabolicMovement = new ParabolicMovement();
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
        this.m_ParabolicMovement.EndMoveFunction = Laya.Handler.create(this, this.EndMove, null, false);
    }
    onStart() {

    }
    InitData(TempDamageData: DamageData, TarGetObjPos: Laya.Vector3, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        let OwnerScript = this.m_DamageData.m_SelfSc;
        this.m_CampType = OwnerScript.m_CampType;
        this.SelefS3D.transform.position = TempDamageData.AttackPos ? TempDamageData.AttackPos : OwnerScript.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        let Sc: Boom = this.SelefS3D.addComponent(Boom);
        Sc.InitSkill(this.m_DamageData);
        if (!this.m_ParabolicMovement) return console.log("Bomb 初始化失败");
        this.m_ParabolicMovement.InitData(this.SelefS3D, TarGetObjPos);
        this.Ishow = IsShow;
        ApkDefine.FindObjEffect(this.SelefS3D, this.Ishow);
    }
    EndMove() {
        this.LodeEffects();
    }
    onUpdate() {
        if (!this.m_ParabolicMovement) return;
        this.m_ParabolicMovement.UpdateMove();
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
            let SelfPos: Laya.Vector3 = this.SelefS3D.transform.position.clone();
            if (this.IsOne) {
                let Count = 6;
                let dAng = 360 / Count;
                let TempDamageData = this.m_DamageData.Clone();
                TempDamageData.BasicDamage *= 0.5;
                TempDamageData.AttackPos = SelfPos.clone();
                TempDamageData.AttackPos.y = 1.2;
                for (let i = 0; i < Count; i++) {
                    let TempUrl = EssentialResUrls.PrefabURL(this.SelefS3D.name);
                    let TempPos = this.PolarPoints(SelfPos, 3, dAng * i);
                    ResLoad.Load3D(TempUrl, Laya.Handler.create(this, () => {
                        let TempBoom = ResLoad.GetRes(TempUrl) as Laya.Sprite3D;
                        GlobalD3Environment.Scene3D.addChild(TempBoom);
                        let Sc = TempBoom.addComponent(Bomb) as Bomb;
                        ApkDefine.FindObjEffect(TempBoom, this.Ishow);
                        Sc.IsOne = false;
                        Sc.SkillModeNameTwo = this.SkillModeNameTwo ? (this.SkillModeNameTwo + "_small") : "";
                        switch (Sc.m_SkillType) {
                            case SkillType.WordPos:
                                Sc.InitData(TempDamageData, TempPos);
                                break;
                        }
                    }));
                }
            }
            ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
                if (this.m_DamageData.m_SelfSc != null && this.SelefS3D != null && !this.SelefS3D.destroyed) {
                    let TempBoom = ResLoad.GetRes(Url) as Laya.Sprite3D;
                    GlobalD3Environment.Scene3D.addChild(TempBoom);
                    TempBoom.transform.position = SelfPos.clone();
                    let Sc: Boom = TempBoom.addComponent(Boom);
                    ApkDefine.FindObjEffect(TempBoom, this.Ishow);
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

    PolarPoints(OrigPoint: Laya.Vector3, dDist: number, dAng: number): Laya.Vector3 {

        return new Laya.Vector3(OrigPoint.x + dDist * Math.cos(dAng), 0.5, OrigPoint.z + dDist * Math.sin(dAng))
    }


}