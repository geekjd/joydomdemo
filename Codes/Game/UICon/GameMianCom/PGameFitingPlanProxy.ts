import FGUI_GameFitingPlan from "src/FGUI/GameMain/FGUI_GameFitingPlan";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import { MarsJoy } from "src/Ldz_GameCore/PlayerCore/MarsJoy";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import TimeUtils from "src/_T/Utils/TimeUtils";

@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class PGameFitingPlanProxy extends BaseSingleUICon<FGUI_GameFitingPlan> {
    public static readonly instance: PGameFitingPlanProxy;
    protected _UI = FGUI_GameFitingPlan;
    protected _layer = EUILayer.Main;
    isLoadResSuccess: boolean;
    private constructor() {
        super();
    }
    Joy: MarsJoy = new MarsJoy();
    SkillList: [number, number][] = [];
    Init() {
        MesManager.on(EUIEvent.ShowBattleUIm, this, this.Show);
        MesManager.on(ESceneEvent.UpdateExpInfo, this, this.UpdateExpInfo);
        MesManager.on(ESceneEvent.UpdateExpInfoMax, this, this.PlayExpMax);
        MesManager.on(ESceneEvent.ShowSkillPlan, this, this.AddSkill);

        MesManager.on(ESceneEvent.ShowGameTimeTips, this, this.showlifeTime30);
        this.Joy = new MarsJoy();
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        //初始化 虚拟摇杆
        this.Joy.Init(this.ui);
        this.ui.m_btnSetting.onClick(this, this.OnBtnSettingClick);

        /** 生存模式修改为第几波 */
        if (HunterGameDataMediator.instance.data.SelectMode == 'Existence') {
            this.ui.m_levelBar.visible = false;
            this.ui.m_TopWave.visible = true;
        }


        console.log(' open fight panel');

        // if (QddSDKHelper.TestSwitchAll) {
        //     this.ShowadOrder();
        //     console.log('TestSwitchAll*************** ');

        // }
    }
    SetLevel(Level: number) {
        // this.ui.m_WaveNum.visible = true;
        // this.ui.m_WaveNum.text = Level + '波次';

        this.ui.m_TopWave.m_WaveNum.text = Level + '波次';
        this.ui.m_TopWave.m_waveBar.value = (Level - 1) * 25;
        this.SetItemState(Level);

    }

    SetItemState(numm: number) {
        switch (numm) {
            case 0:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 2;

                break;
            case 1:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 1;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 2;
                break;
            case 2:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 1;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 2;
                break;
            case 3:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 1;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 2;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 2;
                break;
            case 4:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 1;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 2;
                break;
            case 5:
                this.ui.m_TopWave.m_itemOne.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemTwo.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemThree.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemFour.m_c1.selectedIndex = 0;
                this.ui.m_TopWave.m_itemFive.m_c1.selectedIndex = 1;
                /**添加奖励事件 */
                //this.ui.m_TopWave.m_waveRewrdsBtn.onClick(this, this.GetRewrdsWave);
                break;
        }
    }

    GetRewrdsWave() {
        console.log(' 波数奖励');

    }

    public ShowadOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         QddSDKHelper.instance.gameRecorderStart();
        //         QddSDKHelper.instance.showBannerAd();
        //         /**录屏结束 */
        //         QddSDKHelper.instance.gameRecorderStart();
        //         break;
        //     case PlatformEnum.Qq:
        //         QddSDKHelper.instance.showBannerAd();
        //         break;
        //     case PlatformEnum.Oppo:
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll*************** ');
        //             QddSDKHelper.instance.showBannerAd();
        //             //  this.SetNativeData();
        //         }
        //         break;
        //     case PlatformEnum.Vivo:
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll*************** ');
        //             QddSDKHelper.instance.showBannerAd();
        //             // this.SetNativeData();
        //         }
        //         break;
        //     case PlatformEnum.HuaWei:
        //         if (QddSDKHelper.TestSwitchAll) {
        //             console.log('TestSwitchAll*************** ');
        //             QddSDKHelper.instance.showBannerAd();
        //         }
        //         break;
        //     default:
        //         break;
        // }
        // if (QddSDKHelper.instance.isNativeMI()) {
        //     //Laya.timer.loop(60 * 1000, this, this.CdshowIntertAd);
        //     QddSDKHelper.instance.showBannerAd();
        // }
    }

    CdshowIntertAd() {
        console.log('  XiaoMiNative插屏');
        let optionalXiaoMiNative: {
            parentNode: undefined
            resultCallback: undefined
            closeCallback: undefined
            probability: 100,
        }
        // QddSDKHelper.instance.showIntertAd(optionalXiaoMiNative);
    }

    SetNativeData() {
        // QddSDKHelper.instance.showBannerAd();
        // this.loopShowNativeImg();
        //  Laya.timer.loop(15 * 1000, this, this.loopShowNativeImg);

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
    OnClickHidePanel22() {
        /** */
        console.log('OnClickHidePanel@@@');
        this.ui.m_nativeComp.visible = true;
        this.ui.m_nativeClosebut.visible = true;
    }

    public _onHide() {

        Laya.timer.clear(this, this.CdshowIntertAd);
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log(' PGameFitingPlanProxy hide 被调用 ');
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
        //             // 在关闭该界面时，就会关掉 this.OnClickHidePanel();
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             //  Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.Vivo:
        //             //  在关闭该界面时，就会关掉 this.OnClickHidePanel();
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             //  Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         case PlatformEnum.HuaWei:
        //             //  在关闭该界面时，就会关掉 this.OnClickHidePanel();
        //             QddSDKHelper.instance.hideBannerAd();
        //             QddSDKHelper.instance.cancelNativeRefresh();
        //             Laya.timer.clear(this, this.loopShowNativeImg);
        //             QddSDKHelper.instance.hideNativeImage();
        //             break;
        //         default:

        //             break;
        //     }

        //     if (QddSDKHelper.instance.isNativeMI()) {
        //         //Laya.timer.loop(60 * 1000, this, this.CdshowIntertAd);
        //         QddSDKHelper.instance.hideBannerAd();
        //     }
        // }

    }

    ShowGameStar() {
        /*开场动画 */
        this.ui.m_ray.m_t0.play(Laya.Handler.create(this, () => {
            this.ui.m_ray.visible = false;
            console.warn(' m_ray 完成');

        }), 1);
    }
    OpenSkillSelectPlan() {
        this.ui.m_chooseSkill.visible = true;
        this.SetSkillInfo();
    }
    AddSkill(SkillOne: number, SkillTwo: number) {
        this.SkillList.push([SkillOne, SkillTwo]);
        if (this.ui.m_chooseSkill.visible == false) {
            this.OpenSkillSelectPlan();
        }
    }
    SetSkillInfo() {
        if (this.SkillList.length == 0) {
            this.ui.m_chooseSkill.visible = false;
            return;
        }
        let Temp: [number, number] = this.SkillList.shift();
        let SkillInfoOne: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(Temp[0]);
        let SkillInfoTwo: _HeroBuffConfig.DataType = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(Temp[1]);
        /**技能1 */
        this.ui.m_chooseSkill.m_s1.m_skillName.text = SkillInfoOne.BuffChineseName;
        this.ui.m_chooseSkill.m_s1.m_skillImg.url = ComResUrl.MainFgui_url(SkillInfoOne.BuffUiIcon);
        this.ui.m_chooseSkill.m_s1.offClick(this, this.SelectSkill);
        this.ui.m_chooseSkill.m_s1.onClick(this, this.SelectSkill, [Temp[0]]);
        /**技能2 */
        this.ui.m_chooseSkill.m_s2.m_skillName.text = SkillInfoTwo.BuffChineseName;;
        this.ui.m_chooseSkill.m_s2.m_skillImg.url = ComResUrl.MainFgui_url(SkillInfoTwo.BuffUiIcon);;
        this.ui.m_chooseSkill.m_s2.offClick(this, this.SelectSkill);
        this.ui.m_chooseSkill.m_s2.onClick(this, this.SelectSkill, [Temp[1]]);
    }
    SelectSkill(SkillId: number) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(ESceneEvent.AddSkillByClientID, [SkillId, 0]);
        this.SetSkillInfo();
    }
    OnBtnSettingClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowSetPanel, [true]);
    }
    /**设置游戏倒计时 */
    SetGameTimer(Timer: number) {
        let TimeStr = TimeUtils.makeTimeLeftString(Math.floor(Timer));
        this.ui.m_time.m_timeTxt.text = TimeStr;
    }
    /**设置合作模式倒计时 */
    SetCoHunterTimer(Timer: number, Tips: string = null) {
        let TimeStr = TimeUtils.makeTimeLeftString(Math.floor(Timer));
        if (Tips != null) {
            TimeStr = Tips;
            this.ui.m_time.m_timeTxt.text = TimeStr;
        } else {
            //TimeStr = ;//TimeUtils.makeTimeLeftString();
            this.ui.m_time.m_timeTxt.text = "下一波" + Math.floor(Timer);
        }
    }
    UpdateExpInfo(Level: number, CurExp: number, MaxExp: number) {
        if (!this.ifShow) return;
        if (!this.IsUpdateExp) return;
        this.ui.m_levelBar.m_levelBar.m_LevleTxt.text = "" + Level + "级";
        this.ui.m_levelBar.m_levelBar.max = MaxExp;
        //this.ui.m_levelBar.m_levelBar.value = CurExp;
        this.ui.m_levelBar.m_levelBar.tweenValue(CurExp, 0.2);

    }

    SetLevle(Level: number) {
        this.ui.m_levelBar.m_levelBar.m_LevleTxt.text = "第" + Level + "波";
    }

    IsUpdateExp: boolean = true;

    PlayExpMax(Level: number, CurExp: number, MaxExp: number) {
        if (!this.ifShow) return;
        this.IsUpdateExp = false;
        this.ui.m_levelBar.m_levelBar.tweenValue(MaxExp, 0.2);
        Laya.timer.once(200, this, () => {
            this.ui.m_t0.play(Laya.Handler.create(this, () => {
                this.ui.m_levelBar.m_levelBar.m_LevleTxt.text = "" + Level + "级";
                this.ui.m_levelBar.m_levelBar.max = MaxExp;
                this.ui.m_levelBar.m_levelBar.value = CurExp;
                this.IsUpdateExp = true;
            }), 1);
        })

    }

    /**显示倒计时30秒提示 */
    public showlifeTime30() {
        this.ui.m_lifeTime.visible = true;
        this.ui.m_lifeTime.m_flash.play(Laya.Handler.create(this, this.lifeTimeplayOut));
    }

    private lifeTimeplayOut() {
        this.ui.m_lifeTime.visible = false;
    }

    /**红屏幕 */
    playRedScreen() {
        this.ui.m_redScreen.visible = true;
        this.ui.m_t2.play(Laya.Handler.create(this, () => {
            this.ui.m_redScreen.visible = false;
        }), 1);
    }

}
