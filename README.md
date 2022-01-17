# dowhile_rocketseat_node_react_react-native_typescript
Projeto desenvolvido em React, React Native, Node e Typescript.

# 🖥️ Demo
<div align="center">
  <a href='https://github.com/diegodls/dowhile_rocketseat_node_react_react-native_typescript/tree/assets'  </p>
    <img src='https://github.com/diegodls/dowhile_rocketseat_node_react_react-native_typescript/blob/assets/0_example.png'  width="480" align="center"/></br>
    Expandir e mais exemplos</br>
  </a>
 </div>

# ❓ Por quê? 
Esta aplicação foi desenvolvida para testar o aprendizado de [React](https://github.com/facebook/react/), [React Native](https://reactnative.dev/docs/environment-setup), [Node](https://nodejs.org/en/docs/guides/getting-started-guide/) e [Typescript](https://www.typescriptlang.org/).</br>
Neste projeto foi criado um sistema de troca de mensagens (chat), a pessoa se cadastra utilizando o Github e pode postar mensagens.</br>Ao efetuar o login, os dados do usuário é salvo, tanto do banco de dados, como no Local Storage, para que não seja necessário efetuar o login toda vez que utilize a plataforma.</br>


# ⚙️ Features
Responsividade </br>
Componentização </br>
Multiplataforma </br>
Scss </br>
Local Storage </br>
Github Oauth </br>
Axios </br>
Chamadas assíncronas </br>

# 🚀 Iniciando
Para executar este aplicativo. você deverá ter um ambiente de [trabalho configurado](https://www.google.com/) para o desenvolvimento em [React](https://github.com/facebook/react/), [React Native](https://reactnative.dev/docs/environment-setup) e [Node](https://nodejs.org/en/docs/guides/getting-started-guide/).</br>

**Começando:**
* Baixe o projeto ou clone o repositório com o comando `git clone` ([veja mais](https://help.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository));
Cada uma das plataformas requer uma configuração, vamos dividir em três partes:</br>

**1 - Backend:**

* Abra um prompt de comando/cmd/terminal na pasta raiz ou navegue até ela, insira o comando `yarn install` ou `npm install` ou `npx install`, dependendo do gerenciador de pacotes usado, este comando serve para instalar os pacotes/módulos utilizado nesse projeto;
* Após a instalação dos pacotes/módulos, abra o projeto com seu editor([VS Code](https://code.visualstudio.com/)?), crie um novo arquivo na raiz do projeto chamado ```.env``` (sim, esse é o nome, "ponto"env, [saiba mais](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs));
* Neste arquivo, adicione as seguinte informações:

```
GITHUB_CLIENT_ID_WEB = 
GITHUB_CLIENT_SECRET_WEB = 
GITHUB_CLIENT_ID_MOBILE = 
GITHUB_CLIENT_SECRET_MOBILE = 

JWT_SECRET = 
```
* Agora, será necessário [criar as aplicações Oauth no Github](https://docs.github.com/pt/developers/apps/building-oauth-apps/creating-an-oauth-app) para que seja possível efetuar a autorização. Cada plataforma (web/mobile) utiliza um ```CLIENT_ID``` e um ```CLIENT_SECRET```, então, crie as aplicações(PASSO 2 e PASSO 3) referente a plataforma usada (mais informações abaixo em cada plataforma).
* O campo ```JWT_SECRET``` é uma informação secreta para criar as chaves/token, pode ser qualquer string/palavra, desde que seja salva para uso futuro(no arquivo ```\.env-example``` tem uma melhor explicação).
* IMPORTANTE: nunca salve informações secretas (senhas, por exemplo) no arquivo ```.env```, na hora da execução, essas informações podem ser vistas. Neste caso, foi usado para aprendizado([saiba mais](https://nodejs.dev/learn/how-to-read-environment-variables-from-nodejs)).
* Após instalar os módulos, criar e salvar as informações referente a cada plataforma no arquivo ```\.env```, execute o projeto com o comando ```yarn dev``` ( ou ```npm dev```, ou ```npx dev```, ou utilize o seu gerenciador).
* Se tudo estiver certo, você verá a seguinte mensagem: ```Server rodando na porta 4000```, você pode trocar a porta no arquivo: ```/backend/src/server.ts```

**2 - Web:**

* Abra um prompt de comando/cmd/terminal na pasta raiz ou navegue até ela, insira o comando `npx install` ou `npm install` ou `yarn install`, dependendo do gerenciador de pacotes usado, este comando serve para instalar os pacotes/módulos utilizado nesse projeto;
* Após a instalação dos pacotes/módulos, abra o projeto com seu editor([VS Code](https://code.visualstudio.com/)?), abra o arquivo ```/web/src/contexts/auth.tsx``` e adicione a CLIENT_ID gerada ao [criar uma nova aplicação Oauth no Github](https://docs.github.com/pt/developers/apps/building-oauth-apps/creating-an-oauth-app);
* Explicação rápida:</br>

**Application name**: _Necessário, nome da aplicação (poder ser qualquer um de fácil identificação)_</br></br>
**Homepage URL**: _Necessário, URL (link) da aplicação, caso seja apenas para teste(igual este projeto), pode ser qualquer url, se tiver feito deploy, utilize a url do deploy_. </br></br>
**Application description**: _Opcional, descrição da aplicação._. </br></br>
**Authorization callback URL**: _Necessário, url que será chamada após a autorização, deve ser a url que irá tratar da autorização, neste caso, é a própria aplicação(que vai mandar o código para a API), ex: ```http://localhost:3000```_. </br></br>
* Após a criação da aplicação Oauth, gere a *Client secrets* e salve (_IMPORTANTE: salve assim que gerar, se recarregar a pagian, ela será ocultada_) junto com a *Client Id*, ambas serão usadas no backend (PASSO 1), caso tenha optado por usar a versão web da aplicação.
*Agora você já pode executar o projeto (_backend deve estar sendo executado antes_) com o comando: ```yarn dev```.

**3 - Mobile:**

* Abra um prompt de comando/cmd/terminal na pasta raiz ou navegue até ela, insira o comando `npx install` ou `npm install` ou `yarn install`, dependendo do gerenciador de pacotes usado, este comando serve para instalar os pacotes/módulos utilizado nesse projeto;
* Após a instalação dos pacotes/módulos, abra o projeto com seu editor([VS Code](https://code.visualstudio.com/)?), abra o arquivo ```/mobile/src/hooks/auth.tsx``` e adicione as seguintes infomações que devem ser gerada ao [criar uma nova aplicação Oauth no Github](https://docs.github.com/pt/developers/apps/building-oauth-apps/creating-an-oauth-app) nas constantes ```REDIRECT_URL``` e ```CLIENT_ID```;

* Explicação rápida:</br>

**Application name**: _Necessário, nome da aplicação (poder ser qualquer um de fácil identificação)_</br></br>
**Homepage URL**: _Necessário, URL (link) da aplicação, como mobile "não" possui url, utilize ```http://localhost:3000```_. </br></br>
**Application description**: _Opcional, descrição da aplicação._. </br></br>
**Authorization callback URL**: _Necessário, url que será chamada após a autorização,. </br></br>
No mobile varia de como está sendo feita as requisições(expo, firebase, entre outros), no caso caso dessa aplicação, é utilizado o pacote [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth), que utiliza um "scheme" para voltar para o app após a requisição de login, e algumas modificações devem ser feitas [seguindo esta issue](https://github.com/FormidableLabs/react-native-app-auth/issues/494), caso não queira fazer essas modificações, utilize esta url: ```com.diegodls.nlwheat.auth://oauthredirect``` como _Authorization callback URL_ e não terá problemas_. </br></br>

* Após a criação da aplicação Oauth, gere a *Client secrets* e salve (_IMPORTANTE: salve assim que gerar, se recarregar a pagina, ela será ocultada_) junto com a *Client Id*, ambas serão usadas no backend (PASSO 1), caso tenha optado por usar a versão mobile da aplicação.

* Agora você já pode executar o projeto (_backend deve estar sendo executado antes_) com o comando: ```yarn android``` (ou ```yarn ios```, ```npx react-native start```, ou utilize o gerenciador de sua preferência).

* Nota: as versões web e mobile não dependem uma da outra, mas ambas dependem do backend, então PASSO 1 é obrigatório, independente se for usar somente a WEB ou o MOBILE! </br></br>


# 🔩 Módulos
Neste projeto foram utilizado os seguintes módulos:</br>

<table>
<tr>
<td>Backend</td>
<td>Web</td>
<td>Mobile</td>
</tr>
<tr>
<td>
prisma </br>
axios </br>
express </br>
jsonwebtoken </br>
socket.io </br>
</td>
<td>
axios  </br>
react-icons </br>
sass </br>
socket.io-client </br>
</td>
<td>
async-storage </br>
axios </br>
react-native-app-auth </br>
react-native-linear-gradient </br>
react-native-svg </br>
react-native-vector-icons </br>
socket.io-client </br>
</td>
</tr>
</table>

**E todas as dependências desses módulos que estão presentes em seus respectivos repositórios! **

# 📃 Notas
Como se trata de um projeto rápido, muitos tópicos não foram abordados, então, tomei a liberdade de fazer algumas modificações e aplicar alguns conhecimentos, tais como:</br>
Responsividade. </br>
Tratamento de erros. </br>
Backend agora aceita múltiplas plataformas (web/mobile) simultaneamente. </br>
Avisos visuais(erros e outros). </br>
Melhorias visuais. </br></br>
No projeto mobile, como não utilizei o *expo* como no projeto original, tive que recriar boa parte dos códigos e funções para se adequar ao react native cli.

# ❌ Problemas
Devido a um problema com a versão do moti, não foi possível utilizar as animações propostas nos vídeos.

# 👏 Agradecimentos
Agradecimentos a equipe da Rocketseat e a todos os desenvolvedores das tecnologias utilizadas.

# ⚠️ Licença
Você pode usar este aplicativos para estudos, e apenas para estudo, está proibido a sua publicação ou apropriação do código a fim de obter lucros.
