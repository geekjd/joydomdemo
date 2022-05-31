

import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";


/**近战动画类型动画管理器 */
export class KingStateManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("KingStateIdle");
        this.AddState("KingStateRun");
        this.AddState("GeneralStateDie");
        this.AddState("MeleeStateAttack");
        this.AddState("MeleeStateAttack2");
        this.AddState("MeleeStateAttack3");
    }
    onUpdate() {
        super.onUpdate();
    }

}