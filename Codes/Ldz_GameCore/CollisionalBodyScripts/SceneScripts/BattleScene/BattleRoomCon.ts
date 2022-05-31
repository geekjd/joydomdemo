import FGUI_playerItem from "src/FGUI/GameMain/FGUI_playerItem";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import AudioUtils from "src/Game/Manager/AudioUtils";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { PGameFitingPlanProxy } from "src/Game/UICon/GameMianCom/PGameFitingPlanProxy";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import SkillManager from "src/Ldz_GameCore/GameSkillManager/SkillBase/SkillManager";
import { CampType, Enitiy, EntityState, WorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import MyObjectPool from "src/Ldz_GameCore/GeneralScripts/MyObjectPool";
import TextManager from "src/Ldz_GameCore/GeneralScripts/TextManager";
import ItemLodeManager from "src/Ldz_GameCore/ItemScriptsManager/ItemLodeManager";
import EnemySquareFormation from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/EnemySquareFormation";
import MagicCubeSource from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSource";
import MagicCubeSourceTypeManager from "src/Ldz_GameCore/MagicCubeSource/HoneyBeeManager/MagicCubeSourceTypeManager";
import NavMeshMap from "src/Ldz_GameCore/NavMesh/NavMeshMap";
import { AIControl } from "src/Ldz_GameCore/PlayerCore/AIControl";
import CameraControl from "src/Ldz_GameCore/PlayerCore/CameraControl";
import { PlayerControl } from "src/Ldz_GameCore/PlayerCore/PlayerControl";
import { E_AD_PlayerEvent } from "src/Ldz_GameCore/PlayerCore/PlayerEvent";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import SceneNode from "src/_T/D3/scene/SceneNode";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import MathUtils from "src/_T/Utils/MathUtils";
import BattleRoomData, { RoleInfo } from "./BattleRoomData";

export default class BattleRoomCon {
    private constructor() { };
    private static _Instance: BattleRoomCon;
    //公开的方法
    public static get Instance(): BattleRoomCon {
        if (!this._Instance) {
            this._Instance = new BattleRoomCon();
        }
        return this._Instance;
    }
    /**房间数据 */
    m_BattleRoomData: BattleRoomData;
    /**寻路模块 */
    //m_GamePathFinder: GamePathFinder;
    /**人物信息表 */
    RoleList: MagicCubeSource[] = [];
    King: MagicCubeSource;
    /**临时人物信息表 */
    TempRoleList: MagicCubeSource[] = [];
    /**玩家控制 */
    RoleConList: PlayerControl;
    /**AI控制 */
    RoleAIConList: AIControl[];
    /**敌人信息表 */
    EnemyList: EnemySquareFormation[] = [];
    /**道具信息表 */
    ItemList: Laya.Sprite3D[] = [];
    /**国王单位 */
    KingScript: MagicCubeSource;
    /**场景节点 */
    m_SceneNode: SceneNode;
    /**当前场景玩法类型 */
    m_CurBattleType: WorkType = WorkType.Default;
    /**游戏是否开始 */
    GameIsStar: boolean = true;
    /**游戏是否结束 */
    GameIsOver: boolean = false;
    /**复活列表 */
    ResurrectionMap: Map<number, number> = new Map<number, number>();
    /**场景1 */
    Evene_1: Laya.Sprite3D;
    /**场景2 */
    Evene_2: Laya.Sprite3D;
    /**逻辑更新 */
    LogicUpdate: boolean = false;
    /**3D箭头数组*/
    UI_Dir: Laya.Sprite3D[];
    /**NavMesh寻路 */
    m_NavMeshMap: NavMeshMap;
    PkNow: boolean = false;

    DeleteBattle() {

        /**房间数据 */
        delete this.m_BattleRoomData;
        this.m_BattleRoomData = null;
        /**人物信息表 */
        this.RoleList = [];
        this.King = null;
        /**临时人物信息表 */
        this.TempRoleList = [];
        /**玩家控制 */
        this.RoleConList = null;
        /**AI控制 */
        this.RoleAIConList = [];
        /**敌人信息表 */
        for (let i = 0; i < this.EnemyList.length; i++) {
            delete this.EnemyList[i];
            this.EnemyList[i] = null;
        }
        this.EnemyList = [];
        /**道具信息表 */
        for (let i = 0; i < this.ItemList.length; i++) {
            if (this.ItemList[i] != null) {
                this.ItemList[i].destroy();
                this.ItemList[i] = null;
            }
        }
        this.ItemList = [];
        /**国王单位 */
        this.KingScript = null;
        /**场景节点 */
        this.m_SceneNode = null;
        /**复活列表 */
        this.ResurrectionMap.forEach((Value, Key) => {
            this.ResurrectionMap.delete(Key);
        });
        this.ResurrectionMap = new Map<number, number>();
        /**场景1 */
        this.Evene_1 = null;
        /**场景2 */
        this.Evene_2 = null;
        /**3D箭头数组*/
        for (let i = 0; i < this.UI_Dir.length; i++) {
            this.UI_Dir[i].destroy();
            this.UI_Dir[i] = null;
        }
        this.UI_Dir = [];
        /**NavMesh寻路 */
        delete this.m_NavMeshMap;
        this.m_NavMeshMap = null;
        //this.m_NavMeshMap: NavMeshMap;
    }

    /**初始化战斗房间数据 */
    InitBattleRooom(level: SceneNode, Index: number) {
        if (this.RoleList == null) {
            this.RoleList = [];
        } else if (this.RoleList.length > 0) {
            for (let i = 0; i < this.RoleList.length; i++) {
                this.RoleList[i].m_SceneSprite3d.destroy();
            }
        }
        this.King = null;
        this.RoleList = [];
        this.RoleAIConList = [];
        this.TempRoleList = [];
        this.DeleteSq();
        this.ItemList = [];
        this.PkNow = false;
        this.m_NavMeshMap = new NavMeshMap();
        this.m_NavMeshMap.CreatorNavMesh(Index);
        this.ResurrectionMap = new Map<number, number>();
        if (this.m_BattleRoomData == null) {
            this.m_BattleRoomData = new BattleRoomData();
        }
        this.m_BattleRoomData.InitBattleRooomData(level);
        TextManager.Instance.InitData();
        switch (Index) {
            case 1:
                CameraControl.Instance.MovePrant = level.prefabs[_AllPrefabsNames.BattleCamera][0] as Laya.Sprite3D;
                ItemLodeManager.Instance.SetItemParent(level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D);
                break;
            case 2:
                /**狩猎模式 */
                CameraControl.Instance.MovePrant = level.prefabs[_AllPrefabsNames.HuntingCamera][0] as Laya.Sprite3D;
                ItemLodeManager.Instance.SetItemParent(level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D);
                this.Evene_1 = level.prefabs[_AllPrefabsNames.huntingScene][0] as Laya.Sprite3D;
                this.Evene_2 = level.prefabs[_AllPrefabsNames.huntingScene1][0] as Laya.Sprite3D;
                let Wa = level.prefabs[_AllPrefabsNames.Water][0] as Laya.Sprite3D;
                //Wa.destroy();
                this.m_BattleRoomData.HunterPerfabAddCommont(level);
                break;
            case 3:
                //合作模式
                CameraControl.Instance.MovePrant = level.prefabs[_AllPrefabsNames.CooperrationCamera][0] as Laya.Sprite3D;
                ItemLodeManager.Instance.SetItemParent(level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D);
                this.m_BattleRoomData.CooperationPerfabAddCommont(level);
                break;
            case 4:
                /**生存模式 */
                CameraControl.Instance.MovePrant = level.prefabs[_AllPrefabsNames.ExistenceCamera][0] as Laya.Sprite3D;
                ItemLodeManager.Instance.SetItemParent(level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D);
                //this.m_BattleRoomData.CooperationPerfabAddCommont(level);
                break;
            case 5:
                /**竞技模式 */
                CameraControl.Instance.MovePrant = level.prefabs[_AllPrefabsNames.SportsCamera][0] as Laya.Sprite3D;
                ItemLodeManager.Instance.SetItemParent(level.prefabs[_AllPrefabsNames.ItemAndEffectsPlan][0] as Laya.Sprite3D);
                this.m_BattleRoomData.SportsPerfabAddCommont(level);
                break;
        }

        //Objectab
        let ObjArray = level.prefabs[_AllPrefabsNames.Objectab];
        let PhpArray = level.prefabs[_AllPrefabsNames.Php];
        if (ObjArray != null && ObjArray.length > 0) {
            for (let i = 0, Len = ObjArray.length; i < Len; i++) {
                ObjArray[i].layer = 10;
                // ObjArray[i].active = false;
            }
        }

        if (PhpArray != null && PhpArray.length > 0) {
            for (let i = 0, Len = PhpArray.length; i < Len; i++) {
                PhpArray[i].layer = 0;
            }
        }

        this.UI_Dir = [];
        let DIRUrl = EssentialResUrls.PrefabURL(_AllPrefabsNames.JianTou);
        console.log(DIRUrl)
        for (let i = 0; i < 8; i++) {
            ResLoad.Load3D(DIRUrl, Laya.Handler.create(this, () => {
                let TempEff = ResLoad.GetRes(DIRUrl) as Laya.Sprite3D;
                this.m_BattleRoomData.ItemPrant.addChild(TempEff);
                //TempEff.transform.localPosition = new Laya.Vector3(0, 0, 0);
                TempEff.active = false;
                this.UI_Dir.push(TempEff);
            }));
        }

        MyObjectPool.Instance.SetItemPrant(this.m_BattleRoomData.ItemPrant);
        let Camera = CameraControl.Instance.MovePrant.getChildAt(0) as Laya.Camera;
        CameraControl.Instance.SetCamera(Camera);
        SkillManager.Instance.Target = Camera;
        ItemLodeManager.Instance.Target = Camera;
        MesManager.off(ESceneEvent.AddSkillByClientID, this, this.AddSkillByClientID);
        MesManager.on(ESceneEvent.AddSkillByClientID, this, this.AddSkillByClientID);
        GlobalD3Environment.Camera.active = false;
        GlobalD3Environment.Camera.enableRender = false;
        this.LogicUpdate = false;
    }
    /**创建新手关卡 */
    CreatorNoviceLevle() {
        /**创建人物 */
        PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = false;
        this.GameIsStar = false;
        this.GameIsOver = false;
        this.CreatorCharacter(WorkType.Default);
        this.CreatorEnemySquareFormation(WorkType.Default);
        this.m_CurBattleType = WorkType.Default;
    }

    /**创建狩猎关卡 */
    CreatorHuntingLevle() {
        PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = true;
        this.GameIsStar = false;
        this.GameIsOver = false;
        this.GameTime = 3 * 60;
        this.IsOneShowTips = true;
        this.IsUpdateTime = false;
        this.DirUICount = 3;
        /**随机伙伴 */
        this.m_BattleRoomData.RoodmAiRoleInfo(5);
        /**创建人物 */
        this.CreatorCharacter(WorkType.HuntingType);
        this.CreatorEnemySquareFormation(WorkType.HuntingType);
        this.m_CurBattleType = WorkType.HuntingType;
    }

    /**创建合作关卡 */
    CreatorCooperationLevle() {
        PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = false;
        this.GameIsStar = false;
        this.GameIsOver = false;
        this.IsUpdateTime = false;
        this.CooperationIsBattle = true;
        this.ExistenceGRank = 0;
        /**随机伙伴 */
        this.GameTime = 0;
        this.DirUICount = 99;
        this.m_BattleRoomData.RoodmAiRoleInfo(1);
        let TempInfo = new RoleInfo("King", "King", 1, null);
        this.m_BattleRoomData.AddRoleInfo(TempInfo);
        /**创建人物 */
        this.CreatorCharacter(WorkType.Cooperation);
        this.CreatorEnemySquareFormation(WorkType.Cooperation);
        this.m_CurBattleType = WorkType.Cooperation;
    }

    /**创建生存关卡 */
    CreatorExistenceLevle() {
        PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = false;
        this.GameIsStar = false;
        this.GameIsOver = false;
        this.IsUpdateTime = false;
        /**随机伙伴 */
        this.GameTime = 0;
        this.DirUICount = 99;
        this.ExistenceGRank = 5;
        /**创建人物 */
        this.CreatorCharacter(WorkType.Existence);
        this.CreatorEnemySquareFormation(WorkType.Existence);
        this.m_CurBattleType = WorkType.Existence;
    }

    /**创建竞技关卡 */
    CreatorSportsLevle() {
        PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = false;
        this.GameIsStar = false;
        this.GameIsOver = false;
        this.IsUpdateTime = false;
        /**随机伙伴 */
        this.GameTime = 3 * 60;
        this.DirUICount = 0;
        this.PkNow = true;
        this.m_BattleRoomData.RoodmAiRoleInfo(7);
        /**创建人物 */
        this.CreatorCharacter(WorkType.Sports);
        //this.CreatorEnemySquareFormation(WorkType.Sports);
        this.m_CurBattleType = WorkType.Sports;
    }

    /**创建敌人方队 */
    CreatorEnemySquareFormation(TempWorkType: WorkType) {
        this.m_BattleRoomData.EnemyBirthPoint.forEach((Value, Key) => {
            let TempArray: Laya.Vector3[] = Value;
            for (let i = 0; i < TempArray.length; i++) {
                let Scr: EnemySquareFormation = new EnemySquareFormation(Key, TempArray[i].clone(), TempWorkType, this.m_BattleRoomData.players);
                this.EnemyList.push(Scr);
                //console.log("添加方队");
            }
        });
    }

    CreatorCount = 0;
    /**创建人物角色 */
    CreatorCharacter(TempWorkType: WorkType) {

        let RoleBirthPoint: Laya.Vector3[] = [];
        for (let i = 0; i < this.m_BattleRoomData.RoleBirthPoint.length; i++) {
            RoleBirthPoint.push(this.m_BattleRoomData.RoleBirthPoint[i].clone());
        }
        this.CreatorCount = this.m_BattleRoomData.CharacterInfoList.length;
        if (this.CreatorCount == 0) {
            this.GameIsStar = true;
        }
        for (let i = 0, Len = this.m_BattleRoomData.CharacterInfoList.length; i < Len; i++) {
            let TempInfo: RoleInfo = this.m_BattleRoomData.CharacterInfoList[i];
            let WordPos;
            if (TempWorkType == WorkType.Cooperation) {
                let Index = i;
                WordPos = RoleBirthPoint[Index].clone();
            } else {
                let Index = MathUtils.randomRangeInt(0, RoleBirthPoint.length);
                WordPos = RoleBirthPoint.splice(Index, 1)[0];
            }
            this.LodeRoleEntiny(TempWorkType, i, TempInfo, WordPos, CampType.Blue_Camp);
        }
    }

    /**加载人物 */
    LodeRoleEntiny(TempWorkType: WorkType, Index: number, TempRoleInfo: RoleInfo, WordPos: Laya.Vector3, campType: CampType) {
        let Url = EssentialResUrls.PrefabURL(TempRoleInfo.m_HeroSkinName);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Player = ResLoad.GetRes(Url) as Laya.Sprite3D;
            let ScTempbee: MagicCubeSource = Player.addComponent(MagicCubeSourceTypeManager.Instance.GetTypeByName(TempRoleInfo.m_HeroName));
            if (ScTempbee != null) {
                if (Index == 0) {
                    ScTempbee.IsPlayerCon = true;
                }
                ScTempbee.m_CampType = campType;
                ScTempbee.m_WorkType = TempWorkType;
                if (ScTempbee.IsPlayerCon) {
                    ScTempbee.m_CampType = CampType.Blue_Camp;
                } else if (TempWorkType == WorkType.HuntingType) {
                    ScTempbee.m_CampType = CampType.Yellow_Camp;
                } else if (TempWorkType == WorkType.Sports) {
                    ScTempbee.m_CampType = CampType.Yellow_Camp;
                }
                ScTempbee.Init(TempRoleInfo.m_HeroLevel);
                ScTempbee.UpdateMag = this.LogicUpdate;
                this.m_BattleRoomData.players.addChild(Player);
                Player.transform.localPosition = new Laya.Vector3(WordPos.x, WordPos.y, WordPos.z);
                Player.transform.localPosition = Player.transform.localPosition;
                let AI: AIControl = Player.getComponent(AIControl);
                /**玩家特殊处理 */
                if (Index == 0) {
                    if (AI != null) {
                        AI.destroy();
                    }
                    this.RoleConList = Player.addComponent(PlayerControl);
                    AudioUtils.instance.Camera = Player.transform;
                    if (ScTempbee.m_WorkType == WorkType.Sports) {
                        ScTempbee.m_TriggerCollider.IsPK = true;
                    }
                } else {
                    if (TempRoleInfo.m_HeroName == "King") {
                        this.KingScript = ScTempbee;
                        if (AI == null) {
                            AI = Player.addComponent(AIControl) as AIControl;
                            //this.RoleAIConList.push(AI);
                        }
                        AI.Init();
                    } else {
                        if (AI == null) {
                            AI = Player.addComponent(AIControl) as AIControl;
                            this.RoleAIConList.push(AI);
                        }
                        AI.Init();
                        AI.SetHandler();
                    }
                }
                if (TempRoleInfo.m_HeroSkillArray != null) {
                    for (let i = 0; i < TempRoleInfo.m_HeroSkillArray.length; i++) {
                        //    console.log(TempRoleInfo.m_HeroSkillArray[i]);
                        this.AddSkill(ScTempbee, TempRoleInfo.m_HeroSkillArray[i]);
                    }
                }
                //ScTempbee.m_AnimatorManager.IsUpdate = false;
                if (TempRoleInfo.m_HeroName != "King") {
                    this.RoleList.push(ScTempbee);
                } else {
                    this.King = ScTempbee;
                }
                ScTempbee.M_RoleList_Con = this.RoleList;
                ScTempbee.m_EnemyList_Con = this.EnemyList;
                this.CreatorCount--;
                if (this.CreatorCount == 0) {
                    this.TempRoleList = [];
                    this.TempRoleList = [...this.RoleList];
                    this.GameIsStar = true;
                    /**游戏开始 */
                }
            }
        }));
    }

    /**设置低帧显示 */
    SetLowFPSShow() {
        for (let i = 0; i < this.RoleList.length; i++) {
            this.RoleList[i].SetLowFpsFalse();
        }
        this.SetRoleMe(true);
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList[i].LowFps = true;
            //console.log("敌人方队");
            for (let j = 0; j < this.EnemyList[i].Eq_EnemyList.length; j++) {
                if (this.EnemyList[i].Eq_EnemyList[j] != null) {
                    let Sc: MagicCubeSource = this.EnemyList[i].Eq_EnemyList[j].getComponent(MagicCubeSource);
                    Sc.SetLowFpsFalse();
                    //      console.log("敌人单位", Sc.m_AttributeBase.m_MagicName);
                }
            }
        }
    }
    /**根据帧率设置角色贴图 */
    SetRoleMe(IsFPSLow: boolean) {
        for (let i = 0; i < this.RoleList.length; i++) {
            let Mesh = this.RoleList[i].m_SceneSprite3d.getChildAt(0) as Laya.SkinnedMeshSprite3D;
            let Matr: Laya.Material[] = [];
            if (IsFPSLow) {
                Matr.push(Mesh.skinnedMeshRenderer.sharedMaterials[1]);
                //Mesh.skinnedMeshRenderer.sharedMaterials[0].destroy();
            } else {
                Matr.push(Mesh.skinnedMeshRenderer.sharedMaterials[0]);
                //Mesh.skinnedMeshRenderer.sharedMaterials[1].destroy();
            }
            Mesh.skinnedMeshRenderer.sharedMaterials = Matr;
        }
    }
    /**设置开始逻辑 */
    SetGameStarLogic() {
        this.LogicUpdate = true;
        this.IsUpdateTime = true;
        for (let i = 0; i < this.RoleList.length; i++) {
            this.RoleList[i].UpdateMag = true;
        }
        if (this.King != null) {
            this.King.UpdateMag = true;
        }
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList[i].LogicUpdate = true;

            for (let j = 0; j < this.EnemyList[i].Eq_EnemyList.length; i++) {
                // console.log(this.EnemyList[i].Eq_EnemyList[i]);
                if (this.EnemyList[i].Eq_EnemyList[i] != null) {
                    let Sc: MagicCubeSource = this.EnemyList[i].Eq_EnemyList[i].getComponent(MagicCubeSource);
                    Sc.UpdateMag = true;
                }
            }
        }
    }
    /**检测敌人是是否加载完成 */
    CheckEnemyLoding(): boolean {
        for (let i = 0; i < this.EnemyList.length; i++) {
            if (this.EnemyList[i].Islodeing) {
                return false;
            }
        }
        return true;
    }

    GetRanking(): number {
        for (let i = 0; i < this.TempRoleList.length; i++) {
            if (this.TempRoleList[i].IsPlayerCon) {
                return i + 1;
            }
        }
        return -1;
    }
    Up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    RoleTemp: MagicCubeSource[] = [];
    IsUpdateTime: boolean = false;
    DirUICount: number = 3;

    UpdateDirUI() {
        this.RoleTemp = [];
        let Count = 0;
        for (let i = 0; i < this.RoleList.length; i++) {
            if (this.RoleList[i].IsDie) {
                Count++;
            } else {
                this.RoleTemp.push(this.RoleList[i]);
            }
        }
        if (Count >= this.DirUICount) {
            for (let i = 0; i < this.UI_Dir.length; i++) {
                if (this.RoleTemp[i] != null && !this.RoleTemp[i].IsPlayerCon && i < this.RoleTemp.length) {
                    if (!this.UI_Dir[i].active) {
                        this.UI_Dir[i].active = true;
                    }
                    this.UI_Dir[i].transform.position = this.RoleConList.m_SelfObj.transform.position.clone();
                    let Obj = this.RoleTemp[i].m_SceneSprite3d.transform.position;
                    this.UI_Dir[i].transform.lookAt(Obj, this.Up, false);
                } else {
                    if (this.UI_Dir[i].active) {
                        this.UI_Dir[i].active = false;
                    }
                }
            }
        }
    }
    /**狩猎模式游戏就结束 */
    RunGameOver(IsVictory: boolean, ModeTips: number) {
        this.GameIsOver = true;
        this.SetHunterInfo();
        MesManager.event(ESceneEvent.GameOver);
        this.DeleteSq();
        this.StopStep();
        AudioUtils.instance.Camera = null;
        if (this.RoleConList != null) {
            this.RoleConList.Char.move(new Laya.Vector3(0, 0, 0));
        }
        /**游戏结束 */
        Laya.timer.once(1000, this, () => {
            CameraControl.Instance.SetCameraUpPos(true, 1000);
            this.SkillAll();
            Laya.Resource.destroyUnusedResources();
        });
        Laya.timer.once(2000, this, () => {
            MesManager.event(EUIEvent.ShowGameOverTipsPlan, IsVictory ? "游戏胜利" : "游戏结束");
        });
        let Ranking = this.GetRanking();
        if (this.m_CurBattleType == WorkType.Existence) {
            Ranking = this.ExistenceGRank + 1;
            console.log("当前生存波次", Ranking);
        }

        if (this.m_CurBattleType == WorkType.Cooperation) {
            Ranking = this.ExistenceGRank + 1;
            console.log("当前合作波次", Ranking);
        }

        Laya.timer.once(3500, this, () => {
            // this.m_GamePathFinder.DeleteGamePathFinder();
            // this.m_GamePathFinder.players.removeChildren(0, this.m_GamePathFinder.players.numChildren - 1);
            if (this.m_CurBattleType == WorkType.Existence) {
                MesManager.event(EUIEvent.ShowRewardPanel, [20007, 0, true, ModeTips, Ranking]);
            } else {
                MesManager.event(EUIEvent.ShowGameOverPlan, [ModeTips, Ranking]);
            }
        });
        this.m_BattleRoomData.delete();
        TextManager.Instance.DeleteTextManager();
        this.DeleteBattle();
    }
    /**默认关卡游戏是否结束 */
    NoviceLevleGameIsOver() {

    }

    /**狩猎关卡游戏是否结束 */
    HuntingLevleGameIsOver() {
        if (this.IsUpdateTime) {
            this.GameTime -= (LayaUtils.deltaTime / 1000);
        }

        if (this.GameTime < this.AITime) {
            if (this.RoleConList != null) {
                if (this.RoleConList.m_PlayerBeeCon.m_TriggerCollider != null && this.RoleConList.m_PlayerBeeCon.m_AttributeBase.m_MagicLv >= this.AIAttackLevel) {
                    PGameFitingPlanProxy.instance.ui.m_LevelTips.visible = false;
                    this.RoleConList.m_PlayerBeeCon.m_TriggerCollider.IsPK = true;
                    this.RoleConList.m_PlayerBeeCon.IsTargetOBj = true;
                }
            }
        }
        if (this.IsOneShowTips && this.GameTime < 30) {
            this.IsOneShowTips = false;
            MesManager.event(ESceneEvent.ShowGameTimeTips);
        }
        if (this.GameTime <= 0) {
            this.RunGameOver(false, 1);
            return;
        }
        if (this.RoleList[0].IsDie) {
            this.RunGameOver(false, 1);
            return;
        }
        let IsVictory: boolean = true;
        for (let i = 1; i < this.RoleList.length; i++) {
            if (!this.RoleList[i].IsDie) {
                IsVictory = false;
                break;
            }
        }
        if (IsVictory) {
            this.RunGameOver(true, 2);
            return;
        }
        PGameFitingPlanProxy.instance.SetGameTimer(this.GameTime);
    }


    CooperationIsBattle: boolean = true;
    /**合作关卡游戏是否结束 */
    CooperationLevleGameIsOver() {

        let IsCreator = true;
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList[i].CheckListIsNull();
            if (this.EnemyList[i].Eq_EnemyList.length != 0) {
                IsCreator = false;
                this.GameTime = 0;
                break;
            }
        }
        if (IsCreator) {
            if (this.IsUpdateTime) {
                this.GameTime += (LayaUtils.deltaTime / 1000);
            }
            if (this.EnemyList.length > 0) {
                if (this.EnemyList[0].MapIndex < this.EnemyList[0].CreatorEnemyInfo.size) {
                    let TempCheckRoleInfo: RoleInfo[] = this.EnemyList[0].CreatorEnemyInfo.get(this.EnemyList[0].MapIndex);
                    let MaxTime = TempCheckRoleInfo[0].m_LodeTimer;
                    if (this.GameTime >= MaxTime) {
                        for (let i = 0; i < this.EnemyList.length; i++) {
                            let TempRoleInfo: RoleInfo[] = this.EnemyList[i].CreatorEnemyInfo.get(this.EnemyList[i].MapIndex);
                            let indexCOunt = 1;
                            for (let j = 0; j < TempRoleInfo.length; j++) {
                                for (let k = 0; k < TempRoleInfo[j].m_LodeCount; k++) {
                                    Laya.timer.once(indexCOunt + k * 1000, this, () => {
                                        if (this.GameIsOver) return;
                                        this.EnemyList[i].LodeEnemyEntiny(TempRoleInfo[j], this.EnemyList[i].EnemyWordPos.clone(), CampType.Red_Camp);
                                    });
                                }
                            }
                            this.EnemyList[i].MapIndex++;
                        }
                        this.ExistenceGRank++;
                        this.GameTime = 0;
                    } else {
                        if (this.EnemyList[0].Islodeing) {
                            this.CooperationIsBattle = true;
                            PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗中");

                        } else {
                            this.CooperationIsBattle = false;
                            PGameFitingPlanProxy.instance.SetCoHunterTimer(MaxTime - this.GameTime);
                        }
                    }
                } else {

                    if (this.KingScript != null) {
                        this.KingScript.SkillSelef();
                    }
                    this.RunGameOver(true, 3);
                    PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "无战斗列表");
                    return;
                }
            } else {
                PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗方队");
            }
        } else {
            this.CooperationIsBattle = true;
            PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗中");
        }

        if (this.KingScript.IsDie) {
            this.RunGameOver(false, 3);
            return;
        }
    }

    ExistenceGRank: number = 5;
    /**生存关卡游戏是否结束 */
    ExistenceGameIsOver() {

        // if (this.RoleConList != null && this.RoleConList.m_PlayerBeeCon != null) {

        //     this.RoleConList.m_PlayerBeeCon.m_HP_UI.SetUIInfo((5 - this.ExistenceGRank));

        // }
        PGameFitingPlanProxy.instance.SetLevel(5 - this.ExistenceGRank);


        let IsCreator = true;
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList[i].CheckListIsNull();
            if (this.EnemyList[i].Eq_EnemyList.length != 0) {
                IsCreator = false;
                this.GameTime = 0;
                break;
            }
        }
        if (IsCreator) {
            if (this.IsUpdateTime) {
                this.GameTime += (LayaUtils.deltaTime / 1000);
            }
            if (this.EnemyList.length > 0) {
                if (this.EnemyList[0].MapIndex < this.EnemyList[0].CreatorEnemyInfo.size) {
                    let TempCheckRoleInfo: RoleInfo[] = this.EnemyList[0].CreatorEnemyInfo.get(this.EnemyList[0].MapIndex);
                    let MaxTime = TempCheckRoleInfo[0].m_LodeTimer;
                    if (this.GameTime >= MaxTime) {
                        for (let i = 0; i < this.EnemyList.length; i++) {
                            let TempRoleInfo: RoleInfo[] = this.EnemyList[i].CreatorEnemyInfo.get(this.EnemyList[i].MapIndex);
                            let indexCOunt = 1;
                            for (let j = 0; j < TempRoleInfo.length; j++) {
                                for (let k = 0; k < TempRoleInfo[j].m_LodeCount; k++) {
                                    Laya.timer.once(indexCOunt + k * 500, this, () => {
                                        if (this.GameIsOver) return;
                                        this.EnemyList[i].LodeEnemyEntiny(TempRoleInfo[j], this.EnemyList[i].EnemyWordPos.clone(), CampType.Red_Camp);
                                    });
                                }
                            }
                            this.EnemyList[i].MapIndex++;
                        }
                        this.ExistenceGRank--;
                        this.GameTime = 0;

                    } else {
                        if (this.EnemyList[0].Islodeing) {
                            PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗中");
                        } else {
                            PGameFitingPlanProxy.instance.SetCoHunterTimer(MaxTime - this.GameTime);
                        }
                    }
                } else {

                    let EssIsOver = true;
                    for (let i = 0; i < this.EnemyList.length; i++) {
                        if (this.EnemyList[i].Eq_EnemyList.length != 0) {
                            EssIsOver = false;
                            break;
                        }
                    }
                    if (EssIsOver && !this.EnemyList[0].Islodeing) {
                        this.RunGameOver(true, 4);
                    }
                    PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "无战斗列表");
                    return;
                }
            } else {
                PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗方队");
            }
        } else {
            PGameFitingPlanProxy.instance.SetCoHunterTimer(0, "战斗中");
        }

        if (this.RoleList[0].IsDie) {
            this.RunGameOver(false, 5);
            return;
        }


    }


    /**竞技关卡游戏是否结束 */
    SportsGameIsOver() {
        if (this.IsUpdateTime) {
            this.GameTime -= (LayaUtils.deltaTime / 1000);
        }
        if (this.GameTime <= 0) {
            this.RunGameOver(false, 1);
            return;
        }
        let IsSport: boolean = true;
        for (let i = 1; i < this.RoleList.length; i++) {
            if (this.RoleList[i].IsDie && this.RoleList[i].huhuoCount == 0) {

            } else {
                IsSport = false;
                break;
            }
        }
        if (IsSport) {
            this.RunGameOver(true, 1);
        }

        if (this.RoleConList != null && this.RoleConList.m_PlayerBeeCon.IsDie && this.RoleConList.m_PlayerBeeCon.huhuoCount == 0) {
            this.RunGameOver(false, 1);
        }

        PGameFitingPlanProxy.instance.SetGameTimer(this.GameTime);
    }

    MidTime: number = 0;
    MaxTime: number = 0.5;
    GameTime: number = 3 * 60;
    IsOneShowTips: boolean = true;
    AITime = 2 * 60;
    Resurrection: number = 0;
    UIRefTime: number = 0;
    /**更新逻辑 */
    UpdateLogic() {
        if (!this.GameIsStar || this.GameIsOver) { return; }
        if (this.EnemyList == null) return;

        /**更新敌人方队 */
        for (let i = 0; i < this.EnemyList.length; i++) {
            this.EnemyList[i].UpdateSquareFormation();
        }
        //if (true) return;
        /**更新文本显示  */
        TextManager.Instance.UpdateTxtLogic();

        /**设置角色信息展示 */
        this.UIRefTime += (LayaUtils.deltaTime / 1000);
        if (this.UIRefTime > 1) {
            this.SetHunterInfo();
            this.UIRefTime = 0;
        }
        /**狩猎模式 设置方向坐标 */
        //if (this.m_CurBattleType == WorkType.HuntingType) {
        this.UpdateDirUI();
        //}

        /**合作模式 复活时间倒计时 */
        if (this.m_CurBattleType == WorkType.Cooperation || this.m_CurBattleType == WorkType.Sports) {

            if (this.m_CurBattleType == WorkType.Cooperation) {
                this.m_BattleRoomData.UpdateTipsUI(this.RoleList[0]);
            }
            if (this.ResurrectionMap.size > 0) {
                this.Resurrection += (LayaUtils.deltaTime / 1000);
                if (this.Resurrection >= 1) {
                    this.ResurrectionMap.forEach((Value, Key) => {
                        Value += this.Resurrection;
                        if (Value >= 3) {
                            /**复活 */
                            this.ResurrectionMap.delete(Key);
                            this.ResurrectionhunterByIndex(Key);
                        } else {
                            this.ResurrectionMap.set(Key, Value);
                        }
                    });
                    this.Resurrection = 0;
                }
            }
            /**检测是否添加死亡角色到复活列表中 */
            for (let i = 0; i < this.RoleList.length; i++) {
                let Index: number = i;
                if (this.RoleList[Index].IsDie) {
                    if (!this.ResurrectionMap.get(Index)) {
                        this.ResurrectionMap.set(Index, 0);
                    }
                }
            }
        }

        switch (this.m_CurBattleType) {
            case WorkType.Default:
                this.NoviceLevleGameIsOver();
                break;
            case WorkType.HuntingType:
                this.HuntingLevleGameIsOver();
                break;
            case WorkType.Cooperation:
                this.CooperationLevleGameIsOver();
                break;
            case WorkType.Existence:
                this.ExistenceGameIsOver();
                break;
            case WorkType.Sports:
                this.SportsGameIsOver();
                break;
        }
    }


    /**销毁 */
    DeleteSq() {
        if (this.EnemyList != null) {
            for (let i = 0; i < this.EnemyList.length; i++) {
                delete this.EnemyList[i];
                this.EnemyList[i] = null;
            }
        }
        this.EnemyList = [];
    }

    /**手动调用游戏结束 */
    GameOver() {
        console.log(' GameOver@@ ');

        this.GameIsOver = true;
        this.SetHunterInfo();
        AudioUtils.instance.Camera = null;
        if (this.RoleConList != null) {
            this.RoleConList.Char.move(new Laya.Vector3(0, 0, 0));
        }
        this.StopStep();
        if (this.KingScript != null) {
            this.KingScript.SkillSelef();
        }
        /**游戏结束 */
        this.SkillAll();
        this.m_BattleRoomData.delete();
        TextManager.Instance.DeleteTextManager();
        this.DeleteBattle();
        // this.m_GamePathFinder.DeleteGamePathFinder();
        // this.m_GamePathFinder.players.removeChildren(0, this.m_GamePathFinder.players.numChildren - 1);
        MesManager.event(ESceneEvent.LodeMainScene);
    }

    timer: number = 0;

    UpdateOprator(dir: number) {
        if (this.RoleConList != null) {
            this.RoleConList.Player_Move(dir);
        }
    }

    /**更新玩家移动 */
    UpdateMove() {
        if (this.RoleConList != null) {
            this.RoleConList.LogicUpadate();
        }
    }
    /**开启每帧调用 */
    StarStep() {
        Laya.timer.frameLoop(1, this, this.LoopStep);
    }
    /**循环调用中 */
    LoopStep() {
        this.UpdateMove();
        //this.m_GamePathFinder.step();
    }
    /**停止循环 */
    StopStep() {
        Laya.timer.clear(this, this.LoopStep);
    }
    /**设置角色列表信息 */
    SetRolelist() {
        PGameFitingPlanProxy.instance.ui.m_playList.m_RoleList.itemRenderer = Laya.Handler.create(this, this.RoleListRender, null, false);
        console.log("列表属性@", PGameFitingPlanProxy.instance.ui.m_playList);
        //PGameFitingPlanProxy.instance.ui.m_playList.margin.top = 10;
        // PGameFitingPlanProxy.instance.ui.m_playList.y = 10;
        // PGameFitingPlanProxy.instance.ui.m_playList.yMin = 10;
        PGameFitingPlanProxy.instance.ui.m_playList.height = 30 + 52 * this.TempRoleList.length;
        if (this.m_CurBattleType == WorkType.Cooperation) {
            this.m_BattleRoomData.UpdateTipsUI(this.RoleList[0]);
        }
        this.SetHunterInfo();
    }
    /**狩猎模式玩家信息榜比较方法 */
    HuntingListSort(Letf: MagicCubeSource, Right: MagicCubeSource): number {
        if (Letf.IsDie) {
            return 1;
        } else if (Right.IsDie) {
            return -1;
        }
        if (Letf.AttackIntegral < Right.AttackIntegral) {
            return 1;
        } else if (Letf.AttackIntegral > Right.AttackIntegral) {
            return -1;
        }
        return 0;
    }

    /**狩猎模式玩家信息榜比较方法 */
    SportsListSort(Letf: MagicCubeSource, Right: MagicCubeSource): number {
        if (Letf.AttackIntegral < Right.AttackIntegral) {
            return 1;
        } else if (Letf.AttackIntegral > Right.AttackIntegral) {
            return -1;
        }
        return 0;
    }
    /**合作模式玩家信息榜比较方法 */
    CooperationListSort(Letf: MagicCubeSource, Right: MagicCubeSource): number {
        if (Letf.CurGoold < Right.CurGoold) {
            return 1;
        } else if (Letf.CurGoold > Right.CurGoold) {
            return -1;
        }
        return 0;
    }
    /**设置橘色信息 */
    SetHunterInfo() {
        /**设置角色面板 */

        switch (this.m_CurBattleType) {
            case WorkType.HuntingType:
                this.TempRoleList.sort(this.HuntingListSort);
                break;
            case WorkType.Cooperation:
                this.TempRoleList.sort(this.CooperationListSort);
                break;
            case WorkType.Sports:
                this.TempRoleList.sort(this.SportsListSort);
                break;
        }
        PGameFitingPlanProxy.instance.ui.m_playList.m_RoleList.numItems = this.TempRoleList.length;
    }
    /**UI玩家信息面板渲染方法 */
    RoleListRender(index: number, Item: FGUI_playerItem) {
        let MagicCubeSource = this.TempRoleList[index];
        if (index == 0) {
            MagicCubeSource.m_HP_UI.IsShowhuangguan(true);
        } else {
            MagicCubeSource.m_HP_UI.IsShowhuangguan(false);
        }

        switch (MagicCubeSource.m_WorkType) {
            case WorkType.HuntingType:
                if (MagicCubeSource.IsDie) {
                    Item.m_state.selectedIndex = 1;
                } else {
                    Item.m_state.selectedIndex = 0;
                }
                Item.m_experienceTxt.text = "" + MagicCubeSource.AttackIntegral;
                break;
            case WorkType.Cooperation:
                Item.m_experienceTxt.text = "" + MagicCubeSource.CurGoold;
                break;
            case WorkType.Sports:
                if (MagicCubeSource.IsDie) {
                    Item.m_state.selectedIndex = 1;
                } else {
                    Item.m_state.selectedIndex = 0;
                }
                Item.m_experienceTxt.text = "" + MagicCubeSource.AttackIntegral;
                break;
        }
        Item.m_hp.m_HPNum.text = "" + MagicCubeSource.m_AttributeBase.m_Hitpoints;
        Item.m_hp.max = MagicCubeSource.m_AttributeBase.m_MaxHitpoints;
        Item.m_hp.value = MagicCubeSource.m_AttributeBase.m_Hitpoints;
        Item.m_nameTxt.text = "" + MagicCubeSource.m_AttributeBase.m_MagicChess;
    }

    /**根据玩家ID添加对象技能 */
    AddSkillByClientID(SkillID: number, ClientID: number) {
        if (this.GameIsOver) return;
        if (this.RoleList == null || this.RoleList.length == 0 || ClientID > this.RoleList.length) return;
        let TempSc: MagicCubeSource = this.RoleList[ClientID];
        this.AddSkill(TempSc, SkillID);
    }
    /**添加技能 */
    private AddSkill(TempSc: MagicCubeSource, SkillID: number) {
        if (SkillID == 0) return;
        let TempBuffInfo: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(SkillID);
        TempSc.AddBUff(TempBuffInfo.BuffEnglishName, TempSc.m_DamageData);
    }
    /**杀死所有玩家与敌人 */
    SkillAll() {
        AudioUtils.instance.Camera = null;
        for (let i = 0; i < this.RoleList.length; i++) {
            let Temp: MagicCubeSource = this.RoleList[i];
            if (Temp != null) {
                Temp.SkillSelef(true);
                Temp = null;
            }
        }
        for (let i = 0; i < this.EnemyList.length; i++) {
            for (let J = 0; J < this.EnemyList[i].Eq_EnemyList.length; J++) {
                let Temp: MagicCubeSource = this.EnemyList[i].Eq_EnemyList[J].getComponent(MagicCubeSource);
                this.EnemyList[i].Eq_EnemyList[J] = null;
                if (Temp != null) {
                    Temp.SkillSelef(true);
                    Temp = null;
                }
            }
        }
    }

    /**AI攻击等级判定 */
    AIAttackLevel: number = 3;
    /**获取目标 */
    GetTargetByMap(m_SceneSprite3d: Laya.Sprite3D, IsLoop: boolean, TempDis: number = 999): Laya.Sprite3D {
        // 迭代 Map 中的 value
        let TempObj: Laya.Sprite3D = null;
        let Dis = TempDis;
        //let Time = new Date().getTime();
        if (this.m_CurBattleType != WorkType.Cooperation) {
            let ObjScript: MagicCubeSource = m_SceneSprite3d.getComponent(MagicCubeSource);
            let Leve = 10;
            if (ObjScript != null) {
                Leve = ObjScript.m_AttributeBase.m_MagicLv;
            }
            if ((this.GameTime < this.AITime && Leve >= this.AIAttackLevel) || this.PkNow) {
                ObjScript.IsTargetOBj = true;
                for (let i = 0; i < this.RoleList.length; i++) {
                    let TempValue = this.RoleList[i];
                    if (TempValue == null) { continue; }
                    let TempScript: MagicCubeSource = TempValue;
                    if (TempScript.IsDie) continue;
                    if (TempValue.m_SceneSprite3d == m_SceneSprite3d) { continue; }
                    if (!IsLoop) return TempValue.m_SceneSprite3d;
                    let Dis2 = Laya.Vector3.distance(TempValue.m_SceneSprite3d.transform.position, m_SceneSprite3d.transform.position);
                    if (Dis2 < Dis) {
                        Dis = Dis2;
                        TempObj = TempValue.m_SceneSprite3d;
                    }
                }
            }
        }

        for (let i = 0; i < this.EnemyList.length; i++) {
            for (let J = 0; J < this.EnemyList[i].Eq_EnemyList.length; J++) {
                let TempValue = this.EnemyList[i].Eq_EnemyList[J];
                if (TempValue == null || TempValue.destroyed) { continue; }
                let TempScript: MagicCubeSource = TempValue.getComponent(MagicCubeSource);
                if (TempScript == null || TempScript.IsDie) continue;
                if (!IsLoop) return TempValue;
                let Dis2 = Laya.Vector3.distance(TempValue.transform.position, m_SceneSprite3d.transform.position);
                if (Dis2 < Dis) {
                    Dis = Dis2;
                    TempObj = TempValue;
                }
            }
        }
        // Time = new Date().getTime() - Time;
        // console.log("索敌", Time);
        return TempObj;
    }

    /**获取目标 */
    GetEnemyTargetByMap(m_SceneSprite3d: Laya.Sprite3D, IsLoop: boolean, TempDis: number = 999, ReOnj: Laya.Sprite3D = null): Laya.Sprite3D {
        // 迭代 Map 中的 value
        let TempObj: Laya.Sprite3D = null;
        let Dis = 0;
        //let Time = new Date().getTime();
        for (let i = 0; i < this.EnemyList.length; i++) {
            for (let J = 0; J < this.EnemyList[i].Eq_EnemyList.length; J++) {
                let TempValue = this.EnemyList[i].Eq_EnemyList[J];
                if (TempValue == null || TempValue.destroyed) { continue; }
                let TempScript: MagicCubeSource = TempValue.getComponent(MagicCubeSource);
                if (TempScript == null || TempScript.IsDie) continue;
                if (!IsLoop) return TempValue;
                let Dis2 = Laya.Vector3.distance(TempValue.transform.position, m_SceneSprite3d.transform.position);
                if (Dis2 > Dis) {
                    if (ReOnj != null) {
                        if (TempValue != ReOnj) {
                            Dis = Dis2;
                            TempObj = TempValue;
                        }
                    } else {
                        Dis = Dis2;
                        TempObj = TempValue;
                    }

                }
            }
        }
        // Time = new Date().getTime() - Time;
        // console.log("索敌", Time);
        return TempObj;
    }

    GetItem(SceneSprite3d: MagicCubeSource): Laya.Sprite3D {
        let TempObj: Laya.Sprite3D = null;
        let Dis = 9999;
        if (this.ItemList == null) return null;
        if (this.ItemList.length <= 0) return TempObj;
        // 迭代 Map 中的 value
        //let TempArray: Laya.Sprite3D[] = [];
        for (let i = 0; i < this.ItemList.length; i++) {
            if (this.ItemList[i] == null || this.ItemList[i].destroyed || this.ItemList[i].parent == null) { continue; }
            let Dis2 = Laya.Vector3.distance(this.ItemList[i].transform.position, SceneSprite3d.m_SceneSprite3d.transform.position);
            if (Dis2 < Dis) {
                Dis = Dis2;
                TempObj = this.ItemList[i];
            }
        }
        return TempObj;
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
    /**获取道具目标 */
    GetItemTargetByMap(m_SceneSprite3d: MagicCubeSource, Range: number, IsLoop: boolean): Laya.Sprite3D {
        // 迭代 Map 中的 value
        let TempObj: Laya.Sprite3D = null;
        let Dis = 9999;
        switch (this.m_CurBattleType) {
            case WorkType.HuntingType:
                TempObj = this.GetItem(m_SceneSprite3d);// m_SceneSprite3d.GetItemTargetByMap(true);
                break
            case WorkType.Cooperation:
                if (!this.CooperationIsBattle) {
                    if (m_SceneSprite3d.CurGoold >= m_SceneSprite3d.LevelUpGoold) {
                        let DIc = Laya.Vector3.distanceSquared(this.m_BattleRoomData.LevleUpPoint.transform.position, m_SceneSprite3d.m_SceneSprite3d.transform.position);
                        if (DIc < 5) return;
                        return this.m_BattleRoomData.LevleUpPoint;
                    }
                    let CurHp = m_SceneSprite3d.m_AttributeBase.m_Hitpoints;
                    let MaxHp = m_SceneSprite3d.m_AttributeBase.m_MaxHitpoints;
                    if (m_SceneSprite3d.CurGoold >= m_SceneSprite3d.RecoveryGoold && CurHp < MaxHp / 2) {
                        return this.m_BattleRoomData.RecoveryPoint;
                    }
                    if (m_SceneSprite3d.CurGoold >= m_SceneSprite3d.GooldInGoold) {
                        return this.m_BattleRoomData.GoldInPoint;
                    }
                }
                break;
            case WorkType.Sports:
                let RandmIndex = MathUtils.randomRangeInt(1, 100);
                if (RandmIndex < 30) {
                    let CurHp = m_SceneSprite3d.m_AttributeBase.m_Hitpoints;
                    let MaxHp = m_SceneSprite3d.m_AttributeBase.m_MaxHitpoints;
                    if (CurHp < MaxHp / 2) {
                        for (let i = 0; i < this.m_BattleRoomData.FixedHpItemArray.length; i++) {
                            if (this.m_BattleRoomData.FixedHpItemArray[i].EffectsObj != null) {
                                let DIc = Laya.Vector3.distanceSquared(this.m_BattleRoomData.FixedHpItemArray[i].EffectsObj.transform.position, m_SceneSprite3d.m_SceneSprite3d.transform.position);
                                if (DIc < Dis) {
                                    Dis = DIc;
                                    TempObj = this.m_BattleRoomData.FixedHpItemArray[i].EffectsObj;
                                }
                            }
                        }
                        if (TempObj != null) {
                            return TempObj;
                        }
                    }
                }
                for (let i = 0; i < this.m_BattleRoomData.FixedMagicBookArray.length; i++) {
                    if (this.m_BattleRoomData.FixedMagicBookArray[i].EffectsObj != null) {
                        return this.m_BattleRoomData.FixedHpItemArray[i].EffectsObj;
                    }
                }
                break;
        }
        // for (let i = 0; i < this.ItemList.length; i++) {
        //     let TempValue = this.ItemList[i];
        //     if (TempValue == null) { continue; }
        //     let TempScript: MagicCubeSource = TempValue.getComponent(MagicCubeSource);
        //     if (TempScript.IsDie) continue;
        //     let Dis2 = Laya.Vector3.distance(TempValue.transform.position, m_SceneSprite3d.transform.position);
        //     if (Dis2 < Dis) {
        //         Dis = Dis2;
        //         TempObj = TempValue;
        //         if (!IsLoop) return TempValue;
        //     }
        // }
        return TempObj;
    }

    /**根据下标复活玩家 */
    ResurrectionhunterByIndex(Index: number) {
        if (this.RoleList[Index].huhuoCount <= 0) { return; }
        if (this.m_CurBattleType == WorkType.Sports) {
            this.RoleList[Index].huhuoCount--;
        }
        this.RoleList[Index].Init();
        let WordPos = this.m_BattleRoomData.RoleBirthPoint[Index].clone();
        this.RoleList[Index].m_SceneSprite3d.transform.localPosition = new Laya.Vector3(WordPos.x, WordPos.y, WordPos.z);
        this.RoleList[Index].m_SceneSprite3d.transform.localPosition = this.RoleList[Index].m_SceneSprite3d.transform.localPosition;
        if (this.RoleList[Index].m_Enitiy == Enitiy.Role_Type || this.RoleList[Index].m_Enitiy == Enitiy.Boos_Type) {
            let TempCon: Laya.CharacterController = this.RoleList[Index].m_SceneSprite3d.getComponent(Laya.CharacterController);
            if (TempCon != null) {
                TempCon.enabled = true;
            }
            if (this.RoleList[Index].IsPlayerCon) {
                MesManager.event(E_AD_PlayerEvent.PlayerMove, [121]);
            }
            this.RoleList[Index].m_AnimatorManager.ChangeState(EntityState.Idle);
            let AI: AIControl = this.RoleList[Index].m_SceneSprite3d.getComponent(AIControl);
            if (AI != null) {
                AI.Init();
            }
        }
    }

}