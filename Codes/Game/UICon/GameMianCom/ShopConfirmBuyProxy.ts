import FGUI_ConfirmBuy from "src/FGUI/GameMain/FGUI_ConfirmBuy";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { GameShopDataMediator } from "src/Game/Data/GameShopDataMediator";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import { DiscountCommodityData } from "src/Game/Data/type/GameShopData";
import { HeroAchievementInfo } from "src/Game/Data/type/HunterHeroInfoData";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _ResourcePropsConfig } from "src/Game/_config/_ResourcePropsConfig";
import { _ShopConfig } from "src/Game/_config/_ShopConfig";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import { GameShopProxy } from "./GameShopProxy";
import { PGameTipsCom } from "./PGameTipsCom";

/**商店确认购买面板 */
@InstanceT.DecorateInstance()
export class ShopConfirmBuyProxy extends BaseSingleUICon<FGUI_ConfirmBuy>{
    public static readonly instance: ShopConfirmBuyProxy;
    protected _UI = FGUI_ConfirmBuy;
    protected _layer = EUILayer.Popup;

    private receiveData: any[];
    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShopConfirmBuy, this, this.Show);
    }

    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.receiveData = par;
        var type: string = par[0];
        if (type == "normal" || type == "gold") {
            var config: _ShopConfig.DataType = par[1] as _ShopConfig.DataType;
            var props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
            if (config.itemType == 1) {//箱子
                this.ui.m_type.selectedIndex = 1;
                this.ui.m_boxName.text = props.HeroChineseName;
                this.ui.m_boxIcon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
            } else if (config.itemType == 2) {//碎片
                this.ui.m_type.selectedIndex = 3;
            } else if (config.itemType == 3) {//代币
                this.ui.m_type.selectedIndex = 2;
                this.ui.m_dbLabel.text = "+" + props.ItemValue;
                // this.ui.m_dbNowLabel.text = "剩余：" + GameShopDataMediator.instance.data.expAddition;
            } else if (config.itemType == 4) {//钻石
                this.ui.m_type.selectedIndex = 0;
            } else if (config.itemType == 5) {//金币
                this.ui.m_type.selectedIndex = 0;
                this.ui.m_resIcon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
                this.ui.m_resTypeIcon.url = ConstThing.GOLD_ICON;
                this.ui.m_resCount.text = props.ItemValue.toString();
            }
            this.setBtnState(config.costType, config.cost);
        } else if (type == "discount") {
            var data: DiscountCommodityData = par[1] as DiscountCommodityData;
            if (data.type == 1) {
                var boxprops: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.itemID);
                this.ui.m_type.selectedIndex = 1;
                this.ui.m_boxName.text = boxprops.HeroChineseName;
                this.ui.m_boxIcon.url = ComResUrl.MainFgui_url(boxprops.HeroUiIcon);
            } else if (data.type == 2) {
                var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.heroID);
                this.ui.m_type.selectedIndex = 3;
                this.ui.m_heroName.text = hunter.HeroName;
                this.ui.m_heroIcon.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
                this.ui.m_heroTatter.text = "+" + data.fragment;
            }
            this.setBtnState(data.costType, data.nowPrice);
        }

        this.ui.m_goldBtn.onClick(this, this.goldBuy);
        this.ui.m_diamondBtn.onClick(this, this.diamondBuy);
        this.ui.m_closeBtn.onClick(this, this.Hide);

        /**ad  */
        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowadOrder();
        //     console.log('TestSwitchAll*************** ');
        // }

    }
    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         this.ShowINterestialConfirm();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         /**录屏结束 */
        //         this.ShowINterestialConfirm();
        //         break;
        //     case PlatformEnum.Qq:
        //         this.ShowINterestialConfirm();
        //         break;
        //     case PlatformEnum.Oppo:
        //         this.ShowINterestialConfirm();
        //         break;
        //     case PlatformEnum.Vivo:
        //         /**deny insterestial */
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.HuaWei:
        //         this.ShowINterestialConfirm();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         this.ShowINterestialConfirm();
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
        //     //QddSDKHelper.instance.showBannerAd();
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
    public ShowINterestialConfirm() {
        let optional: {
            parentNode: undefined
        }
        // optional['resultCallback'] = (resultCode: boolean) => {
        //     if (resultCode == false) {
        //         if (QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Oppo || QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Vivo) {
        //             QddSDKHelper.instance.showNativeIconAd();
        //         } else {
        //             /**如果Icon没有显示成功 */
        //             QddSDKHelper.instance.showBannerAd();
        //         }
        //     }
        // }
        // optional['closeCallback'] = () => {
        //     /**关闭插屏 显示banner */
        //     QddSDKHelper.instance.showBannerAd();
        // }
        // optional['probability'] = 100;

        // QddSDKHelper.instance.showIntertAd(optional);
        // if (QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Wechat || QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Qq) {
        //     /**40% */
        //     optional['probability'] = 40;
        //     QddSDKHelper.instance.showIntertAd(optional);
        // } else {
        //     QddSDKHelper.instance.showIntertAd(optional);
        // }


    }
    private goldBuy() {
        var type: string = this.receiveData[0];
        var enough: boolean;

        AudioProxy.instance.playSound(ESounds.click, 1);
        if (type == "normal") {
            var config: _ShopConfig.DataType = this.receiveData[1] as _ShopConfig.DataType;
            enough = this.checkEnough(config.costType, config.cost);
        } else if (type == "discount") {
            var data: DiscountCommodityData = this.receiveData[1] as DiscountCommodityData;
            enough = this.checkEnough(data.costType, data.nowPrice);
            if (enough) {
                //修改数据
                data.sold = true;
                GameShopDataMediator.instance.Save();
                //刷新商店优惠商品列表
                GameShopProxy.instance.refreshDiscountList();
                //扣金币
                HunterGameDataMediator.instance.data.Gold -= data.nowPrice;
                // //增加碎片
                var hunter: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(data.heroID);
                hunter.HeroFragment += data.fragment;
                HunterHeroInfoDataMediator.instance.Save();
                //打开获得道具的弹窗
                MesManager.event(EUIEvent.ShowRewardPanel, [data.itemID, data.fragment]);
                console.log("金币够了，可以购买")
                this.Hide();
            } else {
                PGameTipsCom.instance.PLayTips('金币不足');
                console.log("金币不够无法购买")
            }
        }
    }

    private diamondBuy() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var type: string = this.receiveData[0];
        var enough: boolean;
        if (type == "normal" || type == "gold") {
            var config: _ShopConfig.DataType = this.receiveData[1] as _ShopConfig.DataType;
            enough = this.checkEnough(config.costType, config.cost);
            if (enough) {
                console.log("钻石够了，可以购买")
                var props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.itemID);
                if (config.itemType == 1) {
                    // var boxItems = ResourcePropsDataProxy.instance.createBoxItem(config.itemID);
                    MesManager.event(EUIEvent.ShowRewardPanel, [config.itemID, 1]);
                } else if (config.itemType == 3) {
                    // GameShopDataMediator.instance.data.Daibi += props.ItemValue;
                    //HunterGameDataMediator.instance.data.DaiBi += props.ItemValue;
                    /**刷新代币 */

                    //打开获得道具的弹窗
                    MesManager.event(EUIEvent.ShowRewardPanel, [config.itemID, props.ItemValue]);
                } else if (config.itemType == 5) {
                    // HunterGameDataMediator.instance.data.Gold += props.ItemValue;
                    //打开获得道具的弹窗
                    MesManager.event(EUIEvent.ShowRewardPanel, [ConstThing.GOLD_ID, props.ItemValue]);
                }
                HunterGameDataMediator.instance.data.Gemstone -= config.cost;
                if (type == "normal") {
                    GameShopProxy.instance.refreshNormal();
                } else if (type == "gold") {
                    GameShopProxy.instance.refreshGold();
                }
                this.Hide();
            } else {
                console.log("钻石不够无法购买");
                PGameTipsCom.instance.PLayTips('钻石不足');
            }
        } else if (type == "discount") {
            var data: DiscountCommodityData = this.receiveData[1] as DiscountCommodityData;
            enough = this.checkEnough(data.costType, data.nowPrice);
            if (enough) {
                console.log("钻石够了，可以购买")
                MesManager.event(EUIEvent.ShowRewardPanel, [data.itemID, 1]);
                this.Hide();
            } else {
                PGameTipsCom.instance.PLayTips('钻石不足');
                console.log("钻石不够无法购买")
            }
        }
    }


    private setBtnState(costType: number, cost: number) {
        if (costType == 1) {//金币
            this.ui.m_money.selectedIndex = 0;
            this.ui.m_goldBtn.title = cost.toString();
            if (this.checkEnough(costType, cost)) {
                this.ui.m_goldBtn.titleColor = "#FFFFFF";
            } else {
                this.ui.m_goldBtn.titleColor = "#FF0000";
            }
        } else if (costType == 2) {//钻石
            this.ui.m_money.selectedIndex = 1;
            this.ui.m_diamondBtn.title = cost.toString();
            if (this.checkEnough(costType, cost)) {
                this.ui.m_diamondBtn.titleColor = "#FFFFFF";
            } else {
                this.ui.m_diamondBtn.titleColor = "#FF0000";
            }
        }
    }

    /**检查资源是否足够1.金币2.钻石 */
    private checkEnough(type: number, cost: number): boolean {
        var bool: boolean = false;
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
        // if (QddSDKHelper.TestSwitchAll) {

        //     switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //         case PlatformEnum.Wechat:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.TouTiao:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Qq:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Oppo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.Vivo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         default:

        //             break;
        //     }
        // }

    }

}