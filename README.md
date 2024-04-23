## ⚡ Acesso rápido

Você pode acessar o aplicativo pronto aqui:

https://mateuskreuch.github.io/desafiobridge/

## 💻 Tecnologias e bibliotecas

- React com TypeScript
- Spring Boot
- emotion.css para CSS in JS
- js-cookie para salvar o histórico de resultados
- color-rgba para extrair o RGBA do CSS e injetar na animação WebGL
- react-router-dom para roteamento

## 📑 Bônus checklist

- Armazene e apresente o histórico dos números informados pelo usuário junto com seus respectivos resultados ✔️
- Defina limites e validações para que a aplicação não apresente erros ✔️
- Publique sua solução em um cloud provider (exemplo: Heroku) e nos forneça o link de acesso ✔️
- Realize testes unitários ✔️

## 💡 Considerações

Há uma animação na aplicação que, apesar de eu ter garantido que roda em um computador jurássico, pode causar problemas de performance em computadores ainda mais antigos ou com telas 4K. Por isso, você pode pausar a animação no canto direito superior, se necessário.

## 👷‍♂️ Instalando

Clone ou baixe o projeto, e abra um terminal na pasta raiz. Em seguida, rode:

```
cd frontend
npm install
```

## 🏃‍♂️ Como rodar?

Abra um terminal na pasta raiz do projeto. Em seguida, você pode rodar:

### - Front-end

```
cd frontend
npm run dev
```

### - Back-end

```
cd backend
mvnw spring-boot:run
```

### - Testes unitários do back-end

```
cd backend
mvnw test
```