import BaseLocalDataProxy from "src/_T/Data/BaseLocalDataProxy";
import DataT from "src/_T/Data/DataT";
import InstanceT from "src/_T/Ts/InstanceT";
import { HeroInfoDataProxy } from "../ConfigProxy/HeroInfoDataProxy";
import { _HeroInfoConfig } from "../_config/_HeroInfoConfig";
import HunterHeroInfoData, { HeroAchievementInfo } from "./type/HunterHeroInfoData";
import { _HeroSkinConfig } from "../_config/_HeroSkinConfig";
import { HeroSkinDataProxy } from "../ConfigProxy/HeroSkinDataProxy";

/**
 * 设置数据代理
 */
@InstanceT.DecorateInstance()
@DataT.DecorateDataTemplate(HunterHeroInfoData)
export class HunterHeroInfoDataMediator extends BaseLocalDataProxy<HunterHeroInfoData>{
    /** 单例 */
    public static readonly instance: HunterHeroInfoDataMediator;
    //
    private constructor() { super(); }
    _initData() {
        if (this.data.HeroData == null) {
            this.data.HeroData = [];
        }
        if (this.data.HeroData.length <= 0) {

            // for (let i = 0; i < 11; i++) {
            //     if (i == 8) continue;
            //     let TempData = this.GetInfoByMiscID(100001 + i);
            //     this.data.HeroData.push([TempData.HeroMiscID, TempData]);
            // }
            let TempData = this.GetInfoByMiscID(100001);
            this.data.HeroData.push([TempData.HeroMiscID, TempData]);
        }
    }
    ReadMemory() {
        this.UnlockedHero = [];
        let HunterArray = HeroInfoDataProxy.instance.dataList;
        for (let i = 0; i < HunterArray.length; i++) {
            let Temp = HunterArray[i];
            let TempDataInfo = this.GetIsHunterByMiscID(Temp.HeroMiscID)
            if (TempDataInfo != null) {
                this.UnlockedHero.push(TempDataInfo);
            } else {
                let NewTempData = this.GetInfoByMiscID(Temp.HeroMiscID);
                this.NotUnlockedHero.push(NewTempData);
            }
        }
    }
    private GetIsHunterByMiscID(MiscID: number): HeroAchievementInfo {
        for (let i = 0; i < this.data.HeroData.length; i++) {
            let Temp = this.data.HeroData[i];
            if (Temp[0] == MiscID) {
                return Temp[1];
            }
        }
        return null;
    }
    /**解锁英雄 */
    public UnlockHunterByMiscID(MiscID: number) {
        let TempData = this.GetIsHunterByMiscID(MiscID);
        if (TempData == null) {
            let NewTempData = this.GetInfoByMiscID(MiscID);
            this.UnlockedHero.push(NewTempData);
            this.data.HeroData.push([NewTempData.HeroMiscID, NewTempData]);
            this.DeleteNotUnLockByMiscID(MiscID);
        }
    }
    private DeleteNotUnLockByMiscID(MiscID: number) {
        for (let i = 0, len = this.NotUnlockedHero.length; i < len; ++i) {
            let TempData = this.NotUnlockedHero[i];
            if (MiscID == TempData.HeroMiscID) {
                this.NotUnlockedHero.splice(i, 1);
                return;
            }
        }
    }

    UnlockedHero: HeroAchievementInfo[] = [];
    NotUnlockedHero: HeroAchievementInfo[] = [];
    /**返回解锁的角色 */
    public GetUnlockedHero(): HeroAchievementInfo[] {
        return this.UnlockedHero;
    }
    /**返回未解锁的角色 */
    public GetNotUnlockedHero(): HeroAchievementInfo[] {
        return this.NotUnlockedHero;
    }
    /**根据ID 返回狩猎者信息 */
    GetUnlockedInfoByMiscID(HunterMiscID: number): HeroAchievementInfo {
        return this.UnlockedHero.find((value) => {
            if (HunterMiscID == value.HeroMiscID) {
                return value;
            }
        })
    }


    /**获取信息 */
    GetInfoByMiscID(HunterMiscID: number): HeroAchievementInfo {
        let NewTempData = new HeroAchievementInfo();
        NewTempData.HeroMiscID = HunterMiscID;
        let Data: _HeroInfoConfig.DataType = HeroInfoDataProxy.instance.GetHeroInfoByMiscID(NewTempData.HeroMiscID);
        let skinConfig: _HeroSkinConfig.DataType = HeroSkinDataProxy.instance.GetHeroSkinInfoByMiscID(HunterMiscID);
        let skins: string[] = skinConfig.HeroSkin.split(",");
        NewTempData.HeroLevel = 1;
        NewTempData.HeroEnName = Data.HeroEnglishName;
        NewTempData.HeroSkinInfo = [skins[0]];
        NewTempData.HeroUsingSkin = skins[0];

        return NewTempData;
    }

    /**获取所有达到6级的英雄 */
    public getSixLevelHeroList(): HeroAchievementInfo[] {
        var sixList: HeroAchievementInfo[] = [];
        this.UnlockedHero.filter((item, index, array) => {
            if (item.HeroLevel > 0) {
                sixList.push(item);
            }
        });
        return sixList;
    }

}