// ！ 自动导出，请不要修改
//
/**
 * _ShopConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _ShopConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 商品类型:1.每日特惠2.普通商品3.宝石4.黄金 */
        type: number;
       /** 商品ID */
        itemID: number;
       /** 是否是看广告领奖励类型 */
        adsType: number;
       /** undefined */
        itemType: number;
       /** 当前项的数值：碎片为最大随机数，钻石广告为给的钻石，金币广告为给的金币 */
        ownValue: number;
       /** 费用类型：1.金币2.钻石3.看广告 */
        costType: number;
       /** 宝箱消耗原价%折扣价 */
        boxCost: string;
       /** 费用 */
        cost: number;
       /** 次数限制 */
        limit: number;
    }
    /** config数据列表 */
    export var datas: _ShopConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'ShopConfig.json';
}
    