
import GameManager from "src/GameManager/GameManager";
import ConsoleEx from "src/_T/Console/ConsoleEx";
import DataManager from "./Data/DataManager";
import GameInitLoad from "./Main/GameInitLoad";
import AudioManager from "./Manager/AudioManager";
import SceneManager from "./Scene/SceneManager";
import UIConManager from "./UICon/UIConManager";



/**
 * 游戏入口
 */
export default class GameMain {
    //初始化
    public constructor() {
        // this.init().then(() => {
        //     //获取游戏初始化加载实例
        //     let _gameInitLoad: GameInitLoad = new GameInitLoad();
        //     //开始加载
        //     _gameInitLoad.load(Laya.Handler.create(this, () => {
        //         this.gameInitLoadCom();
        //         this.enterGame();
        //     }));
        // }).catch(() => {
        //     console.log('游戏初始化失败');
        // });
        this.init();
    }

    //初始化
    private init() {

        //获取游戏初始化加载实例
        let _gameInitLoad: GameInitLoad = new GameInitLoad();
        //开始加载
        _gameInitLoad.load(Laya.Handler.create(this, () => {
            this.gameInitLoadCom();
            this.enterGame();
        }));
    }
    // private init(): Promise<void> {
    //     console.log('游戏 init 之前');
    //     return new Promise<void>((r: Function) => {
    //         try {
    //             OPPONativeAd.instance.createNativeAd().then(() => {
    //                 console.warn("oppo createNativeAd  in mainStart success");
    //                 r();
    //             }).catch(() => {
    //                 console.warn("oppo createNativeAd  in mainStart fail");
    //                 r();
    //             });
    //         }
    //         catch (e) {
    //             console.error(e);
    //             throw e;
    //         }
    //         console.log(' 获取广告信息之后');
    //         r();
    //     });
    // }





    //游戏加载完成
    private gameInitLoadCom() {
        //初始化各个管理器
        SceneManager.instance.init();//场景管理器
        UIConManager.instance.init();//ui控制器管理器
        DataManager.instance.init();//数据管理器
        AudioManager.instance.init();//音频管理器
    }

    //进入游戏
    private enterGame() {
        //进入游戏
        console.log(...ConsoleEx.packLog('进入游戏'));
        // /**
        // TODO 进入测试模块
        // */
        // TestMain.instance.start();

        /**进入游戏 */
        GameManager.Instance.StarGame();

    }
}