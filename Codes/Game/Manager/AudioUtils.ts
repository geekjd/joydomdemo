import ComResUrl from "src/_T/Res/ComResUrl";
import { ESounds } from "../ResE/ESounds";

/**
 * 音效工具类
 * 必须要先预加载音效，不然播放会有延迟
 */
export default class AudioUtils {
    //
    private static _instance: AudioUtils;
    /** 单例 */
    public static get instance(): AudioUtils {
        if (this._instance == null) {
            this._instance = new AudioUtils();
        }
        return this._instance;
    }
    //
    private constructor() { }

    private _Camera: Laya.Transform3D;
    public get Camera(): Laya.Transform3D {
        return this._Camera;
    }
    public set Camera(value: Laya.Transform3D) {
        this._Camera = value;
    }
    m_onSoundList: Map<Laya.SoundChannel, Laya.Vector3> = new Map<Laya.SoundChannel, Laya.Vector3>();
    SoundsDic: number = 30;
    //初始化
    public init() {
        // /**设置当失去焦点后是否自动停止音效 */
        // Laya.SoundManager.autoStopMusic = false;
        // //根据数据设置背景音乐和音效是否静音
        // /**失去焦点 */
        // Laya.stage.on(Laya.Event.BLUR, this, this.LoseFocus);
        // /**获取焦点 */
        // Laya.stage.on(Laya.Event.FOCUS, this, this.GetFocus);
        // AudioManager.soundMuted = !SetDataProxy.instance.data.ifOpenSound;
        // //AudioManager.musicMuted = SetDataProxy.instance.data.ifOpenMusic;
        Laya.timer.frameLoop(5, this, this.UpdateSoundsVolume);
    }

    // /**失去焦点 */
    // LoseFocus() {
    //     console.log("失去焦点");
    //     AudioManager.IsLoseFocus = true;
    //     AudioManager.soundMuted = true;
    //     AudioManager.pauseMusic();
    //     AudioManager.pauseSound();
    // }

    // /**获取焦点 */
    // GetFocus() {
    //     console.log("获取焦点");
    //     AudioManager.IsLoseFocus = false;
    //     //AudioManager.musicMuted = !SetDataProxy.instance.data.ifOpenMusic;
    //     AudioManager.soundMuted = !SetDataProxy.instance.data.ifOpenSound;
    //     AudioManager.resumeMusic();
    //     AudioManager.resumeSound();
    // }
    LeftWordPos: Laya.Vector3 = new Laya.Vector3();
    public UpdateSoundsVolume() {
        if (this._Camera) {
            this.m_onSoundList.forEach((Value, Key) => {
                if (Key == null) {
                    this.m_onSoundList.delete(Key);
                } else if (Key.isStopped) {
                    this.m_onSoundList.delete(Key);
                }
            })
            this._Camera.position.cloneTo(this.LeftWordPos);
            this.m_onSoundList.forEach((Value, Key) => {
                this.SetSoundChannelvolumeByWordPos(Value, Key);
            })
        }
    }
    public SetSoundChannelvolumeByWordPos(Value: Laya.Vector3, Key: Laya.SoundChannel): boolean {
        if (Key == null) { return false; }
        if (this._Camera == null) { return false; }
        if (Value != null) {
            let Dic = this.GetTargetDisByWordPos(Value);
            let volume = 0;
            if (Dic >= this.SoundsDic) {
                volume = 0;
            } else {
                volume = 1 - (Dic / this.SoundsDic);
            }
            Key.volume = volume > 1 ? 1 : volume;
        }
        return true;
    }

    public GetTargetDisByWordPos(RightPos: Laya.Vector3): number {
        if (this.LeftWordPos != null && RightPos != null) {
            this.LeftWordPos.y = 0;
            RightPos.y = 0;
            return Laya.Vector3.distance(this.LeftWordPos, RightPos);
        }
        return 0;
    }

    //
    private _bgPast: string[] = [];
    private _urlBGM: string = '';
    private _urlSOUND: string = '';

    /**
     * 播放背景音乐
     * @param name 背景音乐名字
     */
    public playBGM(name: string, loops?: number, complete?: Handler, startTime?: number): void {
        if (name != null && this._bgPast.slice(-1)[0] != name) {
            this._bgPast.push(name);
            this._urlBGM = ComResUrl.MusicURL(name);
            this._playMusic(loops, complete, startTime);
            //console.log(...ConsoleEx.packLog("播放背景音乐", name));
        }
        else {
            if (this._urlBGM != "") {
                this._playMusic(loops, complete, startTime);
                //console.log(...ConsoleEx.packLog("播放背景音乐", name));
            } else {
            }
        }
    }

