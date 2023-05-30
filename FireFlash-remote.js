/*A bibliioteca FireFlash tem o intuito de facilitar a utilização dos produtos Firebase
com, provê aos desenvolvedores de uma maneira mais pratica e intuitiva, uma forma de se conectar com o 
Firebase e utilizar seus produtos,  a principio todo o processo e codigo se dara de forma open source
para que o usuario tenha acesso ao codigo fonte e tambem contribua com o projeto.
*/



/**Essa função verifica se a bibliioteca foi instalada corretamente e se todas as dependencias necessárias 
 * estão sendo usadas essa função deve ser executada sempre que o usuario utilizar a biblioteca
 * @version: 1.0.0
 * @author: Oscar Rodrigues
 * Data: 25/05/2023
 */
export function fireflash_verification(){
  console.log('Libray FireFlash in execution')

}


/**a função ja é chamada caso algo esteja errado essa função não será executada */
fireflash_verification()

/** 
Função: fireFlash_createAcount
Descrição: Cria uma nova conta de usuário no Firebase Auth com as credenciais fornecidas (email e senha).
Parâmetros:
@param {string} email: string contendo o endereço de email do usuário a ser criado
@param {string} senha: string contendo a senha do usuário a ser criado
@param {function} auth: função nativa do Firebase Authenticator, deve ser importada do firebase para ser usado como
paramentro da função

@param {function} native_createLogin_email: função nativa do Firebase Authenticator, deve ser importada 
do firebase para ser usada como parametro na função, no firebase o nome da função é 
createUserWithEmailAndPassword

@return {void} Nenhum retorno. A função realiza a criação do usuário e trata os possíveis erros, exibindo mensagens de log no console.
Exemplo de uso:
fireFlash_createAcount('exemplo@email.com', 'senha123')

@version 1.0.0
@author:Oscar Rodrigues
Data: [11/05/2023]

*/
export function fireFlash_createAcount(email, senha,native_createLogin_email,auth) {
  native_createLogin_email(auth, email, senha)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('Usuário criado com sucesso!')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('ocorreu o erro: \n' + error + '\n ao tentar criar o usuário, consulte a documentação FireFlash')
      console.log(errorCode + '\n' + errorMessage)
      // ..
    });
}



/**
Realiza a autenticação de um usuário no Firebase Auth com as credenciais fornecidas (email e senha) e executa a função fornecida como parâmetro caso a autenticação seja bem sucedida.
@param {string} email - O endereço de email do usuário a ser autenticado.
@param {string} senha - A senha do usuário a ser autenticado.
@param {Function} função - A função a ser executada após a autenticação bem sucedida do usuário.
@param {function} native_createLogin_email: (signInWithEmailAndPassword) deve ser importada e informada como 
paramentro da função
@param  {function} auth (getAuth) função nativa do Firebase usada para autenticação de usuarios
@returns {void} Nenhum retorno. A função realiza a autenticação do usuário e trata os possíveis erros, exibindo mensagens de log no console.
@example
// Exemplo de uso:
fire_flash_login('exemplo@email.com', 'senha123', minhaFuncao);
@version 1.0.0
@author:Oscar Rodrigues
Data: [11/05/2023]
*/

  export function fireFlash_login(email, senha, função,firebase_login_email,auth) {
    firebase_login_email(auth, email, senha)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      função()
      // ...
    })
    .catch((error) => {
      console.log('Ocorreu um erro ao tentar Autenticar' +
        'pelo FireEase, detalhes do erro abaixo: \n ' + error)
    });
}



/**
Realiza o logout do usuário atualmente autenticado no Firebase Auth e executa a função fornecida como parâmetro caso o logout seja bem sucedido.
@param {Function} função - A função a ser executada após o logout bem sucedido do usuário.
@param {function} native_Logout: (signOut) deve ser importada e informada como
paramentro da função
@param  {function} auth (getAuth) função nativa do Firebase usada para autenticação de usuarios
@returns {void} Nenhum retorno. A função realiza o logout do usuário e trata os possíveis erros, exibindo mensagens de log no console.
@example
// Exemplo de uso:
fireFLash_Exit(minhaFuncao,signOut(),getAuth);
@version 1.0.0
@author:Oscar Rodrigues
Data: [11/05/2023]
*/
export function fireFLash_Exit(função,fireFlash_nativeLogout,auth) {
  fireFlash_nativeLogout(auth).then(() => {
    //caso sucesso no logout
    função()
    //...
  }).catch((error) => {
    //caso não tenha sucesso no logout
    console.log('Ocorreu um erro ao tentar sair usando FireFlash,' +
      'veja detalhes abaixo: \n ' + error)
    //...
  });
}
