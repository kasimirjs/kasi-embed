KaToolsV1_Template.prototype.functions = {};


KaToolsV1_Template.prototype.functions[/^\*for$/] = ($scope, tplElem, attrVal) => {
    console.log("applying for");
    return true; // For maintains the elements itself
}
