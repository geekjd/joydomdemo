import FGUI_PHuntTask from "src/FGUI/GameMain/FGUI_PHuntTask";
import FGUI_taskItemCom from "src/FGUI/GameMain/FGUI_taskItemCom";
import { EnemyAttributeInfoProxy } from "src/Game/ConfigProxy/EnemyAttributeInfoProxy";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _AchievementTasksConfig } from "src/Game/_config/_AchievementTasksConfig";
import { _EnemyInfoConfig } from "src/Game/_config/_EnemyInfoConfig";
import { _EverydayTasksConfig } from "src/Game/_config/_EverydayTasksConfig";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import { _WeeklyTasksConfig } from "src/Game/_config/_WeeklyTasksConfig";
import { ApkDefine } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import AchievementTask from "src/Ldz_GameCore/TaskSystem/AchievementTask";
import EverdyTask from "src/Ldz_GameCore/TaskSystem/EverdyTask";
import TaskManager from "src/Ldz_GameCore/TaskSystem/TaskManager";
import WeeklyTask from "src/Ldz_GameCore/TaskSystem/WeeklyTask";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import { GameHomeProxy } from "./GameHomeProxy";
import { PGameMainProxy } from "./PGameMainProxy";


enum EPAGE {
    eEveryday,//每日
    eEveryweek,//每周
    eAnimalFable,//动物寓言
}

