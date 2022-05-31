import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import InstanceT from "src/_T/Ts/InstanceT";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import FGUI_BUFFSelect from "src/FGUI/GameMain/FGUI_BUFFSelect";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import { GameHunter } from "./GameHunter";
import FGUI_SkillSelect from "src/FGUI/GameMain/FGUI_SkillSelect";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import ComResUrl from "src/_T/Res/ComResUrl";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { HunterGameDataMediator } from "src/Game/Data/HunterGameDataMediator";
import { HeroAchievementInfo } from "src/Game/Data/type/HunterHeroInfoData";
import { HunterHeroInfoDataMediator } from "src/Game/Data/HunterHeroInfoDataProxy";
import AudioManager from "src/Game/Manager/AudioManager";
import { ESounds } from "src/Game/ResE/ESounds";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ApkDefine } from "src/Ldz_GameCore/GeneralScripts/GameDefine";

@InstanceT.DecorateInstance()
/**BUFF展示 */
export class PBUFFSelectProxy extends BaseSingleUICon<FGUI_BUFFSelect>{
    public static readonly instance: PBUFFSelectProxy;
    protected _UI = FGUI_BUFFSelect;
    protected _layer = EUILayer.Popup;
    private skills: string[];
    private unlockedSkills: number[];
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.SelectBUFFPanel, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        var data: _HeroAttributeInfoConfig.DataType = GameHunter.instance.selectHeroConfig;
        this.skills = data.GameSkills.split(",");

        let TempHunterData: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(data.HeroMiscID);
        this.unlockedSkills = TempHunterData.UnlockedSkills;

        this.ui.m_buffList.itemRenderer = Laya.Handler.create(this, this.RenderItem, null, false);
        this.ui.m_buffList.numItems = this.skills.length;
        this.ui.m_buffList.on(fgui.Events.CLICK_ITEM, this, this.onClickItem);

        this.ui.m_info.onClick(this, this.hideInfo);
        this.ui.m_bg.onClick(this, this.closePanel);
    }

    private RenderItem(index: number, obj: fgui.GObject) {
        var item: FGUI_SkillSelect = obj as FGUI_SkillSelect;
        var skill: number = Number(this.skills[index]);
        var info = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(skill);

        if (this.unlockedSkills.indexOf(skill) > -1) {
            item.m_state.selectedIndex = 1;
            let TempHunterData: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(GameHunter.instance.selectHeroConfig.HeroMiscID);
            if (GameHunter.instance.changeBUffSlot == 1) {
                if (TempHunterData.LevelSixSkills == skill) {
                    item.m_select.selectedIndex = 1;
                } else {
                    item.m_select.selectedIndex = 0;
                }
            } else if (GameHunter.instance.changeBUffSlot == 2) {
                if (TempHunterData.LevelEightSkills == skill) {
                    item.m_select.selectedIndex = 1;
                } else {
                    item.m_select.selectedIndex = 0;
                }
            } else if (GameHunter.instance.changeBUffSlot == 3) {
                if (TempHunterData.LevelTenSkills == skill) {
                    item.m_select.selectedIndex = 1;
                } else {
                    item.m_select.selectedIndex = 0;
                }
            }
        } else {
            item.m_state.selectedIndex = 0;
        }

        item.m_skill.m_skillName.text = info.BuffChineseName;
        item.m_skill.m_skillImg.url = ComResUrl.MainFgui_url(info.BuffUiIcon);
        item.data = info;

        item.m_DesBtn.onClick(this, this.showInfo, [info])
    }

    private onClickItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var info: _HeroBuffConfig.DataType = obj.data as _HeroBuffConfig.DataType;
        if (this.unlockedSkills.indexOf(info.BuffMiscID) > -1) {
            let heroInfo: HeroAchievementInfo = HunterHeroInfoDataMediator.instance.GetUnlockedInfoByMiscID(GameHunter.instance.selectHeroConfig.HeroMiscID);
            if (GameHunter.instance.changeBUffSlot == 1) {
                heroInfo.LevelSixSkills = info.BuffMiscID;
                if (heroInfo.LevelEightSkills == info.BuffMiscID)
                    heroInfo.LevelEightSkills = 0;
                if (heroInfo.LevelTenSkills == info.BuffMiscID)
                    heroInfo.LevelTenSkills = 0;
            } else if (GameHunter.instance.changeBUffSlot == 2) {
                heroInfo.LevelEightSkills = info.BuffMiscID;
                if (heroInfo.LevelSixSkills == info.BuffMiscID)
                    heroInfo.LevelSixSkills = 0;
                if (heroInfo.LevelTenSkills == info.BuffMiscID)
                    heroInfo.LevelTenSkills = 0;
            } else if (GameHunter.instance.changeBUffSlot == 3) {
                heroInfo.LevelTenSkills = info.BuffMiscID;
                if (heroInfo.LevelSixSkills == info.BuffMiscID)
                    heroInfo.LevelSixSkills = 0;
                if (heroInfo.LevelEightSkills == info.BuffMiscID)
                    heroInfo.LevelEightSkills = 0;
            }
            HunterHeroInfoDataMediator.instance.Save();
            GameHunter.instance.updateProperty();
            this.Hide();
        } else {
            console.log("当前技能没解锁");
        }
    }

    private showInfo(buff: _HeroBuffConfig.DataType) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        this.ui.m_info.m_nameLabel.text = buff.BuffChineseName;
        var slots: string[] = ["A", "B", "C", "D"];
        var des: string = "";
        if (ApkDefine.IsApk) {
            buff.BuffTips = buff.BuffTips.replace("[/color]", "");
            let TsakTittleIndex = buff.BuffTips.indexOf("[");
            buff.BuffTips = buff.BuffTips.replace(buff.BuffTips.substr(TsakTittleIndex, 15), "");
            this.ui.m_info.m_infoLabel.ubbEnabled = false;
        }
        //如果该BUFF有多个数值
        if (buff.BuffType.indexOf(",") > -1) {
            var types: Array<string> = buff.BuffType.split(",");
            var values: Array<string> = buff.BuffValue.split(",");
            des = buff.BuffTips;
            for (let i = 0; i < types.length; i++) {
                des = this.formatString(types[i], values[i], "&" + slots[i], des);
            }
        } else {
            des = this.formatString(buff.BuffType, buff.BuffValue, "&A", buff.BuffTips);
        }
        this.ui.m_info.m_infoLabel.text = des;
        this.ui.m_info.visible = true;
    }

    private hideInfo() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.ui.m_info.visible = false;
    }

    /**格式化文本 */
    private formatString(type: string, bvalue: string, slot: string, tips: string): string {
        var des: string = "";
        if (type == "Single") {
            des = tips.replace(slot, bvalue);

        } else if (type == "Percentage") {
            var buffvalue: string = (Number(bvalue) * 100) + "%";
            des = tips.replace(slot, buffvalue);
        }
        return des;
    }

    private closePanel() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
    }
}