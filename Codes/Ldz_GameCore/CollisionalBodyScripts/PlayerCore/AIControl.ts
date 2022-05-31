
// import { worker } from "cluster";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { FinderAgent } from "src/PathFind/FInderAgent";
import Vector2D from "src/PathFind/RVO/Vector2D";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import LayaUtils from "src/_T/Utils/LayaUtils";
import CombatantManageBase from "../FSM_Animation/FSM_Base/CombatantManageBase";
import CombatantStateBase from "../FSM_Animation/FSM_Base/CombatantStateBase";
import { AIState, Enitiy, EntityState, WorkType } from "../GeneralScripts/GameDefine";
import { Mathf } from "../GeneralScripts/Mathf";
import MagicCubeSource from "../MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import NavMeshAgent from "../NavMesh/NavMeshAgent";
import BattleRoomCon from "../SceneScripts/BattleScene/BattleRoomCon";

export class AIControl extends Laya.Script3D {

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
    Char: Laya.CharacterController;


    //m_PhysicsSimulation: Laya.PhysicsSimulation;
    onAwake() {
        /**添加事件 */
        this.m_SelfObj = this.owner as Laya.Sprite3D;
        this.renderDir = this.QuaternionZero;
        this.m_PlayerBeeCon = this.m_SelfObj.getComponent(MagicCubeSource);
        //this.m_SelfObj.addComponent(Laya.Rigidbody3D);
        this.Char = this.m_SelfObj.addComponent(Laya.CharacterController);
        //console.log(this.m_SelfObj);
        //Laya.PhysicsSimulation.createConstraint();
        // this.m_PhysicsSimulation = this.m_SelfObj.addComponent(Laya.PhysicsSimulation);
        //创建胶囊碰撞器
        var sphereShape: Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(0.5, 3.4);
        //  设置Shape的本地偏移
        sphereShape.localOffset = new Laya.Vector3(0, 1.0, 0);
        // 设置角色控制器的碰撞形状
        this.Char.colliderShape = sphereShape;
        //this.Char.canCollideWith = 0;
        // this.m_SelfObj.layer = 0;
        this.Init();
    }

    Init() {
        let TempCon: Laya.CharacterController = this.m_SelfObj.getComponent(Laya.CharacterController);
        if (TempCon != null) {
            TempCon.enabled = true;
        }
        if (this.m_PlayerBeeCon.m_FinderAgent == null) {
            this.m_PlayerBeeCon.m_FinderAgent = new NavMeshAgent(this.m_SelfObj);
            switch (this.m_PlayerBeeCon.m_WorkType) {
                case WorkType.Default:
                    this.m_PlayerBeeCon.m_FinderAgent.Init(1);
                    break;
                case WorkType.HuntingType:
                    this.m_PlayerBeeCon.m_FinderAgent.Init(2);
                    break;
                case WorkType.Cooperation:
                    this.m_PlayerBeeCon.m_FinderAgent.Init(3);
                    break;
                case WorkType.Existence:
                    this.m_PlayerBeeCon.m_FinderAgent.Init(4);
                    break;
                case WorkType.Sports:
                    this.m_PlayerBeeCon.m_FinderAgent.Init(5);
                    break;
            }
        }
    }
    SetHandler() {
        let TempBaseIdle = this.m_PlayerBeeCon.m_AnimatorManager.states.get(EntityState.Idle);
        if (TempBaseIdle != null) {
            TempBaseIdle.OnExecuteHandler = Laya.Handler.create(this, this.IdleLogic, [this], false);
        }
        let TempBaseRun = this.m_PlayerBeeCon.m_AnimatorManager.states.get(EntityState.Run);
        if (TempBaseRun != null) {
            TempBaseRun.OnExecuteHandler = Laya.Handler.create(this, this.RunLogic, [this], false);
        }
    }
    LatsTarget: Laya.Sprite3D;
    LogicUpadate() {
    }
    TempItem: Laya.Sprite3D;

