import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import { HeroAchievementInfo } from "src/Game/Data/type/HunterHeroInfoData";
import AudioProxy from "src/Game/Manager/AudioProxy";
import AudioUtils from "src/Game/Manager/AudioUtils";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { EMusics } from "src/Game/ResE/EMusics";
import { PGameFitingPlanProxy } from "src/Game/UICon/GameMianCom/PGameFitingPlanProxy";
import PGameLoadingMediator from "src/Game/UICon/GameMianCom/PGameLoadingMediator";
import { PGameMainProxy } from "src/Game/UICon/GameMianCom/PGameMainProxy";
import MyObjectPool from "src/Ldz_GameCore/GeneralScripts/MyObjectPool";
import TextManager from "src/Ldz_GameCore/GeneralScripts/TextManager";
import CameraControl from "src/Ldz_GameCore/PlayerCore/CameraControl";
import ResourcePropsManager from "src/Ldz_GameCore/ResourceProps/ResourcePropsManager";
import BattleRoomCon from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomCon";
import { RoleInfo } from "src/Ldz_GameCore/SceneScripts/BattleScene/BattleRoomData";
import InterfaceScene from "src/Ldz_GameCore/SceneScripts/InterfaceScene";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import SceneNode from "src/_T/D3/scene/SceneNode";
import MesManager from "src/_T/Mes/MesManager";
import { LevelManager } from "./LevelManager";

export default class Game3DSceneManager extends Laya.Script3D {

    Init() {
        MesManager.on(ESceneEvent.LodeMainScene, this, this.LodeStarScene);                 //开始场景
        MesManager.on(ESceneEvent.LodeNoviceScene, this, this.LodeNoviceScene);             //新手场景
        MesManager.on(ESceneEvent.LodeHuntingScene, this, this.LodeHuntingScene);           //狩猎场景
        MesManager.on(ESceneEvent.LodeCooperationScene, this, this.LodeCooperationScene);   //合作场景
        MesManager.on(ESceneEvent.LodeExistenceScene, this, this.LodeExistenceScene);       //生存场景
        MesManager.on(ESceneEvent.LodeSportsScene, this, this.LodeSportsScene);             //竞技场景
        TextManager.Instance.InitEvent();
        Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
    }
    //#region 主场景
    /**主场景字段 */
    /**人物控制脚本 */
    TempInterfaceScene: InterfaceScene;
    IsUpdate: boolean = false;

    FPSLow: number = 30;
    /**加载主场景 */
    LodeStarScene() {
        //QddSDKHelper.instance.hideBannerAd();
        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioUtils.instance.Camera = null;
        GlobalD3Environment.Camera.active = true;
        GlobalD3Environment.Camera.enableRender = true;
        AudioProxy.instance.stopMusic();
        MesManager.event(EUIEvent.HideAll);
        BattleRoomCon.Instance.EnemyList = null;
        HeroBuffDataProxy.instance;
        PGameMainProxy.instance.Hide();
        PGameFitingPlanProxy.instance.Hide();

        LevelManager.LoadLevel(0, Laya.Handler.create(this, this.MainSceneLodeRe), EUIEvent.OnLevelLoad);
    }
    /**主场景加载完毕返回方法 */
    MainSceneLodeRe(level: SceneNode) {

        GlobalD3Environment.Camera.active = true;
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**开启加载是否完毕检测 */
        MesManager.event(EUIEvent.ShowUIMain);
        this.TempInterfaceScene = new InterfaceScene();
        this.TempInterfaceScene.InitInterface(level);
        MyObjectPool.Instance.ShdaerDebug();
        Laya.timer.loop(10, this, this.CheckWhetherLoadingIsCompleted);
    }
    /**检测主场景是否加载完毕 */
    CheckWhetherLoadingIsCompleted(level: SceneNode) {
        // 
        if (this.TempInterfaceScene.IsLodeBcak) {
            Laya.timer.once(1, this, () => {
                MesManager.event(EUIEvent.ShowHome);
                AudioProxy.instance.playMusic(EMusics.game_music);
            });
            PGameLoadingMediator.instance.Close();
            this.IsUpdate = true;
            Laya.timer.clear(this, this.CheckWhetherLoadingIsCompleted);
        }

    }
    //#endregion
    /**分界线----------------------------------------------------------------------------------------- */

