import MesT from "src/_T/Mes/MesT";

/**
 * 所有的场景事件
 */

export enum ESceneEvent {
    LevelDestroy,
    LevelLoadComplete,
    /**游戏主场景 */
    LodeMainScene,
    /**加载新手引导场景 */
    LodeNoviceScene,
    /**加载狩猎模式场景 */
    LodeHuntingScene,
    /**加载合作模式场景 */
    LodeCooperationScene,
    /**加载生存场景 */
    LodeExistenceScene,
    /**加载竞技场景 */
    LodeSportsScene,
    /**旋转主场景的角色 */
    RotateCharacter,
    /**切换主场景的角色 */
    SwitchCharacter,
    /**更新经验条 */
    UpdateExpInfo,
    /**动画更新经验条*/
    UpdateExpInfoMax,
    /**生成道具 */
    LodeItemRes,
    /**生成道具 */
    LodeBattleEffects,
    /**生成特效 */
    LodeEffects,
    /**LodeBOOMEffects */
    LodeBOOMEffects,
    /**显示技能选择界面 */
    ShowSkillPlan,
    /**AddSkill */
    AddSkillByClientID,
    /**释放技能 */
    ReleaseSkills,
    /**释放宠物 */
    ReleasePet,
    /**设置摄像机缓动 */
    SetCameraHuandong,
    /**游戏倒计时 */
    ShowGameTimeTips,
    /**游戏结束 */
    GameOver,
    MoveToPos,
}

//
MesT.packE(ESceneEvent);