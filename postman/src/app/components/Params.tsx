'use client'
import { useState } from "react"
type props = {
    paramCallbackfn: (param:{key:string,value:string}[])=>void;
}

export default function Params({paramCallbackfn}:props){

    const [param,setParam]=useState<{key:string,value:string}[]>([{key:'',value:''}]);
    const handleParams = (field:string,value:string,index:number)=>{
    const updated = [...param];
    updated[index] =  {...updated[index],[field]:value}
    setParam(updated);
    if(
       index ===param.length -1 && 
       (updated[index].key !=='' || updated[index].value !=='')
    ){
        setParam([...updated,{key:'',value:''}]);
    }
    paramCallbackfn(updated)
}
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
               {param.map((i,idx)=>(
                <tr key={idx}>
                    <td>
                        <input
                         value={i.key}
                         onChange={(e)=>handleParams("key",e.target.value,idx)}
                         type="text" />
                    </td>
                    <td>
                        <input
                         value={i.value}
                         onChange={(e)=>handleParams("value",e.target.value,idx)}
                         type="text" />
                    </td>
                </tr>
               ))
               
               }
               </tbody>
            </table>
        </div>
    )
}