    //#region 新手场景

    /**加载新手引导场景 */
    LodeNoviceScene() {
        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioProxy.instance.stopMusic();
        HeroBuffDataProxy.instance;
        MesManager.event(EUIEvent.HideAll);
        PGameMainProxy.instance.Hide();
        PGameFitingPlanProxy.instance.Hide();
        LevelManager.LoadLevel(1, Laya.Handler.create(this, this.LodeNoviceSceneRe), EUIEvent.ShowNoviceLoding);
    }
    LodeNoviceSceneRe(level: SceneNode) {
        //设置并获取房间节点
        GlobalD3Environment.Camera.active = false;
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**地图雷达 */
        //MapCameraCon.Instance.InitMapCamera(level);
        /**开启加载是否完毕检测 */
        BattleRoomCon.Instance.InitBattleRooom(level, 1);
        let TempRole = new RoleInfo(HunterGameDataMediator.instance.data.SelectHunterName,
            HunterGameDataMediator.instance.data.SelectHunterSkinName,
            HunterGameDataMediator.instance.data.SelectHunterLevel,
            HunterGameDataMediator.instance.data.SelectHunterSkillMiscID);

        BattleRoomCon.Instance.m_BattleRoomData.SetPlayerRoleInfo(TempRole);
        BattleRoomCon.Instance.CreatorNoviceLevle();
        MesManager.event(EUIEvent.ShowBattleUIm);
        Laya.timer.loop(10, this, this.CheckNoviceSceneIsCompleted);
    }

    /**检测新手场景是否加载完毕 */
    CheckNoviceSceneIsCompleted() {
        if (BattleRoomCon.Instance.GameIsStar) {
            MesManager.event(EUIEvent.CloseNoviceLoding);
            AudioProxy.instance.playMusic(EMusics.game_music);
            BattleRoomCon.Instance.StarStep();
            Laya.timer.clear(this, this.CheckNoviceSceneIsCompleted);
            this.IsUpdate = true;
        }
        // 
    }

    //#endregion

    /**分界线----------------------------------------------------------------------------------------- */
    //#region 狩猎模式场景
    /**加载狩猎模式场景 */
    LodeHuntingScene() {

        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioProxy.instance.stopMusic();
        HeroBuffDataProxy.instance;
        MesManager.event(EUIEvent.HideAll);
        console.log('  PGameMainProxy.instance.Hide  before  ');
        PGameMainProxy.instance.Hide();
        console.log('  PGameMainProxy.instance.Hide  after  ');
        PGameFitingPlanProxy.instance.Hide();
        console.log('  PGameFitingPlanProxy.instance.Hide()  after  ');
        LevelManager.LoadLevel(2, Laya.Handler.create(this, this.LodeHuntingSceneRe), EUIEvent.ShowBattleLoding);
    }
    LodeHuntingSceneRe(level: SceneNode) {
        GlobalD3Environment.Camera.active = false;
        MyObjectPool.Instance.InitObjects();
        MyObjectPool.Instance.ClearAll();
        //设置并获取房间节点
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**地图雷达 */
        //MapCameraCon.Instance.InitMapCamera(level);
        /**开启加载是否完毕检测 */
        BattleRoomCon.Instance.InitBattleRooom(level, 2);
        let Info: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(HunterGameDataMediator.instance.data.SelectHunterMiscID);

        let TempRole = new RoleInfo(Info.HeroEnName,
            Info.HeroUsingSkin,
            Info.HeroLevel,
            [Info.LevelSixSkills, Info.LevelEightSkills, Info.LevelTenSkills]);
        BattleRoomCon.Instance.m_BattleRoomData.SetPlayerRoleInfo(TempRole);

        MesManager.event(EUIEvent.ShowBattleUIm);
        Laya.timer.loop(10, this, this.HuntingSceneCheck);
    }
    HuntingSceneCheck() {
        if (MyObjectPool.Instance.InstanceResCount == 0 && !BattleRoomCon.Instance.m_NavMeshMap.Isloding) {
            // MyObjectPool.Instance.InstanceObj();
            BattleRoomCon.Instance.CreatorHuntingLevle();
            BattleRoomCon.Instance.StarStep();
            this.IsUpdate = true;
            Laya.timer.loop(10, this, this.CheckHuntingSceneIsCompleted);
            Laya.timer.clear(this, this.HuntingSceneCheck);
        }
    }
    /**检测狩猎场景是否加载完毕 */
    CheckHuntingSceneIsCompleted() {
        if (BattleRoomCon.Instance.GameIsStar && MyObjectPool.Instance.InstanceCount == 0 && BattleRoomCon.Instance.CheckEnemyLoding()) {
            BattleRoomCon.Instance.SetRolelist();
            Laya.timer.once(2000, this, () => {
                console.log("游戏帧数", Laya.Stat.FPS);
                if (Laya.Stat.FPS < this.FPSLow) {
                    console.log("游戏帧数低进行屏蔽");
                    BattleRoomCon.Instance.Evene_1.destroy();
                    //BattleRoomCon.Instance.Evene_2.destroy();//
                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.None;
                    BattleRoomCon.Instance.SetLowFPSShow();
                } else {
                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.SoftHigh;
                    BattleRoomCon.Instance.SetRoleMe(false);
                    //BattleRoomCon.Instance.Evene_1.destroy();//
                    BattleRoomCon.Instance.Evene_2.destroy();
                }
                BattleRoomCon.Instance.SetGameStarLogic();
                // PGameFitingPlanProxy.instance.ShowGameStar();
                MesManager.event(EUIEvent.CloseBattleLoding);
            });
            Laya.timer.clear(this, this.CheckHuntingSceneIsCompleted);
        }
        // 
    }
    //#endregion
    /**分界线----------------------------------------------------------------------------------------- */

