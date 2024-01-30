import APIConfig from "../config/api";
import {hasOwnProperty} from "graphql-ws/lib/utils";
import {useState} from "react";
export function fileUploadFetcher<TData, TVariables>(query: string, variables?: TVariables) {
    let formData : any;
    formData = null;
    if (typeof FormData !== "undefined"){
        formData = new FormData();
        if(typeof variables === "object"){
            // @ts-ignore
            const file = variables.hasOwnProperty('file') ? variables['file'] : null;
            let operation = JSON.stringify({ query, variables, operationName: null});
            if (formData !== null){
                formData.append('operations', operation);
                const map = `{"0": ["variables.file"]}`
                formData.append("map", map)
                formData.append("0",file)
            }

        }
    }


    // if (typeof FormData !== "undefined"){
    //     formData = new FormData();
    //     let operation = JSON.stringify({ query, variables });
    //     formData.append('operations',operation);
    //     if (typeof variables === "object"){
    //         let map1 ={};
    //         let map2 ={};
    //         let counter = -1;
    //         for(const x in variables){
    //             if (variables[x] instanceof File){
    //                 counter++;
    //                 // @ts-ignore
    //                 let st = `"${counter.toString()}"`;
    //                 map1[st] = ["variables."+x];
    //                 // map1[st] = "test";
    //                 // @ts-ignore
    //                 map2[st] = variables[x];
    //                 // @ts-ignore
    //                 variables[x] = null;
    //             }
    //             // @ts-ignore
    //             // formData.append(x,variables[x])
    //         }
    //         let operation = JSON.stringify({ query, variables, operationName: null});
    //         // console.log(operation);
    //         // console.log(map1);
    //         // console.log(map2);
    //
    //         formData.append('operations',operation);
    //         // @ts-ignore
    //         formData.append("map",map1);
    //         // @ts-ignore
    //         for (const y in map2){
    //             formData.append(y,map2[y]);
    //         }
    //     }
    //
    //
    //
    // }

    return async (): Promise<TData> => {
        const res = await fetch(APIConfig.endpoint as string, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'multipart/form-data',
                'Authorization' : 'Bearer '+ localStorage.getItem('token')
            },
            body: formData,
        });
        const json = await res.json();

        if (json.errors) {
            const { message } = json.errors[0];

            throw new Error(message);
        }

        return json.data;
    }
}