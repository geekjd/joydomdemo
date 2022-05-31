
import FGUI_HunterItem from "src/FGUI/GameMain/FGUI_HunterItem";
import FGUI_PGameHunter from "src/FGUI/GameMain/FGUI_PGameHunter";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import { HeroSkillDataProxy } from "src/Game/ConfigProxy/HeroSkillDataProxy";
import { HeroSkinDataProxy } from "src/Game/ConfigProxy/HeroSkinDataProxy";
import { HeroUpGradeDataProxy } from "src/Game/ConfigProxy/HeroUpGradeDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import { HeroAchievementInfo } from "src/Game/Data/type/HunterHeroInfoData";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ESceneEvent } from "src/Game/MesEvent/ESceneEvent";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import _AllPrefabsNames from "src/Game/_prefabsName/_AllPrefabsNames";
import FGUIShow3DPrefabe from "src/Ldz_GameCore/FGUI3D/FGUIShow3DPrefabe";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import { RodmControl } from "src/Ldz_GameCore/PlayerCore/RodmControl";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import GlobalD3Environment from "src/_T/D3/scene/GlobalD3Environment";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import EssentialResUrls from "src/_T/Res/EssentialResUrls";
import ResLoad from "src/_T/Res/ResLoad";
import InstanceT from "src/_T/Ts/InstanceT";
import { PGameMainProxy } from "./PGameMainProxy";


