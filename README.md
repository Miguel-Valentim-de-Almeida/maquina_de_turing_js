# Simulador de Máquina de Turing

## Descrição
Este é um simulador de Máquina de Turing em JavaScript. Ele permite que você defina a configuração da máquina (estado inicial, estados finais, transições e símbolos brancos) através de um arquivo JSON e insira um problema do tipo a^n b^n através de um arquivo txt para verificar se a máquina o aceita ou não.

## Funcionamento
O simulador lê dois arquivos de entrada: um contendo a configuração da máquina em JSON e outro que contém um problema em arquivo txt. A saída é armazenada em um arquivo txt (output.txt) e o resultado (aceita [1] ou rejeita [0]) é impresso no terminal.

## Como usar

### Exemplo de arquivo de configuração da máquina:

`duplo_bal.json`
```json 
{
    "initial" : 0,
    "final" : [4],
    "white" : "_",
    "transitions" : [
        {"from": 0, "to": 1, "read": "a", "write": "A", "dir":"R"},
        {"from": 1, "to": 1, "read": "a", "write": "a", "dir":"R"},
        {"from": 1, "to": 1, "read": "B", "write": "B", "dir":"R"},
        {"from": 1, "to": 2, "read": "b", "write": "B", "dir":"L"},
        {"from": 2, "to": 2, "read": "B", "write": "B", "dir":"L"},
        {"from": 2, "to": 2, "read": "a", "write": "a", "dir":"L"},
        {"from": 2, "to": 0, "read": "A", "write": "A", "dir":"R"},
        {"from": 0, "to": 3, "read": "B", "write": "B", "dir":"R"},
        {"from": 3, "to": 3, "read": "B", "write": "B", "dir":"R"},
        {"from": 3, "to": 4, "read": "_", "write": "_", "dir":"L"}      
    ]
}
```
### Exemplo de arquivo de entrada:
`duplo_bal.in`
```
aabb
```
### Exemplo de uso no terminal:
```bash
node main.js duplo_bal.json duplo_bal.in
```
Se estiver usando o terminal do Visual Studio Code, o arquivo de saída será criado ou reescrito na própria pasta do arquivo `main.js`, então basta abrí-lo para verificar a saída. Se estiver usando outro terminal, recomendo usar este comando para abrir o arquivo de saída:
```bash
start notepad output.txt
```
### Exemplo de arquivo de saída:
`output.txt`
```
AABB
```
