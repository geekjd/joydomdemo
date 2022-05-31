// ！ 自动导出，请不要修改
//
/**
 * _HeroBuffConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroBuffConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** BUFFID */
        BuffMiscID: number;
       /** 代码名称 */
        BuffEnglishName: string;
       /** 中文名称 */
        BuffChineseName: string;
       /** Buff类型 */
        BuffType: string;
       /** UI图标名称 */
        BuffUiIcon: string;
       /** 提升值 */
        BuffValue: string;
       /** Buff说明 */
        BuffTips: string;
    }
    /** config数据列表 */
    export var datas: _HeroBuffConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroBuffConfig.json';
}
    