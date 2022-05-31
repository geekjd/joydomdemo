// ！ 自动导出，请不要修改
//
/**
 * _HeroSkillConfig config配置文件
 * ! 自动导出，不要修改和直接引用
 */
export namespace _HeroSkillConfig {
    /** 配置表类型 */
    export const type: string = 'config';
    /** 数据类型 */
    export class DataType {
       /** 索引ID[必要] */
        id: number;
       /** 英雄索引的MiscID(对应英雄的ID) */
        HeroMiscID: number;
       /** 英雄名称(用于配置辨别) */
        HeroName: string;
       /** 技能模型 */
        SkillModeName: string;
       /** 技能模型2 */
        SkillModeNameTwo: string;
       /** 技能代码名称 */
        SkillScriptName: string;
       /** 技能类型 */
        SkillType: string;
       /** 攻击名称 */
        AttackName: string;
       /** 攻击说明 */
        AttackTips: string;
    }
    /** config数据列表 */
    export var datas: _HeroSkillConfig.DataType[] = [];
    /** 文件名字 */
    export const fileName: string = 'HeroSkillConfig.json';
}
    