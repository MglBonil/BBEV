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

Tela Login Administrador:

<img width="1891" height="874" alt="image" src="https://github.com/user-attachments/assets/b6f10e9d-6a35-4fe5-827f-335998ae22e8" />

Tela Listagem de Turmas/Inicio:

<img width="1898" height="858" alt="image" src="https://github.com/user-attachments/assets/b8c32d1d-55c6-4e55-add7-854e6c4be6b7" />

Tela Listagem Justificativas:

<img width="1909" height="867" alt="image" src="https://github.com/user-attachments/assets/01948ed3-a56b-4600-a290-777608988d57" />

Tela Cadastro Justificativas:

<img width="1905" height="859" alt="image" src="https://github.com/user-attachments/assets/c8a382c8-e87a-4b08-9ca6-2fe10af0cf65" />

Tela Exclusão/Edição de Justificativas:

<img width="1909" height="865" alt="image" src="https://github.com/user-attachments/assets/ba721780-0c91-4987-b859-4b9aa6d786ec" />

Tela Listagem Admins:

<img width="1909" height="860" alt="image" src="https://github.com/user-attachments/assets/e270efe3-ba65-4d4d-b875-3f613c68867e" />

Tela Cadastro Admins:

<img width="1895" height="863" alt="image" src="https://github.com/user-attachments/assets/3b1e818b-a2ad-4570-9352-62ca74aaef02" />

Tela Exclusão/Edição de Admins:

<img width="1910" height="867" alt="image" src="https://github.com/user-attachments/assets/d226d819-3334-43bc-80e5-b514c389663b" />

Tela Listagem Turmas:

<img width="1903" height="876" alt="image" src="https://github.com/user-attachments/assets/caa56774-a232-4a44-acb4-7f330ebc4853" />

Tela Cadastro Turmas:

<img width="1902" height="873" alt="image" src="https://github.com/user-attachments/assets/e4619c6e-8f94-4f35-8b9a-f3b10f05c56b" />

Tela Exclusão/Edição de Justificativas:

<img width="1909" height="865" alt="image" src="https://github.com/user-attachments/assets/fb2868a5-9b0f-4199-8c3f-f2c9048d6f29" />

Tela Listagem Disciplinas:

<img width="1906" height="844" alt="image" src="https://github.com/user-attachments/assets/6a5b8f03-6ad3-4aa3-9031-9a1355fd005a" />

Tela Cadastro Disciplinas:

<img width="1902" height="859" alt="image" src="https://github.com/user-attachments/assets/9eeadfaf-1a70-4699-8ec4-93c830c626b6" />

Tela Exclusão/Edição de disciplinas:

<img width="1900" height="846" alt="image" src="https://github.com/user-attachments/assets/c6d2041b-2fa3-4898-9905-370e626199a0" />

Tela Listagem Aluno:

<img width="1904" height="871" alt="image" src="https://github.com/user-attachments/assets/9809b6e8-fc65-43de-8f57-70ec19e23197" />

Tela Cadastro Aluno:

<img width="1905" height="864" alt="image" src="https://github.com/user-attachments/assets/5741c6b4-1816-4480-9c82-1eb4fdfd5c70" />

Tela Exclusão/Edição de Aluno:

<img width="1899" height="863" alt="image" src="https://github.com/user-attachments/assets/a6e45cf9-cddb-4b8d-bc7b-a5d4e946604f" />

Tela Listagem Logs do Sistema:

<img width="1909" height="869" alt="image" src="https://github.com/user-attachments/assets/c626a4b9-a4a0-4adb-bad1-8bd5759aabb7" />











