import { EntityState } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import CombatantManageBase from "./CombatantManageBase";

export default class CombatantStateBase {

    // public PlayableDirector playableDirector;
    public m_Animator: Laya.Animator;                        //动画控制器组件
    public m_EntityState: EntityState;                  //动画的状态枚举
    public m_StateManage: CombatantManageBase;      //状态管理者的脚本
    m_SelfObj: Laya.Sprite3D;
    public OnExecuteHandler: Laya.Handler;
    public Init(SelfObj: Laya.Sprite3D, _CombatantManageBase: CombatantManageBase)                  //初始化虚函数
    {
        this.m_SelfObj = SelfObj;
        this.m_Animator = this.m_SelfObj.getComponent(Laya.Animator);
        if (this.m_Animator != null) {
            // let Config: OtherEnvironmentConfig.config = OtherEnvironmentConfigProxy.instance.byLevelIdGetData((BattleRoom.Instance.GameSpeednumber - 1));
            // let GameSpeed = 0;
            // if (Config.IsOpenConfig == 1) {
            //     GameSpeed = Config.GameAniSpeed;
            // } else {
            //     GameSpeed = GameTestDataProxyShell.instance.data.GameAnimatorSpeed;// GameConfig.GameAniSpeed;
            // }
            this.m_Animator.speed = 1.2;
        }
        this.m_StateManage = _CombatantManageBase;
    }
    public OnEnter()               //进入状态的虚函数
    {

    }
    public OnExecute()             //执行状态的虚函数
    {

    }
    public OnExit()                //推出状态的虚函数
    {

    }
    public PlayAnimation(animName: string) {
        // try {
        this.m_Animator.play(animName);
        // } catch {
        //     console.log("动画播放失败 " + animName);
        // }
    }
    LeftPos: Laya.Vector3 = new Laya.Vector3();
    RightPos: Laya.Vector3 = new Laya.Vector3();
    public GetTargetDis(): number {

        if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.transform != null) {
            this.m_SelfObj.transform.position.cloneTo(this.LeftPos);
            this.m_StateManage.m_TargetObj.transform.position.cloneTo(this.RightPos);
            this.LeftPos.y = 0;
            this.RightPos.y = 0;
            return Laya.Vector3.distance(this.LeftPos, this.RightPos);
        }
        return 0;
    }

    public GetTargetLockDis(): number {

        if (this.m_StateManage.m_TargetObj != null && this.m_StateManage.m_TargetObj.transform != null) {
            this.m_SelfObj.transform.localPosition.cloneTo(this.LeftPos);
            this.m_StateManage.m_TargetObj.transform.localPosition.cloneTo(this.RightPos);
            this.LeftPos.y = 0;
            this.RightPos.y = 0;
            return Laya.Vector3.distance(this.LeftPos, this.RightPos);
        }
        return 0;
    }

    public GetTargetDisByWordPos(): number {
        if (this.m_StateManage.m_TargetObjWordPos != null && this.m_SelfObj != null) {
            this.m_SelfObj.transform.position.cloneTo(this.LeftPos);
            this.m_StateManage.m_TargetObjWordPos.cloneTo(this.RightPos);
            this.LeftPos.y = 0;
            this.RightPos.y = 0;
            return Laya.Vector3.distance(this.LeftPos, this.RightPos);
        }
        return 0;
    }

}