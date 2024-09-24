<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obter dados do formulário
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['msg']);    
    // Montar str para guardar 
    $data = "Nome: $name\nEmail: $email\nTelefone: $phone\nMensagem: $message\n";
    $data .= "-------------------------------\n";
    // Definir arquivo
    $file = 'mensagens.txt';
    // Verificar se o arquivo existe, caso contrário, criá-lo
    if (!file_exists($file)) {
        // Cria o arquivo com permissão de escrita
        $handle = fopen($file, 'w') or die('Não foi possível criar o arquivo');
        fclose($handle);
    }
    // Guardar dados no arquivo (append)
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
    // Redirecionar
    header("Location: thanks.html");
    exit();  // Assegura que o script pare depois do redirecionamento
}
?>


