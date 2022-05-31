
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { FinderAgent } from "src/PathFind/FInderAgent";
import Vector2D from "src/PathFind/RVO/Vector2D";
import MesManager from "src/_T/Mes/MesManager";
import LayaUtils from "src/_T/Utils/LayaUtils";
import MathUtils from "src/_T/Utils/MathUtils";
import CombatantManageBase from "../FSM_Animation/FSM_Base/CombatantManageBase";
import CombatantStateBase from "../FSM_Animation/FSM_Base/CombatantStateBase";
import { EntityState, GameExpressionAnimationDefin, GameFlightAnimationDefin, GameGeneralAnimationDefin } from "../GeneralScripts/GameDefine";
import { Mathf } from "../GeneralScripts/Mathf";
import MagicCubeSource from "../MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import BattleRoomCon from "../SceneScripts/BattleScene/BattleRoomCon";

export class RodmControl extends Laya.Script3D {

    MoveDir: Laya.Vector3 = null;
    MoveSpeed: number = 1;
    RotateSpeed: number = 0.2;
    m_SelfObj: Laya.Sprite3D;
    logicSpeed: Laya.Vector2 = Laya.Vector2.ZERO;
    roleDirection: number;
    renderDir: Laya.Quaternion = new Laya.Quaternion(0, 0, 0);
    //transform: Laya.Transform3D;
    QuaternionZero: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
    /**玩家状态控制 */
    m_PlayerBeeCon: MagicCubeSource;
    RodmList: string[] = [];
    m_Animator: Laya.Animator;
    IsUpdate: boolean = true;
    IdleName: string = GameGeneralAnimationDefin.AnimationName_Idle;
    onAwake() {
        /**添加事件 */
        this.m_SelfObj = this.owner as Laya.Sprite3D;
        this.renderDir = this.QuaternionZero;
        // this.m_PlayerBeeCon = this.m_SelfObj.getComponent(MagicCubeSource);
        this.m_Animator = this.m_SelfObj.getComponent(Laya.Animator);
        this.RodmList = [];
        for (let _i in GameExpressionAnimationDefin) {
            GameExpressionAnimationDefin[_i] && this.RodmList.push(GameExpressionAnimationDefin[_i]);;
        }
    }
    /**随机播放动画 */
    PlayRodmAnimator() {
        let Count = MathUtils.randomRangeInt(0, this.RodmList.length);
        let AnimatorName = this.RodmList[Count];
        this.m_Animator.play(AnimatorName);
    }
    /**播放固定动画 */
    PlayFixedAnimator(AnimatorName: string) {
        this.IsUpdate = false;
        this.m_Animator.play(AnimatorName);
    }
    CurTime: number = 0;
    onUpdate() {
        if (!this.IsUpdate) return;
        this.CurTime += (LayaUtils.deltaTime / 1000);
        if (this.CurTime > 4) {
            this.PlayRodmAnimator();
            this.CurTime = 0;
            return;
        }
        let AttackTime = this.m_Animator.getControllerLayer().getCurrentPlayState().normalizedTime;
        let AnimationName = this.m_Animator.getControllerLayer().getCurrentPlayState().animatorState.name;
        if (AttackTime > 1 && AnimationName != GameGeneralAnimationDefin.AnimationName_Idle && AnimationName != GameFlightAnimationDefin.AnimationName_FlyIdle) {
            this.m_Animator.play(this.IdleName);
        }
    }


}