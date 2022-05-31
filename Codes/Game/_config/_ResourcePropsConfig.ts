// ！ 自动导出，请不要修改
//
/**
 * _ResourcePropsConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _ResourcePropsConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 道具ID */
        ItemMiscID: number;
       /** 道具类型 */
        ItemType: string;
       /** 中文名称 */
        HeroChineseName: string;
       /** UI名称 */
        HeroUiIcon: string;
       /** 增加的数值 */
        ItemValue: number;
       /** 对应的英雄ID */
        HeroID: number;
    }
    /** config数据列表 */
    export var datas: _ResourcePropsConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'ResourcePropsConfig.json';
}
    