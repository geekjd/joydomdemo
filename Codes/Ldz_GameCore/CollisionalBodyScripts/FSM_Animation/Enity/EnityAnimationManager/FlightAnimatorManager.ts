
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";

/**飞行近战类动画管理 */
export class FlightAnimatorManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("FlightStateFlyIdle");
        this.AddState("FlightStateFlyRun");
        this.AddState("FlightStateFlyDie");
        this.AddState("FlightStateFlyMeleeRightAttack");
    }
    onUpdate() {
        super.onUpdate();
    }
}