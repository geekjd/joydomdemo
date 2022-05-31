import FGUI_PGameHome from "src/FGUI/GameMain/FGUI_PGameHome";
import { CourseProxy } from "src/Game/ConfigProxy/CourseProxy";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { GameShopDataMediator } from "src/Game/Data/GameShopDataMediator";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _CourseConfig } from "src/Game/_config/_CourseConfig";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import TaskManager from "src/Ldz_GameCore/TaskSystem/TaskManager";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import TimeUtils from "src/_T/Utils/TimeUtils";
import { PGameTipsCom } from "./PGameTipsCom";

@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class GameHomeProxy extends BaseSingleUICon<FGUI_PGameHome> {
    public static readonly instance: GameHomeProxy;
    protected _UI = FGUI_PGameHome;
    protected _layer = EUILayer.Panel;
    private constructor() {
        super();
    }
    //Isshow = false;
    Init() {
        MesManager.on(EUIEvent.ShowHome, this, this.Show);
        MesManager.on(EUIEvent.RefDaiBi, this, this.RefDaiBi);
        MesManager.on(EUIEvent.ModeCheck, this, this.SetModeInfo);

    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        //#region 
        console.warn('combox', this.ui.m_modeSelectBtn.value, this.ui.m_modeSelectBtn.selectedIndex);
        this.updatePassState();
        this.updateLC();

        //如果本轮的免费奖励全部领完了，则不显示领奖按钮
        if (GameShopDataMediator.instance.data.FreeRewardGetPoint >= 3) {
            var date: Date = new Date();
            if (date.getTime() > GameShopDataMediator.instance.data.nextreFreshTime) {
                GameShopDataMediator.instance.data.FreeRewardGetPoint = -1;
                this.ui.m_freeRewrdsBtn.visible = true;
            } else {
                // this.ui.m_freeRewrdsBtn.visible = false;
            }
        } else {
            this.ui.m_freeRewrdsBtn.visible = true;
        }

        /**开始游戏 */
        // this.ui.m_HuntBtnp.onClick(this, this.HuntBtnpFun);
        //this.ui.m_modeSelectBtn.visibleItemCount = 4;
        //this.ui.m_modeSelectBtn.on(fgui.Events.STATE_CHANGED, this, this.SeletedModeFun);
        this.ui.m_ModeSelectBtn.onClick(this, this.SeletedModeFun);
        this.ui.m_ComStartBtn.onClick(this, this.OnClickGameStartFun);

        /**免费领取  */
        this.ui.m_freeRewrdsBtn.onClick(this, this.OnClickFreeRewardsFun);
        /**狩猎*/
        //this.ui.m_huntButton.onClick(this, this.OnClickHuntFun);
        /**设置任务完成个数提示 */
        this.UpdateHuntButtonCount();

        // this.ui.m_modeBtn.onClick(this, this.OnClickModeFun);
        /**顶部 进度条 */
        //this.ui.m_homeMideCom.m_RewrdsPro.on()
        /** 进阶通行证按钮 */
        this.ui.m_PassCom.onClick(this, this.OnPassClick);
        this.ui.m_getRewardBtn.onClick(this, this.OnPassClick);
        /** 设置按钮 */
        // this.ui.m_setBtn.onClick(this, this.OnSetBtnClick);

        var showTimer: boolean = true;
        var date: Date = new Date();
        //设置倒计时
        if (HunterGameDataMediator.instance.data.DaiBi >= HunterGameDataMediator.instance.data.DaiBi_Limit) {
            //  this.ui.m_leftTime.visible = false;
            this.ui.m_c1.selectedIndex = 1;
            this.ui.m_upgradeRate2.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;
            //this.ui.m_daibiUI.x = 290;
        } else {
            // this.ui.m_leftTime.visible = true;        

            if (HunterGameDataMediator.instance.data.daibiNextTime == 0) {
                HunterGameDataMediator.instance.data.daibiNextTime = date.getTime() + 1000 * 60 * 60 * 3;
            } else {
                if (date.getTime() > HunterGameDataMediator.instance.data.daibiNextTime) {
                    HunterGameDataMediator.instance.data.DaiBi += 30;
                    if (HunterGameDataMediator.instance.data.DaiBi >= HunterGameDataMediator.instance.data.DaiBi_Limit) {
                        this.ui.m_c1.selectedIndex = 1;
                        this.ui.m_upgradeRate2.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;
                        HunterGameDataMediator.instance.data.daibiNextTime = 0;
                        showTimer = false;
                    } else {
                        HunterGameDataMediator.instance.data.daibiNextTime = date.getTime() + 1000 * 60 * 60 * 3;
                    }
                }
            }
            var timeDiff: number = HunterGameDataMediator.instance.data.daibiNextTime - date.getTime();

            this.ui.m_c1.selectedIndex = 0;
            this.ui.m_leftTime.text = TimeUtils.makeTimeLeftShortString(timeDiff / 1000, ":", true) + "+30枚代币";
        }
        this.RefDaiBi();
        //this.ui.m_upgradeRate.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;

        if (showTimer)
            Laya.timer.loop(1000 * 60, this, this.loopDaibiTime);

        this.ui.m_homeMideCom.m_rewardBtn.onClick(this, this.getLCReward);

        // this.SetModeTips();
        /**task */
        this.ui.m_ActionBtn.onClick(this, () => {
            MesManager.event(EUIEvent.ShowHuntTaskPanel);
        });
        /** */

        this.SetModeInfo();

        //#endregion
        /***ad   */

        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     /**是否显示按钮 */
        //     this.IsShowAddToDiskBtn();
        //     /**添加到桌面事件 */
        //     this.ui.m_AddToDesk.onClick(this, this.AddToTable);
        //     /**互推 */
        //     this.ui.m_NinePortalCom.onClick(this, this.ShowPortalFun);

        // }
    }

    SetModeInfo() {
        switch (HunterGameDataMediator.instance.data.SelectMode) {
            case "Hunting":
                this.ui.m_ModeSelectBtn.text = "狩猎";
                this.ui.m_ModeSelectBtn.icon = ComResUrl.MainFgui_url("Hunting");
                break;
            case "Cooperation":
                this.ui.m_ModeSelectBtn.text = "合作";
                this.ui.m_ModeSelectBtn.icon = ComResUrl.MainFgui_url("Cooperation");
                break;
            case "Existence":
                this.ui.m_ModeSelectBtn.text = "生存";
                this.ui.m_ModeSelectBtn.icon = ComResUrl.MainFgui_url("Existence");
                break;
            case "Sports":
                this.ui.m_ModeSelectBtn.text = "竞技";
                this.ui.m_ModeSelectBtn.icon = ComResUrl.MainFgui_url("Sports");
                break;
        }
    }

    public IsShowAddToDiskBtn() {
        // /**手Q是盒子，微信是互推列表，OPPO、VIVO接入互推九宫格icon(vivo使用渠道自带icon）其他渠道隐藏该按钮 */
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {

        //     case PlatformEnum.Oppo:
        //         this.ui.m_NinePortalCom.visible = true;
        //         let optional: { callbackFunction?: (resultCode: boolean) => void } = {}
        //         optional['callbackFunction'] = (resultCode: boolean) => {
        //             if (!resultCode) {
        //                 /**桌面没有，就显示 */
        //                 this.ui.m_AddToDesk.visible = true;
        //             } else {
        //                 this.ui.m_AddToDesk.visible = false;
        //             }
        //         }
        //         QddSDKHelper.instance.hasDesktopIcon(optional);
        //         break;
        //     case PlatformEnum.Vivo:
        //         console.log('  vivo  path @@');

        //         this.ui.m_NinePortalCom.visible = true;
        //         optional['callbackFunction'] = (resultCode: boolean) => {
        //             if (!resultCode) {
        //                 this.ui.m_AddToDesk.visible = true;
        //             } else {
        //                 this.ui.m_AddToDesk.visible = false;
        //             }
        //         }
        //         QddSDKHelper.instance.hasDesktopIcon(optional);
        //         break;
        //     case PlatformEnum.HuaWei:
        //         console.log('  HuaWei  path @@');

        //         // this.ui.m_NinePortalCom.visible = true;
        //         // optional['callbackFunction'] = (resultCode: boolean) => {
        //         //     if (!resultCode) {
        //         //         this.ui.m_AddToDesk.visible = true;
        //         //     } else {
        //         //         this.ui.m_AddToDesk.visible = false;
        //         //     }
        //         // }
        //         // QddSDKHelper.instance.hasDesktopIcon(optional);
        //         break;
        //     case PlatformEnum.Qq:
        //         this.ui.m_NinePortalCom.visible = true;
        //         break;
        //     case PlatformEnum.Wechat:
        //         /**好像没有添加到桌面 */
        //         this.ui.m_NinePortalCom.visible = true;
        //         break;

        // }
    }

    /** 添加到桌面*/
    AddToTable() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Oppo:
        //         this.OV_AddToDeskIcon();
        //         break;
        //     case PlatformEnum.Vivo:
        //         this.OV_AddToDeskIcon();
        //         break;
        // }

    }
    public OV_AddToDeskIcon() {
        // QddSDKHelper.instance.hasDesktopIcon({
        //     callbackFunction: (Value) => {
        //         if (!Value) {
        //             /**桌面图标不存在 */
        //             QddSDKHelper.instance.addDesktopIcon({
        //                 callbackFunction: (Value) => {
        //                     if (Value) {
        //                         console.log('桌面图标創建成功');
        //                         this.ui.m_AddToDesk.visible = false;
        //                     } else {
        //                         console.log('桌面图标創建失败');
        //                     }
        //                 }
        //             });
        //         } else {
        //             /**存在 */
        //             console.log('桌面图标存在 ');
        //         }
        //     }
        // });

    }
    /**互推 */
    ShowPortalFun() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         console.log('showRecommendList @@ ');
        //         QddSDKHelper.instance.showRecommendList();
        //     case PlatformEnum.Qq:
        //         QddSDKHelper.instance.showAppBox();
        //     case PlatformEnum.Oppo:
        //         QddSDKHelper.instance.showGameBoxPortalAd();
        //         break;
        //     case PlatformEnum.Vivo:
        //         console.log('vivo 互推调用');
        //         QddSDKHelper.instance.showGameBoxPortalAd();
        //         break;

        // }

    }
    // public Portal() {
    //
    RefDaiBi() {
        if (!this.ifShow) { return; }
        this.ui.m_upgradeRate.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;


    }

    /**刷新历程数据 */
    private updateLC() {
        //历程配置表
        var courseConfig: _CourseConfig.DataType = CourseProxy.instance.getConfigByLv(HunterGameDataMediator.instance.data.CourseLv);
        //现在身上的奖杯数
        var Trophy: number = HunterGameDataMediator.instance.data.Trophy;
        if (Trophy >= courseConfig.exp) {
            this.ui.m_homeMideCom.m_RewrdsPro.value = 100;
            this.ui.m_homeMideCom.m_rewardBg.visible = true;
            this.ui.m_homeMideCom.m_rewardBtn.touchable = true;
        } else {
            var nowValue: number = 0;
            var maxValue: number = 10;
            if (HunterGameDataMediator.instance.data.CourseLv > 1) {
                let prevConfig: _CourseConfig.DataType = CourseProxy.instance.getConfigByLv(HunterGameDataMediator.instance.data.CourseLv - 1);
                nowValue = Trophy - prevConfig.exp;
                maxValue = courseConfig.exp - prevConfig.exp;
            } else {
                nowValue = Trophy;
                maxValue = courseConfig.exp;
            }

            this.ui.m_homeMideCom.m_RewrdsPro.value = (nowValue / maxValue) * 100;
            this.ui.m_homeMideCom.m_rewardBg.visible = false;
            this.ui.m_homeMideCom.m_rewardBtn.touchable = false;
        }

        this.ui.m_homeMideCom.m_lvtxt.text = HunterGameDataMediator.instance.data.CourseLv.toString();
        this.ui.m_homeMideCom.m_trophyNum.text = Trophy + "/" + courseConfig.exp;
        let props = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(courseConfig.propID);
        if (props.ItemType == ConstThing.TYPE_HERO) {
            var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(props.HeroID);
            this.ui.m_homeMideCom.m_icon.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
            this.ui.m_homeMideCom.m_lrtip.visible = true;
            this.ui.m_homeMideCom.m_lrtip.text = "猎人！";
        } else {
            this.ui.m_homeMideCom.m_icon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
            if (props.ItemType == ConstThing.TYPE_BOX) {
                this.ui.m_homeMideCom.m_lrtip.visible = false;
            } else {
                this.ui.m_homeMideCom.m_lrtip.visible = true;
                this.ui.m_homeMideCom.m_lrtip.text = courseConfig.count.toString();
            }
        }
    }
    /** home界面 通行证进入界面 按钮切换*/
    public updatePassState() {
        MesManager.event(EUIEvent.refreshDiamond);
        var iscan: boolean = HunterGameDataMediator.instance.check_passReward();
        //如果有可领取的奖励的时候显示领取按钮，否则显示通行证按钮
        this.ui.m_getRewardBtn.visible = iscan;
        this.ui.m_PassCom.visible = !iscan;

        if (this.ui.m_PassCom.visible == true) {
            this.ui.m_PassCom.m_Barbar.max = HunterGameDataMediator.instance.data.passMaxExp;
            this.ui.m_PassCom.m_Barbar.value = HunterGameDataMediator.instance.data.passExp;
            this.ui.m_PassCom.m_Num.text = HunterGameDataMediator.instance.data.passLv.toString();
            this.ui.m_PassCom.m_upgradeRate.text = HunterGameDataMediator.instance.data.passExp + "/" + HunterGameDataMediator.instance.data.passMaxExp;
        }
    }

    private getLCReward() {
        console.log("领取历程奖励");
        //历程配置表
        var courseConfig: _CourseConfig.DataType = CourseProxy.instance.getConfigByLv(HunterGameDataMediator.instance.data.CourseLv);
        MesManager.event(EUIEvent.ShowRewardPanel, [courseConfig.propID, courseConfig.count]);

        HunterGameDataMediator.instance.data.CourseLv += 1;
        this.updateLC();

    }

    /**倒计时代币门票时间 */
    private loopDaibiTime() {
        var date: Date = new Date();
        if (date.getTime() > HunterGameDataMediator.instance.data.daibiNextTime) {
            HunterGameDataMediator.instance.data.DaiBi += 30;
            if (HunterGameDataMediator.instance.data.DaiBi >= HunterGameDataMediator.instance.data.DaiBi_Limit) {
                //this.ui.m_leftTime.visible = false;        
                this.ui.m_c1.selectedIndex = 1;
                this.ui.m_upgradeRate2.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;

                HunterGameDataMediator.instance.data.daibiNextTime = 0;
                Laya.timer.clear(this, this.loopDaibiTime);
            } else {
                HunterGameDataMediator.instance.data.daibiNextTime = date.getTime() + 1000 * 60 * 60 * 3;

            }
        }
        this.ui.m_c1.selectedIndex = 0;

        var timeDiff: number = HunterGameDataMediator.instance.data.daibiNextTime - date.getTime();
        this.ui.m_leftTime.text = TimeUtils.makeTimeLeftShortString(timeDiff / 1000, ":", true) + "+30枚";
        this.ui.m_upgradeRate.text = HunterGameDataMediator.instance.data.DaiBi + "/" + HunterGameDataMediator.instance.data.DaiBi_Limit;
    }

    UpdateHuntButtonCount() {
        if (!this.ifShow) { return; }
        let Count = TaskManager.Instance.GetAchievementTaskCompleteCount() + TaskManager.Instance.GetEverdyTaskCompleteCount() + TaskManager.Instance.GetWeeklyTaskCompleteCount();
        if (Count > 0) {
            this.ui.m_ActionBtn.m_redPoint.visible = true;

        } else {
            this.ui.m_ActionBtn.m_redPoint.visible = false;
        }

    }


    public OnPassClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowPassPanel);
    }

    public OnSetBtnClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowSetPanel);
    }
    /**home 进度条 */
    public FrefreshProFun() {
        /**home 进度条 */
        console.log(' 进度条 ');
    }

    public OnClickGameStartFun() {
        console.log('开始游戏');

        if (HunterGameDataMediator.instance.data.DaiBi >= 20) {
            HunterGameDataMediator.instance.data.DaiBi -= 20;
            MesManager.event(EUIEvent.RefDaiBi);
        } else {
            console.log("代币不足");
            PGameTipsCom.instance.PLayTips('代币不足');
            return;
        }

        AudioProxy.instance.playSound(ESounds.click, 1);
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
        //
        //MesManager.event(ESceneEvent.LodeNoviceScene);

    }
    public SeletedModeFun(e: fgui.Events) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowSelectModePlan);
        //this.SetModeTips();
    }

    public OnClickFreeRewardsFun() {
        console.log('免费领取');
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.FreeReward);
    }
    public OnClickHuntFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowHuntTaskPanel);
        console.log('狩猎btn');
    }
    // /**设置模式显示 */
    // SetModeTips() {

    //     switch (HunterGameDataMediator.instance.data.SelectMode) {
    //         case "Hunting":
    //             Item.m_SelectModeItem.m_RightModeTxt.text = "PVP";
    //             Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Hunting");
    //             break;
    //         case "Cooperation":
    //             Item.m_SelectModeItem.m_RightModeTxt.text = "合作";
    //             Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Cooperation");
    //             break;
    //         case "Existence":
    //             Item.m_SelectModeItem.m_RightModeTxt.text = "生存";
    //             Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Existence");
    //             break;
    //         case "Sports":
    //             Item.m_SelectModeItem.m_RightModeTxt.text = "竞技";
    //             Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Sports");
    //             break;
    //     }
    // }

    public ONClickEmailFun() {
        console.log(' 顶部 Email');
    }
    public ONClickFriendsFun() {
        console.log(' 顶部 Friends');
    }
    _onHide() {
        Laya.timer.clear(this, this.loopDaibiTime);
    }


}