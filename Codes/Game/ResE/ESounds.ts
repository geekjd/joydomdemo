/**
 * 所有音效 (会预加载)
 * ! 必须是字符串，不能是数字否则会加上反射属性
 */
export enum ESounds {
    null = '',
    /**按钮点击 */
    click = "click",
    /**页面切换 以及宝箱最后奖励飞出时的音效 */
    chest_landing = "chest_landing",
    /**获得奖励 */
    reward_pop = "reward_pop",
    /**开启宝箱 */
    chest_open_short = "chest_open_short",
    /**人物升级 */
    upgrade_long = "upgrade_long",
    /**战斗相关 */
    /**战斗临时增益结束*/
    boostDown = "boostDown",
    /**战斗临时增益触发*/
    boostUp = "boostUp",
    /**合作模式关卡 */
    fanfare = "fanfare",
    /**购买物品 */
    coop_buy_upgrade = "coop_buy_upgrade",
    /**行走 */
    footstep_01 = "footstep_01",
    footstep_02 = "footstep_02",
    /**生命值 回复 */
    heal = "heal",
    /**战斗升级 */
    levelUp = "levelUp",
    /**拾取经验值 */
    pickUpXp = "pickUpXp",
    /**倒计时提示 */
    ringing2 = "ringing2",
    /**死亡爆炸 */
    bite = "bite",
    /**被攻击 */
    bullet_hit_body = "bullet_hit_body",
    /**飞行呼呼声 */
    whoosh_v0 = "whoosh_v0",
    /**人物相关 */
    /**爆炸 */
    explosion = "explosion",
    /**发射火球 */
    fireballShot = "fireballShot",
    /**拉弓 */
    bow_prapare_01 = "bow_prapare_01",
    /**弓箭发射 */
    bow_shot_01 = "bow_shot_01",
    /**发射 */
    shot = "shot",
    /**毒雾攻击 */
    gasRelease = "gasRelease",
    /**放置小蜘蛛 */
    place = "place",
    /**蜘蛛攻击*/
    spawnWorm = "spawnWorm",
    /**近战攻击 */
    sword_slash_01 = "sword_slash_01",




}