import MesT from "src/_T/Mes/MesT";

/**
 * 所有的UI事件
 */

export enum EUIEvent {
    /** 关卡构建进度 */
    SceneGameCustomsLoading,
    /** 显示Loding关卡界面 */
    ShowUILodingLv,
    /** 显示Main的界面*/
    ShowUIMain,
    /**显示游戏结束提示 */
    ShowGameOverTipsPlan,
    /**显示游戏结束界面 */
    ShowGameOverPlan,
    /**加载关卡 */
    OnLevelLoad,
    /**商店 */
    ShowShop,
    /**家 */
    ShowHome,
    /**猎人 */
    Hunter,
    /**隐藏所有panel */
    HideAll,
    /*活动界面 */
    Active,
    /**刷新解锁英雄事件 */
    RefreshUnblockHero,
    /** 隐藏顶部票卷*/
    hideTopTicket,
    /**显示顶部票卷   */
    showTicket,
    /*刷新猎人界面 宝石，金币 按钮 */
    RefreshResCom,
    /**显示游戏加载界面 */
    ShowNoviceLoding,
    /**关闭游戏加载界面*/
    CloseNoviceLoding,
    /**显示游戏匹配界面 */
    ShowBattleLoding,
    /**关闭游戏匹配界面*/
    CloseBattleLoding,
    /**显示设置界面 */
    ShowSetPanel,
    /**显示战斗UI */
    ShowBattleUIm,
    /**显示狩猎任务面板 */
    ShowHuntTaskPanel,
    /**显示通行证奖励界面 */
    ShowPassPanel,
    /**显示激活通行证界面 */
    ShowActivePassPanel,
    /**显示获取门票界面 */
    ShowGetCardPanel,
    /**显示单次奖励面板*/
    // ShowSingleGetRewardPanel,
    /**显示多次奖励面板 */
    // ShowBatchGetRewardPanel,
    /**显示奖励面板*/
    ShowRewardPanel,
    /**显示模式提示面板 */
    ShowModeTipsPlan,
    /**显示模式选择界面 */
    ShowSelectModePlan,
    /**展示全部BUFF */
    ShowBUFFPanel,
    /**选择BUFF */
    SelectBUFFPanel,
    /**免费奖励面板 */
    FreeReward,
    /**商城购买确认弹窗 */
    ShopConfirmBuy,
    /**更新金币 */
    refreshGold,
    /**更新钻石 */
    refreshDiamond,
    /**更新代币显示 */
    RefDaiBi,
    /**显示伤害 */
    ShowDamagetxt,
    /**显示经验 */
    ShowExptxt,
    /**显示文本 */
    ShowWordtxt,
    /**战斗结束后宝箱奖励页面 */
    ShowGameBox,
    /**继续游戏 */
    ShowGoonGame,
    /**提示消息 */
    ShowTip,
    /*公共提示消息组件 */
    COMTips,
    /**模式选择 */
    ModeCheck,
    /**获取神秘奖励 */
    Mysterious,
    SharePrize,
    /**公共tips */
    tipsCom,
    /**角色界面 */
    ShowRole,
    /**角色进阶界面 */
    ShowAdvanced,
}

//
MesT.packE(EUIEvent);