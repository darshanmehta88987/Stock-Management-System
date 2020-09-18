export default function({ store,redirect,route}){
    if(store.state.role=='operator'){
        console.log("Inside IsAdmin if");
        return redirect('/Dashboard')
    }
    else{
        console.log("Inside IsAdmin else");
    }
}