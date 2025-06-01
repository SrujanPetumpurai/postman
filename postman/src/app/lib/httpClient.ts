export async function sendRequest(method:string,url:string,body?:any){
const options:RequestInit = {
    method,
    headers:{
        'Content-type':'application/json',
    },
}
if(body &&(method==='POST')||(method==='PUT')||(method==='PATCH')){
    options.body = JSON.stringify(body);
}
try{
    const res = await fetch(url,options)
    const contentType = res.headers.get("Content-type")
    const data = contentType && contentType.includes('application/json')
    ?await res.json()
    :await res.text();
    return{
        status:res.status,
        headers: Object.fromEntries(res.headers.entries()),
        body:data,
    }
}
catch(err){
    return{
        status:null,
        headers:{},
        body:`Error ${err}`
    }
}
}