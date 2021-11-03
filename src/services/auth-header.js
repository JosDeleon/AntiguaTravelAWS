export default function autHeader(){
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario.accesToken){
        return { 'x-access-token' : usuario.accesToken };
    }else {
        return {};
    }
}
