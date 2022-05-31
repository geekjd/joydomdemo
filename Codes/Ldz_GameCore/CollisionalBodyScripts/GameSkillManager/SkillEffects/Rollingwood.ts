import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MoveAccordingByWordPos from "../AuxiliaryCombatScript/MoveScripts/MoveAccordingByWordPos";
import Boom from "../AuxiliaryCombatScript/RangeAttack/Boom";
import SkillManager from "../SkillBase/SkillManager";

/**滚木攻击 */
export default class Rollingwood extends Laya.Script3D {

    m_SkillType: SkillType;
    m_MoveAccordingByDirection: MoveAccordingByWordPos;
    SelefS3D: Laya.Sprite3D;
    Transform: Laya.Transform3D;
    m_CampType: CampType;
    SkillModeNameTwo: string;
    m_DamageData: DamageData;
    PerSon: Map<Laya.Sprite3D, Laya.Sprite3D> = new Map<Laya.Sprite3D, Laya.Sprite3D>();
    Ishow: boolean = true;
    onAwake() {
        this.m_SkillType = SkillType.WordPos;
        this.m_MoveAccordingByDirection = new MoveAccordingByWordPos();
        this.SelefS3D = <Laya.Sprite3D>this.owner;
        this.Transform = this.SelefS3D.transform;
        this.m_MoveAccordingByDirection.EndMoveFunction = Laya.Handler.create(this, this.EndMoveOne, null, false);
    }
    onStart() {

    }
    InitData(TempDamageData: DamageData, TarGetObjPos: Laya.Vector3, IsShow: boolean = true) {
        this.m_DamageData = TempDamageData;
        this.m_CampType = this.m_DamageData.m_SelfSc.m_CampType;
        this.SelefS3D.transform.position = this.m_DamageData.m_SelfSc.AttackPos.transform.position.clone();
        this.SelefS3D.transform.position = this.SelefS3D.transform.position;
        let DIrWordpos: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.subtract(TarGetObjPos, this.m_DamageData.m_SelfSc.m_SceneSprite3d.transform.position, DIrWordpos);
        Laya.Vector3.scale(DIrWordpos, TempDamageData.m_SelfSc.m_AttributeBase.m_Range, DIrWordpos);
        Laya.Vector3.add(this.SelefS3D.transform.position, DIrWordpos, DIrWordpos);
        if (!this.m_MoveAccordingByDirection) return console.log("CatapultArrow初始化失败");
        this.m_MoveAccordingByDirection.InitData(this.SelefS3D, DIrWordpos);
        this.m_MoveAccordingByDirection.IsLookAt = false;

    }
    EndMoveOne() {

        this.LodeEffects();
        //this.SelefS3D.destroy();
    }
    EndMoveTwo() {
        this.SelefS3D.destroy();
    }
    onUpdate() {
        if (!this.m_MoveAccordingByDirection) return;
        let Count = this.m_MoveAccordingByDirection.BackDic();
        Count = Math.min(Count, 25);
        Count = Math.max(Count, 10);
        this.m_MoveAccordingByDirection.MoveSpeed = Count;
        this.m_MoveAccordingByDirection.UpdateMove();
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
                    if (this.SelefS3D != null) {
                        this.SelefS3D.destroy();
                    }
                }
            }));
        }
    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {
        let Obj: Laya.Sprite3D = Con.owner as Laya.Sprite3D;
        let Magic: MagicCubeSource = Obj.getComponent(MagicCubeSource);
        if ((Magic != null && !Magic.IsDie) &&
            ((Magic.m_CampType != this.m_CampType) || (Magic.m_CampType == CampType.Yellow_Camp))
        ) {
            if (Magic == this.m_DamageData.m_SelfSc) return;
            if (!this.PerSon.has(Obj)) {
                Magic.BeAttacked(this.m_DamageData);
                this.PerSon.set(Obj, Obj);
            }
        }
    }

    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {

    }
}