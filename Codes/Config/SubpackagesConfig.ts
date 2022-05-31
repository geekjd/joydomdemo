/**
 * 加载分包配置
 */
export default class LoadSubpackagesConfig {
  /** 分包列表,必须和分包配置文件中的列表一致 */
  public static subpackages: ILoadSubpackages[] = [
    //
    { name: "res", root: "res/", ifLoad: true },
    { name: "RolePrefab2", root: "RolePrefab2/", ifLoad: true },
    { name: "ScenePrefab", root: "ScenePrefab/", ifLoad: true },
    { name: "EffectsPrefab", root: "EffectsPrefab/", ifLoad: true },
    { name: "EnemyPrefab", root: "EnemyPrefab/", ifLoad: true },
  ];
}

export class LoadSubpackagesConfig2 {
  /** 分包列表,必须和分包配置文件中的列表一致 */
  public static subpackages: ILoadSubpackages[] = [
    //
    { name: "res", root: "res/", ifLoad: true },
    { name: "RolePrefab2", root: "RolePrefab2/", ifLoad: true },
    { name: "ScenePrefab", root: "ScenePrefab/", ifLoad: true },
    { name: "EffectsPrefab", root: "EffectsPrefab/", ifLoad: true },
    { name: "EnemyPrefab", root: "EnemyPrefab/", ifLoad: true },
  ];
}
/**
 ,
  "subpackages": [
    {
      "name": "res",
      "root": "res/"
    },
    {
      "name": "RolePrefab2",
      "root": "RolePrefab2/"
    },
    {
      "name": "ScenePrefab",
      "root": "ScenePrefab/"
    },
    {
      "name": "EffectsPrefab",
      "root": "EffectsPrefab/"
    },
    {
      "name": "EnemyPrefab",
      "root": "EnemyPrefab/"
    }
  ]
 
 */
/**
 * cdn分包配置Ga
 */
// 修改路径顺序是先修改加载分包路径，在修改cdn路径，所以cdn路径会覆盖加载路径，不要重复就行了。
export class CDNSubpackagesConfig {
  /** cdn路径列表， */
  public static CDNURLs: {
    //关键资源名字
    name: string,
    //路径
    root: string,
  }[] = [

    ];
}


/**
 * 包配置接口
 */
export interface ISubpackages {
  /** 关键资源名字 */
  name: string,
  /** 路径 */
  root: string,
}

/**
 * 需要加载的分包配置接口
 */
export interface ILoadSubpackages extends ISubpackages {
  /** 是否需要加载 */
  ifLoad: boolean;
}