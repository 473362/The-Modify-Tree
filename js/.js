//抱歉这个文件我没起好名字
mod={}
setInterval(()=>{
    for(i of document.getElementsByClassName("contenteditable")){
        let p=mod,m=tmp;
        const a=i.id.split("-"),t=a.pop();
        for(j of a){
            if(p[j]==null)p[j]={};
            p=p[j],m=m[j];
        }
        if(m[t] instanceof Decimal)m[t]=p[t]=new Decimal(i.innerText);
        else m[t]=p[t]=i.innerText;
    }
},100)