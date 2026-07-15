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
    ptr.innerHTML=l[t]
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
        ptr.innerHTML=ptr.__vue__.data;
        activePopups.push({ "time": 3, "type": "challenge", "title": "未实现功能", "message": "抱歉现在没有编辑函数的这个功能", "id": popupID, "color": "#ffffff" })
	    popupID++;
    }
    else if(m[t] instanceof Decimal)p[t]=m[t]=l[t]=new Decimal(ptr.innerHTML);
    else p[t]=m[t]=l[t]=ptr.innerHTML
}