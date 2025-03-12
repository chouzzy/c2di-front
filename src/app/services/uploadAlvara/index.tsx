import axios from "axios";

interface AlvarasInput {
    demolicao?: AlvaraInfoInput
    aprovacao?: AlvaraInfoInput
    construcao?: AlvaraInfoInput
    estande?: AlvaraInfoInput
}

// Crie um tipo para as informações do alvará (reutilizável)
interface AlvaraInfoInput {
    title: string
    link?: FileList
    numero?: string
    observacoes?: string
}

export async function UploadAlvara(alvarasInput: AlvarasInput, folderTitle: Investment["title"]) {

    const alvaras: Alvaras = {}; // Inicializa o objeto de retorno
    
    if (!alvarasInput) {
        return alvaras
    }

    for (const alvaraKey in alvarasInput) {
        if (Object.prototype.hasOwnProperty.call(alvarasInput, alvaraKey)) {
            const alvaraInfoInput = alvarasInput[alvaraKey as keyof AlvarasInput];

            if (alvaraInfoInput) { // Verifica se alvaraInfoInput existe
                let uploadedUrl = ""; // Para armazenar a URL, caso haja upload

                // Verifica se 'link' é um FileList e se tem pelo menos um arquivo
                if (alvaraInfoInput.link && alvaraInfoInput.link.length > 0) {
                    const formData = new FormData();
                    //Como so pode enviar um arquivo por vez, o index sempre será 0
                    formData.append('file', alvaraInfoInput.link[0]);
                    formData.append('projectId', folderTitle); // Adicione o projectId

                    try {
                        const responseFiles = await axios.post<{ imageUrls: string[] }>('/api/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        const imageUrls = responseFiles.data.imageUrls;
                        if (imageUrls.length > 0) { //Verifica se a imagem foi enviada com sucesso
                            uploadedUrl = imageUrls[0];  // Pega a URL do arquivo
                        } else {
                            console.error(`Erro no upload do alvará ${alvaraKey}: Nenhuma URL retornada.`);
                            continue; // Pula para o próximo alvará, ou lança um erro, dependendo do que você quer fazer
                        }
                    } catch (error) {
                        console.error(`Erro no upload do alvará ${alvaraKey}:`, error);
                        // Trate o erro aqui.  Você pode, por exemplo:
                        // - Continuar o loop (como está agora).
                        // - Lançar o erro para interromper o processo (`throw error;`).
                        // - Adicionar uma mensagem de erro ao objeto alvaras (ex: alvaras[alvaraKey] = { error: 'Falha no upload' };).
                        continue; // Continua para o próximo alvará, se um upload falhar
                    }
                }

                // Cria o objeto AlvaraInfo com os dados corretos
                const alvaraInfo: AlvaraInfo = {
                    title: alvaraInfoInput.title,
                    link: uploadedUrl, // Usa a URL do upload, ou undefined se não houver upload
                    numero: alvaraInfoInput.numero,
                    observacoes: alvaraInfoInput.observacoes,
                };


                // Adiciona o objeto AlvaraInfo ao objeto alvaras, usando a chave correta
                alvaras[alvaraKey as keyof Alvaras] = alvaraInfo;

            }

        }
    }

    return alvaras;
}

// for (const alvara in alvarasInput) {
//     if (Object.prototype.hasOwnProperty.call(object, key)) {
//         const element = object[key];

//     }
// }

// const formData = new FormData();

// for (let i = 0; i < document.length; i++) {
//     formData.append('file', document[i]);
// }

// // Adiciona o ID do projeto ao FormData
// formData.append('projectId', folderTitle);

// // Faz a requisição POST usando Axios para enviar os arquivos
// const responseFiles = await axios.post('/api/upload', formData, {
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     },
// });

// // Extrai as URLs dos documentos da resposta
// const docUrls = responseFiles.data.imageUrls;
// const alvaras: Investment["alvaras"] = [];


// return alvaras
