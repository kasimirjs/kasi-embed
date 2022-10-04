export class KaTemplate {
    constructor(template: any);
    template: any;
    __renderCount: number;
    $scope: {};
    _error(msg: any): void;
    _appendTemplate(): void;
    _removeLastChild(): void;
    _renderFor($scope: any, stmt: any): void;
    _maintain($scope: any, childs: any, forIndex?: number): void;
    _renderIf($scope: any, stmt: any): void;
    /**
     * Remove all rendered element
     */
    dispose(): void;
    /**
     * Render / Update the Template
     *
     * Once the scope in parameter 1 was set, it will render
     * without any parameters. Scope is available via property $scope
     *
     * @param $scope
     */
    render($scope?: any): void;
    /**
     * Return true if this template was renderd the first time
     *
     * @returns {boolean}
     */
    isFirstRender(): boolean;
}
