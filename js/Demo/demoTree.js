// treeLayout will override the default tree's layout if used
var layoutInfo = {
    startTab: "c",
    startNavTab: "tree-tab",

	showTree: true,

    //treeLayout: ""

    
}

// A "ghost" layer which offsets f in the tree
addNode("spook", {
    row: 1,
    layerShown: "ghost",
}, 
)


// A "ghost" layer which offsets f in the tree
addNode("g", {
    symbol: "TH",
    branches: [["c", "red", 4]],
    color: '#6d3678',
    layerShown: true,
    canClick() {return player.points.gte(10)},
    tooltip: "Thanos your points",
    tooltipLocked: "Thanos your points",
    onClick() {player.points = player.points.div(2)
    console.log(this.layer)}

}, 
)


// A "ghost" layer which offsets f in the tree
addNode("h", {
    branches: ["g"],
    layerShown: true,
    tooltip() {return "Restore your points to " + player.c.otherThingy},
    tooltipLocked() {return "Restore your points to " + player.c.otherThingy},
    row: "side",
    canClick() {return player.points.lt(player.c.otherThingy)},
    onClick() {player.points = new Decimal(player.c.otherThingy)}
}, 
)

addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}],
    ["display-text",()=>JSON.stringify(mod)],
    "clickables",],
    previousTab: "",
    leftTab: true,
    style() {return  {'background-color': '#222222'}},
    clickables:{
        11:{
            title:"Export mod to clipboard",
            canClick:true,
            onClick(){
                const el = document.createElement("textarea");
                el.value = JSON.stringify(mod);
                document.body.appendChild(el);
                el.select();
                el.setSelectionRange(0, 99999);
                document.execCommand("copy");
                document.body.removeChild(el);
            }
        },
        12:{
            title:"How to modify the tree while it's running",
            canClick:false,
            onClick(){
                let imported = prompt("Paste your save here");
                if(imported){
                    ticking=true;
                    setTimeout(()=>{
                    try {
                        mod = JSON.parse(imported);
                        let mod2=JSON.parse(imported)
                        fixData(layers,mod2);
                        fixData(mod2,layers);
                        tmp = {}
                        temp = tmp 
                        funcs = {}
                        app=undefined;
                        load()
                        ticking=false;
                    } catch (e) {
                        return;
                    }})
                }
            }
        }
    }

})