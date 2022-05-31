import { ApkDefine, CampType, SkillType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import DamageData from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/DamageData";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MoveAccordingByTarget from "../AuxiliaryCombatScript/MoveScripts/MoveAccordingByTarget";
import SkillManager from "../SkillBase/SkillManager";

/**弹射箭 */
export default class CatapultArrow extends Laya.Script3D {

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
        if (this.CatapultCount <= 0) {
            this.SelefS3D.destroy();
            return;
        }
        this.CatapultCount--;
        let TarGetObj = this.GetTargetByMap(true);
        if (TarGetObj == null) { /**console.log("范围内没有敌方");*/ this.SelefS3D.destroy(); return; }
        this.m_MoveAccordingByTarget.InitData(this.SelefS3D, TarGetObj);
    }
    /**Trigger进入 */
    onTriggerEnter(Con: Laya.PhysicsComponent) {
        let Obj = Con.owner as Laya.Sprite3D;
        let Magic: MagicCubeSource = Obj.getComponent(MagicCubeSource);
        if ((Magic != null && !Magic.IsDie) &&
            ((Magic.m_CampType != this.m_CampType) || (Magic.m_CampType == CampType.Yellow_Camp))
        ) {
            if (Magic == this.m_DamageData.m_SelfSc) return;
            if (!this.m_TriggerEnter.has(Obj)) {
                this.m_TriggerEnter.set(Obj, Obj);
            }
        }
    }
    /**Trigger退出 */
    onTriggerExit(Con: Laya.PhysicsComponent) {
        let Obj = Con.owner as Laya.Sprite3D;
        if (this.m_TriggerEnter.has(Obj)) {
            this.m_TriggerEnter.delete(Obj);
        }
    }
    /**获取目标 */
    GetTargetByMap(IsLoop: boolean): Laya.Sprite3D {

        if (this.m_TriggerEnter.size <= 0) return null;
        // 迭代 Map 中的 value
        let TempObj: Laya.Sprite3D = null;
        let Dis = 999;
        let TempArray: Laya.Sprite3D[] = [];
        for (let value of this.m_TriggerEnter.values()) {
            if ((value == null) || value.getComponent(MagicCubeSource).IsDie) {
                TempArray.push(value);
            }
        }
        for (let i = 0; i < TempArray.length; i++) {
            this.m_TriggerEnter.delete(TempArray[i]);
        }
        for (let value of this.m_TriggerEnter.values()) {
            if (this.AttackMap.has(value)) {
                continue;
            }

            if (!IsLoop) return value;
            let Dis2 = Laya.Vector3.distance(value.transform.position, this.Transform.position);
            if (Dis2 < Dis) {
                Dis = Dis2;
                TempObj = value;
            }
        }
        return TempObj;
    }

}