/**
 * Este trecho apenas para limpar o localStorage e outros testes
 */
//localStorage.clear();
var vetorCentral="";
if(localStorage.getItem("vetorTarefas") == null){
    localStorage.setItem("vetorTarefas", `[]`);
} /*else {
    try{
       console.log(JSON.parse(localStorage.getItem("vetorTarefas")));
        vetorCentral= JSON.parse(localStorage.getItem("vetorTarefas"));
        array.forEach(element => {
            console.log(element);
        });
        
    } catch (e){
        console.log(e.message);
    }
}*/

/**
 * Código para salvr no localStorage
 */

function salvar(){ 
    var vetorCentral= JSON.parse(localStorage.getItem("vetorTarefas"));
    
    var objetoJSON = {codigo:$('#codigo').val(),descricao:`${$('#descricao').val()}`,cor:`${$('#cor').val()}`,estado:$('#estado').val(),data:`${$('#data').val()}`};
    vetorCentral.push(objetoJSON);
    localStorage.setItem("vetorTarefas",JSON.stringify(vetorCentral));
    //apresenta();
}

/**
 * Atualização da tabela (em andandamento)
 */

function apresenta(){
    vetorCentral = JSON.parse(localStorage.getItem("vetorTarefas"));
    vetorCentral.forEach(element => {
        var valor = JSON.parse(element);
       
        //var keys = Object.keys(element);
        //var linha = `<tr><td align="center">${element.codigo}</td></tr>`;
        console.log(valor);/*
        $('#tabelaTarefas').append()
        console.log(element);*/
    });

}