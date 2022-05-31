// ！ 自动导出，请不要修改
//
/**
 * _BoxItemsConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _BoxItemsConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要]历程配置表 */
        id: number;
       /** 箱子ID */
        itemID: number;
       /** 最大数量 */
        count: number;
       /** 金币最小值 */
        gold_min: number;
       /** 金币最大值 */
        gold_max: number;
       /** 碎片最小数量 */
        fragment_min: number;
       /** 碎片最大数量 */
        fragment_max: number;
       /** 出技能的几率(升分比) */
        skill_per: number;
       /** 出英雄的几率(升分比) */
        hero_per: number;
    }
    /** config数据列表 */
    export var datas: _BoxItemsConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'BoxItemsConfig.json';
}
    