import {getCookie, removeCookies} from "cookies-next";

export const authPageRequireCheck = async (req : any,res : any) => {
   return await checkSSRTokenValidity(req,res);
};

export const checkSSRTokenValidity = async (req : any,res : any) =>{
  const token = getCookie('token', {req,res});
  let tokenObject = null;
  if (typeof token === "string") {
    tokenObject = token ? JSON.parse(token) : null;
  }
  if (tokenObject){
    // @ts-ignore
    return true
  }
  return false;
}

export const checkClientTokenValidity = async () =>{
  const token = getCookie('token');
  let tokenObject = null;
  if (typeof token === "string") {
    tokenObject = token ? JSON.parse(token) : null;
  }
  if (tokenObject){
    // @ts-ignore
    if (new Date(tokenObject.expiredAt) >= new Date(Date.now())) {
      return true
    }else {
      removeCookies('token');
    }
    removeCookies('token');
  }
  return false;
}