    /**
     * 转移背景音乐
     * @param name 
     */
    public shiftBGM(name: string, loops?: number, complete?: Handler, startTime?: number): void {
        if (this._bgPast.slice(-1)[0] == name) {
            this._bgPast.pop();
            let pastBg: string = this._bgPast.slice(-1)[0];
            if (pastBg) {
                this._urlBGM = ComResUrl.MusicURL(name);
                this._playMusic(loops, complete, startTime);
            }
        }
    }

    /**
     * 暂停背景音乐
     */
    public pauseBGM() {
        if (window["RES"]) {
            //使用egret RES方式播放音乐
            this._Bgm && this._Bgm.stop();
        }
        else {
            //仍然使用Laya api 播放音乐
            Laya.SoundManager.stopMusic();
        }
        // console.log("停止播放音乐", this._urlBGM);
    }

    /**
     * 暂停特效音乐
     */
    public pauseSound() {
        Laya.SoundManager.stopAllSound();
    }

    private _Bgm: Laya.SoundChannel;
    private _sounds: Laya.SoundChannel[] = [];
    /**
     * 播放特效音乐
     * @param type 名字
     * @param loops 是否循环
     * @param complete 完成回调
     * @param soundClass 使用哪个声音类进行播放，null表示自动选择。
     * @param startTime 开始时间
     */
    public playSound(type: string, loops?: number, complete?: Laya.Handler, soundClass?: any, startTime?: number, WordPos: Laya.Vector3 = null): void {


        this._urlSOUND = ComResUrl.SoundURL(type);
        if (this._sounds.length <= 5) {
            let temp: Laya.SoundChannel = null;
            if (complete == null) {
                let Selfcomplete = Laya.Handler.create(this, (Sounds) => {
                    Laya.SoundManager.removeChannel(temp);
                    for (let i = 0; i < this._sounds.length; i++) {
                        if (this._sounds[i] == null) {
                            this._sounds.splice(i, 1);
                        } else if (this._sounds[i].isStopped) {
                            Laya.SoundManager.removeChannel(this._sounds[i]);
                            this._sounds.splice(i, 1);
                        }
                    }
                });

                if (window["RES"]) {
                    //使用egret RES方式播放音乐
                    window["RES"].getResByUrl(this._urlSOUND, (sound) => {
                        if (sound) {
                            /*
                             * play 第1个参数 表示应开始播放的初始位置（以秒为单位），默认值是 0
                             * play 第2个参数 表示播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
                             * */
                            temp = sound.play(startTime, loops);
                            if (temp != null) {
                                temp.startTime = 1;
                                temp.isStopped = false;
                                temp.volume = 1;
                                //  console.log("播放音效成功");
                                //this._sounds.push(temp);
                                if (WordPos != null && this._Camera != null) {
                                    this._Camera.position.cloneTo(this.LeftWordPos);
                                    if (this.SetSoundChannelvolumeByWordPos(WordPos, temp)) {
                                        this.m_onSoundList.set(temp, WordPos);
                                    }
                                }
                            } else {
                                // console.log("播放失败", temp);
                            }
                            //修改音量 (默认值是1，取值范围0-1)
                            //this.currentChannel.volume = 0.5;
                            //停止播放
                            // setTimeout(() => {
                            //     this.currentChannel.stop();
                            // }, 5000);
                        }
                    }, this)
                }
                else {
                    //仍然使用Laya api 播放音乐
                    temp = Laya.SoundManager.playSound(this._urlSOUND, loops, complete, soundClass, startTime);
                    if (temp != null) {
                        temp.startTime = 1;
                        temp.isStopped = false;
                        temp.volume = 1;
                        // console.log("播放音效成功");
                        //this._sounds.push(temp);
                        if (WordPos != null && this._Camera != null) {
                            this._Camera.position.cloneTo(this.LeftWordPos);
                            if (this.SetSoundChannelvolumeByWordPos(WordPos, temp)) {
                                this.m_onSoundList.set(temp, WordPos);
                            }
                        }
                    } else {
                        //console.log("播放失败", temp);
                    }
                }
            } else {

                if (window["RES"]) {
                    //使用egret RES方式播放音乐
                    window["RES"].getResByUrl(this._urlSOUND, (sound) => {
                        if (sound) {
                            /*
                             * play 第1个参数 表示应开始播放的初始位置（以秒为单位），默认值是 0
                             * play 第2个参数 表示播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
                             * */
                            temp = sound.play(startTime, loops);
                            if (temp != null) {
                                temp.startTime = 1;
                                temp.isStopped = false;
                                temp.volume = 1;
                                //  console.log("播放音效成功");
                                // this._sounds.push(temp);
                                if (WordPos != null && this._Camera != null) {
                                    this._Camera.position.cloneTo(this.LeftWordPos);
                                    if (this.SetSoundChannelvolumeByWordPos(WordPos, temp)) {
                                        this.m_onSoundList.set(temp, WordPos);
                                    }
                                }
                            } else {
                                //   console.log("播放失败", temp);
                            }
                            //修改音量 (默认值是1，取值范围0-1)
                            //this.currentChannel.volume = 0.5;
                            //停止播放
                            // setTimeout(() => {
                            //     this.currentChannel.stop();
                            // }, 5000);
                        }
                    }, this)
                }
                else {
                    //仍然使用Laya api 播放音乐
                    temp = Laya.SoundManager.playSound(this._urlSOUND, loops, complete, soundClass, startTime);
                    if (temp != null) {
                        temp.startTime = 1;
                        temp.isStopped = false;
                        temp.volume = 1;
                        // console.log("播放音效成功");
                        //this._sounds.push(temp);
                        if (WordPos != null && this._Camera != null) {
                            this._Camera.position.cloneTo(this.LeftWordPos);
                            if (this.SetSoundChannelvolumeByWordPos(WordPos, temp)) {
                                this.m_onSoundList.set(temp, WordPos);
                            }
                        }
                    } else {
                        // console.log("播放失败", temp);
                    }
                }
            }

        } else {
            // console.log("播放失败", this._sounds.length);
            for (let i = 0; i < this._sounds.length; i++) {
                if (this._sounds[i] == null) {
                    this._sounds.splice(i, 1);
                } else if (this._sounds[i].isStopped) {
                    Laya.SoundManager.removeChannel(this._sounds[i]);
                    this._sounds.splice(i, 1);
                }
            }
        }
    }

