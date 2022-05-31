import EnemyStateAttack from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateAttack";
import EnemyStateDash from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateDash";
import EnemyStateDie from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateDie";
import EnemyStateIdle from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateIdle";
import EnemyStateRun from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateRun";
import EnemyStateWalk from "../Enemy/EnemyAimation/EnemyAnimation/EnemyStateWalk";
import ArrowStateAttack from "../Enity/EnityAnimation/ArrowAnimation/ArrowStateAttack";
import BarbarianStateIdle from "../Enity/EnityAnimation/BarbarianAnimation/BarbarianStateIdle";
import BigSwordStateAttack from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateAttack";
import BigSwordStateAttack2 from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateAttack2";
import BigSwordStateTHDash from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateTHDash";
import BigSwordStateTHIdle from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateTHIdle";
import BigSwordStateTHRun from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateTHRun";
import BigSwordStateTHSwordRelax from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateTHSwordRelax";
import BigSwordStateTHWalk from "../Enity/EnityAnimation/BigSwordAnimator/BigSwordStateTHWalk";
import FlightStateFlyDie from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyDie";
import FlightStateFlyIdle from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyIdle";
import FlightStateFlyMeleeLeftAttack01 from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyMeleeLeftAttack01";
import FlightStateFlyMeleeRightAttack from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyMeleeRightAttack";
import FlightStateFlyMeleeRightAttack02 from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyMeleeRightAttack02";
import FlightStateFlyRun from "../Enity/EnityAnimation/FlightAnimator/FlightStateFlyRun";
import GeneralStateDash from "../Enity/EnityAnimation/GeneralAnimation/GeneralStateDash";
import GeneralStateDie from "../Enity/EnityAnimation/GeneralAnimation/GeneralStateDie";
import GeneralStateIdle from "../Enity/EnityAnimation/GeneralAnimation/GeneralStateIdle";
import GeneralStateRun from "../Enity/EnityAnimation/GeneralAnimation/GeneralStateRun";
import GeneralStateWalk from "../Enity/EnityAnimation/GeneralAnimation/GeneralStateWalk";
import KingStateIdle from "../Enity/EnityAnimation/GeneralAnimation/KingStateIdle";
import KingStateRun from "../Enity/EnityAnimation/GeneralAnimation/KingStateRun";
import MeleeStateAttack from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateAttack";
import MeleeStateAttack2 from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateAttack2";
import MeleeStateAttack3 from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateAttack3";
import MeleeStateIdle from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateIdle";
import MeleeStateRun from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateRun";
import MeleeStateSpinAttack from "../Enity/EnityAnimation/MeleeAnimation/MeleeStateSpinAttack";
import ProjectileRightAttack01 from "../Enity/EnityAnimation/MeleeAnimation/ProjectileRightAttack01";
import SpearStateSpearDash from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearDash";
import SpearStateSpearIdle from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearIdle";
import SpearStateSpearMeleeAttack01 from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearMeleeAttack01";
import SpearStateSpearMeleeAttack02 from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearMeleeAttack02";
import SpearStateSpearRun from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearRun";
import SpearStateSpearWalk from "../Enity/EnityAnimation/SpearAnimator/SpearStateSpearWalk";
import PetStateAttack from "../Pets/PetAnimation/PetStateAttack";
import PetStateIdle from "../Pets/PetAnimation/PetStateIdle";
import PetStateRun from "../Pets/PetAnimation/PetStateRun";


export default class AnimatorTypeManager {

    private static _Instance: AnimatorTypeManager;
    private constructor() { }
    //公开的方法
    public static get Instance(): AnimatorTypeManager {
        if (!this._Instance) {
            this._Instance = new AnimatorTypeManager();
            this._Instance.InitType();
        }
        return this._Instance;
    }
    MagicAnimatorTypeMap: Map<string, any> = new Map<string, any>();

