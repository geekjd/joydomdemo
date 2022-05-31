import AudioManager from "src/Game/Manager/AudioManager";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { PGameFitingPlanProxy } from "src/Game/UICon/GameMianCom/PGameFitingPlanProxy";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import CombatantManageBase from "src/Ldz_GameCore/FSM_Animation/FSM_Base/CombatantManageBase";
import BuffManager from "src/Ldz_GameCore/GameBuffManager/BuffBase/Manager/BuffManager";
import DynamicBloodBar from "src/Ldz_GameCore/GeneralScripts/DynamicBloodBar";
import { AIState, CampType, Enitiy, EntityState, PetWorkType, TaskType, WorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import TriggerCollider from "src/Ldz_GameCore/GeneralScripts/TriggerCollider";
import NavMeshAgent from "src/Ldz_GameCore/NavMesh/NavMeshAgent";
import { FinderAgent } from "src/PathFind/FInderAgent";
import Vector2D from "src/PathFind/RVO/Vector2D";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import MathUtils from "src/_T/Utils/MathUtils";
import DamageData from "./DamageData";
import EnemySquareFormation from "./EnemySquareFormation";
import MagicCubeSourceAttributeBase from "./MagicCubeSourceAttributeBase";


/**魔力方块的源泉 
 * 拥有此组件的单位
 * 将被赋予征战世界的能力
*/
export default class MagicCubeSource extends Laya.Script3D {

    protected MagicName: string = "";
    //#region  基础属性 以及 组件
    /**战斗单位 */
    m_SceneSprite3d: Laya.Sprite3D;
    /**战斗属性 */
    m_AttributeBase: MagicCubeSourceAttributeBase = new MagicCubeSourceAttributeBase();
    /**临时战斗属性 */
    m_TempAttributeBase: MagicCubeSourceAttributeBase = new MagicCubeSourceAttributeBase();
    /**战斗单位的状态机 */
    m_AnimatorManager: CombatantManageBase;             //状态机
    /**寻路组件 */
    //m_FinderAgent: FinderAgent;
    m_FinderAgent: NavMeshAgent;
    /**Buff管理器 */
    m_BuffManager: BuffManager;
    /**血条组件 */
    m_HP_UI: DynamicBloodBar;
    /**移动路径 */
    m_AIPathArray: Laya.Vector3[] = [];
    /**自身脚本的引用 */
    m_MagicsBase: MagicCubeSource;
    //#endregion

    //#region  战斗以及场景相关属性
    /**跟随的目标 */
    m_TargetDamageData: DamageData;
    /**宠物状态 */
    m_PetWorkType: PetWorkType = PetWorkType.Default;
    /**是否为玩家 */
    IsPlayerCon: boolean = false;
    /**是否开始战斗 */
    m_IsBattle: boolean = false;
    /**是否战斗中 */
    IsFighting: boolean = false;
    /**是否死亡 */
    IsDie = false;
    /**是否为PK场景 */
    IsPKScene: boolean = false;
    /**看向时的头顶 */
    UpPos: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    /**阵营类型 */
    m_CampType: CampType;
    /**工作类型 */
    m_WorkType: WorkType = WorkType.Default;
    /**触发器 */
    m_TriggerCollider: TriggerCollider;
    /**单位类型 */
    m_Enitiy: Enitiy;
    /**被选中的光圈 */
    BeAttackEffect: Laya.Sprite3D;
    /**攻击生成点 */
    AttackPos: Laya.Sprite3D;
    /**头部特效点 */
    TopEffectsPos: Laya.Sprite3D;
    /**脚部特效点 */
    FootEffectsPos: Laya.Sprite3D;
    /**中部特效点 */
    MiddleEffectsPos: Laya.Sprite3D;
    /**等级升级回调 */
    LevelUpgradeCallback: Laya.Handler;
    /**数据传递 */
    m_DamageData: DamageData;
    /**是否可以攻击玩家 */
    IsAttackRole: boolean = true;
    /**击杀积分 */
    AttackIntegral: number = 0;
    /**当前金币数 */
    CurGoold: number = 0;
    /**金币获取量系数 */
    GooldIn: number = 0;
    /**升级消耗 */
    LevelUpGoold: number = 0;
    /**回复消耗 */
    RecoveryGoold: number = 0;
    /**金币获取量消耗 */
    GooldInGoold: number = 0;
    /**敌人列表 */
    m_EnemyList_Con: EnemySquareFormation[];
    /**玩家列表 */
    M_RoleList_Con: MagicCubeSource[];

    LowFps: boolean = false;
    UpdateMag: boolean = true;
    IsTargetOBj: boolean = false;

    huhuoCount: number = 3;

    //#endregion
    public constructor() {
        super();
    }
    GameOver() {
        this.UpdateMag = false;
    }

    DeleteMag() {
        delete this.m_BuffManager;
        delete this.m_DamageData;
        delete this.m_AttributeBase;
        delete this.m_TempAttributeBase;
        delete this.m_AnimatorManager;
        this.m_EnemyList_Con = [];
        this.M_RoleList_Con = [];
        if (this.m_FinderAgent != null) {
            delete this.m_FinderAgent;
            this.m_FinderAgent = null;
        }
        MesManager.off(ESceneEvent.GameOver, this, this.GameOver);
        MesManager.off(ESceneEvent.MoveToPos, this, this.FindMove);
    }
    FindMove(TargetPos: Laya.Vector3) {
        if (this.m_FinderAgent != null) {
            this.m_FinderAgent.FindPath(TargetPos);
        }
    }
    onAwake() {
        MesManager.on(ESceneEvent.GameOver, this, this.GameOver);
        MesManager.on(ESceneEvent.MoveToPos, this, this.FindMove);
        this.m_SceneSprite3d = this.owner as Laya.Sprite3D;
        this.m_MagicsBase = this.m_SceneSprite3d.getComponent(MagicCubeSource);
        this.m_BuffManager = new BuffManager();
        this.m_BuffManager.InitBuffManager(this.m_SceneSprite3d, this.m_MagicsBase);
        this.m_BuffManager.SetBuffList(this.m_AttributeBase.BuffMiscid);
        this.m_DamageData = new DamageData(this, this.m_AttributeBase);
        let TempCoSp = this.m_SceneSprite3d.getChildByName("TirggerCollider");

        if (TempCoSp != null) {
            if (this.IsPlayerCon) {
                this.m_TriggerCollider = TempCoSp.addComponent(TriggerCollider);
                let TempMesh = TempCoSp as Laya.MeshSprite3D;
                TempMesh.meshRenderer.enable = this.IsPlayerCon;
            } else {
                TempCoSp.destroy();
            }
        }
        if (this.m_Enitiy == Enitiy.Filed_Type) {
            let Char = this.m_SceneSprite3d.addComponent(Laya.CharacterController);
            //创建胶囊碰撞器
            var sphereShape: Laya.CapsuleColliderShape = new Laya.CapsuleColliderShape(0.5, 3.4);
            //设置Shape的本地偏移
            sphereShape.localOffset = new Laya.Vector3(0, 1.0, 0);
            //设置角色控制器的碰撞形状
            Char.colliderShape = sphereShape;
        }


        this.AttackPos = this.m_SceneSprite3d.getChildByName("AttackPos") as Laya.Sprite3D;
        this.TopEffectsPos = this.m_SceneSprite3d.getChildByName("TopEffects") as Laya.Sprite3D;
        this.FootEffectsPos = this.m_SceneSprite3d.getChildByName("FootEffects") as Laya.Sprite3D;
        this.MiddleEffectsPos = this.m_SceneSprite3d.getChildByName("MiddleEffects") as Laya.Sprite3D;

        let RigBody: Laya.Rigidbody3D = this.m_SceneSprite3d.getComponent(Laya.Rigidbody3D);
        if (RigBody != null) {
            RigBody.isKinematic = true;
        }
        let Url = "";
        if (this.FootEffectsPos != null) {
            this.FootEffectsPos.destroyChildren();
            switch (this.m_CampType) {
                case CampType.Blue_Camp:
                    Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.circle_biue);
                    break;
                case CampType.Red_Camp:
                    Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.circle_red);
                    break;
                case CampType.Yellow_Camp:
                    Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.circle_red);
                    break;
            }
            if (this.IsPlayerCon) {
                Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.circle);
            }
            ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
                let TempEff = ResLoad.GetRes(Url) as Laya.Sprite3D;
                TempEff.transform.localPosition = new Laya.Vector3(0, 0, 0);
                this.FootEffectsPos.addChild(TempEff);
            }));

            let Url2 = EssentialResUrls.PrefabURL(_AllPrefabsNames.circle_red_1);
            ResLoad.Load3D(Url2, Laya.Handler.create(this, () => {
                let TempEff = ResLoad.GetRes(Url2) as Laya.Sprite3D;
                TempEff.transform.localPosition = new Laya.Vector3(0, 0, 0);
                this.BeAttackEffect = TempEff;
                this.FootEffectsPos.addChild(TempEff);
                this.BeAttackEffect.active = false;
            }));
        }
        if (this.m_Enitiy == Enitiy.Filed_Type) {
            this.SetRangTirgRange(7);
        } else if (this.m_Enitiy == Enitiy.Boos_Type) {
            this.SetRangTirgRange(5);
        }
        else {
            this.SetRangTirgRange();
        }


    }
    onStart() {
        if (!PGameFitingPlanProxy.instance.ifShow) { return; }
        if (!this.LowFps) {
            this.m_HP_UI.SetUIParnt(PGameFitingPlanProxy.instance.ui.m_HP_Prant);
            this.m_HP_UI.SetUIValue(this.m_AttributeBase.m_Hitpoints, this.m_AttributeBase.m_MaxHitpoints, this.m_AttributeBase.m_MagicLv);
        }
        if (this.m_WorkType == WorkType.Existence && this.m_Enitiy == Enitiy.Filed_Type) {
            if (this.m_AttributeBase.m_Range > 3) {
                this.m_AttributeBase.m_Range = this.m_AttributeBase.m_Range * 2;
                this.m_AnimatorManager.FixedUpde = true;
                console.log("怪物攻击范围", this.m_AttributeBase.m_Range);
            }
        }
    }

    SetLowFpsFalse() {
        this.LowFps = true;
        if (this.m_FinderAgent != null) {
            this.m_FinderAgent.LowFps = true;
        }
        this.m_HP_UI.SetIsShow(false);
    }

    Init(Lv: number = 1) {
        this.m_AttributeBase.LodeAttribute(this.MagicName, Lv, this.m_Enitiy);
        this.m_TempAttributeBase = this.m_AttributeBase.Clone();
        this.IsDie = false;
        this.m_HP_UI = new DynamicBloodBar(this.m_Enitiy, this.m_CampType, this.m_WorkType, this.m_AttributeBase.m_MagicChess);
        if (this.LowFps) {
            this.m_HP_UI.SetIsShow(false);
        }
        if (this.BeAttackEffect != null) {
            this.BeAttackEffect.active = false;
        }
        if (this.m_TriggerCollider != null) {
            if (this.m_WorkType == WorkType.Sports) {
                this.m_TriggerCollider.IsPK = true;
            } else {
                this.m_TriggerCollider.IsPK = false;
            }
        }
        if ((this.m_Enitiy == Enitiy.Role_Type || this.m_Enitiy == Enitiy.Boos_Type) && this.m_WorkType != WorkType.Cooperation) {
            this.IsTargetOBj = false;
        } else {
            this.IsTargetOBj = true;
        }
    }
    /**移动到某个点 */
    MoveToPos(TargetPos: Laya.Vector3) {
        TargetPos.y = this.m_SceneSprite3d.transform.position.y;
        this.m_SceneSprite3d.transform.lookAt(TargetPos, new Laya.Vector3(0, 1, 0));
        let Fo = new Laya.Vector3();
        this.m_SceneSprite3d.transform.getForward(Fo);
        Laya.Vector3.normalize(Fo, Fo);
        let Pos = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.scale(Fo, ((Laya.timer.delta / 1000) * this.m_TempAttributeBase.m_Speed), Pos);
        Laya.Vector3.add(this.m_SceneSprite3d.transform.position, Pos, Pos);
        this.m_SceneSprite3d.transform.position = Pos;
        this.m_SceneSprite3d.transform.localRotationEulerY += 180;
    }
    /**旋转到目标坐标 */
    RoteteToTarget(TargetPos: Laya.Vector3) {
        let _renderDir: Laya.Vector3 = TargetPos;
        _renderDir.x *= -1;
        let RenderDir: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
        Laya.Quaternion.rotationLookAt(_renderDir, new Laya.Vector3(0, 1, 0), RenderDir);
        let Ro = new Laya.Quaternion();
        Laya.Quaternion.lerp(this.m_SceneSprite3d.transform.rotation, RenderDir, 0.2, Ro);
    }
    /**攻击目标 */
    AttackTarget(_TargetObj: Laya.Sprite3D): boolean {
        this.m_DamageData.Refresh(this.m_TempAttributeBase);
        this.m_BuffManager.BuffOnHit(this.m_DamageData);
        let Tar: MagicCubeSource = _TargetObj.getComponent(MagicCubeSource);
        if (Tar != null && !Tar.destroyed) {
            if (Tar.BeAttacked(this.m_DamageData.Clone())) {
                return true;
            }
        }
        return false;
    }
    AddExp(ExpNumber: number) {
        if (this.IsDie) { return };
        ExpNumber = Math.floor(ExpNumber);
        this.m_AttributeBase.CurExp += ExpNumber;
        if (!this.LowFps) {
            MesManager.event(EUIEvent.ShowExptxt, [ExpNumber, this.m_SceneSprite3d.transform.position]);
        }
        if (this.m_AttributeBase.CurExp >= this.m_AttributeBase.MaxExp) {
            if (this.m_AttributeBase.AddMagicLevel()) {
                /**播放特效 */
                if (this.LevelUpgradeCallback) {
                    AudioProxy.instance.playSound(ESounds.levelUp, 1, null, null, 0, this.m_SceneSprite3d.transform.position.clone());
                    MesManager.event(ESceneEvent.LodeEffects, [_AllPrefabsNames.sj_sphere_yellow, "GeneralBase", this.FootEffectsPos.transform.position.clone(), null]);
                    this.LevelUpgradeCallback.runWith([this.m_AttributeBase.m_MagicLv]);
                }
            }
            if (this.IsPlayerCon) {
                MesManager.event(ESceneEvent.UpdateExpInfoMax, [this.m_AttributeBase.m_MagicLv, this.m_AttributeBase.CurExp, this.m_AttributeBase.MaxExp]);
            }
        } else {
            if (this.IsPlayerCon) {
                //&& this.m_WorkType != WorkType.Existence
                MesManager.event(ESceneEvent.UpdateExpInfo, [this.m_AttributeBase.m_MagicLv, this.m_AttributeBase.CurExp, this.m_AttributeBase.MaxExp]);
            }
        }
        if (!this.LowFps) {
            this.m_HP_UI.SetUIValue(this.m_AttributeBase.m_Hitpoints, this.m_AttributeBase.m_MaxHitpoints, this.m_AttributeBase.m_MagicLv);
        }
    }

    /**增加生命值 */
    AddHitPoints(Hitpoint: number) {
        Hitpoint = Math.floor(Hitpoint)
        this.m_AttributeBase.m_Hitpoints += Hitpoint;
        if (this.m_AttributeBase.m_Hitpoints > this.m_AttributeBase.m_MaxHitpoints) {
            this.m_AttributeBase.m_Hitpoints = this.m_AttributeBase.m_MaxHitpoints;
        }
        if (!this.LowFps) {
            MesManager.event(EUIEvent.ShowExptxt, [Hitpoint, this.m_SceneSprite3d.transform.position, "Blue"]);
        }
        MesManager.event(ESceneEvent.LodeEffects, [_AllPrefabsNames.jiaxueEff, "GeneralBase", this.MiddleEffectsPos.transform.position.clone(), null, this.MiddleEffectsPos]);
        this.SetHpUIValue();
    }
    /**设置触发器大小 */
    SetRangTirgRange(TempNumber: number = -1) {
        if (!this.m_TriggerCollider) return;
        this.m_TriggerCollider.SetSphereColliderShape(TempNumber > 0 ? TempNumber : this.m_AttributeBase.m_Range);
    }

    SetHpUIValue() {
        if (!this.LowFps) {
            this.m_HP_UI.SetUIValue(this.m_AttributeBase.m_Hitpoints, this.m_AttributeBase.m_MaxHitpoints, this.m_AttributeBase.m_MagicLv);
        }
    }
    AddBUff(BUffName: string, TempDamageData: DamageData) {
        this.m_BuffManager.AddBuffState(BUffName, TempDamageData);
        this.SetHpUIValue();
        this.SetRangTirgRange();
        if (this.IsPlayerCon) {
            console.log(this.m_AttributeBase.m_Range);
            MesManager.event(ESceneEvent.SetCameraHuandong);
        }
    }

    BeattackCount = 2;
    /**被攻击 */
    BeAttacked(TempDamageData: DamageData): boolean {
        if (this.IsDie) return true;
        /**获取攻击者目标 */
        if (this.IsTargetOBj) {
            this.m_AnimatorManager.LostTargetTime = 0;
            if (this.m_AnimatorManager.m_TargetObj == null || this.m_AnimatorManager.m_TargetObj.parent == null) {
                this.m_AnimatorManager.m_TargetObj = TempDamageData.m_SelfSc.m_SceneSprite3d;
            }
        }

        TempDamageData.BasicDamage *= TempDamageData.DamageCoefficient;
        this.m_BuffManager.BuffBeHurt(TempDamageData);
        if (TempDamageData != null) {
            for (let i = 0; i < TempDamageData.TargetBuff.length; i++) {
                this.m_BuffManager.AddBuffState(TempDamageData.TargetBuff[i], TempDamageData);
            }
        }
        if (this.IsPlayerCon) {
            PGameFitingPlanProxy.instance.playRedScreen();
        }
        AudioProxy.instance.playSound(ESounds.bullet_hit_body, 1, null, null, 0, this.m_SceneSprite3d.transform.position.clone());
        if (this.m_Enitiy == Enitiy.Role_Type && TempDamageData.m_SelfSc.m_Enitiy == Enitiy.Role_Type) {
            if (this.IsPlayerCon || TempDamageData.m_SelfSc.IsPlayerCon) {
                TempDamageData.BasicDamage = TempDamageData.BasicDamage * 0.7;
            } else {
                TempDamageData.BasicDamage = TempDamageData.BasicDamage * 0.5;
            }
        }
        TempDamageData.BasicDamage = Math.floor(TempDamageData.BasicDamage);
        if (!this.LowFps) {
            if (TempDamageData.m_SelfSc.IsPlayerCon) {
                MesManager.event(EUIEvent.ShowDamagetxt, [TempDamageData.BasicDamage, this.m_SceneSprite3d.transform.position, "#FFFFFF"]);
            } else {
                MesManager.event(EUIEvent.ShowDamagetxt, [TempDamageData.BasicDamage, this.m_SceneSprite3d.transform.position, "#FF0000"]);
            }
        }
        this.m_AttributeBase.m_Hitpoints -= TempDamageData.BasicDamage;//this.m_Enitiy == Enitiy.Role_Type ? 0 : 
        if (this.m_AttributeBase.m_Hitpoints <= 0) {
            this.m_DamageData.Refresh(this.m_TempAttributeBase);
            TempDamageData.m_SelfSc.m_BuffManager.BuffAfterKilled(this.m_DamageData);
            this.m_BuffManager.BuffBeforeKilled(TempDamageData);
            if (TempDamageData.m_SelfSc.m_Enitiy == Enitiy.Role_Type && this.m_WorkType != WorkType.Cooperation && this.m_WorkType != WorkType.Existence) {
                TempDamageData.m_SelfSc.AttackIntegral += Math.floor(this.m_DamageData.Exp < 1 ? 1 : this.m_DamageData.Exp);
                if (this.m_WorkType != WorkType.Sports) {
                    TempDamageData.m_SelfSc.AddExp(Number(this.m_DamageData.Exp));
                }
            }
            /**玩家击杀怪物 */
            if (this.m_Enitiy == Enitiy.Filed_Type && TempDamageData.m_SelfSc.IsPlayerCon) {
                let str = (TaskType.Skill + this.m_AttributeBase.m_MagicMiscId);
                MesManager.event(str);
            }
            this.LodeItem();
            this.SkillSelef();
            return true;
        } else {
            if (this.m_Enitiy == Enitiy.Filed_Type) {
                this.RepelEffects(TempDamageData);
            }
            if (!this.IsPlayerCon && this.m_Enitiy == Enitiy.Role_Type) {
                this.BeattackCount--;
                if (this.BeattackCount == 0) {
                    if (this.m_AnimatorManager.m_TargetObjWordPos == null) {
                        let Dir = new Laya.Vector3();
                        // Laya.Vector3.subtract(TempDamageData.m_SelfSc.AttackPos.transform.position, this.FootEffectsPos.transform.position, Dir);
                        let RandIndex = MathUtils.randomRangeInt(0, 2);
                        if (RandIndex == 0) {
                            this.m_SceneSprite3d.transform.getRight(Dir);
                        } else {
                            this.m_SceneSprite3d.transform.getRight(Dir);
                            Laya.Vector3.scale(Dir, -1, Dir);
                        }
                        Laya.Vector3.normalize(Dir, Dir);
                        Laya.Vector3.scale(Dir, 5, Dir);
                        Laya.Vector3.add(this.FootEffectsPos.transform.position, Dir, Dir);
                        this.m_AnimatorManager.m_TargetObjWordPos = Dir;
                        this.m_AnimatorManager.m_AIState == AIState.GoToPoint;
                        if (this.m_FinderAgent != null) {
                            // if (this.m_AnimatorManager.m_TargetObjWordPos != null) {
                            this.m_AnimatorManager.m_MagicCubeSource.m_FinderAgent.FindPath(this.m_AnimatorManager.m_TargetObjWordPos);
                            if (this.m_AnimatorManager.m_MagicCubeSource.m_FinderAgent.path != null && this.m_AnimatorManager.m_MagicCubeSource.m_FinderAgent.path.length > 0) {
                                this.m_AnimatorManager.ChangeState(EntityState.Run);
                            } else {
                                this.m_AnimatorManager.m_TargetObjWordPos = null;
                            }
                        }
                    }
                }
            }
            MesManager.event(ESceneEvent.LodeEffects, [_AllPrefabsNames.BeAttack, "GeneralBase", this.MiddleEffectsPos.transform.position.clone(), null, this.MiddleEffectsPos]);
            this.SetHpUIValue();
        }
        return false;
    }


    count: number = 0;
    Maxcount: number = 5;
    RepelMove(TargetPos: Laya.Vector3, SubPos: Laya.Vector3) {
        if (this.IsDie) {
            Laya.timer.clear(this, this.RepelMove);
            return
        };
        if (this.m_SceneSprite3d.parent == null) {
            Laya.timer.clear(this, this.RepelMove);
            return
        };
        if (this.count >= this.Maxcount) {
            Laya.timer.clear(this, this.RepelMove);
            this.m_SceneSprite3d.transform.position = this.m_SceneSprite3d.transform.position;
            if (this.m_FinderAgent != null) {
                // this.m_FinderAgent.agent.position = new Vector2D(this.m_SceneSprite3d.transform.localPositionX, this.m_SceneSprite3d.transform.localPositionZ);
                // this.m_FinderAgent.lastPos = new Vector2D(this.m_SceneSprite3d.transform.localPositionX, this.m_SceneSprite3d.transform.localPositionZ);
                // this.m_FinderAgent.IsUpdate = true;
            }
        }

        this.m_SceneSprite3d.transform.translate(SubPos, false);
        let TempPOs = new Laya.Vector3();
        this.m_SceneSprite3d.transform.position.cloneTo(TempPOs);
        TempPOs.y = 0;
        let Dt = Laya.Vector3.distance(TempPOs, TargetPos);
        if (Dt < 2) {
            Laya.timer.clear(this, this.RepelMove);
            this.m_SceneSprite3d.transform.position = this.m_SceneSprite3d.transform.position;
            if (this.m_FinderAgent != null) {
                // this.m_FinderAgent.agent.position = new Vector2D(this.m_SceneSprite3d.transform.localPositionX, this.m_SceneSprite3d.transform.localPositionZ);
                // this.m_FinderAgent.lastPos = new Vector2D(this.m_SceneSprite3d.transform.localPositionX, this.m_SceneSprite3d.transform.localPositionZ);
                // this.m_FinderAgent.IsUpdate = true;
            }
        }
        this.count++;

    }

    /**击退 */
    RepelEffects(TempDamageData: DamageData) {
        let Fo = new Laya.Vector3();
        //this.m_SceneSprite3d.transform.getForward(Fo);
        Laya.Vector3.subtract(this.m_SceneSprite3d.transform.position, TempDamageData.m_SelfSc.m_SceneSprite3d.transform.position, Fo);
        Laya.Vector3.normalize(Fo, Fo);
        let TargetPos = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.scale(Fo, ((0.01) * TempDamageData.RepelValue), TargetPos);
        // Laya.Vector3.add(this.m_SceneSprite3d.transform.position, TargetPos, TargetPos);
        if (this.m_FinderAgent != null) {
            // if (!this.m_FinderAgent.IsUpdate) return;
            // this.m_FinderAgent.IsUpdate = false;
        }
        //this.m_SceneSprite3d.transform.position = Pos;
        let trans = this.m_SceneSprite3d.transform;//(this.owner as Laya.Sprite3D).transform;
        let Tranpos = this.m_SceneSprite3d.transform.position;
        TargetPos.y = 0;
        let SubPos = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.scale(TargetPos, 0.2, SubPos);
        this.count = 0;
        Laya.timer.frameLoop(1, this, this.RepelMove, [TargetPos, SubPos]);

        // let Node = this.m_FinderAgent.GetNodeByWordPos(TargetPos);
        // if (Node != null) {
        //     let tween = Laya.Tween.to(
        //         Tranpos,
        //         { x: TargetPos.x, z: TargetPos.z, update: new Laya.Handler(this, temp => trans.position = temp, [Tranpos]) },
        //         100,
        //         null,p
        //         new Laya.Handler(this, () => { })//回调函数 End
        //     )//Tween End
        // } else {
        //     this.m_FinderAgent.IsUpdate = true;
        //     console.log("移动坐标不符合位置");
        // }
    }


    /**杀死自己 */
    SkillSelef(IsPool: boolean = false) {
        if (this.owner != null && !this.owner.destroyed && this.owner.parent != null) {
            if (this.IsDie) { return; }
            this.IsDie = true;
            this.m_HP_UI.SkillUI();
            if (this.m_FinderAgent != null) {
                this.m_FinderAgent.SetStopMove();
            }
            this.m_PetWorkType = PetWorkType.Default;
            if (!IsPool) {
                if (this.m_Enitiy == Enitiy.Role_Type || this.m_Enitiy == Enitiy.Boos_Type) {

                    let TempCon: Laya.CharacterController = this.m_SceneSprite3d.getComponent(Laya.CharacterController);
                    if (TempCon != null) {
                        TempCon.enabled = false;
                    }
                    this.m_AnimatorManager.ChangeState(EntityState.Die);
                } else {
                    this.m_SceneSprite3d.removeSelf();
                    Laya.timer.frameOnce(5, this, () => {
                        this.DeleteMag();
                        this.m_SceneSprite3d.destroy(true);
                    });
                    //MyObjectPool.Instance.RemoveObjectToPool(this.m_AttributeBase.m_MagicName, this.m_SceneSprite3d);
                }
            } else {
                this.DeleteMag();
                if (this.m_SceneSprite3d != null && !this.m_SceneSprite3d.destroyed) {
                    this.m_SceneSprite3d.destroy();
                }
                // MyObjectPool.Instance.RemoveObjectToPool(this.m_AttributeBase.m_MagicName, this.m_SceneSprite3d);
            }
        }
    }

    /**更新执行 */
    onUpdate() {
        if (this.IsDie) return;
        if (!this.UpdateMag) return;
        if (!this.LowFps) {
            if (this.m_HP_UI.GetUIisParnt()) {
                if (PGameFitingPlanProxy.instance.ifShow && PGameFitingPlanProxy.instance.ui != null && PGameFitingPlanProxy.instance.ui.m_HP_Prant != null) {
                    this.m_HP_UI.SetUIParnt(PGameFitingPlanProxy.instance.ui.m_HP_Prant);
                    this.m_HP_UI.SetUIValue(this.m_AttributeBase.m_Hitpoints, this.m_AttributeBase.m_MaxHitpoints, this.m_AttributeBase.m_MagicLv);
                }
            }
        }
        this.m_TempAttributeBase = this.m_AttributeBase.Clone();
        this.m_BuffManager.BuffUpdate();
        this.UpdateAttributeBase();
        this.m_AnimatorManager.onUpdate();
        if (this.m_FinderAgent != null && !this.m_AnimatorManager.FixedUpde) {
            this.m_FinderAgent.Update();
        }
        if (!this.LowFps) {
            this.SetHP_UI_Pos();
        }
    }
    /**是否关闭UI显示的倒计时 */
    IsCloseUITimne: number = 0;
    /**设置UI的坐标以及显示 */
    SetHP_UI_Pos() {
        if (!this.LowFps && !this.IsDie && this.TopEffectsPos.transform != null) {
            this.m_HP_UI.SetUIPos(this.TopEffectsPos.transform.position);
        }
    }
    /**更新计算属性 */
    UpdateAttributeBase() {
        this.m_TempAttributeBase.m_Damage = this.m_TempAttributeBase.m_Damage;
        this.m_TempAttributeBase.m_HitSpeed = (1 / this.m_TempAttributeBase.m_HitSpeed);
        this.m_TempAttributeBase.m_Hitpoints = this.m_TempAttributeBase.m_Hitpoints;
        this.m_TempAttributeBase.m_Range = this.m_TempAttributeBase.m_Range;
        this.m_TempAttributeBase.m_MagicName = this.m_TempAttributeBase.m_MagicName;
        this.m_TempAttributeBase.m_Speed = this.m_TempAttributeBase.m_Speed;
        this.m_TempAttributeBase.m_MagicChess = this.m_TempAttributeBase.m_MagicChess;
    }

    /**获取目标 */
    GetTargetByMap(IsLoop: boolean, TagetObj: Laya.Sprite3D = null): Laya.Sprite3D {

        let TempObj: Laya.Sprite3D = null;
        let Dis = 999;
        if (this.IsPlayerCon) {
            if (this.m_TriggerCollider == null) return null;
            if (this.m_WorkType == WorkType.Cooperation && this.m_CampType == CampType.Red_Camp) {
                if (this.m_TargetDamageData != null && this.m_TargetDamageData.m_SelfSc.m_SceneSprite3d != null) {
                    TempObj = this.m_TargetDamageData.m_SelfSc.m_SceneSprite3d;
                }
            }
            if (this.m_TriggerCollider.m_TriggerEnter.size <= 0) return TempObj;
            // 迭代 Map 中的 value
            let TempArray: Laya.Sprite3D[] = [];
            for (let value of this.m_TriggerCollider.m_TriggerEnter.values()) {
                if ((value == null) || (value != null && value.destroyed)) {
                    TempArray.push(value);
                }
            }
            for (let i = 0; i < TempArray.length; i++) {
                this.m_TriggerCollider.m_TriggerEnter.delete(TempArray[i]);
            }
            for (let value of this.m_TriggerCollider.m_TriggerEnter.values()) {
                if (value == null || value.parent == null) { continue; }
                if (!IsLoop) return value;
                let Dis2 = Laya.Vector3.distance(value.transform.position, this.m_SceneSprite3d.transform.position);
                if (Dis2 < Dis) {
                    if (this.m_TargetDamageData != null) {
                        if (this.m_TargetDamageData.m_SelfSc.m_SceneSprite3d != value) {
                            Dis = Dis2;
                            TempObj = value;
                        }
                    } else {
                        if (value != this.m_SceneSprite3d) {
                            Dis = Dis2;
                            TempObj = value;
                        }
                    }
                }
            }
            if (TagetObj != null) {
                if (TagetObj == TempObj) {
                    return null;
                }
            }
            if (this.IsPlayerCon) {
                if (this.m_AnimatorManager.m_TargetObj != null && this.m_AnimatorManager.m_TargetObj != TempObj) {
                    let Sc = this.m_AnimatorManager.m_TargetObj.getComponent(MagicCubeSource) as MagicCubeSource;
                    if (Sc != null && Sc.BeAttackEffect != null) {
                        Sc.BeAttackEffect.active = false;
                    }

                }
                if (this.m_AnimatorManager.m_TargetObj != TempObj && TempObj != null) {
                    let Sc2 = TempObj.getComponent(MagicCubeSource) as MagicCubeSource;
                    if (Sc2 != null && Sc2.BeAttackEffect != null) {
                        Sc2.BeAttackEffect.active = true;
                    }
                }
            }
        } else {

            Dis = this.m_AttributeBase.m_Range;
            //BattleRoomCon.Instance.GetTargetByMap(this.m_SceneSprite3d, false);
            if ((this.m_WorkType == WorkType.Cooperation || this.m_WorkType == WorkType.Existence) && this.m_CampType == CampType.Red_Camp) {
                if (this.m_TargetDamageData != null && this.m_TargetDamageData.m_SelfSc.m_SceneSprite3d != null) {
                    TempObj = this.m_TargetDamageData.m_SelfSc.m_SceneSprite3d;
                }
            }
            for (let i = 0; i < this.M_RoleList_Con.length; i++) {
                let TempValue = this.M_RoleList_Con[i];
                if (TempValue == null) { continue; }
                let TempScript: MagicCubeSource = TempValue;
                if (TempScript.IsDie) continue;
                if (TempValue.m_SceneSprite3d == this.m_SceneSprite3d) { continue; }
                if (!IsLoop) return TempValue.m_SceneSprite3d;
                if ((TempScript != null && !TempScript.IsDie) &&
                    ((TempScript.m_CampType != this.m_CampType) || (TempScript.m_CampType == CampType.Yellow_Camp))
                ) {
                    let Dis2 = Laya.Vector3.distance(TempValue.m_SceneSprite3d.transform.position, this.m_SceneSprite3d.transform.position);
                    if (Dis2 < Dis) {
                        Dis = Dis2;
                        TempObj = TempValue.m_SceneSprite3d;
                    }
                }
            }

            for (let i = 0; i < this.m_EnemyList_Con.length; i++) {
                for (let J = 0; J < this.m_EnemyList_Con[i].Eq_EnemyList.length; J++) {
                    let TempValue = this.m_EnemyList_Con[i].Eq_EnemyList[J];
                    if (TempValue == null || TempValue.destroyed) { continue; }
                    let TempScript: MagicCubeSource = TempValue.getComponent(MagicCubeSource);
                    if (TempScript == null || TempScript.IsDie) continue;
                    if (!IsLoop) return TempValue;
                    if ((TempScript != null && !TempScript.IsDie) &&
                        ((TempScript.m_CampType != this.m_CampType) || (TempScript.m_CampType == CampType.Yellow_Camp))
                    ) {
                        let Dis2 = Laya.Vector3.distance(TempScript.m_SceneSprite3d.transform.position, this.m_SceneSprite3d.transform.position);
                        if (Dis2 < Dis) {
                            Dis = Dis2;
                            TempObj = TempScript.m_SceneSprite3d;
                        }
                    }
                }
            }

        }
        //console.log("获取到的目标", TempObj);
        return TempObj;
    }

    /**获取目标 */
    GetItemTargetByMap(IsLoop: boolean): Laya.Sprite3D {

        let TempObj: Laya.Sprite3D = null;
        let Dis = 9999;
        if (this.m_TriggerCollider == null) return null;
        if (this.m_TriggerCollider.m_TriggerItemEnter.size <= 0) return TempObj;
        // 迭代 Map 中的 value
        let TempArray: Laya.Sprite3D[] = [];
        for (let value of this.m_TriggerCollider.m_TriggerItemEnter.values()) {
            if (value == null || value.destroyed || value.parent == null) {
                TempArray.push(value);
            } else {
                let Dic = this.GetTargetDisByWordPos(value.transform.position, this.m_SceneSprite3d.transform.position);
                if (Dic > this.m_TempAttributeBase.m_Range) {
                    TempArray.push(value);
                }
            }
        }
        for (let i = 0; i < TempArray.length; i++) {
            this.m_TriggerCollider.m_TriggerItemEnter.delete(TempArray[i]);
        }
        for (let value of this.m_TriggerCollider.m_TriggerItemEnter.values()) {
            if (value == null || value.parent == null) { continue; }
            if (!IsLoop) return value;
            let Dis2 = Laya.Vector3.distance(value.transform.position, this.m_SceneSprite3d.transform.position);
            if (Dis2 < Dis) {
                Dis = Dis2;
                TempObj = value;
            }
        }

        return TempObj;
    }

    /**获取目标是否在攻击列表中 */
    GetObjIsMap(TempObj: Laya.Sprite3D): boolean {

        if (TempObj == null || TempObj.destroyed || TempObj.parent == null) return false;
        if (this.m_SceneSprite3d == null || this.m_SceneSprite3d.destroyed || this.m_SceneSprite3d.parent == null) return false;
        if (this.IsPlayerCon) {
            if (this.m_TriggerCollider == null) return false;
            if (this.m_TriggerCollider.m_TriggerEnter.size <= 0) {
                this.SetTargetObjEffect(TempObj, false);
                return false
            };
            if (this.m_TriggerCollider.m_TriggerEnter.has(TempObj)) {
                return true;
            } else {
                this.SetTargetObjEffect(TempObj, false);
                return false;
            }
        } else {
            let Dis2 = Laya.Vector3.distance(TempObj.transform.position, this.m_SceneSprite3d.transform.position);
            if (Dis2 < this.m_AttributeBase.m_Range) {
                return true;
            }
            return false;
        }


    }
    SetTargetObjEffect(TempObj: Laya.Sprite3D, IsShow: boolean) {
        let Sc2 = TempObj.getComponent(MagicCubeSource) as MagicCubeSource;
        if (Sc2 != null && Sc2.BeAttackEffect != null) {
            Sc2.BeAttackEffect.active = IsShow;
        }
    }
    public GetTargetDisByWordPos(LetftPos: Laya.Vector3, RightPos: Laya.Vector3): number {
        if (LetftPos != null && RightPos != null) {
            let TempLeftPos = new Laya.Vector3();
            let TempRightPos = new Laya.Vector3();
            LetftPos.cloneTo(TempLeftPos);
            RightPos.cloneTo(TempRightPos);
            TempLeftPos.y = 0;
            TempRightPos.y = 0;
            return Laya.Vector3.distance(TempLeftPos, TempRightPos);
        }
        return 0;
    }

    LodeItem() {
        let Random1 = MathUtils.randomRangeInt(0, 100);
        let Random2 = MathUtils.randomRangeInt(0, 100);
        let Pos: Laya.Vector3 = new Laya.Vector3();
        this.m_SceneSprite3d.transform.position.cloneTo(Pos);
        let Scale: Laya.Vector3 = new Laya.Vector3();
        this.m_SceneSprite3d.transform.localScale.cloneTo(Scale);
        let ItemName: string = "";
        AudioProxy.instance.playSound(ESounds.bite, 1, null, null, 0, this.m_SceneSprite3d.transform.position.clone());

        if (this.m_WorkType == WorkType.HuntingType) {
            if (Random1 > 50) {
                ItemName = _AllPrefabsNames.Star_Blue;
            }
            if (this.m_Enitiy == Enitiy.Filed_Type) {
                if (Random2 > 50) {
                    MesManager.event(ESceneEvent.LodeBattleEffects, [_AllPrefabsNames.jiaxie, "", Pos, Scale]);
                }
            }
        } else if (this.m_WorkType == WorkType.Cooperation) {
            ItemName = _AllPrefabsNames.gold;
        }
        if (ItemName != "") {
            MesManager.event(ESceneEvent.LodeItemRes, [ItemName, "", Pos, Scale]);
        }
        MesManager.event(ESceneEvent.LodeEffects, [_AllPrefabsNames.star_show, "GeneralBase", Pos.clone(), null, null]);
    }
}