    DeleteSound(type: string) {
        this._urlSOUND = ComResUrl.SoundURL(type);
        for (let i = 0; i < this._sounds.length; i++) {
            if (this._sounds[i].url.indexOf(this._urlSOUND) >= 0) {
                // console.log("停止近战音效");
                Laya.SoundManager.removeChannel(this._sounds[i]);
                this._sounds.splice(i, 1);
            } else if (this._sounds[i].url.indexOf(type) >= 0) {
                // console.log("停止近战音效");
                Laya.SoundManager.removeChannel(this._sounds[i]);
                this._sounds.splice(i, 1);
            } else if (this._sounds[i] == null) {
                this._sounds.splice(i, 1);
            } else if (this._sounds[i].isStopped) {
                Laya.SoundManager.removeChannel(this._sounds[i]);
                this._sounds.splice(i, 1);
            }
        }
    }

    /**设置全部为空 */
    ClearAllSound() {
        for (let i = 0; i < this._sounds.length; i++) {
            if (this._sounds[i] != null) {
                Laya.SoundManager.removeChannel(this._sounds[i]);
                this._sounds.splice(i, 1);
            }
        }
        this._sounds = [];
        this._sounds.length = 0;
    }

    /**
     * 停止播放某个特效音乐
     * @param type 
     */
    public stopSound(type: string): void {
        this._urlSOUND = ComResUrl.SoundURL(type);
        Laya.SoundManager.stopSound(this._urlSOUND);

    }

    // 播放音乐后的回调
    private _playMusic(loops: number = 0, complete?: Handler, startTime?: number) {

        if (window["RES"]) {
            //使用egret RES方式播放音乐
            window["RES"].getResByUrl(this._urlBGM, (sound) => {
                if (sound) {
                    /*
                     * play 第1个参数 表示应开始播放的初始位置（以秒为单位），默认值是 0
                     * play 第2个参数 表示播放次数，默认值是 0，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
                     * */
                    //停止播放
                    if (this._Bgm != null) {
                        this._Bgm.stop();
                    }
                    // setTimeout(() => {
                    // }, 0);
                    this._Bgm = sound.play(startTime, loops);
                    //修改音量 (默认值是1，取值范围0-1)
                    //this.currentChannel.volume = 0.5;
                }
            }, this)
        }
        else {
            Laya.SoundManager.stopMusic();
            //仍然使用Laya api 播放音乐
            this._Bgm = Laya.SoundManager.playMusic(this._urlBGM, loops, complete, startTime);
        }

    }
}