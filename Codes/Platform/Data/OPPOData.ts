import PlatformData from "./PlatformData";

/**
 * OPPO小游戏数据
 */
export default class OPPOData extends PlatformData {
    /** 应用ID */
    public appId: string = '30629925';
    public appKey: string = '';
    /** 广告id */
    public bannerId: string = '';
    public rewardVideoId: string = '';
    public interstitialId: string = '';
    public nativeId: string = '383199';
    //
    public nativeBannerIds: string[] = [];
    public nativeIconIds: string[] = [];
    public nativeinterstitialIds: string[] = [];
    public nativeinpageIds: string[] = [];
    //
    public shareId: string = '';
}