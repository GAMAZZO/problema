<?php 

//Incluir a conexão
include("conexao.php");

//Obter dados 
$obterDados = file_get_contents("php://input");

//Extrair os dados do JSON
$extrair = json_decode($obterDados);

//Separa os dados do JSON
$nomeCurso = $extrair->cursos->nomeCurso;  //O cursos vem do json_encode de listar.php
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$nomeCurso', $valorCurso)"; // como o $nomeCurso está em varchar, é bomo coloca-lo entre '', para melhor funcionamento
mysqli_query($conexao, $sql);

//Exportar dados cadastrados
$curso = [
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
]

json_encode(['curso'] => $curso);

?>