## ✨ Especificações Gherkin

### Funcionalidade: Login do Usuário
```gherkin
@login
Funcionalidade: Login
  Como um usuário da cafeteria
  Quero fazer login com email e senha
  Para acessar o sistema de pedidos

  Cenário: Login bem-sucedido
    Dado que eu acesso a página de login
    Quando eu preencho email e senha válidos
    E clico no botão de entrar
    Então devo ser redirecionado para a página de pedidos

  Cenário: Login com senha incorreta
    Dado que eu acesso a página de login
    Quando eu preencho um email válido e senha errada
    Então devo ver uma mensagem de erro sobre credenciais inválidas

  Cenário: Campos obrigatórios não preenchidos
    Dado que eu estou na tela de login
    Quando eu clico em entrar sem preencher os campos
    Então devo ver mensagens de campo obrigatório

```

### Funcionalidade: Montar Pedido

```gherkin
@pedido
Funcionalidade: Montagem de Café
  Como cliente da cafeteria
  Quero montar meu café escolhendo base e adicionais
  Para personalizar meu pedido

  Cenário: Selecionar base e adicionais
    Dado que estou logado
    E estou na tela de pedido
    Quando eu seleciono 2 ingredientes base e 1 adicional
    E confirmo o pedido
    Então devo ver o resumo do pedido
    E o sistema deve exibir "Pedido feito com sucesso"

  Cenário: Exceder limite de adicionais
    Dado que estou na etapa de adicionais
    Quando eu seleciono 3 ingredientes adicionais
    Então devo ver uma mensagem de erro sobre o limite excedido

  Cenário: Criar café clássico
    Dado que eu seleciono Espresso e Leite como base
    Quando eu avanço para o resumo
    Então o sistema deve identificar como "Latte"

  Cenário: Criar café personalizado
    Dado que eu seleciono ingredientes que não correspondem a um clássico
    Quando avanço
    Então o sistema deve indicar "Café Personalizado"
```

---
### Funcionalidade: Registro de Usuário
```gherkin
@registro
Funcionalidade: Registro de Usuário
    Como um novo usuário da cafeteria
    Quero me registrar com email e senha
    Para acessar o sistema de pedidos
    
    Cenário: Registro com campos obrigatórios vazios
        Dado que estou na tela de registro
        Quando eu deixo os campos de email e senha vazios
        E clico em registrar
        Então devo ver mensagens de erro para os campos obrigatórios
    
    Cenário: Registro com email inválido
        Dado que estou na tela de registro
        Quando eu preencho um email inválido e uma senha válida
        E clico em registrar
        Então devo ver uma mensagem de erro sobre o formato do email
    
    Cenário: Registro bem-sucedido
        Dado que estou na tela de registro
        Quando eu preencho um email válido e uma senha forte
        E clico em registrar
        Então devo ser redirecionado para a tela de login com uma mensagem de sucesso
    Cenário: Registro com email já cadastrado
        Dado que estou na tela de registro
        E já existe um usuário com o email "
        Quando eu preencho esse email e uma senha válida
        E clico em registrar
        Então devo ver uma mensagem de erro informando que o email já está em uso"
``` 
### Funcionalidade: Personalização de Café
```gherkin
@personalizacao
Funcionalidade: Personalização de Café
    Como um cliente da cafeteria
    Quero personalizar meu café escolhendo ingredientes
    Para criar uma bebida única
    
    Cenário: Personalizar café com ingredientes válidos
        Dado que estou na tela de personalização
        Quando eu seleciono os ingredientes "Leite", "Açúcar" e "Canela"
        E clico em "Criar Café"
        Então devo ver o café personalizado com os ingredientes selecionados
    
    Cenário: Tentar personalizar com menos de 2 ingredientes
        Dado que estou na tela de personalização
        Quando eu seleciono apenas "Leite"
        E clico em "Criar Café"
        Então devo ver uma mensagem de erro informando que preciso selecionar pelo menos 2 ingredientes
    
    Cenário: Tentar personalizar com mais de 5 ingredientes
        Dado que estou na tela de personalização
        Quando eu seleciono "Leite", "Açúcar", "Canela", "Chocolate" e "Baunilha"
        E clico em "Criar Café"
        Então devo ver uma mensagem de erro informando que não posso selecionar mais de 5 ingredientes
```
### Funcionalidade: Identificação de Café Clássico
```gherkin
@identificacao
Funcionalidade: Identificação de Café Clássico
    Como um cliente da cafeteria
    Quero que o sistema identifique automaticamente cafés clássicos
    Para facilitar a escolha do meu pedido

    Cenário: Identificar café clássico com ingredientes válidos
        Dado que estou na tela de identificação
        Quando eu seleciono os ingredientes "Espresso" e "Leite"
        E clico em "Identificar Café"
        Então o sistema deve identificar como "Latte"

