import GameDefin, { EntityState, GameSpearAnimationDefin } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import CombatantManageBase from "../../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../../FSM_Base/CombatantStateBase";



export default class SpearStateSpearDash extends CombatantStateBase {
    BoolIsFire: boolean = false;

    Url: string;

    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        super.Init(SelfObj, _CombatantManageBase);
        this.m_EntityState = EntityState.Run;
    }
    public OnEnter()               //进入状态的虚函数
    {
        this.PlayAnimation(GameSpearAnimationDefin.AnimationName_SpearDash);
        this.BoolIsFire = true;
    }
    LastPos: Laya.Vector3;
    public OnExecute()             //执行状态的虚函数
    {
        //当前状态不是 这个脚本的时候 就退出
        if ((this.m_StateManage.m_CurStateBase.m_EntityState != EntityState.Run)) {
            return;
        }
        this.m_StateManage.m_TargetObj = this.m_StateManage.m_MagicCubeSource.GetTargetByMap(true);
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
