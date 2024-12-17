import axios from "axios";


export async function UploadDocuments(document:FileList, folderTitle:Investment["title"]) {

    const formData = new FormData();

    for (let i = 0; i < document.length; i++) {
        console.log(document[i])
        formData.append('file', document[i]);
    }

    // Adiciona o ID do projeto ao FormData
    formData.append('projectId', folderTitle);

    // Faz a requisição POST usando Axios para enviar os arquivos
    console.log('aqui')
    const responseFiles = await axios.post('/api/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    // Extrai as URLs dos documentos da resposta
    const docUrls = responseFiles.data.imageUrls;
    const docs: Investment["documents"] = [];

    // Processa as URLs dos documentos
    for (let index = 0; index < docUrls.length; index++) {
        const parts = docUrls[index].split('-'); // Divide a URL em partes usando o hífen
        let lastPart = parts.pop(); // Obtém a última parte da URL (nome do arquivo)
        lastPart = decodeURIComponent(lastPart); // Decodifica os caracteres especiais da URL

        // Adiciona o documento ao array docs
        docs.push({
            id: 'newDoc',
            title: lastPart,
            url: decodeURIComponent(docUrls[index]),
            description: lastPart,
        });
    }

    return docs
}