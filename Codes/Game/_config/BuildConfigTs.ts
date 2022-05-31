// ！ 自动导出，请不要修改
//
import { _AchievementTasksConfig } from "./_AchievementTasksConfig";
import { _BoxItemsConfig } from "./_BoxItemsConfig";
import { _CooperationSceneDataConfig } from "./_CooperationSceneDataConfig";
import { _CourseConfig } from "./_CourseConfig";
import { _DesktopspeedConfig } from "./_DesktopspeedConfig";
import { _EnemyInfoConfig } from "./_EnemyInfoConfig";
import { _EverydayTasksConfig } from "./_EverydayTasksConfig";
import { _ExistenceSceneDataConfig } from "./_ExistenceSceneDataConfig";
import { _FreeRewardConfig } from "./_FreeRewardConfig";
import { _HeroAttributeInfoConfig } from "./_HeroAttributeInfoConfig";
import { _HeroBattleUpGradeConfig } from "./_HeroBattleUpGradeConfig";
import { _HeroBuffConfig } from "./_HeroBuffConfig";
import { _HeroInfoConfig } from "./_HeroInfoConfig";
import { _HeroSkillConfig } from "./_HeroSkillConfig";
import { _HeroSkinConfig } from "./_HeroSkinConfig";
import { _HeroUpGradeConfig } from "./_HeroUpGradeConfig";
import { _HuntingSceneDataConfig } from "./_HuntingSceneDataConfig";
import { _LevelConfig } from "./_LevelConfig";
import { _PassRewardConfig } from "./_PassRewardConfig";
import { _ResourcePropsConfig } from "./_ResourcePropsConfig";
import { _SceneNodeConfig } from "./_SceneNodeConfig";
import { _ShopConfig } from "./_ShopConfig";
import { _TestConfig } from "./_TestConfig";
import { _TestConst } from "./_TestConst";
import { _WeeklyTasksConfig } from "./_WeeklyTasksConfig";

/**
* 构建全部配置表
* ! 自动导出
*/
export class BuildConfigTs {
    /**
     * 获取所有的配置表内容
     */
    public static getAllConfig(): any[] {
        let configs: any[] = [];
        configs.push(_AchievementTasksConfig);
        configs.push(_BoxItemsConfig);
        configs.push(_CooperationSceneDataConfig);
        configs.push(_CourseConfig);
        configs.push(_DesktopspeedConfig);
        configs.push(_EnemyInfoConfig);
        configs.push(_EverydayTasksConfig);
        configs.push(_ExistenceSceneDataConfig);
        configs.push(_FreeRewardConfig);
        configs.push(_HeroAttributeInfoConfig);
        configs.push(_HeroBattleUpGradeConfig);
        configs.push(_HeroBuffConfig);
        configs.push(_HeroInfoConfig);
        configs.push(_HeroSkillConfig);
        configs.push(_HeroSkinConfig);
        configs.push(_HeroUpGradeConfig);
        configs.push(_HuntingSceneDataConfig);
        configs.push(_LevelConfig);
        configs.push(_PassRewardConfig);
        configs.push(_ResourcePropsConfig);
        configs.push(_SceneNodeConfig);
        configs.push(_ShopConfig);
        configs.push(_TestConfig);
        configs.push(_TestConst);
        configs.push(_WeeklyTasksConfig);
        return configs;
    }
}
