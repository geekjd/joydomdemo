import FGUI_ModeTipsPlan from "src/FGUI/GameMain/FGUI_ModeTipsPlan";
import AudioManager from "src/Game/Manager/AudioManager";
import AudioProxy from "src/Game/Manager/AudioProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { ESounds } from "src/Game/ResE/ESounds";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";


@InstanceT.DecorateInstance()
//设置界面
export class ModeTipsPlanProxy extends BaseSingleUICon<FGUI_ModeTipsPlan> {
    public static readonly instance: ModeTipsPlanProxy;
    protected _UI = FGUI_ModeTipsPlan;
    protected _layer = EUILayer.Top;
    private constructor() {
        super();
    }
    ModeName: string = "";
    Init() {
        MesManager.on(EUIEvent.ShowModeTipsPlan, this, this.ShowPlan);
    }
    protected _onShow(_ifNew: boolean, ...par) {
        this.ui.m_ModeTips.m_Close.onClick(this, this.CloseUI);
        this.SetModePlanTips();
    }
    ShowPlan(ModeName: string) {
        this.ModeName = ModeName;
        this.Show();
    }
    SetModePlanTips() {
        switch (this.ModeName) {
            case "Hunting":
                this.ui.m_ModeTips.m_Title.text = "狩猎";
                this.ui.m_ModeTips.m_TipsTxt.text = "与其他三名猎人一同进入猎场，生存下来，证明你的最强实力。尽可能猎杀更多怪物。击杀怪物可提供经验值。";
                break;
            case "Cooperation":
                this.ui.m_ModeTips.m_Title.text = "合作";
                this.ui.m_ModeTips.m_TipsTxt.text = "保护国王！\r\n 您必须尽可能长时间地保护国王。怪物将一浪接一浪地出现。您可以收集小屋金，并在游戏中使用它来升级猎人。鸡舍黄金可以共享，因此谁选黄金都没关系。只要您和您的合作伙伴还活着，您将在被杀死后复活。";
                break;
        }
    }
    CloseUI() {
        AudioProxy.instance.playSound(ESounds.chest_landing, 1);
        this.Hide();
    }

}