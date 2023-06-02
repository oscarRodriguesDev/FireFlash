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


//função para logar por telefone

/**
Realiza a autenticação de um usuário no Firebase Auth utilizando o número de telefone fornecido e executa a função fornecida como parâmetro caso a autenticação seja bem sucedida.
@param {string} id: - O ID do elemento HTML onde será renderizado o recaptcha.
@param {string} codigo_pais: - O código do país em que o número de telefone está registrado.
@param {string} ddd: - O DDD do número de telefone a ser autenticado.
@param {string} telefone: - O número de telefone a ser autenticado.
@param {Function} função: - A função a ser executada após a autenticação bem sucedida do usuário.
@param {function} auth: função nativa do Firebse uma instancia do authenticator, importada como getAuth
@param {object} captcha: um objeto nativo do Firebase, importado como RecaptchaVerifier
@param {function} loginPhone: uma função nativa do firebase, importada como signInWithEmailAndPassword
@returns {void} Nenhum retorno. A função realiza a autenticação do usuário e trata os possíveis erros, exibindo mensagens de log no console.
@example
// Exemplo de uso:
fireFLash_LoginPhone(id,codigo_pais,ddd,telefone,minhaFuncao,getAuth,RecaptchaVerifier,signInWithPhoneNumber);
@version 1.0.0
@author:Oscar Rodrigues
Data: [30/05/2023]
*/
export function fireFlash_phoneLogin(id, codigo_pais, ddd, telefone, função,auth,captcha,loginPhone) {
  auth.languageCode = 'BR';
  window.recaptchaVerifier = new captcha(id, {
    'size': 'invisible',
    'callback': (response) => {
    },
    'expired-callback': () => {
      //time expired
    }
  }, auth);

  const phoneNumber = '+' + codigo_pais + ddd + telefone
  const appVerifier = window.recaptchaVerifier;
  loginPhone(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      //confirmando o codigo recebido
      const code = window.prompt('digite o codigo recebido')
      confirmationResult.confirm(code)
        .then((result) => {
          //caso sucesso realiza a ação determinada pelo dev
          função()
          // ...
        })
        .catch((error) => {
          // Código de verificação inválido
          console.log('Código de verificação inválido:', error);
          // ...
        });
    }).catch((error) => {
      // Error; SMS not sent
      console.log('ocorreu o erro \n ' + error + ' \nao enviar o codigo')
      // ...
    });
}

//verificando o status de login

/**

Verifica se há um usuário autenticado no Firebase Auth e redireciona para a página especificada em page_index caso haja, ou para a página de login especificada em page_login caso contrário.
@param {string} page_index - O caminho (URL) da página a ser redirecionada caso haja um usuário autenticado.
@param {string} page_login - O caminho (URL) da página de login a ser redirecionada caso não haja um usuário autenticado.
@returns {void} Nenhum retorno. A função verifica o estado da autenticação do usuário e redireciona para as páginas especificadas, exibindo mensagens de log no console.
@example
// Exemplo de uso:
fireFlash_redirectIfLogin('/index.html', '/login.html');
@version 1.0.0
@author:Oscar Rodrigues
Data: [11/05/2023]
*/
export function fireFlash_redirectIfLogin(page_index, page_login) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //...
      //não realiza nada

      window.location.href = page_index;
      //...
    } else {
      //redireciona para a pagina de login
      window.location.href = page_login;
      console.log('Não ha nenhum usuário autenticado')
    }
  });
}


/**
A Função fireFlash_actionIfState verifica se ha usuario autenticado e realiza uma ação definida pelo 
desenvolvedor de acordo com o estado, autenticado ou não
@param{function}: stateLogin refere-se a uma função nativa do Firebase, deve ser importada para ser e informada
por parametro
@param {object}: auth tambem nativo do Firebase, deve ser importado e informado por paremetro na função
@param {function}: função1 chamada caso algum usuário esteja autenticado pelo firebase
@param {function}: função2 chamada caso não haja usuário autenticado pelo firebase
@return {void} : a funçao possui retorno tipo void
@author Oscar Rodrigues
@data 02-06-2023
*/
export function fireFlash_actionIfState(stateLogin,auth,função1, função2) {
  stateLogin(auth, (user) => {
    if (user) {
      
      função1()
  
    } else {
     
      função2();
    }
  });
}



