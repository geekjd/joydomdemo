import FGUI_SelectModeItemPlan from "src/FGUI/GameMain/FGUI_SelectModeItemPlan";
import FGUI_SelectModePlan from "src/FGUI/GameMain/FGUI_SelectModePlan";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";
import { PGameTipsCom } from "./PGameTipsCom";


@InstanceT.DecorateInstance()
//设置界面
export class SelectModePlanProxy extends BaseSingleUICon<FGUI_SelectModePlan> {
    public static readonly instance: SelectModePlanProxy;
    protected _UI = FGUI_SelectModePlan;
    protected _layer = EUILayer.Top;
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowSelectModePlan, this, this.Show);
    }
    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_Colser.onClick(this, this.ColseUI);
        this.ui.m_SelectMode.m_SelectModeList.setVirtual();
        this.ui.m_SelectMode.m_SelectModeList.itemRenderer = Laya.Handler.create(this, this.ListRender, null, false);
        this.ui.m_SelectMode.m_SelectModeList.numItems = HunterGameDataMediator.instance.data.GameModeArray.length;

        this.ui.m_SelectMode.m_SelectModeList.on(fgui.Events.CLICK_ITEM, this, this.ONClickSecletedMOde);

    }
    /**列表渲染方法 */
    ListRender(Index: number, Item: FGUI_SelectModeItemPlan) {
        this.SetItemInfo(Index, Item);
    }
    /**设置模式的信息 */
    SetItemInfo(Index: number, Item: FGUI_SelectModeItemPlan) {
        let InfoIndex = HunterGameDataMediator.instance.data.GameModeArray.length - 1 - Index;
        let ModeName: string = HunterGameDataMediator.instance.data.GameModeArray[InfoIndex];
        let TmepTrophy: number = HunterGameDataMediator.instance.data.Trophy;
        let DemandTrophy: number = HunterGameDataMediator.instance.data.GameModeTrophy[InfoIndex];
        if (TmepTrophy < DemandTrophy) {
            Item.m_SelectModeItem.m_leftTopTxt.enabled = true;
            Item.m_SelectModeItem.m_leftTopTxt.visible = true;
        } else {
            Item.m_SelectModeItem.m_leftTopTxt.enabled = false;
            Item.m_SelectModeItem.m_leftTopTxt.visible = false;
        }

        // Item.m_SelectModeItem.offClick(this, this.ItemOnClick);
        Item.m_TipsButton.offClick(this, this.ItemTipsClick);
        Item.m_TipsButton.onClick(this, this.ItemTipsClick, [Item, ModeName]);
        switch (ModeName) {
            case "Hunting":
                Item.m_SelectModeItem.m_RightModeTxt.text = "狩猎";
                Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Hunting");
                break;
            case "Cooperation":
                Item.m_SelectModeItem.m_RightModeTxt.text = "合作";

                Item.m_SelectModeItem.m_leftTopTxt.text = '奖杯' + DemandTrophy + '解锁'

                Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Cooperation");
                break;
            case "Existence":
                Item.m_SelectModeItem.m_RightModeTxt.text = "生存";
                Item.m_SelectModeItem.m_leftTopTxt.text = '奖杯' + DemandTrophy + '解锁'
                Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Existence");
                break;
            case "Sports":
                Item.m_SelectModeItem.m_RightModeTxt.text = "竞技";
                Item.m_SelectModeItem.m_leftTopTxt.text = '奖杯' + DemandTrophy + '解锁'
                Item.m_SelectModeItem.m_ItemIcon.url = ComResUrl.MainFgui_url("Sports");
                break;
        }
        if (HunterGameDataMediator.instance.data.SelectMode == ModeName) {
            Item.m_SelectModeItem.m_ItemCon.selectedIndex = 1;
        } else {
            Item.m_SelectModeItem.m_ItemCon.selectedIndex = 0;
        }
        // if (TmepTrophy >= DemandTrophy) {
        //     // Item.m_SelectModeItem.onClick(this, this.ItemOnClick, [ModeName]);

        // }
        //else {
        //     //Item.m_SelectModeItem.m_ItemCon.selectedIndex = 2;
        //     //Item.m_SelectModeItem.m_UnLockTips.text = "获取的" + DemandTrophy + "个奖杯以解锁";
        //     this.ui.m_UnBlock.visible = true;
        //     GameHomeProxy.instance.ui.m_t0.play(Laya.Handler.create(this, () => {
        //         this.ui.m_UnBlock.visible = false;
        //     }), 1)
        // }

    }
    // ItemOnClick(ModeName: string, Item: FGUI_SelectModeItemPlan) {
    //     AudioProxy.instance.playSound(ESounds.click, 1);
    //     HunterGameDataMediator.instance.data.SelectMode = ModeName;
    //     MesManager.event(EUIEvent.ModeCheck);
    //     this.ui.m_SelectMode.m_SelectModeList.numItems = HunterGameDataMediator.instance.data.GameModeArray.length;
    //     // GameHomeProxy.instance.SetModeTips();
    //     //this.ColseUI();
    // }

    public AddOnClickHandler() {
        /** */
        let length = this.ui.m_SelectMode.m_SelectModeList.numChildren;
        for (let i: number = 0; i < length; i++) {
            let item = this.ui.m_SelectMode.m_SelectModeList.getChildAt(i);
            item.onClick(this, this.MyOnClickSelectMode, [i, item]);
        }
    }
    public showModeBorder() {
        let Len = this.ui.m_SelectMode.m_SelectModeList.numChildren;
        for (let i: number = 0; i < Len; i++) {
            let Item = this.ui.m_SelectMode.m_SelectModeList.getChildAt(i) as FGUI_SelectModeItemPlan;
            // let InfoIndex = HunterGameDataMediator.instance.data.GameModeArray.length - 1 - i;
            // let ModeName: string = HunterGameDataMediator.instance.data.GameModeArray[InfoIndex];
            Item.m_SelectModeItem.m_ItemCon.selectedIndex = 0;
        }
    }
    // oncCLickFun(data: any) {
    // }

    ONClickSecletedMOde(obj: FGUI_SelectModeItemPlan) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        let RealIndex = this.ui.m_SelectMode.m_SelectModeList.getChildIndex(obj);
        this.MyOnClickSelectMode(RealIndex, obj);
        console.log('RealIndex@@==', RealIndex);

    }

    public MyOnClickSelectMode(Index: number, Item: FGUI_SelectModeItemPlan) {
        let InfoIndex = HunterGameDataMediator.instance.data.GameModeArray.length - 1 - Index;
        let ModeName: string = HunterGameDataMediator.instance.data.GameModeArray[InfoIndex];
        let TmepTrophy: number = HunterGameDataMediator.instance.data.Trophy;
        let DemandTrophy: number = HunterGameDataMediator.instance.data.GameModeTrophy[InfoIndex];

        if (TmepTrophy >= DemandTrophy) {

            this.showModeBorder();
            HunterGameDataMediator.instance.data.SelectMode = ModeName;
            Item.m_SelectModeItem.m_ItemCon.selectedIndex = 1;


        } else {
            console.log('tips ********');
            PGameTipsCom.instance.PLayTips('未解锁');
        }


    }

    ItemTipsClick(Item: FGUI_SelectModeItemPlan, ModeName: string) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        Item.m_TipsButton.m_t0.play();
        //Item.m_TipsButton.visible = !Item.m_TipsButton.visible;
        switch (ModeName) {
            case "Hunting":
                Item.m_TipsButton.m_TipsTxt.text = '狩猎：进入巨大的猎场，狩猎各种各样的怪物，你将获得升级，选择升级的属性打造不一样的猎人，小心其他猎人的偷袭，倒计时结束将根据击败怪物数量排名，注意猎人死亡后将推出猎场结束游戏。';
                break;
            case "Cooperation":
                Item.m_TipsButton.m_TipsTxt.text = '合作：国王发布了召集令，你和队友应召而来，你们的任务是保护国王，怪物将一波接一波的出现，消灭怪物，拾取赏金然后使用赏金进行升级或回复，当然你也可以提升赏金收益。消灭全部怪物或国王死亡或者玩家同时死亡则游戏结束。';
                break;
            case "Sports":
                Item.m_TipsButton.m_TipsTxt.text = '竞技：八名玩家齐聚。公平演绎竞技。注意及时寻找血包恢复，争夺神秘魔法书获得更强大的神奇力量，击败其他玩家，成为竞技场的无冕之王。玩家被击杀后将随机位置复活，倒计时结束时根据击败数目进行排名。';
                break;
            case "Existence":
                Item.m_TipsButton.m_TipsTxt.text = '生存：独自一人接受试炼，在狭小的斗兽场内迎接大量的怪物，活下去，在一波又一波的怪物浪潮中活下去，玩家存活越久获得的奖励越高。玩家死亡则游戏结束，根据玩家存活时间排名。';
                break;
        }
    }

    ColseUI() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
        MesManager.event(EUIEvent.ModeCheck);
    }

}