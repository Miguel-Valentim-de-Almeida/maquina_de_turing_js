const fs = require('fs');

function lerJson(caminho_do_arquivo) {
    const conteudo = fs.readFileSync(caminho_do_arquivo);
    return JSON.parse(conteudo);
}

function lerTxt(caminho_do_arquivo) {
    return fs.readFileSync(caminho_do_arquivo, 'utf-8').trim();
}

class MaquinaDeTuring {
    constructor(configuracaoMaquinaJson, entrada) {
        this.estadoInicial = configuracaoMaquinaJson.initial;
        this.estadosFinais = configuracaoMaquinaJson.final;
        this.simboloBranco = configuracaoMaquinaJson.white;
        this.transicoes = configuracaoMaquinaJson.transitions;
        this.fita = entrada.split('');
        this.posicaoAtual = 0;
        this.estadoAtual = this.estadoInicial;

        this.fita.push(this.simboloBranco);
    }

    encontrarTransicao(estadoAtual, simboloLido) {
        return this.transicoes.find(
            transicao => transicao.from === estadoAtual && transicao.read === simboloLido
        );
    }

    executar() {
        while (true) {
            let simboloAtual = this.fita[this.posicaoAtual];
            let transicao = this.encontrarTransicao(this.estadoAtual, simboloAtual);

            if (!transicao) {
                break;
            }

            this.fita[this.posicaoAtual] = transicao.write;
            this.estadoAtual = transicao.to;

            if (transicao.dir === 'R') {
                this.posicaoAtual++;
                if (this.posicaoAtual === this.fita.length) {
                    this.fita.push(this.simboloBranco);
                }
            } else if (transicao.dir === 'L') {
                if (this.posicaoAtual > 0) {
                    this.posicaoAtual--;
                } else {
                    this.fita.unshift(this.simboloBranco);
                }
            }
        }

        return this.estadosFinais.includes(this.estadoAtual);
    }

    obterConteudoDaFita() {
        // remove símbolos brancos                       no começo            ou      no final           o 'g' garante que ocorra em todas as instâncias 
        return this.fita.join('').replace(new RegExp(`^${this.simboloBranco}+ | ${this.simboloBranco}+$`, 'g'), '');
    }
}

function main() {
    if (process.argv.length < 4) {
        return;
    }

    const caminhoArquivoJson = process.argv[2];
    const caminhoArquivoTXT = process.argv[3];

    const configuracaoMaquinaJson = lerJson(caminhoArquivoJson);
    const entrada = lerTxt(caminhoArquivoTXT);

    const maquinaDeTuring = new MaquinaDeTuring(configuracaoMaquinaJson, entrada);
    const aceito = maquinaDeTuring.executar();

    const arquivoDeSaida = 'output.txt';
    fs.writeFileSync(arquivoDeSaida, maquinaDeTuring.obterConteudoDaFita());

    console.log(`Resultado aceito: ${aceito ? '1' : '0'}`);
}

main();
