import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../FSM_Base/CombatantManageBase";



export class PetAnimatorManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("PetStateIdle");
        this.AddState("PetStateAttack");
        this.AddState("PetStateRun");
    }
    onUpdate() {
        super.onUpdate();
    }
}