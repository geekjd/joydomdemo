
import { EntityState, GameFlightAnimationDefin } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { Mathf } from "src/Ldz_GameCore/GeneralScripts/Mathf";
import CombatantManageBase from "../../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../../FSM_Base/CombatantStateBase";



export default class FlightStateFlyMeleeRightAttack extends CombatantStateBase {
    BoolIsFire: boolean = false;

    Url: string;

    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        super.Init(SelfObj, _CombatantManageBase);
        this.m_EntityState = EntityState.Attack;
    }
    public OnEnter()               //进入状态的虚函数
    {
        this.m_Animator.speed = 1 + (1 - this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_HitSpeed);
        this.m_Animator.speed = this.m_Animator.speed < 1 ? 1 : this.m_Animator.speed;
        this.PlayAnimation(GameFlightAnimationDefin.AnimationName_FlyMeleeRightAttack01);
        this.BoolIsFire = true;
        this.AttackTime = 0;

    }
    AttackTime: number;
    LastPos: Laya.Vector3;
    public OnExecute()             //执行状态的虚函数
    {
        //当前状态不是 这个脚本的时候 就退出
        if ((this.m_StateManage.m_CurStateBase.m_EntityState != EntityState.Attack)) {
            return;
        }
        if (this.m_StateManage.m_TargetObj != null && !this.m_StateManage.m_TargetObj.destroyed) {
            this.m_SelfObj.transform.position = this.m_SelfObj.transform.position;
            let Out: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(this.m_StateManage.m_TargetObj.transform.position, this.m_SelfObj.transform.position, Out);
            this.m_SelfObj.transform.localRotationEulerY = Mathf.updateRotation(Out);
        }
        let AttackTime = this.m_Animator.getControllerLayer().getCurrentPlayState().normalizedTime;
        if (AttackTime > 0.5 && this.BoolIsFire) {
            if (this.m_StateManage.m_TargetObj != null && !this.m_StateManage.m_TargetObj.destroyed) {
                let DIc = this.GetTargetDis();
                if (!this.m_StateManage.TargetScript.IsDie && DIc <= this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range + 3) {
                    this.m_StateManage.m_MagicCubeSource.AttackTarget(this.m_StateManage.m_TargetObj);
                }
            }
            this.m_StateManage.m_Attackinterval = this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_HitSpeed;
            this.BoolIsFire = false;
        } else if (AttackTime > 1) {
            this.m_StateManage.ChangeState(EntityState.Idle);
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