@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class GameHunter extends BaseSingleUICon<FGUI_PGameHunter> {
    public static readonly instance: GameHunter;
    protected _UI = FGUI_PGameHunter;
    protected _layer = EUILayer.Panel;
    /**当前选择的英雄配置表，非当前正在使用的Hero*/
    public selectHeroConfig: _HeroAttributeInfoConfig.DataType = null;
    /**当前正在选择的英雄的数据 */
    public selectHeroInfo: HeroAchievementInfo;
    SoliderObj: Laya.Sprite3D;
    m_3dShowNode: any;
    //开始旋转
    private startRotate: boolean = false;
    //鼠标拖拽起始X坐标
    private mouseOldPosX: number;
    /**正在更换技能的槽位 */
    public changeBUffSlot: number;
    /**当前选择的英雄的皮肤名字 */
    SelectHunterSkinName: string;
    /**来自哪个列表 0是已解锁，1是未解锁 */
    private fromWhereList: number = 0;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.Hunter, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.selectHeroInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(HunterGameDataMediator.instance.data.SelectHunterMiscID);
        this.selectHeroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(HunterGameDataMediator.instance.data.SelectHunterMiscID);

        let screenPos = new Laya.Vector3(this.ui.m_huntTopCom.m_headimg.x, this.ui.m_huntTopCom.m_headimg.y, 10);
        this.m_3dShowNode = new FGUIShow3DPrefabe(this.ui.m_huntTopCom.m_headimg, screenPos);
        this.SelectHunterSkinName = this.selectHeroInfo.HeroUsingSkin;
        this.Lode3DSceneObj(this.selectHeroInfo.HeroUsingSkin);
        /*弹出技能描述面板，和点击按钮 */
        this.ui.m_huntTopCom.m_NewPropertyCom.m_DesBtn.onClick(this, this.OnClickDesFun);
        this.ui.m_huntTopCom.m_skillDesCom.m_closeBtn.onClick(this, this.ONClcikTipsCloseBtn);
        this.ui.m_huntTopCom.m_skillDesCom.m_skillTipsbottomBtn.onClick(this, this.ONClcikTipsBottomBtn);
        this.ui.m_huntTopCom.m_choseChar.onClick(this, this.SetPlayer);
        /*已经解锁英雄列表 */
        this.ui.m_HeroCom.m_UnblockNum.text = HunterHeroInfoDataMediator.instance.GetUnlockedHero().length.toString();
        this.ui.m_HeroCom.m_UnBlockList.itemRenderer = Laya.Handler.create(this, this.RenderItemUnBlockFun, null, false);
        this.ui.m_HeroCom.m_UnBlockList.numItems = HunterHeroInfoDataMediator.instance.GetUnlockedHero().length;
        this.ui.m_HeroCom.m_UnBlockList.on(fgui.Events.CLICK_ITEM, this, this.ONClickUnBlockHandler);
        /**没有解锁英雄列表 */
        this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.itemRenderer = Laya.Handler.create(this, this.RenderItemBlockFun, null, false);
        this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.numItems = HunterHeroInfoDataMediator.instance.GetNotUnlockedHero().length;
        this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.on(fgui.Events.CLICK_ITEM, this, this.ONClickBlockHandler);

        let col: number = Math.ceil(HunterHeroInfoDataMediator.instance.GetUnlockedHero().length / 3);
        let unlock_height: number = col * 289;
        this.ui.m_HeroCom.m_BlockComp.y = this.ui.m_HeroCom.m_UnBlockList.y + unlock_height + 10;

        let un_col: number = Math.ceil(HunterHeroInfoDataMediator.instance.GetNotUnlockedHero().length / 3);
        let lock_height: number = un_col * 289;
        this.ui.m_HeroCom.m_BlockComp.height = this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.y + lock_height;


        this.ui.m_huntTopCom.m_skill1.m_lv.text = "6级";
        this.ui.m_huntTopCom.m_skill2.m_lv.text = "8级";
        this.ui.m_huntTopCom.m_skill3.m_lv.text = "10级";
        this.ui.m_huntTopCom.m_skill1.onClick(this, this.selectBuff, [1]);
        this.ui.m_huntTopCom.m_skill2.onClick(this, this.selectBuff, [2]);
        this.ui.m_huntTopCom.m_skill3.onClick(this, this.selectBuff, [3]);

        /**金币升级按钮 */
        this.ui.m_huntTopCom.m_HeroUpGradeBtn.onClick(this, this.ONClickGoldUpGradeFun);
        //解锁皮肤
        this.ui.m_huntTopCom.m_UnblockSkinBtn.onClick(this, this.ONClickSkinUnblockFun);

        //切换皮肤按钮
        var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        var skins: string[] = skinData.HeroSkin.split(",");
        var cIndex: number = skins.indexOf(this.selectHeroInfo.HeroUsingSkin);
        this.ui.m_huntTopCom.m_modelList.itemRenderer = Laya.Handler.create(this, this.renderModelListItem, null, false);
        this.ui.m_huntTopCom.m_modelList.numItems = skins.length;
        this.ui.m_huntTopCom.m_modelList.touchable = false;
        this.ui.m_huntTopCom.m_model.clearPages();
        for (let i = 0; i < skins.length; i++) {
            this.ui.m_huntTopCom.m_model.addPage("page" + (i + 1));
        }
        this.ui.m_huntTopCom.m_model.selectedIndex = cIndex;
        this.ui.m_huntTopCom.m_prevBtn.onClick(this, this.selectSkin, [-1]);
        this.ui.m_huntTopCom.m_nextBtn.onClick(this, this.selectSkin, [1]);

        this.ui.m_unlockSkin.m_btnNo.onClick(this, this.hideUnlockSkin);
        this.ui.m_unlockSkin.m_btnYes.onClick(this, this.showUnlockSkin);

        //模型旋转监听
        this.ui.m_huntTopCom.m_headimg.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.ui.m_huntTopCom.m_headimg.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.ui.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);

        this.updateProperty();

        // /**ad */
        // if (QddSDKHelper.TestSwitchAll) {
        //     console.log('TestSwitchAll*************** ');
        //     this.ShowAdOrder();
        //     //  this.ShowadOrder();
        // }

    }
    public ShowAdOrder() {
        // switch (QddSDKHelper.instance.getPackingPlatform().toString()) {
        //     case PlatformEnum.Wechat:
        //         console.log('show Wechat inters');
        //         this.ShowINterestial40();
        //         break;
        //     case PlatformEnum.TouTiao:
        //         console.log('  toutiao 插屏 path');
        //         this.ShowINterestial100();
        //         break;
        //     case PlatformEnum.Qq:
        //         console.log('show Qq inters');
        //         this.ShowINterestial40();
        //         break;
        //     case PlatformEnum.Vivo:
        //         /**deny */
        //         break;
        //     case PlatformEnum.Oppo:
        //         console.log('show OPPO inters');
        //         this.ShowINterestial100();
        //         break;
        //     case PlatformEnum.HuaWei:
        //         console.log('show OPPO inters');
        //         this.ShowINterestial100();
        //         break;
        //     case PlatformEnum.XiaoMi:
        //         console.log('show XiaoMi inters');
        //         this.ShowINterestial100();
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
        //     console.log("打开小米APP插屏");
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
    public ShowINterestial40() {
        // if (QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Wechat || QddSDKHelper.instance.getPackingPlatform().toString() == PlatformEnum.Qq) {
        //     /**40% */
        //     let optional: {
        //         parentNode: undefined
        //         resultCallback: undefined
        //         closeCallback: undefined
        //         probability: 40,
        //     }
        //     QddSDKHelper.instance.showIntertAd(optional);
        // }
    }
    public ShowINterestial100() {
        /**100% */
        // let optional: {
        //     parentNode: undefined
        //     resultCallback: undefined
        //     closeCallback: undefined
        //     probability: 100,
        // }
        // QddSDKHelper.instance.showIntertAd(optional);

    }
    /** */

    private mouseDown() {
        console.log("鼠标按下")
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
    /**选择BUFF事件 */
    private selectBuff(slot: number) {
        console.log(slot);
        // let ItemData = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByName(HunterGameDataMediator.instance.data.SelectHunterName);
        if (slot == 1 && this.selectHeroConfig.HeroLevle < 6) {
            console.log("6级解锁。");

        }
        if (slot == 2 && this.selectHeroConfig.HeroLevle < 8) {
            console.log("8级解锁。");
        }
        if (slot == 3 && this.selectHeroConfig.HeroLevle < 10) {
            console.log("10级解锁。");
        }
        this.changeBUffSlot = slot;
        MesManager.event(EUIEvent.SelectBUFFPanel);
    }

    //切换皮肤
    private selectSkin(direc: number) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        var skins: string[] = skinData.HeroSkin.split(",");
        if (this.ui.m_huntTopCom.m_model.selectedIndex + direc < 0) {
            return;
        } else if (this.ui.m_huntTopCom.m_model.selectedIndex + direc >= skins.length) {
            return;
        }
        this.ui.m_huntTopCom.m_model.selectedIndex += direc;
        this.SelectHunterSkinName = skins[this.ui.m_huntTopCom.m_model.selectedIndex];
        this.Lode3DSceneObj(this.SelectHunterSkinName);

        if (this.fromWhereList == 0) {
            this.changeUnlockBtnState();
        } else {
            this.ui.m_huntTopCom.m_UnblockSkinBtn.visible = false;
            this.ui.m_huntTopCom.m_choseChar.visible = true;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.visible = true;
        }
    }

    private changeUnlockBtnState() {
        if (this.selectHeroInfo.HeroSkinInfo.indexOf(this.SelectHunterSkinName) > -1) {
            this.ui.m_huntTopCom.m_UnblockSkinBtn.visible = false;
            this.ui.m_huntTopCom.m_choseChar.visible = true;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.visible = true;
        } else {
            this.ui.m_huntTopCom.m_UnblockSkinBtn.visible = true;
            this.ui.m_huntTopCom.m_choseChar.visible = false;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.visible = false;

            var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
            var costs: string[] = skinData.Cost.split(",");
            this.ui.m_huntTopCom.m_UnblockSkinBtn.m_numLabel.text = costs[this.ui.m_huntTopCom.m_model.selectedIndex];
        }
    }

    /** 金币升级*/
    private ONClickGoldUpGradeFun() {
        AudioProxy.instance.playSound(ESounds.upgrade_long, 1);
        let currentLv = HeroUpGradeDataProxy.instance.GetHeroUpInfoByMicIDAndLevel(this.selectHeroConfig.HeroMiscID, this.selectHeroInfo.HeroLevel);
        HunterGameDataMediator.instance.data.Gold -= currentLv.HeroUpGold;
        this.selectHeroInfo.HeroLevel += 1;
        this.selectHeroInfo.HeroFragment -= currentLv.NeedHeroNum;
        HunterHeroInfoDataMediator.instance.Save();
        this.updateProperty();
        //获得英雄在列表里的index;
        var index: number = 0;
        var list = HunterHeroInfoDataMediator.instance.GetUnlockedHero();
        for (let i = 0; i < list.length; i++) {
            if (this.selectHeroInfo.HeroMiscID == list[i].HeroMiscID) {
                index = i;
                break;
            }
        }
        var item = this.ui.m_HeroCom.m_UnBlockList.getChildAt(index);
        this.RenderItemUnBlockFun(index, item);
        this.PlayEffects();
    }

    /*皮肤解锁 */
    private ONClickSkinUnblockFun() {
        AudioProxy.instance.playSound(ESounds.upgrade_long, 1);
        var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        var costs: string[] = skinData.Cost.split(",");
        if (HunterGameDataMediator.instance.data.Gemstone >= Number(costs[this.ui.m_huntTopCom.m_model.selectedIndex])) {
            this.ui.m_unlockSkin.visible = true;
        } else {

            MesManager.event(EUIEvent.ShowTip, ["宝石不足"]);
        }
    }
    private hideUnlockSkin() {
        this.ui.m_unlockSkin.visible = false;
    }

    private showUnlockSkin() {
        this.ui.m_unlockSkin.visible = false;
        this.selectHeroInfo.HeroSkinInfo.push(this.SelectHunterSkinName);
        HunterHeroInfoDataMediator.instance.Save();
        this.changeUnlockBtnState();

        var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        var costs: string[] = skinData.Cost.split(",");
        HunterGameDataMediator.instance.data.Gemstone -= Number(costs[this.ui.m_huntTopCom.m_model.selectedIndex]);
    }

    private renderModelListItem() {

    }

    /**根据当前选择的英雄更新数据*/
    public updateProperty() {
        /**获取当前选择英雄 */

        // let ItemSkillDate = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(this.selectHeroInfo.HeroMiscID);
        let itemOne = this.ui.m_huntTopCom.m_NewPropertyCom.m_item_1;
        let itemTwo = this.ui.m_huntTopCom.m_NewPropertyCom.m_item_2;
        /**英雄名字 */
        this.ui.m_huntTopCom.m_HeroName.text = this.selectHeroConfig.HeroName;
        /*等级 */
        this.ui.m_huntTopCom.m_DegreeNum.text = this.selectHeroInfo.HeroLevel + "级";

        var propValue = HeroUpGradeDataProxy.instance.getHeroDamageAndHp(this.selectHeroInfo.HeroMiscID, this.selectHeroInfo.HeroLevel);
        itemOne.m_oneNum.text = propValue.damage.toString();
        itemTwo.m_oneNum.text = propValue.hp.toString();

        /**英雄升级配置表 */
        let currentLv = HeroUpGradeDataProxy.instance.GetHeroUpInfoByNameAndLevel(this.selectHeroConfig.HeroName, this.selectHeroInfo.HeroLevel);

        if (this.selectHeroInfo.HeroLevel < ConstThing.HERO_MAX_LV) {
            /**碎片够了，可以升级 */
            if (this.selectHeroInfo.HeroFragment >= currentLv.NeedHeroNum) {
                /**升级后的等级（下一级 可增加的数据） */
                let nextLv = HeroUpGradeDataProxy.instance.GetHeroUpInfoByNameAndLevel(this.selectHeroConfig.HeroName, this.selectHeroInfo.HeroLevel + 1);
                /**攻击力 */
                /**获取当前等级数据 */
                itemOne.m_addNum.visible = true;
                itemOne.m_addNum.text = "+" + nextLv.AttackValue.toString();
                /**生命值 */
                itemTwo.m_addNum.visible = true;
                itemTwo.m_addNum.text = "+" + nextLv.HealthValue.toString();
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_st.selectedIndex = 0;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.grayed = false;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.enabled = true;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_gold.text = currentLv.HeroUpGold.toString();
                if (HunterGameDataMediator.instance.data.Gold >= currentLv.HeroUpGold) {
                    this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_gold.color = "#FFFFFF"
                } else {
                    /*金币不够，字显示红色 */
                    this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_gold.color = "#ff0000";
                }
                /**显示升级所需金币数量*/

            } else {
                /**换成黑色背景颜色 */
                itemOne.m_bgColor.selectedIndex = 0;
                itemTwo.m_bgColor.selectedIndex = 0;
                itemOne.m_addNum.visible = false;
                itemTwo.m_addNum.visible = false;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.grayed = true;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.enabled = false;
                this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_st.selectedIndex = 1;
            }
        } else {
            /**换成黑色背景颜色 */
            itemOne.m_bgColor.selectedIndex = 0;
            itemTwo.m_bgColor.selectedIndex = 0;
            itemOne.m_addNum.visible = false;
            itemTwo.m_addNum.visible = false;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.grayed = true;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.enabled = false;
            this.ui.m_huntTopCom.m_HeroUpGradeBtn.m_st.selectedIndex = 1;
        }

        let ItemThree = this.ui.m_huntTopCom.m_NewPropertyCom.m_item_3;
        ItemThree.m_bgColor.selectedIndex = 0;
        ItemThree.m_oneNum.text = this.selectHeroConfig.AttackRangeStr;

        let ItemFour = this.ui.m_huntTopCom.m_NewPropertyCom.m_item_4;
        ItemFour.m_bgColor.selectedIndex = 0;
        ItemFour.m_oneNum.text = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(this.selectHeroInfo.HeroMiscID).AttackName;

        if (this.selectHeroInfo.HeroLevel < 3) {
            this.ui.m_huntTopCom.m_buffSlots.visible = false;
        } else {
            this.ui.m_huntTopCom.m_buffSlots.visible = true;
            this.updateBuffSlot();
        }
    }

    /**更新选择的英雄的技能槽位的状态 */
    public updateBuffSlot() {
        let TempHunterData: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        //初始化BUFF列表
        if (TempHunterData.HeroLevel >= 6) {
            if (TempHunterData.LevelSixSkills != 0) {
                this.ui.m_huntTopCom.m_skill1.m_state.selectedIndex = 2;
                var info = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(TempHunterData.LevelSixSkills);
                this.ui.m_huntTopCom.m_skill1.m_icon.url = ComResUrl.MainFgui_url(info.BuffUiIcon);
            } else {
                this.ui.m_huntTopCom.m_skill1.m_state.selectedIndex = 1;
            }
        } else {
            this.ui.m_huntTopCom.m_skill1.m_state.selectedIndex = 0;
        }
        if (TempHunterData.HeroLevel >= 8) {
            if (TempHunterData.LevelEightSkills != 0) {
                this.ui.m_huntTopCom.m_skill2.m_state.selectedIndex = 2;
                var info = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(TempHunterData.LevelEightSkills);
                this.ui.m_huntTopCom.m_skill2.m_icon.url = ComResUrl.MainFgui_url(info.BuffUiIcon);
            } else {
                this.ui.m_huntTopCom.m_skill2.m_state.selectedIndex = 1;
            }
        } else {
            this.ui.m_huntTopCom.m_skill2.m_state.selectedIndex = 0;
        }
        if (TempHunterData.HeroLevel >= 10) {
            if (TempHunterData.LevelTenSkills != 0) {
                this.ui.m_huntTopCom.m_skill3.m_state.selectedIndex = 2;
                var info = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(TempHunterData.LevelTenSkills);
                this.ui.m_huntTopCom.m_skill3.m_icon.url = ComResUrl.MainFgui_url(info.BuffUiIcon);
            } else {
                this.ui.m_huntTopCom.m_skill3.m_state.selectedIndex = 1;
            }
        } else {
            this.ui.m_huntTopCom.m_skill3.m_state.selectedIndex = 0;
        }
    }

    public OnClickDesFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        console.log('弹出技能描述面板，和点击按钮');
        this.ui.m_huntTopCom.m_skillDesCom.visible = true;
        // this.ui.m_huntTopCom.m_NewPropertyCom.visible = false;
        let ItemSkillDate = HeroSkillDataProxy.instance.GetHeroSkillInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        this.ui.m_huntTopCom.m_skillDesCom.m_skillDes.text = ItemSkillDate.AttackTips;

    }
    public ONClcikTipsCloseBtn() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        /*关闭Tips 界面 */
        this.ui.m_huntTopCom.m_skillDesCom.visible = false;
        // this.ui.m_huntTopCom.m_NewPropertyCom.visible = true;
    }
    public ONClcikTipsBottomBtn() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowBUFFPanel);
    }

    private SetPlayer() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        HunterGameDataMediator.instance.data.SelectHunterMiscID = this.selectHeroInfo.HeroMiscID;
        HunterGameDataMediator.instance.data.SelectHunterName = this.selectHeroConfig.HeroEnglishName;
        HunterGameDataMediator.instance.data.SelectHunterLevel = this.selectHeroInfo.HeroLevel;
        HunterGameDataMediator.instance.data.SelectHunterSkinName = this.SelectHunterSkinName;
        HunterGameDataMediator.instance.Save();
        this.selectHeroInfo.HeroUsingSkin = this.SelectHunterSkinName;
        HunterHeroInfoDataMediator.instance.Save();

        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowHome);
        MesManager.event(EUIEvent.hideTopTicket);
        MesManager.event(ESceneEvent.SwitchCharacter, HunterGameDataMediator.instance.data.SelectHunterSkinName);

        //切换主界面标签到home
        // PGameMainProxy.instance.ui.m_homeTabCom.m_c1.selectedIndex = 2;
    }
    /*已经解锁英雄列表渲染函数 */
    private RenderItemUnBlockFun(index: number, obj: fgui.GObject) {

        let item = obj as FGUI_HunterItem;
        /**解锁的 狩猎者信息 */
        let heroInfo: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedHero()[index];
        item.data = heroInfo;
        /**属性配置信息 */
        let heroConfig: _HeroAttributeInfoConfig.DataType = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(heroInfo.HeroMiscID);

        if (HunterGameDataMediator.instance.data.SelectHunterMiscID == heroConfig.HeroMiscID) {
            item.m_selectedbg.visible = true;
        } else {
            item.m_selectedbg.visible = false;
        }

        /**英雄名字 */
        item.m_name.text = heroConfig.HeroName;
        /**英雄奖杯数 */
        item.m_trophy_num.text = heroInfo.HeroTrophy.toString();
        /**英雄等级 */
        item.m_lvtext.text = heroInfo.HeroLevel + '级';

        /**英雄icon */
        item.m_HunterIcon.url = ComResUrl.MainFgui_url(heroConfig.HeroIcon);

        /**英雄当前等级数量进度条 */
        let NeedheroNum = HeroUpGradeDataProxy.instance.GetHeroUpInfoByMicIDAndLevel(heroInfo.HeroMiscID, heroInfo.HeroLevel).NeedHeroNum;
        if (heroInfo.HeroFragment >= NeedheroNum) {
            item.m_HeroNumPro.value = 100;
            item.m_protxt.text = heroInfo.HeroFragment + '/' + NeedheroNum;
            item.m_exp_state.selectedIndex = 0;

        } else {
            item.m_HeroNumPro.value = heroInfo.HeroFragment / NeedheroNum;
            item.m_protxt.text = heroInfo.HeroFragment + '/' + NeedheroNum;
            item.m_exp_state.selectedIndex = 1;
        }

        item.m_locked.selectedIndex = 0;
        item.m_t4.play(Laya.Handler.create(this, () => {

        }), -1)
    }
    /*没有解锁英雄列表渲染函数 */
    private RenderItemBlockFun(index: number, obj: fgui.GObject) {
        let item = obj as FGUI_HunterItem;
        /**未解锁信息 */
        let heroInfo: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetNotUnlockedHero()[index];
        item.data = heroInfo;
        /**属性配置信息 */
        let heroConfig: _HeroAttributeInfoConfig.DataType = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(heroInfo.HeroMiscID);
        item.m_name.text = heroConfig.HeroName;
        /**英雄奖杯数 */
        item.m_trophy_num.text = heroInfo.HeroTrophy.toString();
        /**英雄等级 */
        item.m_lvtext.text = heroInfo.HeroLevel.toString() + '级';
        /**英雄icon */
        item.m_HunterIcon.url = ComResUrl.MainFgui_url(heroConfig.HeroIcon);
        let NeedheroNum = HeroUpGradeDataProxy.instance.GetHeroUpInfoByMicIDAndLevel(heroInfo.HeroMiscID, heroInfo.HeroLevel).NeedHeroNum;
        item.m_HeroNumPro.value = 0;
        /**进度条比率txt */
        item.m_protxt.text = heroInfo.HeroFragment + '/' + NeedheroNum;
        /*显示需要解锁的条件描述  英雄解锁类型（0:奖杯，1：开箱子，2：每日任务，3：活动积分，4：合作抵御波数，5：赛季奖励）*/
        switch (heroConfig.UnblockType) {
            case 0:
                item.m_jiesuoNum.text = ' 奖杯需要达到' + heroConfig.UnblockNum + '个';
                break;
            case 1:
                item.m_jiesuoNum.text = '开箱子解锁英雄';
                break;
            case 2:
                item.m_jiesuoNum.text = ' 每日任务需要达到' + heroConfig.UnblockNum + '个';
                break;
            case 3:
                item.m_jiesuoNum.text = '活动积分需要达到' + heroConfig.UnblockNum + '分';
                break;
            case 4:
                item.m_jiesuoNum.text = ' 合作抵御波数需要达到' + heroConfig.UnblockNum + '次';
                break;
            case 5:
                item.m_jiesuoNum.text = '赛季奖励解锁';
                break;
        }
        item.m_locked.selectedIndex = 1;
    }
    /**点击已解锁英雄Item */
    private ONClickUnBlockHandler(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        this.fromWhereList = 0;
        this.selectHeroInfo = obj.data as HeroAchievementInfo;
        this.selectHeroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(this.selectHeroInfo.HeroMiscID);
        var skinData = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(this.selectHeroConfig.HeroMiscID);
        var skins: string[] = skinData.HeroSkin.split(",");
        var cIndex: number = skins.indexOf(this.selectHeroInfo.HeroUsingSkin);
        this.ui.m_huntTopCom.m_model.selectedIndex = cIndex;
        /**数据 */
        let index = this.ui.m_HeroCom.m_UnBlockList.getChildIndex(obj);

        let item = obj as FGUI_HunterItem;
        item.m_selectedbg.visible = true;

        //获取已解锁列表的item,把其他item的选项状态置为false
        let length: number = this.ui.m_HeroCom.m_UnBlockList.numChildren;
        for (let i = 0; i < length; i++) {
            let item: FGUI_HunterItem = <FGUI_HunterItem>this.ui.m_HeroCom.m_UnBlockList.getChildAt(i);
            if (i != index) {
                item.m_selectedbg.visible = false;
            }
        }

        //获取未解决列表的item,把其他item的选项状态置为false
        let lock_length: number = this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.numChildren;
        for (let j = 0; j < lock_length; j++) {
            let item: FGUI_HunterItem = <FGUI_HunterItem>this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.getChildAt(j);
            item.m_selectedbg.visible = false;
        }

        this.SelectHunterSkinName = this.selectHeroInfo.HeroUsingSkin;
        this.Lode3DSceneObj(this.selectHeroInfo.HeroUsingSkin);
        this.ui.m_huntTopCom.m_choseChar.visible = true;
        this.ui.m_huntTopCom.m_choseChar.grayed = false;
        this.ui.m_huntTopCom.m_choseChar.enabled = true;
        this.ui.m_huntTopCom.m_HeroUpGradeBtn.visible = true;
        this.updateProperty();
    }

    /**点击未解锁英雄Item */
    private ONClickBlockHandler(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        this.fromWhereList = 1;
        //头上的皮肤选择重置到0
        this.ui.m_huntTopCom.m_model.selectedIndex = 0;

        /**数据 */
        let index = this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.getChildIndex(obj);

        let item = obj as FGUI_HunterItem;
        item.m_selectedbg.visible = true;
        this.selectHeroInfo = obj.data as HeroAchievementInfo;
        this.selectHeroConfig = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(this.selectHeroInfo.HeroMiscID);

        //获取已解锁列表的item
        let length: number = this.ui.m_HeroCom.m_UnBlockList.numChildren;
        for (let i = 0; i < length; i++) {
            let item: FGUI_HunterItem = <FGUI_HunterItem>this.ui.m_HeroCom.m_UnBlockList.getChildAt(i);
            item.m_selectedbg.visible = false;
        }

        //获取未解决列表的item
        let lock_length: number = this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.numChildren;
        for (let j = 0; j < lock_length; j++) {
            let item: FGUI_HunterItem = <FGUI_HunterItem>this.ui.m_HeroCom.m_BlockComp.m_BlockHunterList.getChildAt(j);
            if (j != index) {
                item.m_selectedbg.visible = false;
            }
        }

        this.SelectHunterSkinName = this.selectHeroInfo.HeroUsingSkin;
        this.Lode3DSceneObj(this.selectHeroInfo.HeroUsingSkin);

        this.ui.m_huntTopCom.m_choseChar.visible = true;
        this.ui.m_huntTopCom.m_choseChar.grayed = true;
        this.ui.m_huntTopCom.m_choseChar.enabled = false;
        this.ui.m_huntTopCom.m_HeroUpGradeBtn.visible = true;
        this.updateProperty();
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
            Obj.transform.localPosition = new Laya.Vector3(0, 1, 0);
            Obj.transform.localScale = new Laya.Vector3(1.5, 1.5, 1.5);
            let TempRodmControl: RodmControl = Obj.addComponent(RodmControl);
            let Mesh = Obj.getChildAt(0) as Laya.SkinnedMeshSprite3D;
            let Matr: Laya.Material[] = [];
            Matr.push(Mesh.skinnedMeshRenderer.sharedMaterials[0]);
            Mesh.skinnedMeshRenderer.sharedMaterials = Matr;
            //TempRodmControl.IdleName;
            if (TempRodmControl != null) {
                try {
                    TempRodmControl.m_Animator.play(TempRodmControl.IdleName);
                } catch {
                }
            }
        }));
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
    PlayEffects() {
        let Url = EssentialResUrls.PrefabURL(_AllPrefabsNames.sj_sphere_yellow);
        ResLoad.Load3D(Url, Laya.Handler.create(this, () => {
            let Obj = ResLoad.GetRes(Url) as Laya.Sprite3D;
            if (this.SoliderObj == null) return;
            this.SoliderObj.addChild(Obj);
            Obj.transform.localPosition = new Laya.Vector3(0, 2, 0);
            //Obj.transform.localRotationEulerX = -70;
            console.log(Obj.transform);
            Laya.timer.once(2000, this, () => {
                if (Obj != null && !Obj.destroyed && Obj.parent != null) {
                    Obj.destroy();
                }
            });
        }));
    }

    _onHide() {
        if (!this.ifShow)
            return;
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);

    }

}