// ！ 自动导出，请不要修改
//
/**
 * _HeroInfoConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroInfoConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 英雄ID */
        HeroMiscID: number;
       /** 代码名称 */
        HeroEnglishName: string;
       /** 中文名称 */
        HeroChineseName: string;
       /** UI名称 */
        HeroUiIcon: string;
    }
    /** config数据列表 */
    export var datas: _HeroInfoConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroInfoConfig.json';
}
    