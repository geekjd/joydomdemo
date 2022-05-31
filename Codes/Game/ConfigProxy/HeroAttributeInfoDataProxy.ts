import BaseConfigProxy from "../../_T/Config/BaseConfigProxy";
import InstanceT from "../../_T/Ts/InstanceT";
import ConfigT from "../../_T/Config/ConfigT";
import { _HeroAttributeInfoConfig } from "../_config/_HeroAttributeInfoConfig";
import MathUtils from "src/_T/Utils/MathUtils";

@InstanceT.DecorateInstance()
@ConfigT.DecorateConfigProxy(_HeroAttributeInfoConfig)
/**猎人属性配置表 */
export class HeroAttributeInfoDataProxy extends BaseConfigProxy<_HeroAttributeInfoConfig.DataType>{
    /** 单例 */
    public static readonly instance: HeroAttributeInfoDataProxy;
    /**属性信息表 */
    HeroAttributeMiscIDMap: Map<number, _HeroAttributeInfoConfig.DataType>;
    HeroAttributeNameMap: Map<string, _HeroAttributeInfoConfig.DataType>;
    private constructor() { super(); }
    protected _initData() {
        super._initData();
        //初始化数据
        if (this.m_dataList && !this.HeroAttributeMiscIDMap) {
            this.HeroAttributeMiscIDMap = new Map<number, _HeroAttributeInfoConfig.DataType>();
            this.HeroAttributeNameMap = new Map<string, _HeroAttributeInfoConfig.DataType>();
            this.m_dataList.forEach((Value, index) => {
                this.HeroAttributeMiscIDMap.set(Value.HeroMiscID, Value);
                this.HeroAttributeNameMap.set(Value.HeroEnglishName, Value);
            })
        }
    }

    /**根据Id返回B属性信息 */
    GetHeroAttributeInfoByMiscID(HeroID: number): _HeroAttributeInfoConfig.DataType {
        return this.HeroAttributeMiscIDMap.get(HeroID);
    }

    /**根据Id返回B属性信息 */
    GetHeroAttributeInfoByName(HeroName: string): _HeroAttributeInfoConfig.DataType {
        return this.HeroAttributeNameMap.get(HeroName);
    }
    GetNotUnlockedHero(): _HeroAttributeInfoConfig.DataType[] {
        return this.m_dataList;
    }

    /**获取随机的单位 */
    GetRandomInfo(Count: number = 1, HeroEnglishName: string): _HeroAttributeInfoConfig.DataType[] {
        let Array: number[] = [];
        let TempInfoArray: _HeroAttributeInfoConfig.DataType[] = [];
        for (let i = 0; i < this.m_dataList.length; i++) {
            if (HeroEnglishName != this.m_dataList[i].HeroEnglishName && this.m_dataList[i].HeroEnglishName != "King") {
                if (this.m_dataList[i].HeroEnglishName != "SpidersQueen") {
                    Array.push(i);
                }
            }
        }
        for (let i = 0; i < Count; i++) {
            let Index = MathUtils.randomRangeInt(0, Array.length);
            let TempIndex: number = Array.splice(Index, 1)[0];
            TempInfoArray.push(this.m_dataList[TempIndex]);
        }
        return TempInfoArray;
    }

    /**获得所有宝箱解锁的英雄 */
    public GetBoxUnlockHero(): _HeroAttributeInfoConfig.DataType[] {
        var arr: _HeroAttributeInfoConfig.DataType[] = [];
        for (let i = 0; i < this.dataList.length; i++) {
            this.dataList.filter((item, index, array) => {
                if (item.UnblockType == 1) {
                    arr.push(item);
                }
            })
        }
        return arr;
    }

}