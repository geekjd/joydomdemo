import FGUI_GameOverPlan from "src/FGUI/GameMain/FGUI_GameOverPlan";
import { EnemyAttributeInfoProxy } from "src/Game/ConfigProxy/EnemyAttributeInfoProxy";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { EMusics } from "src/Game/ResE/EMusics";
import { ESounds } from "src/Game/ResE/ESounds";
import { _AchievementTasksConfig } from "src/Game/_config/_AchievementTasksConfig";
import { _EnemyInfoConfig } from "src/Game/_config/_EnemyInfoConfig";
import { _EverydayTasksConfig } from "src/Game/_config/_EverydayTasksConfig";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import { _WeeklyTasksConfig } from "src/Game/_config/_WeeklyTasksConfig";
import FGUIShow3DPrefabe from "src/Ldz_GameCore/FGUI3D/FGUIShow3DPrefabe";
import { GameOverAnimation, TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { RodmControl } from "src/Ldz_GameCore/PlayerCore/RodmControl";
import AchievementTask from "src/Ldz_GameCore/TaskSystem/AchievementTask";
import EverdyTask from "src/Ldz_GameCore/TaskSystem/EverdyTask";
import TaskManager from "src/Ldz_GameCore/TaskSystem/TaskManager";
import WeeklyTask from "src/Ldz_GameCore/TaskSystem/WeeklyTask";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import InstanceT from "src/_T/Ts/InstanceT";
import { PGameFitingPlanProxy } from "./PGameFitingPlanProxy";

/**
 * 游戏加载中页面调度者
 */
@InstanceT.DecorateInstance()
export default class PGameGameOverMediator extends BaseSingleUICon<FGUI_GameOverPlan>{
    public static readonly instance: PGameGameOverMediator;
    protected _UI = FGUI_GameOverPlan;
    isLoadResSuccess: boolean;
    private constructor() { super(); }
    //层级
    protected _layer: EUILayer = EUILayer.Panel;//加载层
    m_3dShowNode: any;
    SoliderObj: Laya.Sprite3D;
    //开始旋转
    private startRotate: boolean = false;
    //鼠标拖拽起始X坐标
    private mouseOldPosX: number;
    /**1 失败  2胜利 3合作模式游戏结束 */
    Index: number = 0;
    /**游戏名次 */
    Ranking: number = 0;
    /**奖杯 */
    Trophy: number = 0;
    /**经验 */
    passExp: number = 0;
    passExpArray: number[] = [50, 40, 30, 20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    TrophyArray: number[] = [9, 6, 4, 2, 0, 0, 0, 0, 0];
    /**成就任务完成列表 */
    AchievementTaskCompleteArray: number[] = [];
    /**每日任务完成列表 */
    EverdyTaskTaskCompleteArray: number[] = [];
    /**每周任务完成列表 */
    WeeklyTaskCompleteArray: number[] = [];
    Init() {
        MesManager.on(EUIEvent.ShowGameOverPlan, this, this.Open);//游戏加载中
    }
    //显示时的生命周期函数
    protected _onShow() {
        let screenPos = new Laya.Vector3(this.ui.m_RolePlan.x, this.ui.m_RolePlan.y, 10);
        this.m_3dShowNode = new FGUIShow3DPrefabe(this.ui.m_RolePlan, screenPos);
        this.Lode3DSceneObj(HunterGameDataMediator.instance.data.SelectHunterName);
        if (this.Index < 3) {
            console.log("当前结束排名", this.Ranking);
            this.GetPassExpByRanking();
            this.GetTrophyByRanking();
            HunterGameDataMediator.instance.data.Trophy += this.Trophy;
            HunterGameDataMediator.instance.data.passExp += this.passExp;
            if (HunterGameDataMediator.instance.data.passExp >= HunterGameDataMediator.instance.data.passMaxExp) {
                HunterGameDataMediator.instance.data.passExp -= HunterGameDataMediator.instance.data.passMaxExp;
                HunterGameDataMediator.instance.data.passLv += 1;
            }
            HunterGameDataMediator.instance.Save();
            this.ui.m_UniversalEndPlan.m_WaveAndRank.text = "排名";
            this.ui.m_UniversalEndPlan.m_TitleTxt.text = "" + this.Ranking;
            this.ui.m_UniversalTwoEndPlan.m_ItemCountCup.text = "" + this.Trophy;
            this.ui.m_UniversalTwoEndPlan.m_ItemTxt.text = "" + this.passExp;
        } else {
            if (this.Index != 3) {
                this.GetPassExpByRanking();
                this.GetTrophyByRanking();
                this.Ranking = 5 - this.Ranking;
            } else {
                this.passExp = this.Ranking * 3;
                this.Trophy = this.Ranking;
            }
            console.log("当前结束波次", this.Ranking);
            HunterGameDataMediator.instance.data.Trophy += this.Trophy;
            HunterGameDataMediator.instance.data.passExp += this.passExp;
            if (HunterGameDataMediator.instance.data.passExp >= HunterGameDataMediator.instance.data.passMaxExp) {
                HunterGameDataMediator.instance.data.passExp -= HunterGameDataMediator.instance.data.passMaxExp;
                HunterGameDataMediator.instance.data.passLv += 1;
            }
            HunterGameDataMediator.instance.Save();
            this.ui.m_UniversalEndPlan.m_WaveAndRank.text = "波次";
            this.ui.m_UniversalEndPlan.m_TitleTxt.text = "" + this.Ranking;
            this.ui.m_UniversalTwoEndPlan.m_ItemCountCup.text = "" + this.Trophy;
            this.ui.m_UniversalTwoEndPlan.m_ItemTxt.text = "" + this.passExp;
        }
        /**打开宝箱界面 */
        if (this.Ranking == 1) {

            // MesManager.event(EUIEvent.ShowGameBox, [ConstThing.BOX5]);
        }

        /**任务相关 */
        this.CheckTaskIsComplete();
        this.CheckNextShowTask();

        this.ui.m_Exit.onClick(this, this.ExitFitingGame);
        this.ui.m_closeBtn.onClick(this, this.ExitFitingGame);
        /**再玩一次 */
        this.ui.m_PlayAgain.onClick(this, this.ComRewwardsAds);
        //看广告拿3倍经验
        this.ui.m_3beiBtn.onClick(this, this.adsHandler);
        //模型旋转监听
        this.ui.m_RolePlan.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.ui.m_RolePlan.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.ui.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        /*隱藏遙感 */
        PGameFitingPlanProxy.instance.ui.m_VirtualRocker.visible = false;
        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_3beiBtn.m_videoUI.url = 'ui://kk7g5mmmgqnv1oj';
        // }

        // if (QddSDKHelper.instance.isHuaWeiPlatform()) {
        //     this.ui.m_anySpace.y = 1100

        // }

        // /**显示广告顺序 */
        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowAdOrder();
        //     console.log('TestSwitchAll***************');
        // }

    }

    public ShowAdOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         console.log('应该先分享 面板,然后显示banner', HunterGameDataMediator.instance.data.shareIntervalTimes);
        //         if (HunterGameDataMediator.instance.data.shareIntervalTimes % 5 == 0) {
        //             this.ui.m_ShareComp.visible = true;
        //             this.ui.m_ShareComp.m_CloseBtn.onClick(this, this.ColseShareUI);
        //             this.ui.m_ShareComp.m_ShareBtnp.onClick(this, this.ShareBtnFun);
        //             HunterGameDataMediator.instance.data.shareIntervalTimes++;
        //         } else {
        //             /*不显示分享界面，就显示插屏 */
        //             Laya.timer.once(ConfigHelper.adControlConfig.intersDelayTime * 1000, this, () => {
        //                 this.ComIntersFun();
        //             });
        //         }
        //         break;
        //     case PlatformEnum.TouTiao:
        //         /**录屏结束 */
        //         QddSDKHelper.instance.gameRecorderStop();
        //         console.log('应该先分享 面板,然后显示banner', HunterGameDataMediator.instance.data.shareIntervalTimes);
        //         if (HunterGameDataMediator.instance.data.shareIntervalTimes % 5 == 0) {
        //             //  MesManager.event(EUIEvent.SharePrize);
        //             this.ui.m_ShareComp.visible = true;
        //             this.ui.m_ShareComp.m_CloseBtn.onClick(this, this.ColseShareUI);
        //             this.ui.m_ShareComp.m_ShareBtnp.onClick(this, this.ShareRecordFun);
        //             HunterGameDataMediator.instance.data.shareIntervalTimes++;
        //         } else {
        //             this.ComIntersFun();
        //         }
        //         break;
        //     case PlatformEnum.Qq:
        //         console.log('应该先分享 面板,然后显示banner', HunterGameDataMediator.instance.data.shareIntervalTimes);
        //         if (HunterGameDataMediator.instance.data.shareIntervalTimes % 5 == 0) {
        //             this.ui.m_ShareComp.visible = true;
        //             this.ui.m_ShareComp.m_CloseBtn.onClick(this, this.ColseShareUI);
        //             this.ui.m_ShareComp.m_ShareBtnp.onClick(this, this.ShareBtnFun);
        //             HunterGameDataMediator.instance.data.shareIntervalTimes++;
        //         } else {
        //             /*不显示分享界面，就显示插屏 */
        //             Laya.timer.once(ConfigHelper.adControlConfig.intersDelayTime * 1000, this, () => {
        //                 this.ComIntersFun();
        //             });
        //         }
        //         /**积木  插屏关闭回调已实现*/
        //         break;
        //     case PlatformEnum.Oppo:
        //         this.ComIntersFun();

        //         break;
        //     case PlatformEnum.Vivo:
        //         this.ComIntersFun();

        //         break;
        //     case PlatformEnum.HuaWei:
        //         this.ComIntersFun();

        //         break;
        //     case PlatformEnum.XiaoMi:
        //         this.ShowInterestialPnael_OV();

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

    public ComIntersFun() {
        let optional: {
            parentNode?: any,
            resultCallback?: (resultCode: boolean) => void,
            closeCallback?: () => void,
            probability?: number,
            adLocation?: string,
            showSysInterAd?: boolean,
        } = {}
        optional['probability'] = 100;
        optional['resultCallback'] = (resultCode: boolean) => {
            /** 如果显示插屏不陈宫*/
            console.log('  插屏显示结果resultCode==', resultCode);
            if (!resultCode) {
                console.log('调用显示banner 界面');
                Laya.timer.once(100, this, () => {
                    console.log('进入延迟调用函数11');
                    // if (QddSDKHelper.TestSwitchAll) {
                    //     console.log('TestSwitchAll*************** ');
                    //     QddSDKHelper.instance.showBannerAd();
                    // }
                });
            }
        };

        optional['closeCallback'] = () => {
            /*关闭后回调 ,显示原生banner*/
            console.log(' 关闭后回调 ,显示原生banner ');
            Laya.timer.once(100, this, () => {
                console.log('进入延迟调用函数22');
                // if (QddSDKHelper.TestSwitchAll) {
                //     console.log('TestSwitchAll*************** ');
                //     QddSDKHelper.instance.showBannerAd();
                // }
            });
            //     if (QddSDKHelper.instance.isQQPlatform()) {
            //         /**手Q：添加积木广告； */
            //         console.log(' qq平台，应显示积木广告');
            //         let optional2 = { left: 16, top: 330, size: 1, orientation: 'vertical' }
            //         QddSDKHelper.instance.showBlockAd(optional2);

            //     } else if (QddSDKHelper.instance.isWxPlatform()) {
            //         /**  原生模板广告*/
            //         console.log(' wechat平台，应显示原生模板广告');
            //         let optional: { left: number, top: number, adLocation?: string }
            //         optional['left'] = 48;
            //         optional['top'] = 540;
            //         QddSDKHelper.instance.showCustomAd(optional);
            //     }
            //     console.log(' closeCallback finish@@');

            // }
            // QddSDKHelper.instance.showIntertAd(optional)
        }
        // /**插屏再banner */
        // public ShowInterestialPnael_OV() {
        //     QddSDKHelper.instance.hideBannerAd();
        //     /**插屏广告 */
        //     let optional: {
        //         parentNode?: any,
        //         resultCallback?: (resultCode: boolean) => void,
        //         closeCallback?: () => void,
        //         probability?: number,
        //         adLocation?: string,
        //         showSysInterAd?: boolean,
        //     } = {}
        //     optional['probability'] = 100;
        //     optional['resultCallback'] = (resultCode: boolean) => {
        //         /** 如果显示插屏不陈宫*/
        //         console.log('  插屏显示结果resultCode==', resultCode);
        //         if (!resultCode) {
        //             console.log('调用显示banner 界面');
        //             Laya.timer.once(100, this, () => {
        //                 console.log('进入延迟调用函数11');
        //                 if (QddSDKHelper.TestSwitchAll) {
        //                     console.log('TestSwitchAll*************** ');
        //                     this.SetNativeData();
        //                 }
        //             });
        //         }
        //     };

        //     optional['closeCallback'] = () => {
        //         /*关闭后回调 ,显示原生banner*/
        //         console.log(' 关闭后回调 ,显示原生banner ');
        //         Laya.timer.once(100, this, () => {
        //             console.log('进入延迟调用函数22');
        //             if (QddSDKHelper.TestSwitchAll) {
        //                 console.log('TestSwitchAll*************** ');
        //                 this.SetNativeData();
        //             }
        //         });
        //         console.log(' closeCallback finish@@');

        //     }
        //     QddSDKHelper.instance.showIntertAd(optional)
    }

    SetNativeData() {
        this.loopShowNativeImg();
        // Laya.timer.loop(10 * 1000, this, this.loopShowNativeImg);

    }
    public loopShowNativeImg() {
        // let optional: NativeImageOption = {}
        // optional['nativeRefresh'] = true;
        // QddSDKHelper.instance.showNativeImageAd(optional);

        // this.NativeData = QddSDKHelper.instance.getNativeAdImageData();
        // if (this.NativeData) {
        //     console.log('原生数据 not 为空@@@', this.NativeData);
        //     console.log('原生数据 not 为空@@@333', JSON.stringify(this.NativeData));
        //     this.ui.m_nativeComp.visible = true;
        //     this.ui.m_nativeClosebut.visible = true;

        //     this.data = this.NativeData as NativeAdDataImpl;
        //     this.isLoadResSuccess = true;

        //     this.ui.m_nativeClosebut.onClick(this, this.OnClickHidePanel);
        //     this.ui.m_nativeComp.onClick(this, this.AdUIBtnFun);

        //     /**logo */
        //     // this.ui.m_nativeComp.icon= this.NativeData.logoUrl;
        //     /**UI */
        //     this.ui.m_nativeComp.icon = this.data.imgUrl;
        //     /**Des */
        //     this.ui.m_nativeComp.title = this.data.desc;

        // } else {
        //     console.log('原生数据为空@@@', this.NativeData);
        //     return;
        // }
    }

    public AdUIBtnFun() {
        console.log(' @@AdUIBtnFun ');
        if (this.isLoadResSuccess) {
            // QddSDKHelper.instance.reportNativeAdImageClick(this.data.adId);
        } else {
            console.log(' 原生广告没有拉取成功');
        }

    }

    OnClickHidePanel() {
        /** */
        console.log('OnClickHidePanel@@@');
        this.ui.m_nativeComp.visible = false;
        this.ui.m_nativeClosebut.visible = false;
    }


    /**分享 */
    ShareBtnFun() {
        /** */
        let optional: {
            resultCallback?: (resultCode: boolean) => void,
            title?: string,
            imageUrl?: string,
            query?: string,
            imageUrlId?: string,
            toCurrentGroup?: boolean,
            path?: string,
            templateId?: string,
            adLocation?: string
        }
        /**点了就算 */
        // QddSDKHelper.instance.shareAppMessage(optional);
        HunterGameDataMediator.instance.data.Gemstone += 50;
    }
    /**分享录屏 */
    public ShareRecordFun() {
        let optional: { resultCallback?: (resultCode: boolean) => void, adLocation?: string } = {}
        optional['resultCallback'] = (resultCode: boolean) => {
            /*是否分享成功 */
            if (resultCode) {
                HunterGameDataMediator.instance.data.Gemstone += 50;
                this.ui.m_ShareComp.visible = false;
            } else {
                console.log('分享失败@@');
            }
        }
        // QddSDKHelper.instance.shareGameRecorder(optional);
    }



    public ColseShareUI() {
        console.log(' close share panel @@');
        this.ui.m_ShareComp.visible = false;
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         this.ShowInterestialPnael_OV();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         this.ShowInterestialPnael_OV();
        //         break;
        //     case PlatformEnum.TwoThreeThreeNative:
        //         /**apk ad */

        //         break;

        // }
    }

    /*激励视屏插屏参数控制 */
    public ComRewwardsAds() {
        // if (QddSDKHelper.TestSwitchAll) {
        //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //         case PlatformEnum.Wechat:
        //             Laya.timer.scale = 1;
        //             PGameGameOverMediator.instance.PlayAgainGame();
        //             // console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次22222');

        //             break;
        //         case PlatformEnum.TouTiao:
        //             this.AgainPlay();
        //             break;
        //         case PlatformEnum.Qq:
        //             this.AgainPlay();
        //             break;
        //         case PlatformEnum.Oppo:
        //             /**不看广告 */
        //             this.AgainPlayOne();
        //             break;
        //         case PlatformEnum.Vivo:
        //             /**不看广告 */
        //             this.AgainPlayOne();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             this.AgainPlayOne();
        //             break;
        //         case PlatformEnum.XiaoMi:

        //             break;
        //         default:
        //             this.AgainPlay();
        //             break
        //     }
        // } else {
        Laya.timer.scale = 1;
        PGameGameOverMediator.instance.PlayAgainGame();
        console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次22222');
        Laya.timer.once(100, this, () => {
            console.log(' oppo 观看完成');

        });

        // }
    }

    public AgainPlayOne() {
        Laya.timer.scale = 1;
        PGameGameOverMediator.instance.PlayAgainGame();
    }
    public AgainPlay() {
        /**打开神秘奖励面板 */
        // console.log('AdControlUtils.autoClickNativeInsertAd==@@', AdControlUtils.autoClickNativeInsertAd());

        // if (AdControlUtils.autoClickNativeInsertAd()) {
        //     let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        //     optional['videoCallback'] = (resultCode: boolean) => {
        //         console.log('videoCallback==', resultCode);
        //         if (resultCode) {
        //             /**观看完成，弹出神秘奖励面板，领取后 可以再玩一次 */
        //             MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //             console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次');
        //             Laya.timer.scale = 1;
        //             PGameGameOverMediator.instance.Adpath_PlayAgainGame();
        //             console.log('观看完成，弹出神秘奖励面板，领取后 可以再玩一次22222');
        //             Laya.timer.once(100, this, () => {
        //                 console.log(' oppo 观看完成');

        //             });
        //         } else {
        //             /** */
        //             Laya.timer.scale = 1;
        //             console.log('');

        //         }
        //     }
        //     QddSDKHelper.instance.showVideoAd(optional);
        // } else {
        Laya.timer.scale = 1;
        PGameGameOverMediator.instance.Adpath_PlayAgainGame();
        // }


    }
    /**检测是否有任务完成 */
    CheckTaskIsComplete() {
        /**成就任务 */
        this.AchievementTaskCompleteArray = [];
        let AchievementLen = TaskManager.Instance.GetAchievementTasklength();
        for (let i = 0; i < AchievementLen; i++) {
            let State = TaskManager.Instance.GetAchievementTaskDataByIndex(i);
            if (State.GetTaskState() == 1) {
                this.AchievementTaskCompleteArray.push(i);
            }
        }
        /**每日任务 */
        this.EverdyTaskTaskCompleteArray = [];
        let EverdyTaskLen = TaskManager.Instance.GetEverdyTasklength();
        for (let i = 0; i < EverdyTaskLen; i++) {
            let State = TaskManager.Instance.GetEverdyTaskDataByIndex(i);
            if (State.GetTaskState() == 1) {
                this.EverdyTaskTaskCompleteArray.push(i);
            }
        }
        /**每周任务 */
        this.WeeklyTaskCompleteArray = [];
        let WeeklyTaskLen = TaskManager.Instance.GetWeeklyTasklength();
        for (let i = 0; i < WeeklyTaskLen; i++) {
            let State = TaskManager.Instance.GetWeeklyTaskDataByIndex(i);
            if (State.GetTaskState() == 1) {
                this.WeeklyTaskCompleteArray.push(i);
            }
        }
    }
    /**显示下一个任务 */
    CheckNextShowTask() {
        this.ui.m_OverEndTaskPlan.visible = true;
        if (this.AchievementTaskCompleteArray.length > 0) {
            let TaskIndex = this.AchievementTaskCompleteArray.pop();
            let Temp: AchievementTask = TaskManager.Instance.GetAchievementTaskDataByIndex(TaskIndex);
            /**获取任务配置表数据 */
            let Data: _AchievementTasksConfig.DataType = Temp.TaskData;
            this.ShowTaskPlan(Temp, Data, "成就任务");
            return;
        } else if (this.EverdyTaskTaskCompleteArray.length > 0) {
            let TaskIndex = this.EverdyTaskTaskCompleteArray.pop();
            let Temp: EverdyTask = TaskManager.Instance.GetEverdyTaskDataByIndex(TaskIndex);
            /**获取任务配置表数据 */
            let Data: _EverydayTasksConfig.DataType = Temp.TaskData;
            this.ShowTaskPlan(Temp, Data, "每日任务");
            return;
        } else if (this.WeeklyTaskCompleteArray.length > 0) {
            let TaskIndex = this.WeeklyTaskCompleteArray.pop();
            let Temp: WeeklyTask = TaskManager.Instance.GetWeeklyTaskDataByIndex(TaskIndex);
            /**获取任务配置表数据 */
            let Data: _WeeklyTasksConfig.DataType = Temp.TaskData;
            this.ShowTaskPlan(Temp, Data, "每周任务");
            return;
        } else {
            this.ui.m_OverEndTaskPlan.visible = false;
            return;
        }
    }

    /**
     * 显示任务界面
     * @param Temp  任务类型
     * @param Data  任务数据
     * @param TaskName 来自于什么任务
     */
    ShowTaskPlan(Temp: any, Data: any, TaskName: string) {
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
        this.ui.m_Task.play();
        this.ui.m_OverEndTaskPlan.m_Title.text = TsakTittle;
        this.ui.m_OverEndTaskPlan.m_Tips.text = MissionStatement;
        this.ui.m_OverEndTaskPlan.m_TaskBar.max = Data.RequirementValue;
        this.ui.m_OverEndTaskPlan.m_TaskBar.value = Data.CurNum;
        this.ui.m_OverEndTaskPlan.m_TaskBar.m_Tips.text = Data.CurNum + "/" + Data.RequirementValue;
        this.ui.m_OverEndTaskPlan.m_RewIcon.url = ComResUrl.MainFgui_url(Temp.m_ResData.HeroUiIcon);
        this.ui.m_OverEndTaskPlan.m_RewCount.text = "" + Temp.TaskData.TaskRewardCount;
        this.ui.m_OverEndTaskPlan.m_TaskTarget.m_TarGetIcon.url = ComResUrl.MainFgui_url(UiIcon);
        this.ui.m_OverEndTaskPlan.onClick(this, this.CheckNextShowTask);
    }
    /**获取经验值 */
    GetPassExpByRanking() {
        this.passExp = this.passExpArray[this.Ranking - 1];
    }
    /**获取奖杯 */
    GetTrophyByRanking() {
        this.Trophy = this.TrophyArray[this.Ranking - 1];
    }
    private mouseDown() {
        console.log(Laya.stage.mouseX);
        this.startRotate = true;
        this.mouseOldPosX = Laya.stage.mouseX;
    }

    private mouseUp() {
        this.startRotate = false;
    }

    private mouseMove() {
        if (this.startRotate) {
            var tempX: number = Laya.stage.mouseX;
            this.SoliderObj.transform.localRotationEulerY += tempX - this.mouseOldPosX;
            this.mouseOldPosX = tempX;
        }
    }

    /**看广告拿3倍经验 */
    private adsHandler() {
        // /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {

        //     /**观看完成，看广告拿3倍经验 */
        //     if (AdControlUtils.autoClickNativeInsertAd) {
        //         this.ui.m_3beiBtn.visible = false;
        //         HunterGameDataMediator.instance.data.passExp += (this.passExp * 2);
        //         this.passExp += this.passExp * 2;
        //         if (HunterGameDataMediator.instance.data.passExp >= HunterGameDataMediator.instance.data.passMaxExp) {
        //             HunterGameDataMediator.instance.data.passExp -= HunterGameDataMediator.instance.data.passMaxExp;
        //             HunterGameDataMediator.instance.data.passLv += 1;
        //         }
        //         HunterGameDataMediator.instance.Save();
        //     }
        //     this.ui.m_UniversalEndPlan.m_TitleTxt.text = "" + this.Ranking;
        //     this.ui.m_UniversalTwoEndPlan.m_ItemCountCup.text = "" + this.Trophy;
        //     this.ui.m_UniversalTwoEndPlan.m_ItemTxt.text = "" + this.passExp;
        //     MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //     return;
        // }
        /**在打开界面时 已经填过一次奖励了  所以这里是2次 */
        AudioProxy.instance.playSound(ESounds.click, 1);
        let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        optional['videoCallback'] = (resultCode: boolean) => {
            if (resultCode) {
                // /**观看完成，看广告拿3倍经验 */
                // if (AdControlUtils.autoClickNativeInsertAd) {
                //     this.ui.m_3beiBtn.visible = false;
                //     HunterGameDataMediator.instance.data.passExp += (this.passExp * 2);
                //     this.passExp += this.passExp * 2;
                //     if (HunterGameDataMediator.instance.data.passExp >= HunterGameDataMediator.instance.data.passMaxExp) {
                //         HunterGameDataMediator.instance.data.passExp -= HunterGameDataMediator.instance.data.passMaxExp;
                //         HunterGameDataMediator.instance.data.passLv += 1;
                //     }
                //     HunterGameDataMediator.instance.Save();
                // }
                this.ui.m_UniversalEndPlan.m_TitleTxt.text = "" + this.Ranking;
                this.ui.m_UniversalTwoEndPlan.m_ItemCountCup.text = "" + this.Trophy;
                this.ui.m_UniversalTwoEndPlan.m_ItemTxt.text = "" + this.passExp;
                MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
            } else {

            }
        }
        // QddSDKHelper.instance.showVideoAd(optional);



    }

    /** 
     * 将加载的3D物体显示到UI上
    * @param SoliderName 
    * @returns 
    */
    Lode3DSceneObj(name: string) {
        this.Lode3DObj(name);
        let _showSpr: Laya.Sprite3D = this.m_3dShowNode.show3DNode;
        let node = _showSpr.addChild(this.SoliderObj);
        this.SoliderObj.transform.localRotationEulerY = 20;
        this.SoliderObj.transform.localRotationEulerZ = -0;
        this.SoliderObj.transform.localPosition = new Laya.Vector3(0, -1, 0);
    }

    /**
    * 加载3D物体
    * @param SoliderName
    * @returns 
    */
    Lode3DObj(SoliderName: string) {
        if (this.SoliderObj != null && !this.SoliderObj.destroyed && this.SoliderObj.name == SoliderName) {
            return;
        }
        this.DisObj();
        this.SoliderObj = new Laya.Sprite3D(SoliderName);
        if (GlobalD3Environment.Scene3D != null) {
            GlobalD3Environment.Scene3D.addChild(this.SoliderObj);
        }
        let Url = EssentialResUrls.PrefabURL(SoliderName);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Obj = ResLoad.GetRes(Url) as Laya.Sprite3D;
            if (this.SoliderObj == null) return;
            this.SoliderObj.addChild(Obj);
            Obj.transform.localPosition = new Laya.Vector3(0, 1, 0);
            Obj.transform.localScale = new Laya.Vector3(1.7, 1.7, 1.7);
            let TempRodmControl: RodmControl = Obj.addComponent(RodmControl);
            switch (this.Index) {
                case 1:
                    TempRodmControl.PlayFixedAnimator(GameOverAnimation.AnimationName_Crying);
                    break;
                case 2:
                    TempRodmControl.PlayFixedAnimator(GameOverAnimation.AnimationName_Victory);
                    break;
                case 3:
                    TempRodmControl.PlayFixedAnimator(GameOverAnimation.AnimationName_Clapping);
                    break;
            }
        }));
    }
    /**
    * 销毁3D物体
    */
    DisObj() {
        if (this.SoliderObj != null) {
            this.SoliderObj.destroy();
            this.SoliderObj = null;
        }
    }

    ExitFitingGame() {
        Laya.timer.frameOnce(2, this, () => {
            this.Close();
        });
        console.log("点击退出");
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(ESceneEvent.LodeMainScene);

    }

    PlayAgainGame() {
        // if (HunterGameDataMediator.instance.data.DaiBi >= 20) {
        //     HunterGameDataMediator.instance.data.DaiBi -= 20;
        //     MesManager.event(EUIEvent.RefDaiBi);
        // } else {
        //     console.log("代币不足");
        //     return;
        // }

        Laya.timer.scale = 1;
        this.Close();
        console.log("点击重新开始");
        switch (HunterGameDataMediator.instance.data.SelectMode) {
            case "Hunting":
                MesManager.event(ESceneEvent.LodeHuntingScene);
                break;
            case "Cooperation":
                MesManager.event(ESceneEvent.LodeCooperationScene);
                break;
            case "Existence":
                MesManager.event(ESceneEvent.LodeExistenceScene);
                break;
            case "Sports":
                MesManager.event(ESceneEvent.LodeSportsScene);
                break;
        }

    }

    Adpath_PlayAgainGame() {

        Laya.timer.scale = 1;
        this.Close();
        console.log("点击重新开始");
        switch (HunterGameDataMediator.instance.data.SelectMode) {
            case "Hunting":
                MesManager.event(ESceneEvent.LodeHuntingScene);
                break;
            case "Cooperation":
                MesManager.event(ESceneEvent.LodeCooperationScene);
                break;
            case "Existence":
                MesManager.event(ESceneEvent.LodeExistenceScene);
                break;
            case "Sports":
                MesManager.event(ESceneEvent.LodeSportsScene);
                break;
        }

    }

    private Open(Index: number, Ranking: number) {
        this.Index = Index;
        this.Ranking = Ranking;
        switch (Index) {
            case 1:
                AudioProxy.instance.playMusic(EMusics.defeat, 1);
                PGameFitingPlanProxy.instance.ui.m_ShowCon.selectedIndex = 2;
                break;
            case 2:
                AudioProxy.instance.playMusic(EMusics.victory, 1);
                PGameFitingPlanProxy.instance.ui.m_ShowCon.selectedIndex = 1;
                break;
            case 3:
                /***合作模式没有输赢 */
                AudioProxy.instance.playMusic(EMusics.victory, 1);
                PGameFitingPlanProxy.instance.ui.m_ShowCon.selectedIndex = 1;
                break;
            case 4:
                /***生存模式赢 */
                AudioProxy.instance.playMusic(EMusics.victory, 1);
                PGameFitingPlanProxy.instance.ui.m_ShowCon.selectedIndex = 1;
                break;
            case 5:
                /***生存模式输 */
                AudioProxy.instance.playMusic(EMusics.defeat, 1);
                PGameFitingPlanProxy.instance.ui.m_ShowCon.selectedIndex = 2;
                break;
        }
        console.log("当前结束排名", this.Ranking);
        this.Show();
    }
    public Close() {
        this.Hide();
    }
    //隐藏时的生命周期函数
    protected _onHide() {
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //         case PlatformEnum.Wechat:
        //             QddSDKHelper.instance.hideCustomAd();
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Qq:
        //             QddSDKHelper.instance.hideBlockAd();
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Oppo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg)
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.Vivo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg)
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg)
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.XiaoMi:


        //             break;

        //     }
        // }
    }


}