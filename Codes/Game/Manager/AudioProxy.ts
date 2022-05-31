import { SetDataProxy } from "../Data/SetDataProxy";
import { EMusics } from "../ResE/EMusics";
import { ESounds } from "../ResE/ESounds";
import AudioUtils from "./AudioUtils";

/**
 * 音效代理类
 */
export default class AudioProxy {
    //
    private static m_instance: AudioProxy;
    /** 单例 */
    public static get instance(): AudioProxy {
        if (!this.m_instance) {
            this.m_instance = new AudioProxy();
        }
        return this.m_instance;
    }
    private m_onBGM: EMusics;
    //当前播放的循环音效列表
    private m_onLoopSoundList: Set<ESounds>;
    //游戏是否暂停
    private m_stop: boolean;

    /**
     * 初始化
     */
    private constructor() {
        this.m_stop = false;
        this.m_onLoopSoundList = new Set<ESounds>();
    }



    /**
     * 停止背景音乐
     */
    public stopMusic() {

        AudioUtils.instance.pauseBGM();
    }

    /**
     * 继续播放背景音乐
     */
    public BGMGoOn() {
        this.playMusic(this.m_onBGM);
    }

    //音效暂停
    public soundSuspend() {
        this.m_stop = true;
        //暂停所有循环播放音效
        for (let _o of this.m_onLoopSoundList) {
            AudioUtils.instance.stopSound(_o);
        }
    }

    //音效继续
    public soundGoOn() {
        this.m_stop = false;
        //继续播放暂停前的循环播放音效
        for (let _o of this.m_onLoopSoundList) {
            AudioUtils.instance.playSound(_o, 0);
        }
    }

    /**
     * 播放背景音乐
     * @param _name 背景音乐名字
     */
    public playMusic(_name: EMusics, loops?: number, complete?: Handler, startTime?: number): void {
        if (!SetDataProxy.instance.data.ifOpenMusic || this.m_stop) return;
        AudioUtils.instance.playBGM(_name, loops, complete, startTime);
        //记录
        this.m_onBGM = _name;
    }

    /**
     * 播放音效
     * @param url 声音文件地址。
     * @param loops 循环次数,0表示无限循环。
     * @param complete 声音播放完成回调  Handler对象。
     * @param soundClass 使用哪个声音类进行播放，null表示自动选择。
     * @param startTime 声音播放起始时间。
    */
    public playSound(_eSoundName: ESounds, loops?: number, complete?: Laya.Handler, soundClass?: any, startTime?: number, WordPos: Laya.Vector3 = null) {
        if (!SetDataProxy.instance.data.ifOpenSound || this.m_stop) return;
        //判断是不是循环播放的音效，如果是的话就保存起来
        if (loops == 0) {
            if (!this.m_onLoopSoundList.has(_eSoundName)) {
                //正式播放音效
                this.m_onLoopSoundList.add(_eSoundName);
                AudioUtils.instance.playSound(_eSoundName, loops, complete, soundClass, startTime, WordPos);
            }
        }
        else {
            AudioUtils.instance.playSound(_eSoundName, loops, complete, soundClass, startTime, WordPos);
        }
    }

    IsPlayCOunt = 0;
    public PlaySound_Bgm(_eSoundName: ESounds) {
        if (!SetDataProxy.instance.data.ifOpenSound || this.m_stop) return;
        this.playSound(_eSoundName, 0, Laya.Handler.create(this, () => {
        }), null, 0);
    }
    public StopSound_Bgm(_eSoundName: ESounds) {
        AudioUtils.instance.stopSound(_eSoundName);
        AudioUtils.instance.DeleteSound(_eSoundName);
        //判断是否在当前循环播放列表中
        if (this.m_onLoopSoundList.has(_eSoundName)) {
            this.m_onLoopSoundList.delete(_eSoundName);
        }
    }
    ClearAllSound() {
        this.m_onLoopSoundList = new Set<ESounds>();
        AudioUtils.instance.ClearAllSound();
    }


    /**
     * 停止音效
     * @param _eSoundName 音效名字
     */
    public stopSound(_eSoundName: ESounds) {
        AudioUtils.instance.stopSound(_eSoundName);
        //判断是否在当前循环播放列表中
        if (this.m_onLoopSoundList.has(_eSoundName)) {
            this.m_onLoopSoundList.delete(_eSoundName);
        }
    }
}