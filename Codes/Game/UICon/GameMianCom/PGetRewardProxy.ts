
import FGUI_PGetReward from "src/FGUI/GameMain/FGUI_PGetReward";
import FGUI_rewardItem from "src/FGUI/GameMain/FGUI_rewardItem";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import { PropsData } from "src/Game/Data/type/PropsData";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _ResourcePropsConfig } from "src/Game/_config/_ResourcePropsConfig";
import FGUIShow3DPrefabe from "src/Ldz_GameCore/FGUI3D/FGUIShow3DPrefabe";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import InstanceT from "src/_T/Ts/InstanceT";
import LayaUtils from "src/_T/Utils/LayaUtils";
import { GameShopProxy } from "./GameShopProxy";



enum EPAGE {
    /**箱子界面 */
    eChesetPage,
    /**分批领取 */
    eBatchGetPage,
    /**结算界面 */
    eSettlementPage,
    /**单次领取 */
    eSingleGetPage,
}
@InstanceT.DecorateInstance()
export class PGetRewardProxy extends BaseSingleUICon<FGUI_PGetReward> {
    public static readonly instance: PGetRewardProxy;
    protected _UI = FGUI_PGetReward;
    protected _layer = EUILayer.Top;
    /**剩余奖励数量 */
    // public overRewardCount: number;

    /**开宝箱时的奖励 */
    public boxItems: PropsData[];
    private SoliderObj: Laya.Sprite3D;
    private m_3dShowNode: any;
    // NativeData: void | NativeAdDataImpl;
    // data: NativeAdDataImpl;
    isLoadResSuccess: boolean;
    modeTips: number = 0;
    Ranking: number = 0;
    Isbattle: boolean = false;

