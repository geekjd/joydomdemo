// ！ 自动导出，请不要修改
//
/**
 * _HeroSkinConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroSkinConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 英雄索引的MiscID(对应英雄的ID) */
        HeroMiscID: number;
       /** 中文名称 */
        HeroChineseName: string;
       /** 皮肤列表 */
        HeroSkin: string;
       /** 皮肤价格 */
        Cost: string;
    }
    /** config数据列表 */
    export var datas: _HeroSkinConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroSkinConfig.json';
}
    