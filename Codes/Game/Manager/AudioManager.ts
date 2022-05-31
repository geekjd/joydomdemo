import MesManager from "src/_T/Mes/MesManager";
import { EEventAudio } from "../MesEvent/EEventAudio";
import AudioProxy from "./AudioProxy";
import AudioUtils from "./AudioUtils";

/**
 * 音效管理类
 */
export default class AudioManager {
    //
    private static _instance: AudioManager;
    /** 单例 */
    public static get instance(): AudioManager {
        if (this._instance == null) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }
    //
    private constructor() { }

    //初始化
    public init() {
        MesManager.on(EEventAudio.BGMSuspend, this, this.BGMPause);
        MesManager.on(EEventAudio.BGMGoOn, this, this.BGMPlay);
        MesManager.on(EEventAudio.SoundSuspend, this, this.SoundPause);
        MesManager.on(EEventAudio.SoundGoOn, this, this.SoundPlay);
        MesManager.on(EEventAudio.BGMVolumeChange, this, this.bgmVolumeChange);
        MesManager.on(EEventAudio.SoundVolumeChange, this, this.soundVolumeChange);
        AudioUtils.instance.init();
    }

    //BGM暂停
    public BGMPause() {
        AudioProxy.instance.stopMusic();
    }

    //BGM继续
    public BGMPlay() {
        AudioProxy.instance.BGMGoOn();
    }

    //音效暂停
    public SoundPause() {
        AudioProxy.instance.soundSuspend();
    }

    //音效继续
    public SoundPlay() {
        AudioProxy.instance.soundGoOn();
    }

    //BGM音量改变
    public bgmVolumeChange(_n: number = 1) {
        Laya.SoundManager.setMusicVolume(_n);
    }

    //音效音量改变
    public soundVolumeChange(_n: number = 1) {
        Laya.SoundManager.setSoundVolume(_n);
    }
}