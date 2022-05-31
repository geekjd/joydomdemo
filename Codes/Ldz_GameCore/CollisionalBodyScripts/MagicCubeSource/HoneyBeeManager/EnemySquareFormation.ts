import { CooperationSceneProxy } from "src/Game/ConfigProxy/CooperationSceneProxy";
import { EnemyAttributeInfoProxy } from "src/Game/ConfigProxy/EnemyAttributeInfoProxy";
import { ExistenceSceneProxy } from "src/Game/ConfigProxy/ExistenceSceneProxy";
import { HuntingSceneDataProxy } from "src/Game/ConfigProxy/HuntingSceneDataProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { _CooperationSceneDataConfig } from "src/Game/_config/_CooperationSceneDataConfig";
import { _EnemyInfoConfig } from "src/Game/_config/_EnemyInfoConfig";
import { _ExistenceSceneDataConfig } from "src/Game/_config/_ExistenceSceneDataConfig";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import GeneralBase from "src/Ldz_GameCore/GameBuffManager/EffectsBase/EffectsTimer/GeneralBase";
import { CampType, WorkType } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import NavMeshAgent from "src/Ldz_GameCore/NavMesh/NavMeshAgent";
import BattleRoomCon from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomCon";
import { RoleInfo } from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomData";
import MesManager from "src/_T/Mes/MesManager";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import LayaUtils from "src/_T/Utils/LayaUtils";
import MagicCubeSource from "./MagicCubeSource";
import MagicCubeSourceTypeManager from "./MagicCubeSourceTypeManager";


export default class EnemySquareFormation {
    players: Laya.Sprite3D;

    constructor(Index: number, WordPos: Laya.Vector3, TempWorkType: WorkType, PathFinder: Laya.Sprite3D) {
        this.EnemyWordPos = WordPos;
        this.m_WorkType = TempWorkType;
        this.players = PathFinder;
        this.Islodeing = false;
        this.LodeCount = 0;
        this.Eq_EnemyList = [];
        this.MapIndex = 0;
        this.CreatorEnemyInfo = new Map<number, RoleInfo[]>();
        this.readCreatorInfo(Index);
        MesManager.on(ESceneEvent.GameOver, this, this.GameOver);
    }
    GameOver() {
        this.LogicUpdate = false;
    }
    LowFps = false;
    Eq_EnemyList: Laya.Sprite3D[];
    Eq_EnemyListSC: MagicCubeSource[];
    EnemyWordPos: Laya.Vector3;
    EnemyLevle: number = 0;
    m_WorkType: WorkType;
    Islodeing: boolean = false;
    LodeCount: number = 0;
    LogicUpdate: boolean = true;
    CreatorEnemyInfo: Map<number, RoleInfo[]> = new Map<number, RoleInfo[]>();
    MapIndex: number = 0;
    readCreatorInfo(Index: number) {
        switch (this.m_WorkType) {
            case WorkType.Default:
                let Tempdata: RoleInfo = new RoleInfo(_AllPrefabsNames.Toon_Bat, _AllPrefabsNames.Toon_Bat, 1, []);
                let TempdataArray: RoleInfo[] = [];
                TempdataArray.push(Tempdata);
                this.CreatorEnemyInfo.set(0, TempdataArray);
                break;
            case WorkType.HuntingType:
                let TempArray: string[] = HuntingSceneDataProxy.instance.GetEnemyInfoArrayByIndex(Index);
                for (let i = 0; i < TempArray.length; i++) {
                    let MicID: number = Number(TempArray[i]);
                    let TempEnemyData: _EnemyInfoConfig.DataType = EnemyAttributeInfoProxy.instance.GetHeroAttributeInfoByMiscID(MicID);
                    if (TempEnemyData == null) {
                        console.log("没有当前怪物" + MicID);
                    } else {
                        let Tempdata: RoleInfo = new RoleInfo(TempEnemyData.EnemyEnglishName, TempEnemyData.ModeName, 1, []);
                        let TempdataArray: RoleInfo[] = [];
                        TempdataArray.push(Tempdata);
                        this.CreatorEnemyInfo.set(i, TempdataArray);
                    }
                }
                this.CooperationTime = 10;
                break;
            case WorkType.Cooperation:
                let TempCooArray: _CooperationSceneDataConfig.DataType[] = CooperationSceneProxy.instance.GetEnemyInfoArrayByIndex();
                for (let i = 0; i < TempCooArray.length; i++) {
                    let TempEnemyArray = TempCooArray[i].EnemyMiscID.split(',');
                    let TempdataArray: RoleInfo[] = [];
                    for (let j = 0; j < TempEnemyArray.length; j++) {
                        let MicID: number = Number(TempEnemyArray[j]);
                        let Count: number = Number(TempCooArray[i].EnemyCount);
                        let LodeTimer: number = TempCooArray[i].GameLodeTimer;
                        let TempEnemyData: _EnemyInfoConfig.DataType = EnemyAttributeInfoProxy.instance.GetHeroAttributeInfoByMiscID(MicID);
                        if (TempEnemyData == null) {
                            console.log("没有当前怪物" + MicID);
                        } else {
                            let Tempdata: RoleInfo = new RoleInfo(TempEnemyData.EnemyEnglishName, TempEnemyData.ModeName, 1, [], Count, LodeTimer);
                            TempdataArray.push(Tempdata);
                        }
                    }
                    this.CreatorEnemyInfo.set(i, TempdataArray);
                }
                break;
            case WorkType.Existence:
                let ExistenceArray: _ExistenceSceneDataConfig.DataType[] = ExistenceSceneProxy.instance.GetEnemyInfoArrayByIndex();
                for (let i = 0; i < ExistenceArray.length; i++) {
                    let TempEnemyArray = ExistenceArray[i].EnemyMiscID.split(',');
                    let TempdataArray: RoleInfo[] = [];
                    for (let j = 0; j < TempEnemyArray.length; j++) {
                        let MicID: number = Number(TempEnemyArray[j]);
                        let Count: number = Number(ExistenceArray[i].EnemyCount);
                        let LodeTimer: number = ExistenceArray[i].GameLodeTimer;
                        let TempEnemyData: _EnemyInfoConfig.DataType = EnemyAttributeInfoProxy.instance.GetHeroAttributeInfoByMiscID(MicID);
                        if (TempEnemyData == null) {
                            console.log("没有当前怪物" + MicID);
                        } else {
                            let Tempdata: RoleInfo = new RoleInfo(TempEnemyData.EnemyEnglishName, TempEnemyData.ModeName, 1, [], Count, LodeTimer);
                            TempdataArray.push(Tempdata);
                        }
                    }
                    this.CreatorEnemyInfo.set(i, TempdataArray);
                }
                break;
            case WorkType.Sports:
                break;
        }
    }


