import { AdvancedView } from './AdvancedView';
import { RoleView } from './RoleView';
// import { TsconfigPathsPlugin } from "node_modules/tsconfig-paths-webpack-plugin/lib/plugin";

import FGUI_GameView from "src/FGUI/GameMain/FGUI_GameView";
import FGUI_PGameMain from "src/FGUI/GameMain/FGUI_PGameMain";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import TaskManager from "src/Ldz_GameCore/TaskSystem/TaskManager";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";
import { GameHomeProxy } from "./GameHomeProxy";
import { GameHunter } from "./GameHunter";
import { GameSetProxy } from "./GameSetProxy";
import { GameShopProxy } from "./GameShopProxy";
import { PHuntTaskProxy } from "./PHuntTaskProxy";

@InstanceT.DecorateInstance()
//解锁物品的弹出界面
export class PGameMainProxy extends BaseSingleUICon<FGUI_GameView> {
    public static readonly instance: PGameMainProxy;
    protected _UI = FGUI_GameView;
    protected _layer = EUILayer.Popup;
    private constructor() {
        super();
    }

    Init() {
        MesManager.on(EUIEvent.ShowUIMain, this, this.Show);
        MesManager.on(EUIEvent.HideAll, this, this.HideOtherPanel);
        MesManager.on(EUIEvent.hideTopTicket, this, this.HideTicketBtn);
        MesManager.on(EUIEvent.showTicket, this, this.ShowTicketBtn);

        //刷新金币消息 
        MesManager.on(EUIEvent.refreshGold, this, this.INItTopResData);
        MesManager.on(EUIEvent.refreshDiamond, this, this.INItTopResData);
        MesManager.on(EUIEvent.ShowTip, this, this.showTip);

    }

    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        // this.ui.m_homeTabCom.m_c1.selectedIndex = 2;
        this.changeMPState();
        /**世界 */
        this.ui.m_btn_world.onClick(this, this.ONClickHomeFun);
        /**角色 */
        this.ui.m_btn_role.onClick(this, this.ONClickRoleFun);
        /**进阶 */
        this.ui.m_btn_Advanced.onClick(this, this.ONClickAdvancedFun);
        /**基地 */
        this.ui.m_btn_base.onClick(this, this.ONClickBaseFun);
        /**商店 */
        this.ui.m_btn_shop.onClick(this, this.ONClickShopFun);






