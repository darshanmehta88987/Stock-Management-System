export default function({ store,redirect,route}){
    if(store.state.isAuth==true){
        return redirect('/Dashboard')
    }
    else{

    }
}