
import { EntityState, GameGeneralAnimationDefin, PetWorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import CombatantManageBase from "../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../FSM_Base/CombatantStateBase";




export default class PetStateIdle extends CombatantStateBase {

    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        super.Init(SelfObj, _CombatantManageBase);
        this.m_EntityState = EntityState.Idle;
    }
    public OnEnter()               //进入状态的虚函数
    {
        this.PlayAnimation(GameGeneralAnimationDefin.AnimationName_Idle);

    }
    public OnExecute()             //执行状态的虚函数
    {
        //当前状态不是 这个脚本的时候 就退出
        if ((this.m_StateManage.m_CurStateBase.m_EntityState != EntityState.Idle)) {
            return;
        }

        if (this.m_StateManage.m_MagicCubeSource.m_PetWorkType == PetWorkType.Follow) {

            let TempObj = this.m_StateManage.m_MagicCubeSource.GetTargetByMap(true);
            if (TempObj != null && this.m_StateManage.m_MagicCubeSource.GetObjIsMap(TempObj)) {
                this.m_StateManage.m_TargetObj = TempObj;
                this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.CableEnemy;

            } else {
                if (this.m_StateManage.m_TargetObj != null) {
                    if (this.GetTargetLockDis() > this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range) {
                        this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                        if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path != null && this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                            this.m_StateManage.ChangeState(EntityState.Run);
                            this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                        } else {
                            this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                        }
                    }
                } else {
                    this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Default;
                }
            }
        } else if (this.m_StateManage.m_MagicCubeSource.m_PetWorkType == PetWorkType.CableEnemy) {

            if (this.m_StateManage.m_TargetObj != null) {
                let Dic = this.GetTargetLockDis();
                if (Dic <= this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range + 0.2) {
                    this.m_StateManage.ChangeState(EntityState.Attack);

                } else {
                    this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                    if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path != null && this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                        this.m_StateManage.ChangeState(EntityState.Run);
                        this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.CableEnemy;
                    } else {
                        this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                    }
                }
            }

        } else {
            /**检测是否有目标 */
            if (this.m_StateManage.m_TargetObj == null) {
                /**获取敌方目标 */
                this.m_StateManage.m_TargetObj = this.m_StateManage.m_MagicCubeSource.GetTargetByMap(true);
                /**没有敌方目标 */
                if (this.m_StateManage.m_TargetObj == null) {
                    /**获取跟随目标的脚本 */
                    let FindTargetSc: MagicCubeSource = this.m_StateManage.m_MagicCubeSource.m_TargetDamageData.m_SelfSc;
                    /**跟随目标死亡 消除自己 */
                    if (FindTargetSc.IsDie) {
                        this.m_StateManage.m_MagicCubeSource.SkillSelef();
                        return;
                    } else {
                        /**将跟随目标 设置为移动目标 */
                        this.m_StateManage.m_TargetObj = FindTargetSc.m_SceneSprite3d;
                        this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                        if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path != null && this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                            this.m_StateManage.ChangeState(EntityState.Run);
                            this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                        } else {
                            this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                        }
                    }
                } else {
                    /**有敌方目标时 移动值地方目标 */
                    if (this.m_StateManage.m_TargetObj != null) {
                        let Dic = this.GetTargetLockDis();

                        if (Dic < this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range + 0.2) {
                            this.m_StateManage.ChangeState(EntityState.Attack);
                        } else {
                            this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                            if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path != null && this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                                this.m_StateManage.ChangeState(EntityState.Run);
                                this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.CableEnemy;
                            } else {
                                this.m_StateManage.m_MagicCubeSource.m_PetWorkType = PetWorkType.Follow;
                            }
                        }
                    }
                }
            }
        }
    }
    public OnExit()                //推出状态的虚函数
    {
        super.OnExit();
    }
    protected GetEntityState(): EntityState {
        if (this.m_StateManage.m_CurStateBase != null) {
            return this.m_StateManage.m_CurStateBase.m_EntityState;
        }
        return EntityState.EnTity_NULL;
    }
}
