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
 * Código para salvr no localStorage
 */

function salvar(){ 
    var novoCodigo = localStorage.getItem("controleCodigo");
    //console.log(`1 ${localStorage.getItem("controleCodigo")}`);
    var vetorCentral= JSON.parse(localStorage.getItem("vetorTarefas"));
    var objetoJSON = {codigo:novoCodigo,descricao:`${$('#descricao').val()}`,cor:`${$('#cor').val()}`,estado:$('#estado').val(),data:`${$('#data').val()}`};
    vetorCentral.push(objetoJSON);
    localStorage.setItem("vetorTarefas",JSON.stringify(vetorCentral));
    localStorage.setItem("controleCodigo", ++novoCodigo);
    //console.log(`2 ${localStorage.getItem("controleCodigo")}`);
    apresenta();
}

/**
 * Atualização da tabela (em andandamento)
 */
function apresenta(){
    vetorCentral = JSON.parse(localStorage.getItem("vetorTarefas"));
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
            <td align="center"><a href="cad_marca.php?acao=editar&codigo=1"><img src="img/glyphicons-31-pencil.png" width="20em"></a></td>
            <td align="center"><a href="javascript:exclui(${vetor['codigo']})"><img src="img/glyphicons-17-bin.png" width="17em"></a></td>          `;
            $('#tabelaTarefas').append(linha);
        }
    }
}

/**
 * Função para atualizar tarefa
 */


 /**
  * Função para excluir tarefa
  */
 function exclui(id){
    vetorCentral = JSON.parse(localStorage.getItem("vetorTarefas"));
    for(var i = 0; i < vetorCentral.length; i++){
        var vetor = vetorCentral[i];
        if(vetor['codigo'] == id){
            vetorCentral.splice(i, 1);  
        }
    }
    localStorage.setItem("vetorTarefas",JSON.stringify(vetorCentral));
    apresenta();
 }