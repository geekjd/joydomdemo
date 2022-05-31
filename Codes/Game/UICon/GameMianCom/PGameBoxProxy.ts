import FGUI_PGameBox from "src/FGUI/GameMain/FGUI_PGameBox";
import { BoxItemsConfigProxy } from "src/Game/ConfigProxy/BoxItemsConfigProxy";
import { ResourcePropsDataProxy } from "src/Game/ConfigProxy/ResourcePropsDataProxy";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import { TaskType, TaskTypeTwo } from "src/Ldz_GameCore/GeneralScripts/GameDefine";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import ComResUrl from "src/_T/Res/ComResUrl";
import InstanceT from "src/_T/Ts/InstanceT";

@InstanceT.DecorateInstance()
export class PGameBoxProxy extends BaseSingleUICon<FGUI_PGameBox> {
    public static readonly instance: PGameBoxProxy;
    protected _UI = FGUI_PGameBox;
    protected _layer = EUILayer.Popup;

    private id: number = 0;

    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowGameBox, this, this.Show);
    }
    //显示回调
    protected _onShow(_ifNew: boolean, ...par) {
        this.id = par[0];
        var prop = ResourcePropsDataProxy.instance.GetResourcePropsByMiscID(this.id);
        var box = BoxItemsConfigProxy.instance.getConfigByID(this.id);

        this.ui.m_icon.url = ComResUrl.MainFgui_url(prop.HeroUiIcon);
        this.ui.m_nameLabel.text = prop.HeroChineseName;
        this.ui.m_goldLabel.text = box.gold_min + "-" + box.gold_max;
        this.ui.m_spLabel.text = box.fragment_min + "-" + box.fragment_max;

        this.ui.m_closeBtn.onClick(this, this.showConfirm);
        this.ui.m_getBtn.onClick(this, this.getBox);
        this.ui.m_confirm.m_okBtn.onClick(this, this.getBox);
        this.ui.m_confirm.m_cancelBtn.onClick(this, this.Hide);
        // if (QddSDKHelper.instance.isTtPlatform()) {
        //     this.ui.m_getBtn.m_videoUI.url = 'ui://kk7g5mmmgqnv1oj';
        // }

    }

    private getBox() {
        this.Hide();

        // /**微信白包临时写法，有广告ID后直接删掉 */
        // if (QddSDKHelper.instance.isWxPlatform()) {
        //     /**看完 */
        //     MesManager.event(EUIEvent.ShowRewardPanel, [this.id, 1]);
        //     MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
        //     return;
        // }

        let optional3: { videoCallback?: (resultCode: boolean) => void, videOnStartCallback?: () => void, adLocation?: string } = {}
        optional3['videoCallback'] = (resultCode: boolean) => {
            if (resultCode) {
                /**看完 */
                MesManager.event(EUIEvent.ShowRewardPanel, [this.id, 1]);
                MesManager.event(TaskType.Audio + TaskTypeTwo.Look);
            } else {
                /**关闭 */
            }
        }
        // QddSDKHelper.instance.showVideoAd(optional3);

    }

    private showConfirm() {
        this.ui.m_confirm.visible = true;
    }
}