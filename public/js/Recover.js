
//Permite el submit
document.getElementById('recoverForm').addEventListener('submit',recuperarContra);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //Si ya está logueado no puede acceder y se le redirecciona a la página principal
    window.location.href = 'index.html';
  }else{
       
  }
});



function displayOn(value){
  document.getElementById(value).style.display='block';
  
}

function displayOff(value){
  document.getElementById(value).style.display='none';

}

function recuperarContra(e){
  //Nos permite recuperar la contraseña mandándole un correo al usuario para que la modifique
  e.preventDefault();
  var auth = firebase.auth();
  var mail = document.getElementById('mail').value;
  
auth.sendPasswordResetEmail(mail).then(function() {
  alert('Revise su correo, se le enviarán las instrucciones para reestablecer su contraseña')
  window.location.href='login.html';
}).catch(function(error) {
  alert('Hubo un error inesperado, intente nuevamente')
});
}