    //#region 合作模式场景
    /**加载合作模式场景 */
    LodeCooperationScene() {
        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioProxy.instance.stopMusic();
        HeroBuffDataProxy.instance;
        MesManager.event(EUIEvent.HideAll);
        PGameMainProxy.instance.Hide();
        PGameFitingPlanProxy.instance.Hide();
        LevelManager.LoadLevel(3, Laya.Handler.create(this, this.LodeCooperationSceneRe), EUIEvent.OnLevelLoad, true);
    }

    LodeCooperationSceneRe(level: SceneNode) {

        MyObjectPool.Instance.InitObjects();
        MyObjectPool.Instance.ClearAll();
        GlobalD3Environment.Camera.active = false;
        //设置并获取房间节点
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**地图雷达 */
        //MapCameraCon.Instance.InitMapCamera(level);
        /**开启加载是否完毕检测 */
        BattleRoomCon.Instance.InitBattleRooom(level, 3);
        let TempRole = new RoleInfo(HunterGameDataMediator.instance.data.SelectHunterName,
            HunterGameDataMediator.instance.data.SelectHunterSkinName,
            HunterGameDataMediator.instance.data.SelectHunterLevel,
            HunterGameDataMediator.instance.data.SelectHunterSkillMiscID);
        BattleRoomCon.Instance.m_BattleRoomData.SetPlayerRoleInfo(TempRole);

        MesManager.event(EUIEvent.ShowBattleUIm);
        /**  关掉 开场动画UI */
        // PGameFitingPlanProxy.instance.ui.m_ray.visible = false;
        Laya.timer.loop(10, this, this.CooperationSceneCheck);
        //MyObjectPool.Instance.InstanceObj();
    }
    CooperationSceneCheck() {
        if (MyObjectPool.Instance.InstanceResCount == 0 && !BattleRoomCon.Instance.m_NavMeshMap.Isloding) {
            // MyObjectPool.Instance.InstanceObj();
            BattleRoomCon.Instance.CreatorCooperationLevle();
            BattleRoomCon.Instance.StarStep();
            this.IsUpdate = true;
            Laya.timer.loop(10, this, this.CheckCooperationSceneIsCompleted);
            Laya.timer.clear(this, this.CooperationSceneCheck);
        }
    }
    /**检测合作场景是否加载完毕 */
    CheckCooperationSceneIsCompleted() {
        if (BattleRoomCon.Instance.GameIsStar && MyObjectPool.Instance.InstanceCount == 0 && BattleRoomCon.Instance.CheckEnemyLoding()) {
            BattleRoomCon.Instance.SetRolelist();
            Laya.timer.once(2000, this, () => {
                console.log("游戏帧数", Laya.Stat.FPS);
                PGameLoadingMediator.instance.Close();
                if (Laya.Stat.FPS < this.FPSLow) {
                    console.log("游戏帧数低进行屏蔽");

                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.None;
                    BattleRoomCon.Instance.SetLowFPSShow();
                } else {

                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.SoftHigh;
                    BattleRoomCon.Instance.SetRoleMe(false);
                }
                BattleRoomCon.Instance.SetGameStarLogic();
            });
            Laya.timer.clear(this, this.CheckCooperationSceneIsCompleted);
        }
    }
    //#endregion