    //IsBox: boolean = false;
    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShowRewardPanel, this, this.ShowReward);
    }

    /**type如果是英雄 */
    private ShowReward(id: number, count: number, Isbattle: boolean = false, modeTips?: number, Ranking?: number) {
        if (modeTips && Ranking) {
            this.modeTips = modeTips;
            this.Ranking = Ranking;
        }
        this.Isbattle = Isbattle;
        this.Show();
        if (Isbattle) {
            Laya.timer.scale = 0;
            LayaUtils.timeScale = 0;
        }
        //this.IsBox = false;


        var props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(id);
        if (props.ItemType == ConstThing.TYPE_HERO) {
            this.giveResource(id, count, props.ItemType, props.HeroID);
            this.ui.m_c1.selectedIndex = 3;
            this.showHero(props.HeroID);
            //  this.ui.m_t0.play();
            this.ui.m_clickMask.onClick(this, this.OnMaskClickSingle);
        } else if (props.ItemType == ConstThing.TYPE_BOX) {
            //this.IsBox = true;
            var boxItems = ResourcePropsDataProxy.instance.createBoxItem(id);
            for (let i = 0; i < boxItems.length; i++) {
                this.giveResource(boxItems[i].id, boxItems[i].count, boxItems[i].type, boxItems[i].heroID);
            }
            this.BatchGetReward(id, boxItems);

        } else {
            this.giveResource(id, count);
            this.ui.m_c1.selectedIndex = 3;
            this.SingleGetReward(id, count);
            //  this.ui.m_t0.play();
            this.ui.m_clickMask.onClick(this, this.OnMaskClickSingle);
        }
    }
    _onShow() {
        /**show banner */
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     this.ShowadOrder();

        // }

        if (this.modeTips && this.Ranking) {
            this.ui.m_existenceBg.visible = true;
        }

    }

    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Qq:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Oppo:
        //         // QddSDKHelper.instance.showBannerAd();
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll***************');

        //             this.SetNativeData();
        //         }

        //         break;
        //     case PlatformEnum.Vivo:
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll***************');

        //             this.SetNativeData();
        //         }
        //         break;
        //     case PlatformEnum.HuaWei:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        // }
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

        //     // this.ui.m_nativeClosebut.onClick(this, this.OnClickHidePanel);
        //     // this.ui.m_nativeComp.onClick(this, this.AdUIBtnFun);
        //     this.ui.m_requireRewrds.visible = true;
        //     this.ui.m_details.visible = true;
        //     this.ui.m_requireRewrds.onClick(this, this.GetRewardsAndErr);
        //     this.ui.m_details.onClick(this, this.AdUIBtnFun);

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

            this.OnClickHidePanel();
            // QddSDKHelper.instance.reportNativeAdImageClick(this.data.adId);

        } else {
            console.log(' 原生广告没有拉取成功');

        }
    }

    public GetRewardsAndErr() {
        /**原生误触 */
        // console.log(' 原生开关==》', AdControlUtils.autoClickNativeAdImage());
        // if (AdControlUtils.autoClickNativeAdImage()) {
        //     this.AdUIBtnFun();
        // } else {
        //     /**领取奖励 */
        this.OnMaskClickSingle();
        // }


    }

    OnClickHidePanel() {
        /** */
        console.log('OnClickHidePanel@@@');
        this.ui.m_nativeComp.visible = false;
        this.ui.m_nativeClosebut.visible = false;
        this.ui.m_requireRewrds.visible = false;
        this.ui.m_details.visible = false;

    }

    /**
     * 单次领取
     * @param id id
     * @param count 数量
     * @param type 领取的类型 1金币，2钻石，3宝箱，4碎片,5永久技能(BUFF),6代币
     */
    private SingleGetReward(id: number, count: number) {
        AudioProxy.instance.playSound(ESounds.reward_pop, 1);
        var props: _ResourcePropsConfig.DataType = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(id);//EPAGE.eSingleGetPage;
        if (props.ItemType == ConstThing.TYPE_FRAGMENT) {
            this.ui.m_reward.m_type.selectedIndex = 1;
            this.ui.m_reward.m_count.text = props.HeroChineseName + "x" + count.toString();
            this.ui.m_reward.m_heroIcon.m_icon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        } else if (props.ItemType == ConstThing.TYPE_TOKEN) {
            this.ui.m_reward.m_type.selectedIndex = 0;
            this.ui.m_reward.m_count.text = props.HeroChineseName + "+" + count.toString();
            this.ui.m_reward.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        } else {
            this.ui.m_reward.m_type.selectedIndex = 0;
            this.ui.m_reward.m_count.text = props.HeroChineseName + "x" + count.toString();
            this.ui.m_reward.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        }
        // this.ui.m_reward.m_name.text = props.HeroChineseName;
    }

    /**
     * 多次领取
     * @param dataList 
     */
    private BatchGetReward(boxID: number, items: PropsData[]) {

        this.ui.m_c1.selectedIndex = EPAGE.eChesetPage;
        this.boxItems = items//[...items];
        var props = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(boxID);
        this.ui.m_chestImg.m_chestImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        this.ui.m_clickMask.onClick(this, this.OnMaskClickBatch);
        this.ui.m_clickMask.onClick(this, this.PlayerMusic);
        this.ui.m_rewardList.itemRenderer = Laya.Handler.create(this, this.FreshRewardListData, null, false);
        this.ui.m_rewardList.numItems = items.length;
    }
    PlayerMusic() {
        AudioProxy.instance.playSound(ESounds.chest_open_short, 1);
    }

    /**渲染列表ITEM */
    FreshRewardListData(index: number, Item: FGUI_rewardItem) {
        var data: PropsData = this.boxItems[index];
        var props = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.id);
        if (data.type == ConstThing.TYPE_SKILL) {
            Item.m_type.selectedIndex = 2;
            var buff = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(data.id);
            var hero = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.heroID);
            Item.m_rewardImg.url = ComResUrl.MainFgui_url(buff.BuffUiIcon);
            Item.m_heroIcon.url = ComResUrl.MainFgui_url(hero.HeroIcon);
            Item.m_count.color = "#00FF00";
            Item.m_count.text = "已解锁";
        } else if (data.type == "hero") {
            Item.m_type.selectedIndex = 1;
            var hero = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.id);
            Item.m_rewardImg.url = ComResUrl.MainFgui_url(hero.HeroIcon);
            Item.m_count.color = "#00FF00";
            Item.m_count.text = "已解锁";
        } else if (props.ItemType == ConstThing.TYPE_FRAGMENT) {
            Item.m_type.selectedIndex = 1;
            Item.m_count.color = "#FFFFFF";
            Item.m_count.text = data.count.toString();
            Item.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        } else {
            Item.m_type.selectedIndex = 0;
            Item.m_count.color = "#FFFFFF";
            Item.m_count.text = data.count.toString();
            Item.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
        }
    }
    /**单次领取屏幕点击 */
    OnMaskClickSingle() {
        this.Hide();
        //领取道具结束
    }
    /**多次领取屏幕点击 */
    private OnMaskClickBatch() {
        if (this.ui.m_c1.selectedIndex == EPAGE.eSettlementPage) {
            this.Hide();
        } else {
            if (this.boxItems.length > 0) {
                this.ui.m_c1.selectedIndex = EPAGE.eBatchGetPage;
                // this.ui.m_t0.play();
                var data: PropsData = this.boxItems.shift();
                if (data.type == ConstThing.TYPE_SKILL) {
                    this.ui.m_reward.m_type.selectedIndex = 2;
                    var buff = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(data.id);
                    var hero = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(data.heroID);
                    this.ui.m_reward.m_heroIcon.m_icon.color = "#0A6BBE";
                    this.ui.m_reward.m_heroIcon.m_icon.url = ComResUrl.MainFgui_url(buff.BuffUiIcon);
                    this.ui.m_reward.m_spHeroIcon.url = ComResUrl.MainFgui_url(hero.HeroIcon);
                    // this.ui.m_reward.m_name.text = buff.BuffChineseName;
                    this.ui.m_reward.m_count.text = buff.BuffChineseName + "永久技能";
                } else if (data.type == "hero") {
                    this.showHero(data.id);
                } else {
                    this.SingleGetReward(data.id, data.count);
                }

                // else if (data.type == ConstThing.TYPE_FRAGMENT) {
                //     var props = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.id);
                //     this.ui.m_reward.m_type.selectedIndex = 1;
                //     this.ui.m_reward.m_heroIcon.m_icon.color = "#FFFFFF";
                //     this.ui.m_reward.m_heroIcon.m_icon.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
                //     this.ui.m_reward.m_name.text = props.HeroChineseName;
                //     this.ui.m_reward.m_count.text = "+" + data.count;
                // } else if (props.ItemType == ConstThing.TYPE_TOKEN) {
                //     this.ui.m_reward.m_type.selectedIndex = 0;
                //     this.ui.m_reward.m_count.text = "+" + count.toString();
                //     this.ui.m_reward.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
                // } else {
                //     var props = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(data.id);
                //     this.ui.m_reward.m_type.selectedIndex = 0;
                //     this.ui.m_reward.m_rewardImg.url = ComResUrl.MainFgui_url(props.HeroUiIcon);
                //     this.ui.m_reward.m_name.text = props.HeroChineseName;
                //     this.ui.m_reward.m_count.text = "+" + data.count;
                // }

                this.ui.m_bottom.m_count.text = this.boxItems.length.toString();

            } else {

                this.DisObj();
                this.ui.m_c1.selectedIndex = EPAGE.eSettlementPage;
            }
        }

    }

    /**获得的是英雄 */
    private showHero(heroID: number) {

        AudioProxy.instance.playSound(ESounds.upgrade_long, 1);
        //if (this.IsBox) return;
        this.ui.m_reward.m_type.selectedIndex = 3;
        var heroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(heroID);
        let screenPos = new Laya.Vector3(this.ui.m_HeroPoint.x, this.ui.m_HeroPoint.y, 10);
        this.m_3dShowNode = new FGUIShow3DPrefabe(this.ui.m_HeroPoint, screenPos);
        this.Lode3DSceneObj(heroConfig.HeroEnglishName);
        //  this.ui.m_reward.m_name.text = heroConfig.HeroName;
        this.ui.m_reward.m_count.text = heroConfig.HeroName + "已解锁";
        this.ui.m_reward.m_count.color = "#00ff00";
    }

    /**把道具保存到本地数据去 */
    private giveResource(id: number, count: number, type: string = "", heroID: number = 0) {
        //var props: _ResourcePropsConfig.DataType; = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(id);
        if (id == ConstThing.GOLD_ID) {
            HunterGameDataMediator.instance.data.Gold += count;
        } else if (id == ConstThing.DIAMOND_ID) {
            HunterGameDataMediator.instance.data.Gemstone += count;
        } else if (type == ConstThing.TYPE_HERO) {
            console.log("增加英雄");
            HunterHeroInfoDataMediator.instance.UnlockHunterByMiscID(heroID);
        } else if (type == ConstThing.TYPE_SKILL) {
            var heroInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(heroID);
            heroInfo.UnlockedSkills.push(id);
            HunterHeroInfoDataMediator.instance.Save();
        } else if (type == ConstThing.TYPE_FRAGMENT) {
            var heroInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(heroID);
            heroInfo.HeroFragment += count;
            HunterHeroInfoDataMediator.instance.Save();
        } else if (id == ConstThing.Daibi) {
            HunterGameDataMediator.instance.data.DaiBi += count;
            MesManager.event(EUIEvent.RefDaiBi);
        }
        /**刷新的代币 */
        MesManager.event(EUIEvent.RefDaiBi);
    }

    /**
    * 将加载的3D物体显示到UI上
    * @param SoliderName 
    * @returns 
    */
    private Lode3DSceneObj(name: string) {
        this.Lode3DObj(name);
        //UI面板
        // let OnePlan = this.ui.m_huntTopCom;
        // let Pos = new Laya.Vector3();
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
    private Lode3DObj(SoliderName: string) {
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
            let TempCoSp = Obj.getChildByName("TirggerCollider");
            if (TempCoSp != null) {
                let TempMesh = TempCoSp as Laya.MeshSprite3D;
                TempMesh.meshRenderer.enable = false;
            }
            this.SoliderObj.addChild(Obj);
            Obj.transform.localPosition = new Laya.Vector3(0, 0, 0);
            Obj.transform.localScale = new Laya.Vector3(1.3, 1.3, 1.3);
            if (this.SoliderObj.transform != null) {
                this.SoliderObj.transform.localRotationEulerY = 20;
                Laya.Tween.from(this.SoliderObj.transform, {
                    localRotationEulerY: this.SoliderObj.transform.localRotationEulerY + 720,
                    localScaleX: 0, localScaleY: 0, localScaleZ: 0, localPositionY: 1
                }, 1500, Laya.Ease.quadOut);
            }
            this.ui.m_reward.m_showHero.play();
        }));
    }

    private transScale() {
        // this.SoliderObj.localRotationEulerY += 1;
    }

    /**
    * 销毁3D物体
    */
    private DisObj() {

        if (this.SoliderObj != null) {
            this.SoliderObj.destroy();
            this.SoliderObj = null;
        }
    }

    public _onHide() {
        Laya.timer.scale = 1;
        LayaUtils.timeScale = 1;
        GameShopProxy.instance.MYRefreshDiamond();
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
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
        //             QddSDKHelper.instance.cancelNativeRefresh()
        //             Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.Vivo:
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break;
        //         case PlatformEnum.XiaoMi:
        //             QddSDKHelper.instance.hideBannerAd();
        //             break
        //     }
        // }

        if (this.Isbattle) {
            MesManager.event(EUIEvent.ShowGameOverPlan, [this.modeTips, this.Ranking]);
        }

    }
}