    private InitType() {

        /**通用 */
        this.MagicAnimatorTypeMap.set("GeneralStateIdle", GeneralStateIdle);
        this.MagicAnimatorTypeMap.set("GeneralStateRun", GeneralStateRun);
        this.MagicAnimatorTypeMap.set("GeneralStateWalk", GeneralStateWalk);
        this.MagicAnimatorTypeMap.set("GeneralStateDash", GeneralStateDash);
        this.MagicAnimatorTypeMap.set("GeneralStateDie", GeneralStateDie);
        this.MagicAnimatorTypeMap.set("KingStateIdle", KingStateIdle);
        this.MagicAnimatorTypeMap.set("KingStateRun", KingStateRun);
        /**射手 */
        this.MagicAnimatorTypeMap.set("ArrowStateAttack", ArrowStateAttack);
        /**近战 */
        this.MagicAnimatorTypeMap.set("MeleeStateIdle", MeleeStateIdle);
        this.MagicAnimatorTypeMap.set("MeleeStateRun", MeleeStateRun);
        this.MagicAnimatorTypeMap.set("MeleeStateSpinAttack", MeleeStateSpinAttack);
        this.MagicAnimatorTypeMap.set("MeleeStateAttack", MeleeStateAttack);
        this.MagicAnimatorTypeMap.set("MeleeStateAttack2", MeleeStateAttack2);
        this.MagicAnimatorTypeMap.set("MeleeStateAttack3", MeleeStateAttack3);
        /**长枪 */
        this.MagicAnimatorTypeMap.set("SpearStateSpearDash", SpearStateSpearDash);
        this.MagicAnimatorTypeMap.set("SpearStateSpearIdle", SpearStateSpearIdle);
        this.MagicAnimatorTypeMap.set("SpearStateSpearMeleeAttack01", SpearStateSpearMeleeAttack01);
        this.MagicAnimatorTypeMap.set("SpearStateSpearMeleeAttack02", SpearStateSpearMeleeAttack02);
        this.MagicAnimatorTypeMap.set("SpearStateSpearRun", SpearStateSpearRun);
        this.MagicAnimatorTypeMap.set("SpearStateSpearWalk", SpearStateSpearWalk);
        /**飞行 */
        this.MagicAnimatorTypeMap.set("FlightStateFlyIdle", FlightStateFlyIdle);
        this.MagicAnimatorTypeMap.set("FlightStateFlyRun", FlightStateFlyRun);
        this.MagicAnimatorTypeMap.set("FlightStateFlyMeleeRightAttack", FlightStateFlyMeleeRightAttack);
        this.MagicAnimatorTypeMap.set("FlightStateFlyMeleeLeftAttack01", FlightStateFlyMeleeLeftAttack01);
        this.MagicAnimatorTypeMap.set("FlightStateFlyMeleeRightAttack02", FlightStateFlyMeleeRightAttack02);
        this.MagicAnimatorTypeMap.set("FlightStateFlyDie", FlightStateFlyDie);
        /**双手剑 */
        this.MagicAnimatorTypeMap.set("BigSwordStateTHIdle", BigSwordStateTHIdle);
        this.MagicAnimatorTypeMap.set("BigSwordStateTHRun", BigSwordStateTHRun);
        this.MagicAnimatorTypeMap.set("BigSwordStateTHWalk", BigSwordStateTHWalk);
        this.MagicAnimatorTypeMap.set("BigSwordStateTHDash", BigSwordStateTHDash);
        this.MagicAnimatorTypeMap.set("BigSwordStateAttack", BigSwordStateAttack);
        this.MagicAnimatorTypeMap.set("BigSwordStateAttack2", BigSwordStateAttack2);
        this.MagicAnimatorTypeMap.set("BigSwordStateTHSwordRelax", BigSwordStateTHSwordRelax);

        /**怪物 */
        this.MagicAnimatorTypeMap.set("EnemyStateIdle", EnemyStateIdle);
        this.MagicAnimatorTypeMap.set("EnemyStateRun", EnemyStateRun);
        this.MagicAnimatorTypeMap.set("EnemyStateWalk", EnemyStateWalk);
        this.MagicAnimatorTypeMap.set("EnemyStateAttack", EnemyStateAttack);
        this.MagicAnimatorTypeMap.set("EnemyStateDash", EnemyStateDash);
        this.MagicAnimatorTypeMap.set("EnemyStateDie", EnemyStateDie);

        /**宠物 */
        this.MagicAnimatorTypeMap.set("PetStateIdle", PetStateIdle);
        this.MagicAnimatorTypeMap.set("PetStateRun", PetStateRun);
        this.MagicAnimatorTypeMap.set("PetStateAttack", PetStateAttack);

        /**狂战士 */
        this.MagicAnimatorTypeMap.set("BarbarianStateIdle", BarbarianStateIdle);
        /**炸弹人 */
        this.MagicAnimatorTypeMap.set("ProjectileRightAttack01", ProjectileRightAttack01);
    }
    DoesTheTypeExist(TypeName: string): boolean {

        if (this.MagicAnimatorTypeMap.has(TypeName)) {

            return true;
        }
        return false;
    }
    GetTypeByName(TypeName: string): any {

        if (this.MagicAnimatorTypeMap.has(TypeName)) {
            return this.MagicAnimatorTypeMap.get(TypeName);
        }
        return null;
    }
}