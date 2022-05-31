import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import FGUI_BUFFShow from "src/FGUI/GameMain/FGUI_BUFFShow";
import InstanceT from "src/_T/Ts/InstanceT";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { HeroAttributeInfoDataProxy } from "src/Game/ConfigProxy/HeroAttributeInfoDataProxy";
import { GameHunter } from "./GameHunter";
import { _HeroAttributeInfoConfig } from "src/Game/_config/_HeroAttributeInfoConfig";
import { HeroBuffDataProxy } from "src/Game/ConfigProxy/HeroBuffDataProxy";
import FGUI_SkillCom from "src/FGUI/GameMain/FGUI_SkillCom";
import ComResUrl from "src/_T/Res/ComResUrl";
import { _HeroBuffConfig } from "src/Game/_config/_HeroBuffConfig";
import AudioManager from "src/Game/Manager/AudioManager";
import { ESounds } from "src/Game/ResE/ESounds";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { ApkDefine } from "src/Ldz_GameCore/GeneralScripts/GameDefine";

@InstanceT.DecorateInstance()
/**BUFF展示 */
export class PBUFFShowProxy extends BaseSingleUICon<FGUI_BUFFShow>{
    public static readonly instance: PBUFFShowProxy;
    protected _UI = FGUI_BUFFShow;
    protected _layer = EUILayer.Popup;

    private skills: string[];
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowBUFFPanel, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        var data: _HeroAttributeInfoConfig.DataType = GameHunter.instance.selectHeroConfig;
        this.skills = data.GameSkills.split(",");
        this.ui.m_buffList.itemRenderer = Laya.Handler.create(this, this.RenderItem, null, false);
        this.ui.m_buffList.numItems = this.skills.length;
        this.ui.m_buffList.on(fgui.Events.CLICK_ITEM, this, this.onClickItem);

        this.ui.m_info.onClick(this, this.hideInfo);
        this.ui.m_bg.onClick(this, this.closePanel);
        Laya.HTMLDivElement.prototype["_updateGraphic"] = function () {
            this._doClears();
            this.graphics.clear(true);
            this._repaintState = 0;
            this._element.drawToGraphic(this.graphics, -this._element.x, -this._element.y, this._recList);
            var bounds = this._element.getBounds();
            if (bounds) {
                this.setSelfBounds(bounds);
            }
            this.size(bounds.width, bounds.height);

            // if (this.style.align != "center") {

            // }
        }
    }

    private RenderItem(index: number, obj: fgui.GObject) {
        var item: FGUI_SkillCom = obj as FGUI_SkillCom;
        var skill: number = Number(this.skills[index]);
        var info = HeroBuffDataProxy.instance.GetBuffInfoByMiscID(skill);

        item.m_skillName.text = info.BuffChineseName;
        item.m_skillImg.url = ComResUrl.MainFgui_url(info.BuffUiIcon);
        item.data = info;
    }

    private onClickItem(obj: fgui.GObject) {
        AudioProxy.instance.playSound(ESounds.click, 1);
        var buff: _HeroBuffConfig.DataType = obj.data as _HeroBuffConfig.DataType;
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