enum ETASKSTATE {
    eProcessing,//进行中
    eAvailable,//可获取奖励
    eComplete,//已完成
}
@InstanceT.DecorateInstance()
//设置界面
export class PHuntTaskProxy extends BaseSingleUICon<FGUI_PHuntTask> {
    public static readonly instance: PHuntTaskProxy;
    protected _UI = FGUI_PHuntTask;
    protected _layer = EUILayer.Panel;
    public curPage = EPAGE.eEveryday;
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowHuntTaskPanel, this, this.Show);
    }

    Achievementcount = 0;
    EveryDayCount = 0;
    WeeklyCount = 0;
    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_taskBoard.m_everyDayList.visible = false;
        this.ui.m_taskBoard.m_everyWeekList.visible = false;
        this.ui.m_taskBoard.m_animalFableList.visible = false;
        this.ui.m_taskBoard.m_ad.visible = false;
        this.ui.m_taskBoard.m_everyDayBtn.m_highLight.visible = false;
        this.ui.m_taskBoard.m_everyWeekBtn.m_highLight.visible = false;
        this.ui.m_taskBoard.m_animalFableBtn.m_highLight.visible = false;
        /**关闭按钮 */
        this.ui.m_taskBoard.m_closeBtn.onClick(this, this.OnCloseBtnClick)
        /**每日按钮 */
        this.ui.m_taskBoard.m_everyDayBtn.onClick(this, this.SwitchPage, [EPAGE.eEveryday]);
        this.ui.m_taskBoard.m_everyDayBtn.m_taskType.text = "每日";
        /**每周按钮 */
        this.ui.m_taskBoard.m_everyWeekBtn.onClick(this, this.SwitchPage, [EPAGE.eEveryweek]);
        this.ui.m_taskBoard.m_everyWeekBtn.m_taskType.text = "每周";
        /**动物寓言按钮 */
        this.ui.m_taskBoard.m_animalFableBtn.onClick(this, this.SwitchPage, [EPAGE.eAnimalFable]);
        this.ui.m_taskBoard.m_animalFableBtn.m_taskType.text = "动物寓言";

        this.ui.m_taskBoard.m_everyDayBtn.onClick(this, this.PlayerSuond);
        this.ui.m_taskBoard.m_everyWeekBtn.onClick(this, this.PlayerSuond);
        this.ui.m_taskBoard.m_animalFableBtn.onClick(this, this.PlayerSuond);

        /**每日任务 */
        this.ui.m_taskBoard.m_everyDayList.itemRenderer = Laya.Handler.create(this, this.EveryDayRenderHander, null, false);
        this.RefreshEveryDayListLength();
        /**每周任务 */
        this.ui.m_taskBoard.m_everyWeekList.itemRenderer = Laya.Handler.create(this, this.WeeklyRenderHander, null, false);
        this.RefreshWeeklyListLength();
        /**怪物预言 */
        this.ui.m_taskBoard.m_animalFableList.itemRenderer = Laya.Handler.create(this, this.AchievementRenderHander, null, false);
        this.RefreshAchievementListLength();

        /**视屏任务 */
        this.SetAudioTaskInfo();
        this.SwitchPage(this.curPage);
        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_taskBoard.m_ad.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        // }

        /** 场景切换弹插屏或原生插屏广告（vivo只有复活，暂停和结算界面能展示插屏）*/
        // if (QddSDKHelper.TestSwitchAll) {
        //     this.JudgeShowInsertAd();

        // }

    }
    public JudgeShowInsertAd() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         /**  原生模板广告*/
        //         this.WXAndQq40();
        //         break;
        //     case PlatformEnum.Qq:
        //         this.WXAndQq40();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         this.Showinteres100();
        //         break;
        //     case PlatformEnum.Oppo:
        //         this.Showinteres100();
        //         break;
        //     case PlatformEnum.Vivo:
        //         /**deny */
        //         break;
        //     case PlatformEnum.HuaWei:
        //         this.Showinteres100();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         this.Showinteres100();
        //         break;
        // }
        // if (QddSDKHelper.instance.isNativeMI()) {
        //     let optionalXiaoMiNative: {
        //         parentNode: undefined
        //         resultCallback: undefined
        //         closeCallback: undefined
        //         probability: 80,
        //     }
        //     QddSDKHelper.instance.showIntertAd(optionalXiaoMiNative);
        // }
        // if (QddSDKHelper.instance.isNativeOppo() || QddSDKHelper.instance.isNativeM4399() || QddSDKHelper.instance.isNativeVivo() || QddSDKHelper.isNativeTwoThreeThree()) {
        //     let optionalXiaoMiNative: {
        //         parentNode: undefined
        //         resultCallback: undefined
        //         closeCallback: undefined
        //         probability: 100,
        //     }
        //     // optionalXiaoMiNative['resultCallback'] = (resultCode: boolean) => {
        //     //     /** 如果显示插屏不陈宫*/
        //     //     console.log('  插屏显示结果resultCode==', resultCode);
        //     //     if (!resultCode) {
        //     //         let optionalXiaoMiNative2: {
        //     //             parentNode: undefined
        //     //             resultCallback: undefined,
        //     //             closeCallback: undefined
        //     //             probability: 100,
        //     //         }

        //     //     }
        //     // };
        //     console.log("打开小米APP插屏");
        //     QddSDKHelper.instance.showIntertAd(optionalXiaoMiNative)
        //     //QddSDKHelper.instance.showNativeInsertAd(optionalXiaoMiNative);
        // }


    }
    /**插屏 */
    public WXAndQq40() {
        // let optional = {
        //     parentNode: undefined,
        //     resultCallback: undefined,
        //     closeCallback: undefined,
        //     probability: 40,
        // }
        // QddSDKHelper.instance.showIntertAd(optional);
    }

    public Showinteres100() {
        // let optional = {
        //     parentNode: undefined,
        //     resultCallback: undefined,
        //     closeCallback: undefined,
        //     probability: 100,
        // }
        // QddSDKHelper.instance.showIntertAd(optional);
    }

    PlayerSuond() {
        AudioProxy.instance.playSound(ESounds.click, 1);
    }
    /**切换页面 */
    SwitchPage(page: EPAGE) {
        this.curPage = page;
        this.ui.m_taskBoard.m_everyDayList.visible = false;
        this.ui.m_taskBoard.m_everyWeekList.visible = false;
        this.ui.m_taskBoard.m_animalFableList.visible = false;
        this.ui.m_taskBoard.m_ad.visible = false;
        this.ui.m_taskBoard.m_everyDayBtn.m_highLight.visible = false;
        this.ui.m_taskBoard.m_everyWeekBtn.m_highLight.visible = false;
        this.ui.m_taskBoard.m_animalFableBtn.m_highLight.visible = false;
        switch (page) {
            case EPAGE.eEveryday:
                this.ui.m_taskBoard.m_everyDayList.visible = true;
                this.ui.m_taskBoard.m_ad.visible = true;
                this.ui.m_taskBoard.m_everyDayBtn.m_highLight.visible = true;
                this.ui.m_taskBoard.m_tipsBtnpp.visible = true;
                break;
            case EPAGE.eEveryweek:
                this.ui.m_taskBoard.m_everyWeekList.visible = true;
                this.ui.m_taskBoard.m_ad.visible = true;
                this.ui.m_taskBoard.m_everyWeekBtn.m_highLight.visible = true;
                this.ui.m_taskBoard.m_tipsBtnpp.visible = true;
                break;
            case EPAGE.eAnimalFable:
                this.ui.m_taskBoard.m_animalFableList.visible = true;
                this.ui.m_taskBoard.m_ad.visible = false;
                this.ui.m_taskBoard.m_animalFableBtn.m_highLight.visible = true;
                this.ui.m_taskBoard.m_tipsBtnpp.visible = false;
                break;
            default:
                break;
        }
    }

    // public ShowTotalWatchPanel() {
    //     this.ui.m_taskBoard.m_watchTimes.visible = true;
    // }


    /**关闭当前界面 */
    public OnCloseBtnClick() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
        PGameMainProxy.instance.SetTaskCount();

    }
    /**设置视频任务 */
    SetAudioTaskInfo() {
        /**获取任务类型 */
        let AudioTask: EverdyTask = TaskManager.Instance.GetAudioTask();
        let State = AudioTask.GetTaskState();
        /**获取任务配置表数据 */
        let Data: _EverydayTasksConfig.DataType = AudioTask.TaskData;
        this.ui.m_taskBoard.m_ad.m_adProgress.max = Data.RequirementValue;
        this.ui.m_taskBoard.m_ad.m_adProgress.value = Data.CurNum;
        this.ui.m_taskBoard.m_ad.m_adProgress.m_ratio.text = this.ui.m_taskBoard.m_ad.m_adProgress.value.toString() + "/" + this.ui.m_taskBoard.m_ad.m_adProgress.max;
        this.ui.m_taskBoard.m_ad.m_getBtn.offClick(this, this.GetAudioTaskReward);
        switch (State) {
            case 0:
                this.ui.m_taskBoard.m_ad.m_State.selectedIndex = 0;
                break;
            case 1:
                this.ui.m_taskBoard.m_ad.m_State.selectedIndex = 1;
                this.ui.m_taskBoard.m_ad.m_getBtn.onClick(this, this.GetAudioTaskReward, [AudioTask]);
                break;
            case -1:
                this.ui.m_taskBoard.m_ad.m_State.selectedIndex = 2;
                break;
        }
    }
    /**获取广告任务奖励 */
    GetAudioTaskReward(Data: EverdyTask) {
        AudioProxy.instance.playSound(ESounds.click, 1);

        MesManager.event(EUIEvent.ShowRewardPanel, [Data.m_ResData.ItemMiscID]);
        TaskManager.Instance.SetAudioTaskState();
        this.SetAudioTaskInfo();
    }

    /**设置任务面板 */
    SetItemPlanInfo(Temp: any, Data: any, Item: FGUI_taskItemCom) {
        /**获取任务限定人信息 */
        let Hunter: _HeroAttributeInfoConfig.DataType = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(Number(Data.TaskTarget));
        /**获取任务需求信息 */
        let strArray: string[] = Data.TaskRequirementType.split(":");
        let MiscID = strArray[0];
        let Enemy: _EnemyInfoConfig.DataType = EnemyAttributeInfoProxy.instance.GetHeroAttributeInfoByMiscID(Number(MiscID));
        let TsakTittle = "";
        let MissionStatement = "";
        let UiIcon = "";
        if (Enemy != null) {
            TsakTittle = Data.TsakTittle.replace("&User", Enemy.EnemyChineseName);
            MissionStatement = Data.MissionStatement.replace("&User", Enemy.EnemyChineseName);
            MissionStatement = MissionStatement.replace("&Demand", ("" + Data.RequirementValue));
            UiIcon = Enemy.EnemyUiIcon;
        } else {
            if (MiscID == "20005") {
                UiIcon = "iconChest";
                TsakTittle = Data.TsakTittle.replace("&User", "宝箱");
                MissionStatement = Data.MissionStatement.replace("&User", "宝箱");
            } else if (MiscID == "Player") {
                UiIcon = "perk_damage_reduction";
                TsakTittle = Data.TsakTittle.replace("&User", "猎人");
                MissionStatement = Data.MissionStatement.replace("&User", "猎人");
            }
            /**字符串解析 */
            MissionStatement = MissionStatement.replace("&Demand", ("" + Data.RequirementValue));
        }

        if (ApkDefine.IsApk) {
            TsakTittle = TsakTittle.replace("[/color]", "");
            let TsakTittleIndex = TsakTittle.indexOf("[");
            TsakTittle = TsakTittle.replace(TsakTittle.substr(TsakTittleIndex, 15), "");
            MissionStatement = MissionStatement.replace("[/color]", "");
            let MissionStatementIndex = MissionStatement.indexOf("[");
            MissionStatement = MissionStatement.replace(MissionStatement.substr(MissionStatementIndex, 15), "");
            Item.m_taskDetail.m_taskTittle.ubbEnabled = false;
            Item.m_taskDetail.m_taskDescription.ubbEnabled = false;
        }

        /**设置面板 */
        Item.m_taskDetail.m_taskTittle.text = TsakTittle;
        Item.m_taskDetail.m_taskDescription.text = MissionStatement;
        Item.m_taskDetail.m_taskProgress.max = Data.RequirementValue;
        Item.m_taskDetail.m_taskProgress.value = Data.CurNum;
        Item.m_reward.m_rewardCount.text = Data.TaskRewardCount.toString();
        /**设置头像 */
        Item.m_taskImg.url = ComResUrl.MainFgui_url(UiIcon);
        /**设置奖励图标 */
        Item.m_reward.m_rewardImg.url = ComResUrl.MainFgui_url(Temp.m_ResData.HeroUiIcon);
        /**设置奖励数量 */
        Item.m_reward.m_rewardCount.text = "" + Temp.TaskData.TaskRewardCount;

        let State: number = Temp.GetTaskState();
        /**获取任务状态 */
        switch (State) {
            case 0:
                Item.getController("c1").selectedIndex = ETASKSTATE.eProcessing;
                break;
            case 1:
                Item.getController("c1").selectedIndex = ETASKSTATE.eAvailable;
                break;
            case -1:
                Item.getController("c1").selectedIndex = ETASKSTATE.eComplete;
                break;
        }
    }

    /**------------------------------------每日任务属性墙--------------------------------------------------- */

    //#region 每日任务属性墙

    /**每日任务渲染方法 */
    EveryDayRenderHander(Index: number, Item: FGUI_taskItemCom) {

        /**获取任务类型 */
        let Temp: EverdyTask = TaskManager.Instance.GetEverdyTaskDataByIndex(Index);
        /**获取任务配置表数据 */
        let Data: _EverydayTasksConfig.DataType = Temp.TaskData;
        this.SetItemPlanInfo(Temp, Data, Item);
        Item.m_getBtn.onClick(this, this.GetEveryDayReward, [Index, Temp]);
        /*前往监听 */
        Item.m_ContinuteBtn.onClick(this, this.ComClosePanel);


    }
    /**刷新每日任务列表 */
    RefreshEveryDayListLength() {
        this.ui.m_taskBoard.m_everyDayList.numItems = TaskManager.Instance.GetEverdyTasklength();
        let Count = TaskManager.Instance.GetEverdyTaskCompleteCount();
        this.ui.m_taskBoard.m_everyDayBtn.m_finishedCoutCom.m_taskCount.text = "" + Count;
        if (Count == 0) {
            this.ui.m_taskBoard.m_everyDayBtn.m_finishedCoutCom.visible = false;
        } else {
            this.ui.m_taskBoard.m_everyDayBtn.m_finishedCoutCom.visible = true;
        }


    }
    /**领取每日任务奖励 */
    GetEveryDayReward(Idnex: number, Data: AchievementTask) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowRewardPanel, [Data.m_ResData.ItemMiscID, Data.TaskData.TaskRewardCount]);
        TaskManager.Instance.SetEverdyTaskState(Idnex, Data.TaskData.TaskRewardMiscID);
        this.RefreshEveryDayListLength();
        /** */
        GameHomeProxy.instance.UpdateHuntButtonCount();

        PGameMainProxy.instance.SetTaskCount();
    }



    //#endregion 每日任务结束墙
    public ComClosePanel() {
        this.OnCloseBtnClick();
    }
    /**------------------------------------每周任务属性墙--------------------------------------------------- */

    //#region 每周任务属性墙

    /**每周任务渲染方法 */
    WeeklyRenderHander(Index: number, Item: FGUI_taskItemCom) {

        /**获取任务类型 */
        let Temp: WeeklyTask = TaskManager.Instance.GetWeeklyTaskDataByIndex(Index);
        /**获取任务配置表数据 */
        let Data: _WeeklyTasksConfig.DataType = Temp.TaskData;
        this.SetItemPlanInfo(Temp, Data, Item);
        Item.m_getBtn.onClick(this, this.GetWeeklyReward, [Index, Temp]);

        /*前往监听 */
        Item.m_ContinuteBtn.onClick(this, this.ComClosePanel);

    }
    /**刷新每周任务列表 */
    RefreshWeeklyListLength() {
        this.ui.m_taskBoard.m_everyWeekList.numItems = TaskManager.Instance.GetWeeklyTasklength();
        /**每周按钮 */
        let Count = TaskManager.Instance.GetWeeklyTaskCompleteCount();
        this.ui.m_taskBoard.m_everyWeekBtn.m_finishedCoutCom.m_taskCount.text = "" + Count;
        if (Count == 0) {
            this.ui.m_taskBoard.m_everyWeekBtn.m_finishedCoutCom.visible = false;
        } else {
            this.ui.m_taskBoard.m_everyWeekBtn.m_finishedCoutCom.visible = true;
        }
    }
    /**领取每任务奖励 */
    GetWeeklyReward(Idnex: number, Data: AchievementTask) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowRewardPanel, [Data.m_ResData.ItemMiscID, Data.TaskData.TaskRewardCount]);
        TaskManager.Instance.SetWeeklyTaskState(Idnex, Data.TaskData.TaskRewardMiscID);
        this.RefreshWeeklyListLength();
        PGameMainProxy.instance.SetTaskCount();
        /** */
        GameHomeProxy.instance.UpdateHuntButtonCount();
    }

    //#endregion 每周任务结束墙

    /**------------------------------------成就任务属性墙--------------------------------------------------- */

    //#region 成就任务属性墙

    /**成就任务渲染方法 */
    AchievementRenderHander(Index: number, Item: FGUI_taskItemCom) {

        /**获取任务类型 */
        let Temp: AchievementTask = TaskManager.Instance.GetAchievementTaskDataByIndex(Index);
        /**获取任务配置表数据 */
        let Data: _AchievementTasksConfig.DataType = Temp.TaskData;
        this.SetItemPlanInfo(Temp, Data, Item);
        Item.m_getBtn.onClick(this, this.GetAchievementReward, [Index, Temp]);

        /*前往监听 */
        Item.m_ContinuteBtn.onClick(this, this.ComClosePanel);

    }
    /**刷新成就任务列表 */
    RefreshAchievementListLength() {
        this.ui.m_taskBoard.m_animalFableList.numItems = TaskManager.Instance.GetAchievementTasklength();
        /**动物寓言按钮 */
        let Count = TaskManager.Instance.GetAchievementTaskCompleteCount();
        this.ui.m_taskBoard.m_animalFableBtn.m_finishedCoutCom.m_taskCount.text = "" + Count;
        if (Count == 0) {
            this.ui.m_taskBoard.m_animalFableBtn.m_finishedCoutCom.visible = false;
        } else {
            this.ui.m_taskBoard.m_animalFableBtn.m_finishedCoutCom.visible = true;
        }
    }
    /**领取成就任务奖励 */
    GetAchievementReward(Idnex: number, Data: AchievementTask) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowRewardPanel, [Data.m_ResData.ItemMiscID, Data.TaskData.TaskRewardCount]);
        TaskManager.Instance.SetAchievementTaskState(Idnex, Data.TaskData.TaskRewardMiscID);
        this.RefreshAchievementListLength();
        PGameMainProxy.instance.SetTaskCount();
    }

    //#endregion 每周任务结束墙

}