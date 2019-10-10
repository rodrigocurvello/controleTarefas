/**
 * Este trecho apenas para limpar o localStorage e outros testes
 */
//localStorage.clear();


/**
 * Validação do localStorage
 */
var vetorCentral="";
if(localStorage.getItem("vetorTarefas") == null){
    localStorage.setItem("vetorTarefas", `[]`);
} 
if(localStorage.getItem("controleCodigo") == null){
    localStorage.setItem("controleCodigo", 1);
}


/**
 * Código para salvar ou atualizar no localStorage 
 */

function salvar(){ 
    vetorCentral = retornaVetorCentral();
    if($('#codigo').val() == -1){
        var novoCodigo = localStorage.getItem("controleCodigo");
        //console.log(`1 ${localStorage.getItem("controleCodigo")}`);
        var objetoJSON = {codigo:novoCodigo,descricao:`${$('#descricao').val()}`,cor:`${$('#cor').val()}`,estado:$('#estado').val(),data:`${$('#data').val()}`};
        vetorCentral.push(objetoJSON);    
        localStorage.setItem("controleCodigo", ++novoCodigo);
    } else {
        var posicao = busca($('#codigo').val());
        vetorCentral[posicao] = {codigo:$('#codigo').val(),descricao:`${$('#descricao').val()}`,cor:`${$('#cor').val()}`,estado:$('#estado').val(),data:`${$('#data').val()}`};
        zeraCampos();
    }
    atualizaVetorCentral(vetorCentral);
    //console.log(`2 ${localStorage.getItem("controleCodigo")}`);
    apresenta(vetorCentral);
}
function zeraCampos(){
    $('#codigo').val(-1);
    $('#descricao').val("");
    $('#cor').val("#fff");
    $('#estado').val(1);
    $('#data').val("");
}

/**
 * Atualização da tabela 
 */
function apresenta(vetorCentral){
   // vetorCentral = retornaVetorCentral();
    $('#tabelaTarefas').find("tr:gt(0)").remove();
    if(vetorCentral.length == 0){
        $('#tabelaTarefas').append("<tr><td  align='center' colspan='6'>Nenhuma tarefa cadastrada</td></tr>");
    } else {
        for(var i = 0; i < vetorCentral.length; i++){
            var vetor = vetorCentral[i];
            var linha = `<tr><td align="center">${vetor['codigo']}</td>
            <td>${vetor['descricao']}</td>  
            <td>${vetor['estado'] == 1 ? "Fazer" : vetor['estado'] == 2 ? "Fazendo" : "Finalizado"}</td>  
            <td bgcolor='${vetor['cor']}'>&nbsp;</td>
            <td align="center"><a href="javascript:altera(${vetor['codigo']})"><img src="img/glyphicons-31-pencil.png" width="20em"></a></td>
            <td align="center"><a href="javascript:exclui(${vetor['codigo']})"><img src="img/glyphicons-17-bin.png" width="17em"></a></td>          `;
            $('#tabelaTarefas').append(linha);
        }
    }
}

/**
 * Função para atualizar tarefa
 */
function altera(id){
    vetorCentral = retornaVetorCentral();
    var posicao = busca(id);
    var vetor = vetorCentral[posicao];
    $('#codigo').val(id);
    $('#descricao').val(vetor['descricao']);
    $('#cor').val(vetor['cor']);
    $('#estado').val(vetor['estado']);
    $('#data').val(vetor['data']);
}

 /**
  * Função para excluir tarefa
  */
 function exclui(id){
    vetorCentral = retornaVetorCentral();
    var posicao = busca(id);
    vetorCentral.splice(posicao, 1);  
    atualizaVetorCentral(vetorCentral);
    apresenta(vetorCentral);
 }

 /**
  * Função que busca tarefa
  */
 function busca(id){
    vetorCentral = retornaVetorCentral();
    var retorno = -1;
    for(var i = 0; i < vetorCentral.length; i++){
        var vetor = vetorCentral[i];
        if(vetor['codigo'] == id){
            retorno = i;
        } 
    }
    return retorno;
 }

 /**
  * Função de pesquisa de tarefa por descrição
  */
 function consultar(){
    var descricao = $('#procurar').val();
    if(descricao == ""){
        apresenta(retornaVetorCentral());
    } else {
        vetorCentral = retornaVetorCentral();
        var busca = new Array();
        for(var i = 0; i < vetorCentral.length; i++){
            var vetor = vetorCentral[i];
            if(vetor['descricao'] == descricao){
                busca.push(vetor);
            }
        }
        apresenta(busca);
    }   
}

 /**
  * Funções que retorna ou atualiza o vetorCentral
  */
 function retornaVetorCentral(){
     return JSON.parse(localStorage.getItem("vetorTarefas"));
 }
 function atualizaVetorCentral(valor){
    localStorage.setItem("vetorTarefas",JSON.stringify(valor));
 }

 /**
  * Função inicia
  */
 function inicia(){
    apresenta(retornaVetorCentral());
 }

