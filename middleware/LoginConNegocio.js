export default function({ app, redirect, $alert, $api  }) {
  if(JSON.parse(localStorage.getItem('usuario'))) {
    $api.post('/negocios/usuario',
      { usuarioId: JSON.parse(localStorage.getItem('usuario')).id })
      .then( data => {
      if(data.length > 0){
        return redirect('/negocios/dashboard')
      }
      else{
        $alert.warning("Para tener acceso a esta página primero debes tener a cargo un negocio",
          "Sesión Incorrecta")
      }

    } )
  }
}
