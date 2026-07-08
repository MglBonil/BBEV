# BBEV

Frontend estático (HTML + JS + CSS) que consome a API Spring Boot em `http://localhost:8080`.

## Estrutura

```
BBEV/
├── index.html              # Redireciona para as telas
├── src/
│   ├── pages/              # Telas HTML (hub, cadTurma, grupo, cadastros, listas, pontos)
│   └── assets/
│       ├── css/styles.css  # Estilos compartilhados
│       ├── js/
│       │   ├── components/ # Componentes reutilizáveis (cardTurmas, cardGrupos)
│       │   └── pages/      # Scripts por tela (hub, cadTurma, cadProf, ...)
│       ├── icons/          # Ícones SVG
│       └── img/            # Imagens
```

## Fluxo Turma

- `src/pages/hub.html` lista as turmas via `GET /turma/all` (renderiza cards dinâmicos).
- `src/pages/cadTurma.html` cadastra uma turma via `POST /turma` (carrega professores de `GET /professor/all`).

# Painel Admin:

Tela Listagem de Professores:

<img width="1283" height="697" alt="image" src="https://github.com/user-attachments/assets/a6f1c81f-d8f0-40b9-b660-80d205c24a2c" />

Tela Cadastro de Professores:

<img width="612" height="683" alt="image" src="https://github.com/user-attachments/assets/5880106c-939a-4258-99f7-656e09f9bd9a" />

Tela Edição/Exclusão de professores: 

<img width="562" height="729" alt="image" src="https://github.com/user-attachments/assets/9b97d08e-fbc3-4015-8b95-ed4a8f1651c3" />