    //#region 生存模式场景
    /**加载生存模式场景 */
    LodeExistenceScene() {
        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioProxy.instance.stopMusic();
        HeroBuffDataProxy.instance;
        MesManager.event(EUIEvent.HideAll);
        PGameMainProxy.instance.Hide();
        PGameFitingPlanProxy.instance.Hide();
        LevelManager.LoadLevel(4, Laya.Handler.create(this, this.LodeExistenceSceneRe), EUIEvent.OnLevelLoad, true);
    }

    LodeExistenceSceneRe(level: SceneNode) {

        MyObjectPool.Instance.InitObjects();
        MyObjectPool.Instance.ClearAll();
        GlobalD3Environment.Camera.active = false;
        //设置并获取房间节点
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**地图雷达 */
        //MapCameraCon.Instance.InitMapCamera(level);
        /**开启加载是否完毕检测 */
        BattleRoomCon.Instance.InitBattleRooom(level, 4);
        let TempRole = new RoleInfo(HunterGameDataMediator.instance.data.SelectHunterName,
            HunterGameDataMediator.instance.data.SelectHunterSkinName,
            HunterGameDataMediator.instance.data.SelectHunterLevel,
            HunterGameDataMediator.instance.data.SelectHunterSkillMiscID);
        BattleRoomCon.Instance.m_BattleRoomData.SetPlayerRoleInfo(TempRole);

        MesManager.event(EUIEvent.ShowBattleUIm);
        /**  关掉 开场动画UI */
        // PGameFitingPlanProxy.instance.ui.m_ray.visible = false;
        Laya.timer.loop(10, this, this.ExistenceSceneCheck);
        //MyObjectPool.Instance.InstanceObj();
    }
    ExistenceSceneCheck() {
        if (MyObjectPool.Instance.InstanceResCount == 0 && !BattleRoomCon.Instance.m_NavMeshMap.Isloding) {
            // MyObjectPool.Instance.InstanceObj();
            BattleRoomCon.Instance.CreatorExistenceLevle();
            BattleRoomCon.Instance.StarStep();
            this.IsUpdate = true;
            Laya.timer.loop(10, this, this.CheckExistenceSceneIsCompleted);
            Laya.timer.clear(this, this.ExistenceSceneCheck);
        }
    }
    /**检测合作场景是否加载完毕 */
    CheckExistenceSceneIsCompleted() {
        if (BattleRoomCon.Instance.GameIsStar && MyObjectPool.Instance.InstanceCount == 0 && BattleRoomCon.Instance.CheckEnemyLoding()) {
            BattleRoomCon.Instance.SetRolelist();
            Laya.timer.once(2000, this, () => {
                console.log("游戏帧数", Laya.Stat.FPS);
                PGameLoadingMediator.instance.Close();
                if (Laya.Stat.FPS < this.FPSLow) {
                    console.log("游戏帧数低进行屏蔽");

                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.None;
                    BattleRoomCon.Instance.SetLowFPSShow();
                } else {

                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.SoftHigh;
                    BattleRoomCon.Instance.SetRoleMe(false);
                }
                BattleRoomCon.Instance.SetGameStarLogic();
            });
            Laya.timer.clear(this, this.CheckExistenceSceneIsCompleted);
        }
    }
    //#endregion


