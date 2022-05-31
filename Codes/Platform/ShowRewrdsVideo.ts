import PlatformManagerProxy from "./PlatformManagerProxy";

/**
 * 平台工具
 */
export default class ShowRewrdsVideo {
    /**激励视频· */
    ShowRewardVideoAdAsync(): Promise<boolean> {
        return new Promise(function (resolve) {
            PlatformManagerProxy.instance.PlatformInstance.ShowRewardVideoAd(Laya.Handler.create(this, () => {
                console.log('加载成功');

                resolve(true);
            }), Laya.Handler.create(this, () => {
                console.log('没有看完关闭');


                resolve(false);
            }), Laya.Handler.create(this, () => {
                console.log('广告加载失败,可以在这里添加提示');

                resolve(false);
            }));
        });
    }
}