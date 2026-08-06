# Publicar o Arquivo Crente no Netlify

## 1. Atualizar o GitHub

Envie o conteúdo deste projeto para a raiz do repositório. Na página inicial do GitHub devem aparecer diretamente:

```text
package.json
netlify.toml
src/
netlify/
public/
```

Não envie apenas o arquivo ZIP para o repositório.

## 2. Criar o projeto no Netlify

1. Entre no Netlify.
2. Clique em **Add new project** ou **Import an existing project**.
3. Escolha **GitHub**.
4. Autorize o Netlify e selecione o repositório `Link-na-Bio`.
5. Confirme a branch principal, normalmente `main`.

O arquivo `netlify.toml` já define:

```text
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

Não altere esses campos na primeira publicação.

## 3. Cadastrar a chave do YouTube

Antes ou logo após o primeiro deploy:

1. Abra o projeto no Netlify.
2. Entre em **Project configuration**.
3. Abra **Environment variables**.
4. Clique em **Add a variable**.
5. Cadastre:

```text
Key: YOUTUBE_API_KEY
Value: SUA_CHAVE_NOVA_DA_YOUTUBE_DATA_API_V3
```

6. Salve.
7. Faça um novo deploy em **Deploys → Trigger deploy → Deploy site**.

A chave não deve ser incluída no GitHub.

## 4. Testar o endereço provisório

O Netlify entregará um endereço semelhante a:

```text
https://nome-do-projeto.netlify.app
```

Abra em uma janela anônima e confira:

- avatar do Arquivo Crente;
- contagem de inscritos;
- contagem de vídeos;
- thumbnail e link do último vídeo;
- comunidade do WhatsApp;
- Google Drive;
- cinco produtos;
- modal de apoio;
- QR Pix;
- botão de compartilhar.

Teste também diretamente:

```text
https://nome-do-projeto.netlify.app/api/youtube
```

O resultado esperado é um JSON com:

```json
{
  "success": true,
  "metrics": {
    "subscribers": "5,95 MIL+",
    "videos": "218+"
  }
}
```

Os números reais podem mudar com o canal.

## 5. Caso os dados do YouTube não apareçam

Verifique:

1. se `YOUTUBE_API_KEY` foi cadastrada com esse nome exato;
2. se a YouTube Data API v3 está habilitada no projeto do Google Cloud;
3. se houve um novo deploy depois de cadastrar a variável;
4. os registros em **Logs & Metrics → Functions → youtube**.

Mesmo com erro na API, a página mantém os dados estáticos de reserva e continua funcionando.

## 6. Conectar domínio próprio

Somente depois de validar o endereço `.netlify.app`:

1. Abra **Domain management**.
2. Clique em **Add a domain**.
3. Escolha **Add a domain you already own**.
4. Digite o domínio ou subdomínio desejado.
5. Siga os registros DNS mostrados pelo Netlify.
6. Aguarde a propagação e o certificado HTTPS.

Estrutura recomendada:

```text
links.arquivocrente.com.br  → Link na Bio
arquivocrente.com.br        → futura Livraria Arquivo Crente
```

## 7. Atualizações futuras

Depois que o GitHub estiver conectado, cada alteração enviada para a branch de produção cria um novo deploy automaticamente.

Antes de mudanças grandes:

1. baixe um ZIP da versão que está funcionando;
2. faça uma alteração por vez;
3. teste o Deploy Preview;
4. publique somente depois da conferência.
