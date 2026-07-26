//抱歉这个文件名字不好
mod={}

function editableOnFocus(ptr){
    let p=mod,m=tmp,f=funcs,l=layers;
    const a=ptr.__vue__.ptr.split("-"),t=a.pop();
    for(i of a){
        if(p[i]==null)p[i]={};
        if(m[i]==null)return;
        if(f[i]==null)f={};
        if(l[i]==null)return;
        p=p[i],m=m[i],f=f[i],l=l[i];
    }
    if(f[t]||typeof m[t]==="function"){
        ptr.innerText=l[t];
        Object.assign(ptr.style,({//背景色我继承不了了，气死我了
            position: "relative",
            zIndex: 1,
            float: "inline-start",
            textAlign: "left",
            backgroundColor: "#000",
            color: "#0f0",
            outline: "#fff dashed 1px",
        }))
    }
    else ptr.innerHTML=l[t]==''?'Click to enter text':l[t];
}

function editableOnBlur(ptr){
    let p=mod,m=tmp,f=funcs,l=layers;
    const a=ptr.__vue__.ptr.split("-"),t=a.pop();
    for(i of a){
        if(p[i]==null)p[i]={};
        if(m[i]==null)return;
        if(f[i]==null)f={};
        if(l[i]==null)return;
        p=p[i],m=m[i],f=f[i],l=l[i];
    }
    if(f[t]||typeof m[t]==="function"){
        const e=eval(`({${ptr.innerText}})`);
        ptr.innerText=ptr.__vue__.data;
        for(i in e){p[t]=f[t]=l[t]=e[i]}
        ptr.style={};
    }
    else if(m[t] instanceof Decimal){
        p[t]=m[t]=l[t]=new Decimal(ptr.innerHTML);
        ptr.innerHTML=ptr.__vue__.data;
    }
    else p[t]=m[t]=l[t]=ptr.innerHTML,ptr.innerHTML=ptr.__vue__.data;
    
    if(ptr.innerHTML=='')ptr.innerHTML='Click to enter text';
}


function deleteMod(){
	if (!confirm("Are you sure you want to delete the mod? You will lose the mod!")) return
    mod={};
    save();
    delete window.save;
    delete window.onbeforeunload;
    localStorage.removeItem(getModID()+"_mod")
    window.location.reload();
}


//序列化模组的函数

function modstringify(obj,maxdep=32,dep=0,key=""){
    if(dep>maxdep){
        alert("这树有够深的")
        return "'...'";
    }
    if(obj instanceof Decimal)
        return `Decimal.fromComponents(${obj.sign},${obj.layer},${obj.mag})`
    if(obj==null)
        return obj+"";

    switch(typeof obj){
        case "string":
        case "boolean":
        case "number"://[[fallthrough]];
            return JSON.stringify(obj);
        case "bigint":
            return `${obj}n`;//也是不知道为什么模组树有bigint啊
        case "object":
            let ret="";
            if(Array.isArray(obj)){
                for(i in obj){
                    let r;
                    if(typeof obj[i]==='function'&&!/^([a-zA-Z_]\w*|\(.*\))=>|^function/.test(obj[i]))
                        ret+=`${"\t".repeat(dep+1)}${obj[i]},\n`;
                    else ret+=`${"\t".repeat(dep+1)}${modstringify(obj[i],maxdep,dep+1,i)},\n`;
                }return `[\n${ret}${"\t".repeat(dep)}]`;
            }
            else{
                for(i in obj){
                    let r;
                    if(typeof obj[i]==='function'&&!/^([a-zA-Z_]\w*|\(.*\))=>|^function/.test(obj[i]))
                        ret+=`${"\t".repeat(dep+1)}${obj[i]},\n`;
                    else ret+=`${"\t".repeat(dep+1)}"${i}": ${modstringify(obj[i],maxdep,dep+1,i)},\n`;
                }return `{\n${ret}${"\t".repeat(dep)}}`;
            }
        case "function":
            if(/^([a-zA-Z_]\w*|\(.*\))=>|^function/.test(obj))
                return obj.toString();
            else
                return "function "+obj.toString();

        case "symbol":
            alert("为什么你树里有symbol啊？");
            //[[fallthrough]];
        default:
            alert("肯定是哪里有问题");
    }
    return String(obj);
}

function get_layer_js(){
    let layer_js="//layers:"+LAYERS+"\n";
    for(i of LAYERS){
        layer_js+=`
//Layer ${i} 
addLayer(${JSON.stringify(i)},${modstringify(layers[i])})


        `
    }
    return layer_js;
}