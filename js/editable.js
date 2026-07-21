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
        ptr.innerText=l[t]
        ptr.style.float="left",ptr.style.textAlign="left"
    }
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
    else if(m[t] instanceof Decimal)p[t]=m[t]=l[t]=new Decimal(ptr.innerHTML);
    else p[t]=m[t]=l[t]=ptr.innerHTML
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