import FGUI_NoviceLoding from "src/FGUI/GameMain/FGUI_NoviceLoding";
import { EUIEvent } from "src/Game/MesEvent/EUIEvent";
import BaseSingleUICon from "src/_T/D2/FGUI/BaseSingleUICon";
import { EUILayer } from "src/_T/D2/FGUI/EUILayer";
import MesManager from "src/_T/Mes/MesManager";
import InstanceT from "src/_T/Ts/InstanceT";


@InstanceT.DecorateInstance()
//设置界面
export class NoviceLodingProxy extends BaseSingleUICon<FGUI_NoviceLoding> {
    public static readonly instance: NoviceLodingProxy;
    protected _UI = FGUI_NoviceLoding;
    protected _layer = EUILayer.Top;
    private constructor() {
        super();
    }
    Init() {
        MesManager.on(EUIEvent.ShowNoviceLoding, this, this.gameLoading);
        MesManager.on(EUIEvent.CloseNoviceLoding, this, this.Close);
    }
    //显示时的生命周期函数
    protected _OnShow() {
    }

    //隐藏时的生命周期函数
    protected _OnHide() {
    }
    Isshow = false;
    private Open() {
        this.Show();
        //this.ui.m_progress.value = 0;
        this.Isshow = true;
    }
    public Close() {
        this.Isshow = false;
        //延迟15帧，等待渲染
        Laya.timer.frameOnce(15, this, () => {
            //console.log("@@@@");
            this.Hide();
            Laya.timer.clearAll(this);
        });
    }
    /**
      * 关卡加载中事件
      * @param _number 加载进度 
      */
    public gameLoading(_i: number) {
        if (!this.Isshow) { this.Open(); }
        _i *= 100;
        // this.ui.m_progress.value = _i;
        // if (this.ui.m_progress.value >= 100) return this.Close();
    }

}