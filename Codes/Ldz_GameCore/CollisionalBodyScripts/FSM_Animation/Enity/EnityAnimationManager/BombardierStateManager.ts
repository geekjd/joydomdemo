

import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";


/**近战动画类型动画管理器 */
export class BombardierStateManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("GeneralStateIdle");
        this.AddState("GeneralStateDie");
        this.AddState("GeneralStateRun");
        this.AddState("ProjectileRightAttack01");
    }
    onUpdate() {
        super.onUpdate();
    }

}