
import { EntityState, GameGeneralAnimationDefin } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import CombatantManageBase from "../../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../../FSM_Base/CombatantStateBase";



export default class GeneralStateDash extends CombatantStateBase {

    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        super.Init(SelfObj, _CombatantManageBase);
        this.m_EntityState = EntityState.Dash;
    }
    public OnEnter()               //进入状态的虚函数
    {
        this.PlayAnimation(GameGeneralAnimationDefin.AnimationName_Dash);

    }
    public OnExecute()             //执行状态的虚函数
    {
        //当前状态不是 这个脚本的时候 就退出
        if ((this.m_StateManage.m_CurStateBase.m_EntityState != EntityState.Dash)) {
            return;
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
