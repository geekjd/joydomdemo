

import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";


/**近战动画类型动画管理器 */
export class BarbarianStateManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("BarbarianStateIdle");
        this.AddState("GeneralStateDie");
        this.AddState("GeneralStateRun");
        this.AddState("MeleeStateAttack");
        this.AddState("MeleeStateAttack2");
        this.AddState("MeleeStateAttack3");
    }
    onUpdate() {
        super.onUpdate();
    }

}