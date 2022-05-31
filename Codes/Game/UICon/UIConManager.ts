import BaseUIConManager from "src/_T/D2/FGUI/BaseUIConManager";
import InstanceT from "src/_T/Ts/InstanceT";
import { BattleLodingProxy } from "./GameMianCom/BattleLodingProxy";
import { GameActiveProxy } from "./GameMianCom/GameActiveProxy";
import { GameHomeProxy } from "./GameMianCom/GameHomeProxy";
import { GameHunter } from "./GameMianCom/GameHunter";
import { GameSetProxy } from "./GameMianCom/GameSetProxy";
import { GameShopProxy } from "./GameMianCom/GameShopProxy";
import { ModeTipsPlanProxy } from "./GameMianCom/ModeTipsPlanProxy";
import { NoviceLodingProxy } from "./GameMianCom/NoviceLodingProxy";
import { PActivePassCard } from "./GameMianCom/PActivePassCard";
import { PGameFitingPlanProxy } from "./GameMianCom/PGameFitingPlanProxy";
import PGameGameOverMediator from "./GameMianCom/PGameGameOverMediator";
import PGameLoadingMediator from "./GameMianCom/PGameLoadingMediator";
import { PGameMainProxy } from "./GameMianCom/PGameMainProxy";
import { PGetCardProxy } from "./GameMianCom/PGetCardProxy";
import { PGetRewardProxy } from "./GameMianCom/PGetRewardProxy";
import { PHuntTaskProxy } from "./GameMianCom/PHuntTaskProxy";
import { PPassProxy } from "./GameMianCom/PPassProxy";
import { SelectModePlanProxy } from "./GameMianCom/SelectModePlanProxy";
import UIConManagerProxy from "./UIConManagerProxy";
import { PBUFFShowProxy } from "./GameMianCom/PBUFFShowProxy";
import { PBUFFSelectProxy } from "./GameMianCom/PBUFFSelectProxy";
import { FreeRewardProxy } from "./GameMianCom/FreeRewardProxy";
import { ShopConfirmBuyProxy } from "./GameMianCom/ShopConfirmBuyProxy";
import { PGameBoxProxy } from "./GameMianCom/PGameBoxProxy";
import { GoonGameProxy } from "./GameMianCom/GoonGameProxy";
import { PGameComTips } from "./GameMianCom/PGameComTips";
import { PGameMysterious } from "./GameMianCom/PGameMysterious";
import { PGameTipsCom } from "./GameMianCom/PGameTipsCom";
import { RoleView } from "./GameMianCom/RoleView";
import { AdvancedView } from "./GameMianCom/AdvancedView";


/**
 * ui控制器管理器
 */
@InstanceT.DecorateInstance()
export default class UIConManager extends BaseUIConManager<UIConManagerProxy> {
    /** 单例 */
    public static readonly instance: UIConManager;
    //
    private constructor() { super(); }

    /** 初始化回调，继承使用，主要设置ui列表和代理器 */
    protected _init() {
        PGameMainProxy.instance.Init();
        /**商店 */
        GameShopProxy.instance.Init();
        /**家 */
        GameHomeProxy.instance.Init();
        /**猎人 */
        GameHunter.instance.Init();
        /**资源加载进度 */
        PGameLoadingMediator.instance.Init();
        /**活动 */
        GameActiveProxy.instance.Init();
        /**游戏加载界面 */
        NoviceLodingProxy.instance.Init();
        /**游戏匹配界面 */
        BattleLodingProxy.instance.Init();
        /**设置 */
        GameSetProxy.instance.Init();
        /**战斗界面 */
        PGameFitingPlanProxy.instance.Init();
        /**狩猎任务界面 */
        PHuntTaskProxy.instance.Init();
        /**通行证奖励界面 */
        PPassProxy.instance.Init();
        /**激活通行证界面 */
        PActivePassCard.instance.Init();
        /**获取通行证界面 */
        PGetCardProxy.instance.Init();
        /**奖励界面 */
        PGetRewardProxy.instance.Init();
        /**选择模式界面 */
        SelectModePlanProxy.instance.Init();
        /**模式提示面板 */
        ModeTipsPlanProxy.instance.Init();
        /**游戏结束 */
        PGameGameOverMediator.instance.Init();
        /**BUFF展示 */
        PBUFFShowProxy.instance.Init();
        /**BUFF选择 */
        PBUFFSelectProxy.instance.Init();
        /**免费奖励面板 */
        FreeRewardProxy.instance.Init();
        /**商城购买确认 */
        ShopConfirmBuyProxy.instance.Init();
        /**结算宝箱奖励 */
        PGameBoxProxy.instance.Init();
        /**继续游戏弹窗 */
        GoonGameProxy.instance.Init();
        /** 公共弹组件*/
        PGameComTips.instance.Init();
        /**神秘奖励 */
        PGameMysterious.instance.Init();
        /**公共提示框 */
        PGameTipsCom.instance.Init();



        /**角色界面 */
        RoleView.instance.Init();
        /**角色进阶界面 */
        AdvancedView.instance.Init();
    }
}