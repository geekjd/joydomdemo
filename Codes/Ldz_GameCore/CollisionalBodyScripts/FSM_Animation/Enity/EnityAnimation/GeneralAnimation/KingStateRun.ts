
import { EntityState, GameGeneralAnimationDefin } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { Mathf } from "src/Ldz_GameCore/GeneralScripts/Mathf";
import LayaUtils from "src/_T/Utils/LayaUtils";
import CombatantManageBase from "../../../FSM_Base/CombatantManageBase";
import CombatantStateBase from "../../../FSM_Base/CombatantStateBase";



export default class KingStateRun extends CombatantStateBase {

    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        super.Init(SelfObj, _CombatantManageBase);
        this.m_EntityState = EntityState.Run;
    }
    public OnEnter()               //进入状态的虚函数
    {
        this.PlayAnimation(GameGeneralAnimationDefin.AnimationName_Run);

    }
    MinTime: number = 0;
    MaxTime: number = 0.2;
    public OnExecute()             //执行状态的虚函数
    {
        //当前状态不是 这个脚本的时候 就退出
        if ((this.m_StateManage.m_CurStateBase.m_EntityState != EntityState.Run)) {
            return;
        }
        this.m_StateManage.m_MagicCubeSource.m_FinderAgent.maxSpeed = this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Speed;
        if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.parent != null && !this.m_StateManage.TargetScript.IsDie) {
            if (!this.m_StateManage.m_MagicCubeSource.GetObjIsMap(this.m_StateManage.m_TargetObj)) {

                let TempObj = this.m_StateManage.m_MagicCubeSource.GetTargetByMap(true);
                if (TempObj != null) {
                    this.m_StateManage.m_TargetObj = TempObj;
                }
            }
        }
        if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.parent != null && !this.m_StateManage.TargetScript.IsDie) {
            this.m_SelfObj.transform.position = this.m_SelfObj.transform.position;
            let Out: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(this.m_StateManage.m_TargetObj.transform.position, this.m_SelfObj.transform.position, Out);
            this.m_SelfObj.transform.localRotationEulerY = Mathf.updateRotation(Out);
        }

        if (this.m_StateManage.m_TargetObj == null || this.m_StateManage.m_TargetObj.parent == null || this.m_StateManage.TargetScript.IsDie) {

            this.m_StateManage.m_MagicCubeSource.m_FinderAgent.SetStopMove();
            this.m_StateManage.ChangeState(EntityState.Idle);
            this.m_StateManage.m_TargetObj = null;
        } else if (this.m_StateManage.m_TargetObj != null) {

            //this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range
            if (this.GetTargetDis() < this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_Range) {
                this.m_StateManage.m_MagicCubeSource.m_FinderAgent.SetStopMove();
                this.m_StateManage.ChangeState(EntityState.Idle);
            } else {
                this.MinTime += (LayaUtils.deltaTime / 1000);
                if (this.MinTime > this.MaxTime) {
                    this.MinTime = 0;
                    if (this.m_StateManage.m_MagicCubeSource.m_FinderAgent != null) {
                        if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.parent != null && !this.m_StateManage.TargetScript.IsDie) {
                            this.m_StateManage.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_StateManage.m_TargetObj.transform.position);
                        }
                    }
                }
            }
        }
    }
    public OnExit()                //推出状态的虚函数
    {
        this.m_StateManage.m_Attackinterval = this.m_StateManage.m_MagicCubeSource.m_TempAttributeBase.m_HitSpeed;
        super.OnExit();
    }
    protected GetEntityState(): EntityState {
        if (this.m_StateManage.m_CurStateBase != null) {
            return this.m_StateManage.m_CurStateBase.m_EntityState;
        }
        return EntityState.EnTity_NULL;
    }
}
