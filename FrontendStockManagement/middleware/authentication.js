export default function({ store,redirect,route}){
    if(route.path=='/')
        return redirect('/dashboard');
    if(store.state.isAuth==false){
        return redirect('/login');
    }
}