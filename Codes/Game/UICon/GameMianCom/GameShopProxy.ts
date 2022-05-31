import FGUI_CommondityItemBtn from "src/FGUI/GameMain/FGUI_CommondityItemBtn";
import FGUI_DiamonItemBtn from "src/FGUI/GameMain/FGUI_DiamonItemBtn";
import FGUI_goldItem from "src/FGUI/GameMain/FGUI_goldItem";
import FGUI_PGameShop from "src/FGUI/GameMain/FGUI_PGameShop";
import FGUI_yellowkuang from "src/FGUI/GameMain/FGUI_yellowkuang";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { ShopConfigProxy } from "src/Game/ConfigProxy/ShopConfigProxy";
import { GameShopDataMediator } from "src/Game/Data/GameShopDataMediator";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { DiscountCommodityData } from "src/Game/Data/type/GameShopData";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _ShopConfig } from "src/Game/_config/_ShopConfig";
import { ConstThing, TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import TimeUtils from "src/_T/Utils/TimeUtils";
import { GameHunter } from "./GameHunter";


@InstanceT.DecorateInstance()
//商店页面
export class GameShopProxy extends BaseSingleUICon<FGUI_PGameShop> {
    public static readonly instance: GameShopProxy;
    protected _UI = FGUI_PGameShop;
    protected _layer = EUILayer.Panel;
    /**已拥有的英雄的ID */
    private hasHeroId: Array<number>;
    /**普通商品配置表 */
    private normalConfigList: Array<_ShopConfig.DataType>;
    /**钻石资源商品配置表 */
    private diamondConfigList: Array<_ShopConfig.DataType>;
    /**金币资源商品配置表 */
    private goldConfigList: Array<_ShopConfig.DataType>;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowShop, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.initDiscount();
        this.initNormal();
        this.initDiamond();
        this.initGold();

        /**当前次数 */
        let day = TimeUtils.GetCurrentDayCount(new Date().getTime());
        if (day - HunterGameDataMediator.instance.data.DayRefresh > 0) {
            HunterGameDataMediator.instance.data.DayRefresh = day;
            HunterGameDataMediator.instance.data.TodayCanClick = true;
            GameShopDataMediator.instance.data.CurItemOneAdTimes = 5;
            this.RefreshNewDiamonUI(0);
        }
        console.log('打开商店界面=====');
        // if (QddSDKHelper.instance.isTtPlatform()) {
        // }

        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';
        //     let obj: FGUI_goldItem = this.ui.m_Content.m_GoldCom.m_goldListItem.getChildAt(0) as FGUI_goldItem;
        //     obj.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';

        //     let item: FGUI_DiamonItemBtn = this.ui.m_Content.m_DiamontemCom.m_commodityItemList.getChildAt(0) as FGUI_DiamonItemBtn;
        //     item.m_vivoUI.url = 'ui://kk7g5mmmgqnv1oj';



        // }


        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowAdOrder();
        //     console.log("QddSDKHelper.instance.getPackingPlatform()@@", QddSDKHelper.instance.getPackingPlatform().toString());
        //     console.log('TestSwitchAll*************** ');
        // }

    }
    public ShowAdOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         GameHunter.instance.ShowINterestial40();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         GameHunter.instance.ShowINterestial100();
        //         console.log(' toutiao 插页广告 路径');
        //         break;
        //     case PlatformEnum.Qq:
        //         GameHunter.instance.ShowINterestial40();
        //         break;
        //     case PlatformEnum.Vivo:
        //         /**deny */
        //         break;
        //     case PlatformEnum.Oppo:
        //         GameHunter.instance.ShowINterestial100();
        //         break;
        //     case PlatformEnum.HuaWei:
        //         GameHunter.instance.ShowINterestial100();
        //         break;
        //     default:
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
        //         resultCallback: (resultCode: boolean) => void,
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


    /**显示插屏广告 */
    public ShowINterestialSHop() {
        // if (QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Wechat || QddSDKHelper.instance.getPackingPlatform.toString() == PlatformEnum.Qq) {
        //     /**40% */
        //     let optional: {
        //         parentNode: undefined
        //         resultCallback: undefined
        //         closeCallback: undefined
        //         probability: 40,
        //     }
        //     QddSDKHelper.instance.showIntertAd(optional);
        // } else {

        // }


    }
    /**刷新优惠商品列表 */
    public refreshDiscountList() {
        this.ui.m_Content.m_EverydayDiscountCom.m_EverydayDiscountList.itemRenderer = Laya.Handler.create(this, this.RenderDiscountItem, null, false);
        this.ui.m_Content.m_EverydayDiscountCom.m_EverydayDiscountList.numItems = GameShopDataMediator.instance.data.DiscountList.length;
    }

    public refreshNormal() {
        this.ui.m_Content.m_CommodityCom.m_commodityItemList.itemRenderer = Laya.Handler.create(this, this.RenderNormalItem, null, false);
        this.ui.m_Content.m_CommodityCom.m_commodityItemList.numItems = 3;
    }

    public refreshDiamond() {
        this.ui.m_Content.m_DiamontemCom.m_commodityItemList.itemRenderer = Laya.Handler.create(this, this.RenderDiamondItem, null, false);
        this.ui.m_Content.m_DiamontemCom.m_commodityItemList.numItems = 1;
    }

    public refreshGold() {
        this.ui.m_Content.m_GoldCom.m_goldListItem.itemRenderer = Laya.Handler.create(this, this.RenderGoldItem, null, false);
        this.ui.m_Content.m_GoldCom.m_goldListItem.numItems = 4;
    }


    public MYRefreshDiamond() {
        if (!this.ifShow) {
            return;
        }
        this.ui.m_Content.m_GoldCom.m_goldListItem.numItems = 4;
        this.ui.m_Content.m_CommodityCom.m_commodityItemList.numItems = 3;
    }
    /**
     * 每日特惠
     */
    private initDiscount() {
        // GameShopDataMediator.instance.refreshDiscountItem();
        //如果超时了就刷新数据
        var date: Date = new Date();
        if (date.getTime() > GameShopDataMediator.instance.data.DiscountRefreshTime) {
            GameShopDataMediator.instance.refreshDiscountItem();
        }
        var timeDiff: number = GameShopDataMediator.instance.data.DiscountRefreshTime - date.getTime();
        if (GameShopDataMediator.instance.data.DiscountRefreshed == false) {
            this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.grayed = false;
            this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.enabled = true;
        } else {
            this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.grayed = true;
            this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.enabled = false;
        }

        this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.onClick(this, this.EverydayRefresh);
        this.ui.m_Content.m_EverydayDiscountCom.m_timeLabel.text = "全新每日特惠出现时间：" + TimeUtils.makeTimeLeftShortString(timeDiff / 1000, ":", true);

        this.refreshDiscountList();
        this.ui.m_Content.m_EverydayDiscountCom.m_EverydayDiscountList.on(fgui.Events.CLICK_ITEM, this, this.onClickDiscountItem);
    }

    /**渲染优惠商品Item */
    private RenderDiscountItem(index: number, obj: fgui.GObject) {
        var item: FGUI_yellowkuang = obj as FGUI_yellowkuang;
        var data = GameShopDataMediator.instance.data.DiscountList[index];
        if (data.isvalid == true) {
            if (data.type == 1) {//箱子
                item.m_type.selectedIndex = 1;
                var boxProp = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.itemID);
                item.m_boxName.text = boxProp.HeroChineseName;
                item.m_boxIcon.url = ComResUrl.MainFgui_url(boxProp.HeroUiIcon);
                item.m_oldPrice.text = data.oldPrice.toString();
                item.m_newPrice.text = data.nowPrice.toString();

            } else if (data.type == 2) {//碎片
                item.m_type.selectedIndex = 0;
                var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.heroID);
                item.m_Img.m_icon.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
                item.m_spLabel.text = "+" + data.fragment.toString() + '碎片';
                item.m_PriceLabel.text = '  ' + data.nowPrice.toString();
            }
            if (data.sold == true) {
                item.m_buy_state.selectedIndex = 1;
            } else {
                item.m_buy_state.selectedIndex = 0;
            }

        } else {
            if (data.type == 1) {//箱子
                item.m_type.selectedIndex = 1;
                var boxProp = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.itemID);
                item.m_boxName.text = boxProp.HeroChineseName;
                item.m_boxIcon.url = ComResUrl.MainFgui_url(boxProp.HeroUiIcon);
                item.m_oldPrice.text = data.oldPrice.toString();
                item.m_newPrice.text = data.nowPrice.toString();
            } else if (data.type == 2) {//碎片
                item.m_type.selectedIndex = 0;
                var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.heroID);
                item.m_Img.m_icon.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
                item.m_spLabel.text = "+" + data.fragment.toString();
                item.m_PriceLabel.text = '  ' + data.nowPrice.toString();
            }
            item.m_type.selectedIndex = 2;
        }
        item.data = data;
    }

    /**优惠商品Item点击 */
    private onClickDiscountItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var data: DiscountCommodityData = obj.data as DiscountCommodityData;
        if (data.isvalid == true) {
            if (data.sold == true) {
                console.log("已经售出")
            } else {
                MesManager.event(EUIEvent.ShopConfirmBuy, ["discount", obj.data]);
            }
        } else {
            console.log("数据无效")
        }
    }

    /**每日特惠广告刷新 */
    public EverydayRefresh() {
        // /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     this.refreshDiscountItem();
        //     MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //     return;
        // }

        let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        optional['videoCallback'] = (resultCode: boolean) => {
            if (resultCode) {
                /**看完 */
                this.refreshDiscountItem();
                MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
            } else {
                /**关闭 */
            }
        }
        // QddSDKHelper.instance.showVideoAd(optional);

    }
    /**刷新优惠商品数据 */
    private refreshDiscountItem() {
        GameShopDataMediator.instance.data.DiscountRefreshed = true;
        // this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.grayed = true;
        // this.ui.m_Content.m_EverydayDiscountCom.m_refreshBtn.enabled = false;
        GameShopDataMediator.instance.refreshDiscountItem();
        this.refreshDiscountList();
    }
    /**
     * 普通商品
     */
    private initNormal() {
        this.normalConfigList = ShopConfigProxy.instance.getItemByType(2);
        this.refreshNormal();
        this.ui.m_Content.m_CommodityCom.m_commodityItemList.on(fgui.Events.CLICK_ITEM, this, this.onClickNormalItem);
    }

    private RenderNormalItem(index: number, obj: fgui.GObject) {
        var config: _ShopConfig.DataType = this.normalConfigList[index];
        var item: FGUI_CommondityItemBtn = obj as FGUI_CommondityItemBtn;
        var itemProp = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
        item.m_boxName.text = itemProp.HeroChineseName;
        if (config.itemType == 1) {
            item.m_type.selectedIndex = 1;
            item.m_box.url = ComResUrl.MainFgui_url(itemProp.HeroUiIcon);
        } else if (config.itemType == 3) {
            item.m_type.selectedIndex = 0;
            item.m_addLabel.text = "+" + itemProp.ItemValue;
        }
        item.m_priceLabel.text = '  ' + config.cost.toString();
        if (this.checkEnough(config.costType, config.cost)) {
            item.m_priceLabel.color = "#FFFFFF";
        } else {
            item.m_priceLabel.color = "#FF0000";
        }
        item.data = config;
    }

    private onClickNormalItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShopConfirmBuy, ["normal", obj.data]);
    }

    /**
     * 宝石商品
     */
    private initDiamond() {
        this.diamondConfigList = ShopConfigProxy.instance.getItemByType(3);
        this.refreshDiamond();
        this.ui.m_Content.m_DiamontemCom.m_commodityItemList.on(fgui.Events.CLICK_ITEM, this, this.onClickDiamondItem);

        //到前天早上00:00点的时间差
        var date: Date = new Date();
        if (date.getTime() > GameShopDataMediator.instance.data.freeDiamodnFreshTime) {
            GameShopDataMediator.instance.data.freeDiamondCount = GameShopDataMediator.instance.data.freeDiamondCount_limit;
            //刷新时间，明天早上00:00
            var refreshTime: number = Date.parse(date.toDateString()) + 1000 * 60 * 60 * 24;
            GameShopDataMediator.instance.data.freeDiamodnFreshTime = refreshTime;
        }

        this.ui.m_Content.m_DiamontemCom.m_diaWatchBtn.m_countLabel.text = GameShopDataMediator.instance.data.freeDiamondCount + "/" + GameShopDataMediator.instance.data.freeDiamondCount_limit;
        this.ui.m_Content.m_DiamontemCom.m_diaWatchBtn.title = "" + GameShopDataMediator.instance.data.freeDiamond;
        this.ui.m_Content.m_DiamontemCom.m_diaWatchBtn.onClick(this, this.diaWatchHandler);
    }

    private RenderDiamondItem(index: number, obj: fgui.GObject) {
        var config: _ShopConfig.DataType = this.diamondConfigList[index];
        var diamond = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
        var item: FGUI_DiamonItemBtn = obj as FGUI_DiamonItemBtn;

        item.icon = ComResUrl.MainFgui_url(diamond.HeroUiIcon);
        item.m_rewardLabel.text = diamond.ItemValue.toString() + '钻石';
        this.RefreshDiamonUI(index);
    }

    /**钻石按钮点击事件 */
    private onClickDiamondItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        let index = this.ui.m_Content.m_DiamontemCom.m_commodityItemList.getChildIndex(obj);
        this.NewDiamonClickHandler(index);

    }
    public NewDiamonClickHandler(num: number) {

        // /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     /**看完 */
        //     GameShopDataMediator.instance.data.CurItemOneAdTimes--;
        //     if (GameShopDataMediator.instance.data.CurItemOneAdTimes <= 0) {
        //         /*当天满了次数 */
        //         HunterGameDataMediator.instance.data.TodayCanClick = false;
        //     }
        //     /**领取奖励 */
        //     this.ItemOneGetRewards(0);
        //     this.RefreshNewDiamonUI(0);
        //     return;
        // }

        /**能点击 */
        if (HunterGameDataMediator.instance.data.TodayCanClick) {
            /**观看le视频 */
            let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
            optional['videoCallback'] = (resultCode: boolean) => {
                if (resultCode) {
                    /**看完 */
                    GameShopDataMediator.instance.data.CurItemOneAdTimes--;
                    if (GameShopDataMediator.instance.data.CurItemOneAdTimes <= 0) {
                        /*当天满了次数 */
                        HunterGameDataMediator.instance.data.TodayCanClick = false;
                    }
                    /**领取奖励 */
                    this.ItemOneGetRewards(0);
                    this.RefreshNewDiamonUI(0);

                } else {
                    /**关闭 */
                }
            }
            // QddSDKHelper.instance.showVideoAd(optional);
        } else {
            /**  today超过最大次数 */
        }
    }

    public RefreshNewDiamonUI(num: number) {
        /**限制次数 */
        let DiamonBtnOne = this.ui.m_Content.m_DiamontemCom.m_commodityItemList.getChildAt(0) as FGUI_DiamonItemBtn;
        DiamonBtnOne.m_AdTimesLabel.text = '今日剩余' + GameShopDataMediator.instance.data.CurItemOneAdTimes + '次数';
        /**奖励数量 */
        var config: _ShopConfig.DataType = this.diamondConfigList[num];
        var diamond = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
        DiamonBtnOne.m_rewardLabel.text = diamond.ItemValue.toString() + '钻石';
        MesManager.event(TaskType.Audio + TaskTypeTwo.Look);

    }
    private ItemOneGetRewards(BtnIndex: number) {
        var config: _ShopConfig.DataType = this.diamondConfigList[BtnIndex];
        var diamond = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
        if (HunterGameDataMediator.instance.data.itemOneIsfirst) {
            HunterGameDataMediator.instance.data.itemOneIsfirst = false;
            MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.DIAMOND_ID, diamond.ItemValue * 2]);
        } else {
            MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.DIAMOND_ID, diamond.ItemValue]);
        }
    }

    public RefreshDiamonUI(num: number) {

        let DiamonBtnOne = this.ui.m_Content.m_DiamontemCom.m_commodityItemList.getChildAt(0) as FGUI_DiamonItemBtn;
        DiamonBtnOne.m_AdTimesLabel.text = '今日剩余' + GameShopDataMediator.instance.data.CurItemOneAdTimes + '次数';

    }

    /**看广告免费拿钻石 */
    private diaWatchHandler() {
        //看广告
        if (GameShopDataMediator.instance.data.freeDiamondCount > 0) {
            GameShopDataMediator.instance.data.freeDiamondCount -= 1;
            this.ui.m_Content.m_DiamontemCom.m_diaWatchBtn.m_countLabel.text = GameShopDataMediator.instance.data.freeDiamondCount + "/" + GameShopDataMediator.instance.data.freeDiamondCount_limit;
            MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.DIAMOND_ID, GameShopDataMediator.instance.data.freeDiamond]);
        } else {
            MesManager.event(EUIEvent.ShowTip, ["免费次数已用完"]);
        }
    }

    /**
     * 金币商品
     */
    private initGold() {
        this.goldConfigList = ShopConfigProxy.instance.getItemByType(4);

        this.refreshGold();
        this.ui.m_Content.m_GoldCom.m_goldListItem.on(fgui.Events.CLICK_ITEM, this, this.onClickGoldItem);

        //到前天早上00:00点的时间差
        var date: Date = new Date();
        if (date.getTime() > GameShopDataMediator.instance.data.freeDiamodnFreshTime) {
            GameShopDataMediator.instance.data.freeGoldCount = GameShopDataMediator.instance.data.freeGoldCount_limit;
            //刷新时间，明天早上00:00
            var refreshTime: number = Date.parse(date.toDateString()) + 1000 * 60 * 60 * 24;
            GameShopDataMediator.instance.data.freeGoldFreshTime = refreshTime;
        }

        this.ui.m_Content.m_GoldCom.m_goldWatchBtn.m_countLabel.text = GameShopDataMediator.instance.data.freeGoldCount + "/" + GameShopDataMediator.instance.data.freeGoldCount_limit;
        this.ui.m_Content.m_GoldCom.m_goldWatchBtn.title = "" + GameShopDataMediator.instance.data.freeGold;
        this.ui.m_Content.m_GoldCom.m_goldWatchBtn.onClick(this, this.goldWatchHandler);

    }
    /**渲染金币商品 */
    private RenderGoldItem(index: number, obj: fgui.GObject) {
        var config: _ShopConfig.DataType = this.goldConfigList[index];
        var gold = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
        var item: FGUI_goldItem = obj as FGUI_goldItem;

        //   item.m_nameLabel.text = gold.HeroChineseName;
        item.m_itemIcon.url = ComResUrl.MainFgui_url(gold.HeroUiIcon);
        item.m_addLabel.text = gold.ItemValue.toString();
        if (index == 0) {
            item.m_addLabel.text = '100';
            item.m_priceLabel.text = '观看广告';
            item.m_adMoveleft.x = 23;
        } else {

            item.m_priceLabel.text = '  ' + config.cost.toString();
        }

        if (this.checkEnough(config.costType, config.cost)) {
            item.m_priceLabel.color = "#FFFFFF";
        } else {
            item.m_priceLabel.color = "#FF0000";
        }
        item.data = config;

    }
    /**购买金币商品 */
    private onClickGoldItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        let index = this.ui.m_Content.m_GoldCom.m_goldListItem.getChildIndex(obj);

        if (index == 0) {
            /**黄金广告按钮 */
            this.goldWatchHandler();

        } else {
            MesManager.event(EUIEvent.ShopConfirmBuy, ["gold", obj.data]);

        }
    }

    /**看广告免费拿金币 */
    private goldWatchHandler() {

        // /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     /**看完 */
        //     MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.GOLD_ID, GameShopDataMediator.instance.data.freeGold]);
        //     MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //     return;
        // }


        let optional: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        optional['videoCallback'] = (resultCode: boolean) => {
            if (resultCode) {
                /**看完 */
                MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.GOLD_ID, GameShopDataMediator.instance.data.freeGold]);
                MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
            } else {
                /**关闭 */
            }
        }
        // QddSDKHelper.instance.showVideoAd(optional);

    }

    /**检查资源是否足够1.金币2.钻石 */
    private checkEnough(type: number, cost: number): boolean {
        var bool: boolean = true;
        if (type == 1) {//金币
            bool = HunterGameDataMediator.instance.data.Gold >= cost;
        } else if (type == 2) {
            bool = HunterGameDataMediator.instance.data.Gemstone >= cost;
        } else if (type == 3) {

        }
        return bool;
    }
    _onHide() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
    }
}