    /**加载敌人 */
    LodeEnemyEntiny(TempRoleInfo: RoleInfo, WordPos: Laya.Vector3, campType: CampType) {

        let EffUrl = EssentialResUrls.PrefabURL(_AllPrefabsNames.EnemyBath);
        this.LodeCount++;
        this.Islodeing = true;
        ResLoad.Load3D(EffUrl, Laya.Handler.create(this, () => {
            let Effects = ResLoad.GetRes(EffUrl); //MyObjectPool.Instance.GetObjectByPool(_AllPrefabsNames.EnemyBath);
            Effects.transform.position = new Laya.Vector3(WordPos.x, WordPos.y, WordPos.z);
            let Effsc = Effects.getComponent(GeneralBase) as GeneralBase;
            if (Effsc == null) {
                Effsc = Effects.addComponent(GeneralBase) as GeneralBase;
            }
            this.players.addChild(Effects);
            Effsc.Init();
            Effsc.destroyTime = 3;
            Laya.timer.once(2000, this, () => {
                let Url = EssentialResUrls.PrefabURL(TempRoleInfo.m_HeroSkinName);
                ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
                    let Player: Laya.Sprite3D = ResLoad.GetRes(Url);// MyObjectPool.Instance.GetObjectByPool(TempRoleInfo.m_HeroSkinName);
                    let ScTempbee: MagicCubeSource = Player.getComponent(MagicCubeSource);
                    if (ScTempbee == null) {
                        ScTempbee = Player.addComponent(MagicCubeSourceTypeManager.Instance.GetTypeByName(TempRoleInfo.m_HeroName));
                    }
                    //let Player = ResLoad.GetRes(Url) as Laya.Sprite3D;
                    if (ScTempbee != null) {
                        ScTempbee.LowFps = this.LowFps;
                        ScTempbee.m_CampType = campType;
                        ScTempbee.m_WorkType = this.m_WorkType;
                        ScTempbee.Init(TempRoleInfo.m_HeroLevel);
                        this.players.addChild(Player);
                        Player.transform.position = new Laya.Vector3(WordPos.x, WordPos.y, WordPos.z);
                        Player.transform.position = Player.transform.position;
                        ScTempbee.m_FinderAgent = new NavMeshAgent(Player);
                        ScTempbee.m_FinderAgent.LowFps = this.LowFps;
                        switch (ScTempbee.m_WorkType) {
                            case WorkType.Default:
                                ScTempbee.m_FinderAgent.Init(1);
                                break;
                            case WorkType.HuntingType:
                                ScTempbee.m_FinderAgent.Init(2);
                                break;
                            case WorkType.Cooperation:
                                ScTempbee.m_FinderAgent.Init(3);
                                break;
                            case WorkType.Existence:
                                ScTempbee.m_FinderAgent.Init(4);
                                break;
                            case WorkType.Sports:
                                ScTempbee.m_FinderAgent.Init(5);
                                break;
                        }
                        // ScTempbee.m_FinderAgent = new FinderAgent(this.m_GamePathFinder.finder, Player, this.m_GamePathFinder.simulator, 5, 0.2, false);
                        //ScTempbee.m_FinderAgent.agent.position = new Vector2D(Player.transform.localPositionX, Player.transform.localPositionZ);
                        //ScTempbee.m_FinderAgent.lastPos = new Vector2D(Player.transform.localPositionX, Player.transform.localPositionZ);
                        ScTempbee.UpdateMag = this.LogicUpdate;
                        //ScTempbee.m_AnimatorManager.IsUpdate = false;
                        ScTempbee.M_RoleList_Con = BattleRoomCon.Instance.RoleList;
                        ScTempbee.m_EnemyList_Con = BattleRoomCon.Instance.EnemyList;
                        //this.m_GamePathFinder.agentMap.push(ScTempbee.m_FinderAgent);
                        switch (ScTempbee.m_WorkType) {
                            case WorkType.Cooperation:
                                if (BattleRoomCon.Instance.KingScript == null || BattleRoomCon.Instance.KingScript.m_DamageData == null) {
                                    Player.destroy();
                                    return;
                                }
                                ScTempbee.m_TargetDamageData = BattleRoomCon.Instance.KingScript.m_DamageData.Clone();
                                break;
                            case WorkType.Existence:
                                if (BattleRoomCon.Instance.RoleConList == null || BattleRoomCon.Instance.RoleConList.m_PlayerBeeCon == null) {
                                    Player.destroy();
                                    return;
                                }
                                ScTempbee.m_TargetDamageData = BattleRoomCon.Instance.RoleConList.m_PlayerBeeCon.m_DamageData.Clone();
                                break;
                        }
                        this.Eq_EnemyList.push(Player);
                        //this.Eq_EnemyListSC.push(ScTempbee);
                        this.LodeCount--;
                        if (this.LodeCount <= 0) {
                            this.Islodeing = false;
                        }
                    }
                }));
            });
        }));
    }
    UpdateSquareFormation(GameTime: number = 0) {
        if (this.Islodeing) { return; }
        //if (!this.LogicUpdate) return;
        switch (this.m_WorkType) {
            case WorkType.Default:
                this.CreatorNoviceEnemy();
                break;
            case WorkType.HuntingType:
                this.CreatorHuntingEnemy();
                break;
            case WorkType.Cooperation:
                //this.CreatorCooperationEnemy();
                break;
            case WorkType.Existence:
                this.CreatorExistenceEnemy(GameTime);
                break;
            case WorkType.Sports:
                this.CreatorSportsEnemy();
                break;
        }
        //console.log(this.EnemyList.length);
    }

    /**创建新手场景敌人 */
    CreatorNoviceEnemy() {
        this.CheckListIsNull();
        if (this.Eq_EnemyList.length > 5) { return; }
        let TempRoleInfo: RoleInfo = this.CreatorEnemyInfo[0];
        this.LodeEnemyEntiny(TempRoleInfo, this.EnemyWordPos.clone(), CampType.Red_Camp);

    }

    /**创建狩猎场景敌人 */
    CreatorHuntingEnemy() {
        this.CheckListIsNull();
        if (this.Eq_EnemyList.length != 0) { return; }
        this.CooperationTime += (LayaUtils.deltaTime / 1000);
        if (this.CooperationTime > 5) {
            this.CooperationTime = 0;
            if (this.MapIndex < this.CreatorEnemyInfo.size) {
                let TempRoleInfo: RoleInfo[] = this.CreatorEnemyInfo.get(this.MapIndex);
                if (TempRoleInfo) {
                    for (let i = 0; i < TempRoleInfo.length; i++) {
                        this.LodeEnemyEntiny(TempRoleInfo[i], this.EnemyWordPos.clone(), CampType.Red_Camp);
                    }
                    this.MapIndex++;
                }
            }
        }
    }

    CooperationTime: number = 0;

    /**创建合作模式敌人 */
    CreatorCooperationEnemy() {

    }

    /**创建生存场景敌人 */
    CreatorExistenceEnemy(GameTime: number = 0) {

    }

    /**创建竞技场景敌人 */
    CreatorSportsEnemy() {

    }

    CheckListIsNull() {
        let TempEnemyList: Laya.Sprite3D[] = [];
        for (let i = 0; i < this.Eq_EnemyList.length; i++) {
            if (this.Eq_EnemyList[i] != null && !this.Eq_EnemyList[i].destroyed && this.Eq_EnemyList[i].parent != null) {
                TempEnemyList.push(this.Eq_EnemyList[i]);
            }
        }
        this.Eq_EnemyList = [];
        this.Eq_EnemyList = [...TempEnemyList];
    }

}