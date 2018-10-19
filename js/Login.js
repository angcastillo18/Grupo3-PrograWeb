//validación de los inputs, texto vacio
function emptyField(){
  var user=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  var messageError=document.getElementById("msg__error");
  messageError.innerHTML="";
  if (user.length==0 || password.length==0) {
    messageError.innerHTML="Rellene todos los campos";
  }
}

//
