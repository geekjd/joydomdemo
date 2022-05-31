import FGUI_passCardUItem from "src/FGUI/GameMain/FGUI_passCardUItem";
import FGUI_PPassCard from "src/FGUI/GameMain/FGUI_PPassCard";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
// import { type } from "os";
import { PassRewardProxy } from "src/Game/ConfigProxy/PassRewardProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import { _PassRewardConfig } from "src/Game/_config/_PassRewardConfig";
import { ConstThing } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import TimeUtils from "src/_T/Utils/TimeUtils";
import { GameHomeProxy } from "./GameHomeProxy";
import { PGameComTips } from "./PGameComTips";
export class PassData {
    public lv: number;
    public free: boolean;
    public plus: boolean;
    constructor(_lv: number, _free: boolean, _plus: boolean) {
        this.lv = _lv;
        this.free = _free;
        this.plus = _plus;
    }
}

@InstanceT.DecorateInstance()
//设置界面
export class PPassProxy extends BaseSingleUICon<FGUI_PPassCard> {
    public static readonly instance: PPassProxy;
    protected _UI = FGUI_PPassCard;
    protected _layer = EUILayer.Popup;
    //配置表长度
    // private configLength: number;
    //倒序拿数据
    private revIndex: number;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowPassPanel, this, this.Show);
    }
    protected _onShow(_ifNew: boolean, ...par) {
        // this.configLength = PassRewardProxy.instance.getCount();
        var count: number = PassRewardProxy.instance.getCount() - 1;
        this.ui.m_btnReturn.onClick(this, this.OnBtnReturnClick);
        this.ui.m_top.m_activeBtn.onClick(this, this.OnActiveBtnClick);
        this.ui.m_listCom.m_rod.m_buyLv.onClick(this, this.buyPassLv);
        this.ui.m_buyLvCom.m_confirmBoard.m_btnYes.onClick(this, this.sureBuy);
        this.ui.m_buyLvCom.m_confirmBoard.m_btnNo.onClick(this, this.cancleBuy);
        this.updateList();
        this.updateGetPassPlusState();
        this.LeftTimes_Day();
    }

    //更新进阶通行证显示
    public updateGetPassPlusState() {
        this.ui.m_top.m_activeBtn.visible = !HunterGameDataMediator.instance.data.havePass;
        this.ui.m_top.m_yijiesuo.visible = HunterGameDataMediator.instance.data.havePass;
        this.ui.m_top.m_yijiesuo.m_c1.selectedIndex = 1;
    }

    /**更新奖励列表 */
    public updateList() {
        var count: number = PassRewardProxy.instance.getCount() - 1;
        this.revIndex = count;
        this.ui.m_listCom.m_cardList.itemRenderer = Laya.Handler.create(this, this.FreshCardListData, null, false);
        this.ui.m_listCom.m_cardList.numItems = PassRewardProxy.instance.getCount();
        this.ui.m_listCom.m_cardList.height = 202 * PassRewardProxy.instance.getCount();
        this.ui.m_listCom.scrollPane.scrollBottom();
        let curLv: number = HunterGameDataMediator.instance.data.passLv;
        if (curLv > 1) {
            this.ui.m_listCom.scrollPane.setPosY(this.ui.m_listCom.scrollPane.posY - (curLv - 1) * 202);
        }
        //如果满级
        if (curLv >= count) {
            this.ui.m_listCom.m_rod.visible = false;
        } else {
            this.ui.m_listCom.m_rod.y = this.ui.m_listCom.y + (count - curLv - 1) * 202;
        }
    }

    /**渲染List Item */
    private FreshCardListData(index: number, item: FGUI_passCardUItem) {
        if (this.revIndex == 0) {
            //如果是0就显示通行证面板
            item.m_free.m_type.selectedIndex = 5;
            item.m_plus.m_type.selectedIndex = 5;
            item.m_free.m_state.selectedIndex = 3;
            item.m_plus.m_state.selectedIndex = 3;
            item.m_lvbg.visible = false;
            item.m_cardLvTxt.visible = false;
        } else {

            item.m_cardLvTxt.text = this.revIndex.toString();
            let config: _PassRewardConfig.DataType = PassRewardProxy.instance.getConfig(this.revIndex);
            //免费能行证部分
            var freeProps = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.freeID);
            if (freeProps.ItemType == ConstThing.TYPE_BOX) {
                item.m_free.m_type.selectedIndex = 0;
                item.m_free.m_boxIcon.url = ComResUrl.MainFgui_url(freeProps.HeroUiIcon);
            } else if (freeProps.ItemType == ConstThing.TYPE_RESOURCE) {
                item.m_free.m_type.selectedIndex = 3;
                item.m_free.m_resource.url = ComResUrl.MainFgui_url(freeProps.HeroUiIcon);
                item.m_free.m_restxt.text = config.freeCount.toString();
            } else if (freeProps.ItemType == ConstThing.TYPE_HERO) {
                item.m_free.m_type.selectedIndex = 4;
                var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(freeProps.HeroID);
                item.m_free.m_hunter.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
            }
            //进阶通行证部分
            var plusProps = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(config.plusID);
            if (plusProps.ItemType == ConstThing.TYPE_BOX) {
                item.m_plus.m_type.selectedIndex = 0;
                item.m_plus.m_boxIcon.url = ComResUrl.MainFgui_url(plusProps.HeroUiIcon);
            } else if (plusProps.ItemType == ConstThing.TYPE_RESOURCE) {
                item.m_plus.m_type.selectedIndex = 3;
                item.m_plus.m_resource.url = ComResUrl.MainFgui_url(plusProps.HeroUiIcon);
                item.m_plus.m_restxt.text = config.plusCount.toString();
            } else if (plusProps.ItemType == ConstThing.TYPE_HERO) {
                item.m_plus.m_type.selectedIndex = 4;
                var hunter = HeroAttributeInfoDataProxy.instance.GetHeroAttributeInfoByMiscID(plusProps.HeroID);
                item.m_plus.m_hunter.url = ComResUrl.MainFgui_url(hunter.HeroIcon);
            }

            this.updateItemState(item, this.revIndex);
            this.ui.m_passLv.text = (HunterGameDataMediator.instance.data.passLv + 1).toString();
            this.ui.m_expBar.value = HunterGameDataMediator.instance.data.passExp;
            this.ui.m_expTxt.text = HunterGameDataMediator.instance.data.passExp + "/" + HunterGameDataMediator.instance.data.passMaxExp;

            if (index > 0) {
                item.m_free.onClick(this, this.OnCardFreeClick, [this.revIndex, index])
                item.m_plus.onClick(this, this.OnCardPlusClick, [this.revIndex, index])
            }
        }
        this.revIndex--;
    }

    private updateItemState(item: FGUI_passCardUItem, revInd: number) {
        var data: PassData = HunterGameDataMediator.instance.getPassDataByLv(revInd);
        if (HunterGameDataMediator.instance.data.passLv >= revInd) {
            item.m_free.m_state.selectedIndex = data.free ? 2 : 1;
            if (HunterGameDataMediator.instance.data.havePass) {
                item.m_plus.m_state.selectedIndex = data.plus ? 2 : 1;
            } else {
                item.m_plus.m_state.selectedIndex = 0;
            }
        } else {
            item.m_free.m_state.selectedIndex = 0;
            item.m_plus.m_state.selectedIndex = 0;
        }
    }

    /**
     * 领取免费通行证的奖励
     * @param lv 通行证等级
     * @param index 渲染序号
     */
    private OnCardFreeClick(lv: number, index: number) {

        AudioProxy.instance.playSound(ESounds.click, 1);
        if (HunterGameDataMediator.instance.data.passLv >= lv) {
            var data: PassData = HunterGameDataMediator.instance.getPassDataByLv(lv);
            if (!data.free) {
                console.log("通行证等级：", lv, "的奖励成功");
                // data.free = true;
                HunterGameDataMediator.instance.set_state(lv, 1, true);
                var item: FGUI_passCardUItem = <FGUI_passCardUItem>this.ui.m_listCom.m_cardList.getChildAt(index);
                HunterGameDataMediator.instance.Save();
                item.m_free.m_state.selectedIndex = 2;
                let config: _PassRewardConfig.DataType = PassRewardProxy.instance.getConfig(lv);
                MesManager.event(EUIEvent.ShowRewardPanel, [config.freeID, config.freeCount]);

                //刷新home界面的按钮状态
                GameHomeProxy.instance.updatePassState();
            } else {
                console.log("你已经领取过通行证等级：", lv, "的奖励了");
            }
            let config: _PassRewardConfig.DataType = PassRewardProxy.instance.getConfig(lv);
        } else {
            console.log("通行证等级不足，想领取的等级是：", lv, " | 当前通行证等级是：", HunterGameDataMediator.instance.data.passLv);
        }
    }
    /**
     * 领取进阶通行证的奖励
     * @param lv 
     * @param index 渲染序号
     */
    private OnCardPlusClick(lv: number, index: number) {

        AudioProxy.instance.playSound(ESounds.click, 1);
        if (HunterGameDataMediator.instance.data.havePass) {
            if (HunterGameDataMediator.instance.data.passLv >= lv) {
                var data: PassData = HunterGameDataMediator.instance.getPassDataByLv(lv);
                if (!data.plus) {
                    console.log("通行证等级：", lv, "的奖励成功");
                    HunterGameDataMediator.instance.set_state(lv, 2, true);
                    var item: FGUI_passCardUItem = <FGUI_passCardUItem>this.ui.m_listCom.m_cardList.getChildAt(index);
                    HunterGameDataMediator.instance.Save();
                    item.m_plus.m_state.selectedIndex = 2;
                    let config: _PassRewardConfig.DataType = PassRewardProxy.instance.getConfig(lv);
                    MesManager.event(EUIEvent.ShowRewardPanel, [config.plusID, config.plusCount]);
                    //刷新home界面的按钮状态
                    GameHomeProxy.instance.updatePassState();
                } else {
                    console.log("你已经领取过通行证等级：", lv, "的奖励了");
                }
                let config: _PassRewardConfig.DataType = PassRewardProxy.instance.getConfig(lv);


            } else {
                console.log("通行证等级不足，想领取的等级是：", lv, " | 当前通行证等级是：", HunterGameDataMediator.instance.data.passLv);
            }
        } else {
            console.log("请购买进阶通行证")
        }

    }

    /**购买赛季通行证等级 */
    private buyPassLv() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        this.ui.m_buyLvCom.visible = true;
    }
    /** 确认购买 */
    private sureBuy() {
        if (HunterGameDataMediator.instance.data.Gemstone > 30) {
            /**消耗宝石 */
            HunterGameDataMediator.instance.data.Gemstone -= 30;

            AudioProxy.instance.playSound(ESounds.click, 1);
            console.log("尝试购买战斗通行证等级");
            this.ui.m_buyLvCom.visible = false;
            //提升一级
            HunterGameDataMediator.instance.data.passLv += 1;
            var count: number = PassRewardProxy.instance.getCount() - 1;
            let curLv: number = HunterGameDataMediator.instance.data.passLv;

            var item: FGUI_passCardUItem = <FGUI_passCardUItem>this.ui.m_listCom.m_cardList.getChildAt(count - curLv);
            item.m_free.m_state.selectedIndex = 1;
            if (HunterGameDataMediator.instance.data.havePass) {
                item.m_plus.m_state.selectedIndex = 1;
            } else {
                item.m_plus.m_state.selectedIndex = 0;
            }
            //如果满级
            if (curLv >= count) {
                this.ui.m_listCom.m_rod.visible = false;
            } else {
                this.ui.m_listCom.m_rod.y = this.ui.m_listCom.y + (count - curLv - 1) * 202;
            }
            Laya.Tween.to(this.ui.m_listCom.scrollPane, { posY: this.ui.m_listCom.scrollPane.posY - 202 }, 500);

            //刷新home界面的按钮状态
            GameHomeProxy.instance.updatePassState();

        } else {
            console.log('宝石不足30..');
            PGameComTips.instance.playComTips('钻石不足');

        }
    }
    /**取消购买 */
    private cancleBuy() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        this.ui.m_buyLvCom.visible = false;
    }

    public OnBtnReturnClick() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();

    }

    public OnActiveBtnClick() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowActivePassPanel);
    }

    /**赛季剩余时间 */
    public LeftTimes_Day() {
        /** */
        let CurDayNum = TimeUtils.GetCurrentDayCount(new Date().getTime());

        if (CurDayNum - HunterGameDataMediator.instance.data.SeasonDay) {
            HunterGameDataMediator.instance.data.SeasonNum += 1;
            HunterGameDataMediator.instance.data.SeasonDay = CurDayNum;
            this.ui.m_top.m_seasonNum.text = HunterGameDataMediator.instance.data.SeasonNum.toString();
        }

    }
}