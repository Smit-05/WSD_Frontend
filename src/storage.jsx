export function setStorageLogin(id){
    localStorage.setItem("id",id);
    console.log(id)
}

export function removeStorageLogin(id){
    console.log(id)
    localStorage.removeItem("id",id);
}

export function checkUser(){
    if(localStorage.getItem("id")){
        return true;
    }else{
        return false;
    }
}