        /**任务 */
        // this.ui.m_homeTabCom.m_ActionBtn.onClick(this, this.ONClickActiveFun);
        /**设置 */
        //    this.ui.m_homeTabCom.m_clanBtn.onClick(this, this.ONClickClanFun);
        // this.ui.m_SetComp.onClick(this, this.ONClickClanFun);
        // this.SetTaskCount();
        // /**始化顶部 宝石 金币 数据 */
        // this.INItTopResData();
        // /**顶部 宝石*/
        this.ui.m_btn_diamond.onClick(this, this.ONClickDiamonBarFun);
        // /** 顶部金币*/
        this.ui.m_btn_gold.onClick(this, this.ONClickGoldBarFun);
        // /**顶部通信证 */
        // this.ui.m_Ticket.m_AddBtn.onClick(this, this.OnClickTickAddBtn);
    }

    SetTaskCount() {
        //设置任务按钮数量显示
        // let Count = TaskManager.Instance.GetAchievementTaskCompleteCount() + TaskManager.Instance.GetEverdyTaskCompleteCount() + TaskManager.Instance.GetWeeklyTaskCompleteCount();
        // if (Count > 0) {
        //     this.ui.m_homeTabCom.m_ActionBtn.m_count.visible = true;
        //     this.ui.m_homeTabCom.m_ActionBtn.m_countBg.visible = true;
        //     this.ui.m_homeTabCom.m_ActionBtn.m_count.text = Count.toString();
        // } else {
        //     this.ui.m_homeTabCom.m_ActionBtn.m_count.visible = false;
        //     this.ui.m_homeTabCom.m_ActionBtn.m_countBg.visible = false;
        // }
    }

    public INItTopResData() {
        if (!this.ifShow) return;
        /**宝石 */
        this.ui.m_btn_diamond.title = HunterGameDataMediator.instance.data.Gemstone.toString();
        /**金币 */
        this.ui.m_btn_gold.title = HunterGameDataMediator.instance.data.Gold.toString();

    }

    /**显示世界 */
    public ONClickHomeFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowHome);
        MesManager.event(EUIEvent.hideTopTicket)
        // this.INItTopResData();
        // this.changeMPState();
    }

    /**显示角色 */
    public ONClickRoleFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowRole);
        MesManager.event(EUIEvent.hideTopTicket)
        // this.INItTopResData();
        // this.changeMPState();
    }

    /**显示进阶 */
    public ONClickAdvancedFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowAdvanced);
        MesManager.event(EUIEvent.hideTopTicket)
        // this.INItTopResData();
        // this.changeMPState();
    }

    /**显示基地 */
    public ONClickBaseFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        // MesManager.event(EUIEvent.HideAll);
        // MesManager.event(EUIEvent.ShowHome);
        // MesManager.event(EUIEvent.hideTopTicket)
        // this.INItTopResData();
        // this.changeMPState();
    }

    /**显示商店 */
    public ONClickShopFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowShop);
        MesManager.event(EUIEvent.hideTopTicket);
        // this.INItTopResData();
        // this.changeMPState();
    }

    /**显示活动 */
    public ONClickActiveFun() {
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.ShowHuntTaskPanel);
        console.log('狩猎btn');
        // MesManager.event(EUIEvent.HideAll);
        // MesManager.event(EUIEvent.Active);
        // /**显示门票卷 */
        // MesManager.event(EUIEvent.showTicket)
        // /**刷新 宝石，金币 */
        // // this.INItTopResData();
        // this.changeMPState();
        // /**刷新 门卷 */
        // this.ui.m_Ticket.title = HunterGameDataMediator.instance.data.Ticket.toString();
    }

    public ONClickClanFun() {
        //this.changeMPState();
        AudioProxy.instance.playSound(ESounds.click, 1);
        MesManager.event(EUIEvent.HideAll);
        MesManager.event(EUIEvent.ShowSetPanel);
        this.Hide();
    }

    public HideOtherPanel() {
        console.log('隐藏其他面板调用');
        if (GameHomeProxy.instance.ifShow)
            GameHomeProxy.instance.Hide();
        if (GameShopProxy.instance.ifShow)
            GameShopProxy.instance.Hide();
        // if (GameHunter.instance.ifShow)
        //     GameHunter.instance.Hide();
        // if (GameSetProxy.instance.ifShow)
        //     GameSetProxy.instance.Hide();
        // if (PHuntTaskProxy.instance.ifShow)
        //     PHuntTaskProxy.instance.Hide();
        if (RoleView.instance.ifShow)
            RoleView.instance.Hide();
        if (AdvancedView.instance.ifShow)
            AdvancedView.instance.Hide();
    }

    /**隐藏顶部票卷 */
    public HideTicketBtn() {
        // this.ui.m_TopResCom.visible = true;
        // this.ui.m_Ticket.visible = false;
    }

    /**显示顶部票卷 */
    public ShowTicketBtn() {
        // this.ui.m_TopResCom.visible = true;
        // this.ui.m_Ticket.visible = true;
    }

    public ONClickDiamonBarFun() {
        console.log(' *顶部宝石 ');
        // this.ui.m_homeTabCom.m_shopBtn.selected = true;
        this.ONClickShopFun();

    }
    public ONClickGoldBarFun() {
        console.log(' *顶部金币');
        // this.ui.m_homeTabCom.m_shopBtn.selected = true;
        this.ONClickShopFun();

    }

    public OnClickTickAddBtn() {
        MesManager.event(EUIEvent.ShowGetCardPanel);
        console.log(" *顶部通行证");
    }

    /**切换活动门票的显示状态 */
    private changeMPState() {
        // if (this.ui.m_homeTabCom.m_c1.selectedIndex == 3) {
        //     this.ui.m_Ticket.visible = true;
        // } else {
        //     this.ui.m_Ticket.visible = false;
        // }
    }

    public showTip(...par) {
        // this.ui.m_tipMask.touchable = true;
        // this.ui.m_tip.visible = true;
        // this.ui.m_tip.m_tipLabel.text = par[0];
        // this.ui.m_showTip.play();
        // this.ui.m_tip.m_showTip.play(new Laya.Handler(this, this.tipAnimationBack));
    }

    private tipAnimationBack() {
        // this.ui.m_tipMask.touchable = false;
    }
}