

import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";


/**弓箭手类型动画管理器 */
export class ElfArcherStateManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("GeneralStateIdle");
        this.AddState("GeneralStateDie");
        this.AddState("GeneralStateRun");
        this.AddState("ArrowStateAttack");
    }
    onUpdate() {
        super.onUpdate();
    }

}