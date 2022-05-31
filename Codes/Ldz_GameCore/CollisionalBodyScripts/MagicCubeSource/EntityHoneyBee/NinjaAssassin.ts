import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { MeleeStateManager } from "src/Ldz_GameCore/FSM_Animation/Enity/EnityAnimationManager/MeleeStateManager";
import { Enitiy, EntityState } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MesManager from "src/_T/Mes/MesManager";
import DamageData from "../HoneyBeeManager/DamageData";
import MagicCubeSource from "../HoneyBeeManager/MagicCubeSource";


/**刺客 */
export default class NinjaAssassin extends MagicCubeSource {


    Init(Lv: number = 1) {
        this.MagicName = "NinjaAssassin";
        this.m_Enitiy = Enitiy.Role_Type;
        super.Init(Lv);
    }
    onAwake() {
        super.onAwake();
        this.m_AnimatorManager = new MeleeStateManager();
        this.m_AnimatorManager.InitManager(this.m_SceneSprite3d, this.m_MagicsBase);
        this.m_AnimatorManager.ChangeState(EntityState.Idle);
    }
    onStart() {
        if (this.m_TriggerCollider != null) {
            this.m_TriggerCollider.m_CampType = this.m_CampType;
        }
    }
    MoveToPos(Pos: Laya.Vector3) {
        super.MoveToPos(Pos);
    }
    AttackTarget(_TargetObj: Laya.Sprite3D): boolean {
        // return true;
        this.m_DamageData.Refresh(this.m_TempAttributeBase);
        if (this.m_AttributeBase.m_Projectiles != "") {
            this.m_BuffManager.BuffOnHit(this.m_DamageData);
            MesManager.event(ESceneEvent.ReleaseSkills, [this.m_AttributeBase.m_MagicMiscId, this.m_DamageData.Clone()])
        } else {
            return super.AttackTarget(_TargetObj);
        }
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

        super.onUpdate();
    }

}