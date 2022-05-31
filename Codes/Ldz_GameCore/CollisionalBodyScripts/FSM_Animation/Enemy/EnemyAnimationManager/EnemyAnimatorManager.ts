
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";



export class EnemyAnimatorManager extends CombatantManageBase {

    InitManager(SelfObj: Laya.Sprite3D, soldiersBase: MagicCubeSource) {
        super.InitManager(SelfObj, soldiersBase);
        this.AddState("EnemyStateIdle");
        this.AddState("EnemyStateAttack");
        this.AddState("EnemyStateRun");
    }
    onUpdate() {
        super.onUpdate();
    }
}