
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";

export class BigSwordAnimator extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("PlayerBeeStateIdle");
        this.AddState("GeneralStateDie");
        this.AddState("PlayerBeeStateAttack");
        this.AddState("PlayerBeeStateRun");
    }
    onUpdate() {
        super.onUpdate();
    }
}