    IsQuDie: boolean = false;
    IdleLogic() {

        /**获取管理器 */
        let StateManager: CombatantManageBase = this.m_PlayerBeeCon.m_AnimatorManager;
        if ((StateManager.m_CurStateBase.m_EntityState != EntityState.Idle)) { return; }

        this.TempItem = null;
        /**h获取当前生命值 */
        let CurHp = StateManager.m_MagicCubeSource.m_AttributeBase.m_Hitpoints;
        let MaxHp = StateManager.m_MagicCubeSource.m_AttributeBase.m_MaxHitpoints * 0.35;
        // /**检测到碰撞 重新选择目标 */
        // if (StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj) {
        //     StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj = false;
        //     StateManager.m_TargetObj = BattleRoomCon.Instance.GetTargetByMap(this.m_SelfObj, false);
        // }
        /**检测生命值低下 */
        if (CurHp < MaxHp) {
            /**获取恢复道具 */
            this.TempItem = BattleRoomCon.Instance.GetItemTargetByMap(StateManager.m_MagicCubeSource, StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Range, true);
            /**判定是否拥有寻路组件 */
            if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
                /** */
                if (this.TempItem != null) {
                    StateManager.m_TargetObj = this.TempItem;
                    /**目标点 赋值 */
                    StateManager.m_TargetObjWordPos = this.TempItem.transform.position.clone();
                    /**当距离大于2时进行移动 */
                    //let Dic = StateManager.m_CurStateBase.GetTargetDisByWordPos();
                    /**寻找路径 */
                    StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                        this.IsQuDie = true;
                        StateManager.m_AIState = AIState.GoToPoint;
                        StateManager.ChangeState(EntityState.Run);
                        return;
                    } else {
                        console.log("寻找道具的路径失败");
                        StateManager.SetStopMove();
                        return;
                    }
                } else {
                    if (StateManager.m_TargetObj != null && StateManager.TargetScript != null) {
                        if (StateManager.TargetScript.m_Enitiy != Enitiy.Filed_Type) {
                            /**开始逃跑 */
                            let TargetObj = BattleRoomCon.Instance.GetEnemyTargetByMap(this.m_SelfObj, false);
                            if (TargetObj != null) {
                                StateManager.m_TargetObjWordPos = TargetObj.transform.position.clone();

                                StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                                if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                                    this.IsQuDie = true;
                                    StateManager.m_AIState = AIState.Avoid;
                                    StateManager.ChangeState(EntityState.Run);
                                    return;
                                } else {
                                    console.log("躲避其他人寻找敌人的路径失败");
                                    StateManager.SetStopMove();
                                    return;
                                }
                            }
                        }
                    }
                }
            } else {
                console.log("寻路组件失效");
            }
        }

        // /**以上其中一个生效 那么执行 */
        // if (this.TempItem != null) {
        //     StateManager.m_TargetObj = this.TempItem;
        //     /**目标点 赋值 */
        //     StateManager.m_TargetObjWordPos = this.TempItem.transform.position.clone();
        //     /**当距离大于2时进行移动 */
        //     let Dic = StateManager.m_CurStateBase.GetTargetDisByWordPos();
        //     if (Dic > 1) {
        //         /**寻找路径 */
        //         StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
        //         if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
        //             this.MinTime = 0;
        //             StateManager.m_AIState = AIState.GoToPoint;
        //             StateManager.ChangeState(EntityState.Run);
        //         } else {
        //             StateManager.m_TargetObjWordPos = null;
        //             StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
        //         }
        //     } else {
        //         StateManager.m_TargetObjWordPos = null;
        //         StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
        //     }
        // } else
        // {
        /**获取目标是否不存在 */
        if (StateManager.GetTarGetIsExistence()) {
            /**获取敌人目标 */
            StateManager.m_TargetObj = BattleRoomCon.Instance.GetTargetByMap(this.m_SelfObj, true);
        } else {
            if (StateManager.TargetScript != null) {
                /**当目标 拥有人物基类时 */
                /**获取目标距离 */
                let Dic = StateManager.m_CurStateBase.GetTargetDis();
                if (Dic < StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Range) {
                    //console.log(Dic);
                    if (StateManager.m_Attackinterval <= 1) {
                        StateManager.ChangeState(EntityState.Attack);
                    }

                } else {
                    StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObj.transform.position);
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                        this.MinTime = 0;
                        StateManager.ChangeState(EntityState.Run);
                        return;
                    } else {
                        StateManager.m_TargetObj = null;
                        StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
                        return
                    }
                }
            }
        }
        //}
    }
    MinTime: number = 0;
    MaxTime: number = 2;
    RunLogic() {

        /**获取管理器 */
        let StateManager: CombatantManageBase = this.m_PlayerBeeCon.m_AnimatorManager;
        if ((StateManager.m_CurStateBase.m_EntityState != EntityState.Run)) { return; }
        StateManager.m_MagicCubeSource.m_FinderAgent.maxSpeed = StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Speed / 2;

        // if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
        //     if (StateManager.m_MagicCubeSource.m_FinderAgent.enabled == false) {
        //         StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
        //         StateManager.m_TargetObjWordPos = null;
        //         StateManager.m_TargetObj = null;
        //         StateManager.LostTargetTime = 0;
        //         StateManager.ChangeState(EntityState.Idle);
        //     }
        // }

        if (StateManager.m_MagicCubeSource.m_WorkType == WorkType.HuntingType) {

            /**获取当前生命值 */
            let CurHp = StateManager.m_MagicCubeSource.m_AttributeBase.m_Hitpoints;
            let MaxHp = StateManager.m_MagicCubeSource.m_AttributeBase.m_MaxHitpoints * 0.35;

            if (CurHp <= MaxHp) {
                this.TempItem = BattleRoomCon.Instance.GetItemTargetByMap(StateManager.m_MagicCubeSource, StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Range, true);//StateManager.m_MagicCubeSource.GetItemTargetByMap(true);//
                /**以上其中一个生效 那么执行 */
                if (this.TempItem != null) {
                    //StateManager.m_TargetObj = this.TempItem;
                    /**目标点 赋值 */
                    StateManager.m_TargetObjWordPos = this.TempItem.transform.position.clone();
                    /**当距离大于2时进行移动 */
                    //let Dic = StateManager.m_CurStateBase.GetTargetDisByWordPos();
                    /**寻找路径 */
                    StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                        //this.MinTime = 0;
                        StateManager.m_AIState = AIState.GoToPoint;
                        //StateManager.ChangeState(EntityState.Run);
                    } else {
                        StateManager.SetStopMove();
                    }
                }
                // else {
                //     if (StateManager.m_TargetObj != null && !StateManager.m_TargetObj.destroyed) {
                //         let Dir = new Laya.Vector3();
                //         Laya.Vector3.subtract(StateManager.m_SelfObj.transform.position, StateManager.m_TargetObj.transform.position, Dir);
                //         Laya.Vector3.normalize(Dir, Dir);
                //         Laya.Vector3.scale(Dir, 5, Dir);
                //         Laya.Vector3.add(StateManager.m_SelfObj.transform.position, Dir, Dir);
                //         StateManager.m_TargetObjWordPos = Dir;
                //         StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                //         if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                //             //this.MinTime = 0;
                //             StateManager.m_AIState = AIState.GoToPoint;
                //             //StateManager.ChangeState(EntityState.Run);
                //         } else {
                //             StateManager.m_TargetObjWordPos = null;
                //             this.IsQuDie = false;
                //             StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
                //         }
                //         // StateManager.m_AIState == AIState.GoToPoint;
                //     } else {
                //         StateManager.m_TargetObjWordPos = null;
                //         this.IsQuDie = false;
                //         StateManager.m_MagicCubeSource.m_FinderAgent.SetStopMove();
                //     }
                // }
            } else {
                // if (this.IsQuDie) {
                //     this.IsQuDie = false;
                //     StateManager.SetStopMove();
                // }
            }
        }

        switch (StateManager.m_AIState) {
            case AIState.Avoid:
                if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj) {
                        StateManager.m_TargetObjWordPos = null;
                        StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj = false;
                        StateManager.SetStopMove();
                        return;
                    }
                    // else
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.enabled == false) {
                        StateManager.SetStopMove();
                    } else {
                        if (StateManager.m_TargetObj == null || StateManager.m_TargetObj.destroyed) {
                            StateManager.SetStopMove();
                            return;
                        }
                        let Dic = StateManager.m_CurStateBase.GetTargetDis();
                        if (Dic < 5) {
                            let TargetObj = BattleRoomCon.Instance.GetEnemyTargetByMap(this.m_SelfObj, false, 9999, StateManager.m_TargetObj);
                            if (TargetObj != null) {
                                StateManager.m_TargetObjWordPos = TargetObj.transform.position.clone();
                                StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                                if (StateManager.m_MagicCubeSource.m_FinderAgent.path != null && StateManager.m_MagicCubeSource.m_FinderAgent.path.length != 0) {
                                    //this.IsQuDie = true;
                                    // StateManager.m_AIState = AIState.Avoid;
                                    //StateManager.ChangeState(EntityState.Run);
                                    // return;
                                } else {
                                    console.log("躲避其他人寻找敌人的路径失败");
                                    StateManager.SetStopMove();
                                    return;
                                }
                            }
                        }
                        /**增加寻路调整时间 */
                        this.MinTime += (LayaUtils.deltaTime / 1000);
                        if (this.MinTime > this.MaxTime) {
                            this.MinTime = 0;
                            /**移动目标点不为空时 */
                            if (StateManager.m_TargetObjWordPos != null) {
                                /**寻找路径 */
                                StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                                /**路径是否寻找到 */
                                if (StateManager.m_MagicCubeSource.m_FinderAgent.path == null || StateManager.m_MagicCubeSource.m_FinderAgent.path.length < 0) {
                                    /**寻路失败 */
                                    StateManager.SetStopMove();
                                }
                            } else {
                                StateManager.SetStopMove();
                            }
                        }
                    }
                }
                break;
            case AIState.GoToPoint:
                if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
                    // if (StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj) {
                    //     StateManager.m_TargetObjWordPos = null;
                    //     //StateManager.m_MagicCubeSource.m_FinderAgent.CheckObj = false;
                    //     StateManager.SetStopMove();
                    //     return;
                    // }
                    // else
                    if (StateManager.m_MagicCubeSource.m_FinderAgent.enabled == false) {
                        StateManager.SetStopMove();
                    } else {
                        if (StateManager.m_TargetObj == null || StateManager.m_TargetObj.destroyed) {
                            StateManager.SetStopMove();
                            return;
                        }
                        /**增加寻路调整时间 */
                        this.MinTime += (LayaUtils.deltaTime / 1000);
                        if (this.MinTime > this.MaxTime) {
                            this.MinTime = 0;
                            /**移动目标点不为空时 */
                            if (StateManager.m_TargetObjWordPos != null) {
                                /**寻找路径 */
                                StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObjWordPos);
                                /**路径是否寻找到 */
                                if (StateManager.m_MagicCubeSource.m_FinderAgent.path == null || StateManager.m_MagicCubeSource.m_FinderAgent.path.length <= 0) {
                                    /**寻路失败 */
                                    StateManager.SetStopMove();
                                }
                            } else {
                                StateManager.SetStopMove();
                            }
                        }
                    }
                }
                break;
            case AIState.default:
                /**目标不存在 切换到Idle状态 */
                if (StateManager.GetTarGetIsExistence()) {
                    StateManager.SetStopMove();
                } else {
                    /**目标存在 */
                    if (StateManager.m_CurStateBase.GetTargetDis() < StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Range - 1) {
                        /**拥有目标脚本 */
                        /**距离满足时切换Idle */
                        StateManager.SetStopMove();
                    } else {
                        /**追击目标 */
                        StateManager.LostTargetTime += (LayaUtils.deltaTime / 1000);
                        /**追击时长超过8秒 切换到Idle状态 */
                        if (StateManager.LostTargetTime >= 8) {
                            StateManager.SetStopMove();
                        }

                        if (StateManager.m_CurStateBase.GetTargetDis() < StateManager.m_MagicCubeSource.m_TempAttributeBase.m_Range - 2) {
                            if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
                                if (!StateManager.GetTarGetIsExistence()) {
                                    StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObj.transform.position);
                                    if (StateManager.m_MagicCubeSource.m_FinderAgent.path == null || StateManager.m_MagicCubeSource.m_FinderAgent.path.length < 0) {
                                        /**寻路失败 */
                                        StateManager.SetStopMove();
                                    }
                                } else {
                                    StateManager.SetStopMove();
                                }
                            }
                        } else {
                            if (StateManager.m_MagicCubeSource.m_FinderAgent.enabled == false) {
                                StateManager.SetStopMove();
                                return;
                            }
                            this.MinTime += (LayaUtils.deltaTime / 1000);
                            if (this.MinTime > this.MaxTime) {
                                this.MinTime = 0;
                                if (StateManager.m_MagicCubeSource.m_FinderAgent != null) {
                                    if (!StateManager.GetTarGetIsExistence()) {
                                        StateManager.m_MagicCubeSource.m_FinderAgent.FindPath(StateManager.m_TargetObj.transform.position);
                                        if (StateManager.m_MagicCubeSource.m_FinderAgent.path == null || StateManager.m_MagicCubeSource.m_FinderAgent.path.length < 0) {
                                            /**寻路失败 */
                                            StateManager.SetStopMove();
                                        }
                                    } else {
                                        StateManager.SetStopMove();
                                    }
                                }
                            }
                        }
                    }
                }
                break;

        }
    }
}