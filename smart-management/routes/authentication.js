// Buttons
var authEmailPassButton = document.getElementByID('authEmailPassButton')
var createUserButton = document.getElementByID('createUserButton');

//Inputs
var emailInput = document.getElementsByID('emailInput');
var passwordInput = document.getElementsByID('passwordInput');

// Displays
var displayName =  document.getElementByID('displayName')

//Criar Novo Usuário
createUserButton.addEventListener('click',function(){
  firebase
    .auth()
    .createUserWitchEmailAndPassword(emailInput.value, passwordInput.value)
    .then(function(){
      alert('Bem vindo'+ emailInput.value);
    })
    .catch(function(error){
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console')
    });
}
