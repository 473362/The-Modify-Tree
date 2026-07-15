var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}],
    ["display-text",()=>JSON.stringify(mod)],
    "clickables",
    ],
    previousTab: "",
    leftTab: true,
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
    },
})