import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import { PetAnimatorManager } from "src/Ldz_GameCore/FSM_Animation/Pets/PetAnimatorManager";
import { Enitiy, EntityState, PetWorkType, WorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MesManager from "src/_T/Mes/MesManager";
import DamageData from "../HoneyBeeManager/DamageData";
import MagicCubeSource from "../HoneyBeeManager/MagicCubeSource";


/**自爆蜘蛛 */
export default class ToonSpiderPurple extends MagicCubeSource {


    Init(Lv: number = 1) {
        this.MagicName = "ToonSpiderPurple";
        this.m_Enitiy = Enitiy.Filed_Type;
        super.Init(Lv);
        if (this.m_AnimatorManager != null) {
            this.m_AnimatorManager.ChangeState(EntityState.Idle);
            this.m_PetWorkType = PetWorkType.Default;
            this.m_AnimatorManager.m_TargetObj = null;
        }

    }
    onAwake() {

        super.onAwake();
        this.m_AnimatorManager = new PetAnimatorManager();
        this.m_AnimatorManager.InitManager(this.m_SceneSprite3d, this.m_MagicsBase);
        this.m_AnimatorManager.ChangeState(EntityState.Idle);
    }
    onStart() {
        // super.onStart();
        if (this.m_TriggerCollider != null) {
            this.m_TriggerCollider.m_CampType = this.m_CampType;
        }
    }
    MoveToPos(Pos: Laya.Vector3) {
        super.MoveToPos(Pos);
    }
    AttackTarget(_TargetObj: Laya.Sprite3D): boolean {
        let Pos: Laya.Vector3 = this.m_SceneSprite3d.transform.localPosition;
        let Scale: Laya.Vector3 = this.m_SceneSprite3d.transform.localScale;
        let Tar: MagicCubeSource = _TargetObj.getComponent(MagicCubeSource);
        if (Tar != null && !Tar.destroyed) {
            Tar.BeAttacked(this.m_TargetDamageData.Clone());
            MesManager.event(ESceneEvent.LodeBOOMEffects, [_AllPrefabsNames.Blast_SpidersQueen, "BOOM", Pos.clone(), new Laya.Vector3(1, 1, 1)]);
        }
        this.SkillSelef(true);
        return true;
    }
    GetTargetByMap(IsLoop: boolean): Laya.Sprite3D {
        return this.m_TargetDamageData.m_SelfSc.GetTargetByMap(IsLoop);
    }
    GetObjIsMap(TempObj: Laya.Sprite3D): boolean {
        return this.m_TargetDamageData.m_SelfSc.GetObjIsMap(TempObj);
    }
    BeAttacked(m_DamageData: DamageData) {
        let Pos: Laya.Vector3 = this.m_SceneSprite3d.transform.localPosition;
        let Scale: Laya.Vector3 = this.m_SceneSprite3d.transform.localScale;
        if (super.BeAttacked(m_DamageData)) {
            if (!this.Isone) return true;
            this.Isone = false;
            return true;
        } else {

        }
        return false;
    }
    Isone = true;
    onUpdate() {
        this.m_TempAttributeBase = this.m_AttributeBase.Clone();
        this.m_BuffManager.BuffUpdate();
        this.UpdateAttributeBase();
        this.m_AnimatorManager.onUpdate();
        // super.onUpdate();
    }

}