    //#region 竞技模式场景
    /**加载竞技模式场景 */
    LodeSportsScene() {
        this.IsUpdate = false;
        BattleRoomCon.Instance.StopStep();
        AudioProxy.instance.stopMusic();
        HeroBuffDataProxy.instance;
        MesManager.event(EUIEvent.HideAll);
        PGameMainProxy.instance.Hide();
        PGameFitingPlanProxy.instance.Hide();
        LevelManager.LoadLevel(5, Laya.Handler.create(this, this.LodeSportsSceneRe), EUIEvent.OnLevelLoad, true);
    }

    LodeSportsSceneRe(level: SceneNode) {

        MyObjectPool.Instance.InitObjects();
        MyObjectPool.Instance.ClearAll();
        GlobalD3Environment.Camera.active = false;
        //设置并获取房间节点
        /**初始化资源管理器 */
        ResourcePropsManager.Instance.Init();
        //摄像机控制器初始化
        CameraControl.Instance.Init();
        /**地图雷达 */
        //MapCameraCon.Instance.InitMapCamera(level);
        /**开启加载是否完毕检测 */
        BattleRoomCon.Instance.InitBattleRooom(level, 5);
        let TempRole = new RoleInfo(HunterGameDataMediator.instance.data.SelectHunterName,
            HunterGameDataMediator.instance.data.SelectHunterSkinName,
            HunterGameDataMediator.instance.data.SelectHunterLevel,
            HunterGameDataMediator.instance.data.SelectHunterSkillMiscID);
        BattleRoomCon.Instance.m_BattleRoomData.SetPlayerRoleInfo(TempRole);

        MesManager.event(EUIEvent.ShowBattleUIm);
        /**  关掉 开场动画UI */
        // PGameFitingPlanProxy.instance.ui.m_ray.visible = false;

        Laya.timer.loop(10, this, this.SportsSceneCheck);
        //MyObjectPool.Instance.InstanceObj();
    }
    SportsSceneCheck() {

        if (MyObjectPool.Instance.InstanceResCount == 0 && !BattleRoomCon.Instance.m_NavMeshMap.Isloding) {
            // MyObjectPool.Instance.InstanceObj();
            BattleRoomCon.Instance.CreatorSportsLevle();
            BattleRoomCon.Instance.StarStep();
            this.IsUpdate = true;
            Laya.timer.loop(10, this, this.CheckSportsSceneIsCompleted);
            Laya.timer.clear(this, this.SportsSceneCheck);
        }
    }
    /**检测合作场景是否加载完毕 */
    CheckSportsSceneIsCompleted() {
        if (BattleRoomCon.Instance.GameIsStar && MyObjectPool.Instance.InstanceCount == 0 && BattleRoomCon.Instance.CheckEnemyLoding()) {
            BattleRoomCon.Instance.SetRolelist();
            Laya.timer.once(2000, this, () => {
                console.log("游戏帧数", Laya.Stat.FPS);
                PGameLoadingMediator.instance.Close();
                if (Laya.Stat.FPS < this.FPSLow) {
                    console.log("游戏帧数低进行屏蔽");
                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.None;
                    BattleRoomCon.Instance.SetLowFPSShow();
                } else {
                    GlobalD3Environment.Light.shadowMode = Laya.ShadowMode.SoftHigh;
                    BattleRoomCon.Instance.SetRoleMe(false);
                }
                BattleRoomCon.Instance.SetGameStarLogic();
            });
            Laya.timer.clear(this, this.CheckSportsSceneIsCompleted);
        }
    }
    //#endregion

    private AddComponent(list: Laya.Node[], script) {
        if (list && (list.length > 0)) {
            list.forEach(obj => obj.addComponent(script));
        }
    }

    onUpdate() {
        //if (!this.IsUpdate) return;
        BattleRoomCon.Instance.UpdateLogic();

    }

    onLateUpdate() {
        if (!BattleRoomCon.Instance.GameIsStar || BattleRoomCon.Instance.GameIsOver) { return; }
        //BattleRoomCon.Instance.UpdateMove();
        CameraControl.Instance.UpdateCamera();
    }

}