import BaseData from "src/_T/Data/BaseData";

/**
 * 游戏商店数据
 */
export default class GameShopData extends BaseData {

    /**本轮优惠商品到期时间 毫秒值 */
    public ExpireDate: number = 0;
    /**优惠商品数据 */
    public DiscountList: Array<DiscountCommodityData> = new Array<DiscountCommodityData>();
    /**本次优惠商品是否已经刷新过 */
    public DiscountRefreshed: boolean = false;
    /**下次优惠商品刷新时间 */
    public DiscountRefreshTime: number = 0;
    /**剩余代币加成 */
    // public expAddition: number = 0;
    /**钻石商品看广告次数 */
    public diamondAds: number = 0;
    /**钻石商品免费看广告次数 */
    public dismaonAdsFree: number = 0;
    /**金币商品免费看广告次数 */
    public goldAdsFree: number = 0;
    /**主页面免费奖励槽位记录，如果没领取过则为-1 */
    public FreeRewardGetPoint: number = -1;
    /**免费奖励下一次刷新时间 */
    public nextreFreshTime: number = 0;

    /**免费钻石次数 */
    public freeDiamondCount: number = 3;
    public freeDiamondCount_limit: number = 3;
    /**免费钻石数量 */
    public freeDiamond: number = 30;
    /**免费钻石次数刷新时间 */
    public freeDiamodnFreshTime: number = 0;
    /**免费金币次数 */
    public freeGoldCount: number = 3;
    public freeGoldCount_limit: number = 3;
    public freeGold: number = 100;
    /**免费金币次数刷新时间 */
    public freeGoldFreshTime: number = 0;


    /**观看广告次数 */
    ItemOneAdTimes: number = 5;
    // ItemTwoAdTimes: number = 3;
    // ItemThreeAdTimes: number = 5;

    CurItemOneAdTimes: number = 5;
    // CurItemTwoAdTimes: number = 0;
    // CurItemThreeAdTimes: number = 0;

    itemOneCanGet: boolean = false;
    // itemTwoCanGet: boolean = false;
    // itemThreeCanGet: boolean = false;


}

export class DiscountCommodityData {
    /**是否是有效数据 */
    isvalid: boolean = true;
    /**商品类型:1.箱子 2.碎片 */
    type: number = 0;
    /**箱子类型 */
    boxType: number = 0;
    /**箱子ID */
    itemID: number = 0;
    /**原价 */
    oldPrice: number = 0;
    /**折扣价 宝箱和英雄碎片的通用变量*/
    nowPrice: number = 0;
    /**英雄ID */
    heroID: number = 0;
    /**碎片数量 */
    fragment: number = 0;
    /**货币类型:1.金币 2.钻石 */
    costType: number = 0;
    /**是否已售出 */
    sold: boolean = false;
}