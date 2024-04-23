## ⚡ Acesso rápido

Você pode acessar o aplicativo pronto aqui (**aviso**: o back-end pode estar **dormindo** e levar um tempo para responder!):

https://mateuskreuch.github.io/desafiobridge/

Hospedado com GitHub Pages e [back4app](https://www.back4app.com).

## 💻 Tecnologias e bibliotecas

- React com TypeScript (através do [Vite](https://vitejs.dev))
- Spring Boot
- [emotion.css](https://emotion.sh) para CSS-in-JS
- [color-rgba](https://www.npmjs.com/package/color-rgba) para extrair o RGBA do CSS e injetar na animação WebGL
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) para roteamento (pensando em escalabilidade futura)

## 📑 Bônus checklist

- [x] Armazene e apresente o histórico dos números informados pelo usuário junto com seus respectivos resultados
- [x] Defina limites e validações para que a aplicação não apresente erros
- [x] Publique sua solução em um cloud provider (exemplo: Heroku) e nos forneça o link de acesso
- [x] Realize testes unitários

## 💡 Considerações

Há uma animação na aplicação que, apesar de eu ter garantido que roda em um computador jurássico, pode causar problemas de performance em computadores ainda mais antigos ou com telas 4K. Por isso, você pode pausar a animação no canto direito superior, se necessário.

## 👷‍♂️ Instalando

Você vai precisar do seguinte:

- [Node.js v16.17.0](https://nodejs.org/)
- [Java JDK 17.0.3](https://adoptopenjdk.net/releases.html)

Depois, clone ou baixe o projeto e abra um terminal na pasta raiz. Em seguida, rode:

```
cd frontend
npm install
```

Pronto!

## 🏃‍♂️ Como rodar?

### Front-end

Para rodar o front-end, abra um terminal na pasta raiz do projeto e rode:

```
cd frontend
npm run dev
```

### Back-end

Para rodar o back-end, abra outro terminal na pasta raiz do projeto e rode:

```
cd backend
mvnw spring-boot:run
```

### Testes unitários do back-end

Para rodar os testes unitários do back-end, abra um terminal na pasta raiz do projeto e rode:

```
cd backend
mvnw test
```