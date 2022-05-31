/**
 * 所有背景音乐 (会预加载)
 * ! 必须是字符串，不能是数字否则会加上反射属性
 */
export enum EMusics {
    null = '',
    /**游戏背景音乐 */
    game_music = "game_music",
    /**游戏胜利 */
    victory = "victory",
    /**游戏失败 */
    defeat = "defeat",

}