function o2o(source: any, target: any): void {
    for (let key in source) {
        target[key] = source.key;
    }
}