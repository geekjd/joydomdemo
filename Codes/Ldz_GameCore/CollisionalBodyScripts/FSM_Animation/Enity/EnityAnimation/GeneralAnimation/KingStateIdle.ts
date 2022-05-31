
import { EntityState, GameGeneralAnimationDefin } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import CombatantManageBase from "../../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../../FSM_Base/CombatantStateBase";



export default class KingStateIdle extends CombatantStateBase {

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

        if (this.m_StateManage.m_TargetObj == null || this.m_StateManage.m_TargetObj.parent == null || this.m_StateManage.TargetScript.IsDie) {
            this.m_StateManage.m_TargetObj = this.m_StateManage.m_MagicCubeSource.GetTargetByMap(true);
        } else {
            // if (!this.m_StateManage.m_MagicCubeSource.GetObjIsMap(this.m_StateManage.m_TargetObj)) {
            //     this.m_StateManage.m_TargetObj = null;
            //     return;
            // }
            if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.parent != null && !this.m_StateManage.TargetScript.IsDie) {
                //console.log(this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range);
                if (this.GetTargetDis() < this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range) {
                    //this.m_StateManage.m_Attackinterval -= (Laya.timer.delta / 1000);
                    if (this.m_StateManage.m_Attackinterval <= 0) {
                        //console.log("进行攻击");
                        this.m_StateManage.ChangeState(EntityState.Attack);
                    }
                } else {
                    this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                    if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path != null && this.m_StateManage.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                        this.m_StateManage.ChangeState(EntityState.Run);
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
