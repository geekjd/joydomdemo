import { AIState, EntityState } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import LayaUtils from "src/_T/Utils/LayaUtils";
import AnimatorTypeManager from "./AnimatorTypeManager";
import CombatantStateBase from "./CombatantStateBase";


/**魔能的控制权柄
 * 
 * 拥有此组件的单位
 * 将被赋予征战世界的战技的使用能力
 * 
 */
export default class CombatantManageBase {

    public m_CurStateBase: CombatantStateBase = new CombatantStateBase();
    public states: Map<EntityState, CombatantStateBase> = new Map<any, CombatantStateBase>();//人物拥有的所有状态集合  字典 key=Type value=PlayerStateBase
    public m_SelfObj: Laya.Sprite3D;
    public m_MagicCubeSource: MagicCubeSource;
    InitManager(SelfObj: Laya.Sprite3D, SoldiersBase: MagicCubeSource) {
        this.m_SelfObj = SelfObj;
        this.m_MagicCubeSource = SoldiersBase;
    }

    public AddState(ScriptName: string)//where T: CombatantStateBase
    {
        if (AnimatorTypeManager.Instance.DoesTheTypeExist(ScriptName)) {
            let state: CombatantStateBase = new (AnimatorTypeManager.Instance.GetTypeByName(ScriptName))(); //this.m_SelfObj.addComponent();//添加状态组件
            state.Init(this.m_SelfObj, this);//调用状态的初始化回调方法
            this.states.set(state.m_EntityState, state);//把状态添加到管理者的状态字典中
        }
    }

    public ChangeState(TempState: EntityState) // T: CombatantStateBase
    {
        if (this.FixedUpde && TempState == EntityState.Run) { return; }
        //正在执行的状态调用退出状态的回调
        if (this.m_CurStateBase != null)
            this.m_CurStateBase.OnExit();
        //字典中获取需要切换到的状态对象 赋值给current
        this.m_CurStateBase = this.states.get(TempState);
        //console.log(this.m_CurStateBase.m_EntityState);
        if (this.m_CurStateBase != null) {
            this.m_CurStateBase.OnEnter();
        }
        //新状态调用进入状态的回调
    }
    onUpdate() {
        if (this.m_CurStateBase != null && this.IsUpdate) {
            this.m_Attackinterval -= (LayaUtils.deltaTime / 1000);
            this.m_Attackinterval = this.m_Attackinterval <= 0 ? 0 : this.m_Attackinterval;
            this.m_CurStateBase.OnExecuteHandler ? this.m_CurStateBase.OnExecuteHandler.run() : this.m_CurStateBase.OnExecute();
        }
    }
    /**获取目标是否不存在 */
    GetTarGetIsExistence(): boolean {
        let Sc = this.TargetScript;
        if (Sc != null) {
            if (this.m_TargetObj == null || this.m_TargetObj.parent == null || this.TargetScript.IsDie) {
                return true;
            }
            return false;
        } else {
            if (this.m_TargetObj == null || this.m_TargetObj.destroyed || this.m_TargetObj.parent == null) {
                return true;
            }
            return false;
        }
    }
    SetStopMove() {
        this.m_MagicCubeSource.m_FinderAgent && this.m_MagicCubeSource.m_FinderAgent.SetStopMove();
        if (this.m_MagicCubeSource.m_FinderAgent) {
            this.m_MagicCubeSource.m_FinderAgent.IsSwche = true;
        }
        this.m_TargetObjWordPos = null;
        this.m_TargetObj = null;
        this.LostTargetTime = 0;
        this.m_AIState = AIState.default;
        this.ChangeState(EntityState.Idle);
    }

    IsUpdate = true;
    FixedUpde: boolean = false;
    /**重写此方法 */
    public get TargetScript(): MagicCubeSource {
        return this.m_TargetObj && this.m_TargetObj.getComponent(MagicCubeSource);
    }
    public m_TargetObj: Laya.Sprite3D = null;
    public m_TargetObjWordPos: Laya.Vector3 = null;
    m_Attackinterval: number = 1;
    IsCheck: boolean = false;
    /**逻辑速度 */
    logicSpeed: Laya.Vector2 = Laya.Vector2.ZERO;
    /**转向 */
    renderDir: Laya.Quaternion = new Laya.Quaternion(0, 0, 0);
    /**zero */
    QuaternionZero: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
    LostTargetTime: number = 0;
    m_AIState: AIState = AIState.default;
}