import { TipologiesState } from "@/components/CreateProjects/CreateProjectForm.";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from 'uuid';


interface UploadImagesProps {
    setProgressUploading: Dispatch<SetStateAction<number>>,
    folderTitle: Investment["title"],
    image: any[]
}

interface UploadTipologiesImagesProps {
    setProgressUploading: Dispatch<SetStateAction<number>>,
    folderTitle: Investment["title"],
    tipologies: TipologiesState[]
}

export async function UploadImages({ image, folderTitle, setProgressUploading }: UploadImagesProps) {

    const photos: Investment["photos"] = []

    // PARA CADA IMAGEM, SALVA NO BANCO DE IMAGEM, PEGA O LINK E SALVA NO BANCO DE DADOS
    for (const label in image) {

        if (image.hasOwnProperty(label)) {

            const files = image[label];


            if (files.length < 1) {
                continue
            }

            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
                setProgressUploading((prevProgress) => prevProgress + 1); // Corrigido
            }

            formData.append('projectId', folderTitle);

            const responseFiles = await axios.post<{ imageUrls: string[] }>(
                '/api/upload', // Mantém a mesma rota
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const imageUrls = responseFiles.data.imageUrls;

            let newPhotos: Photos[] = []


            for (let index = 0; index < imageUrls.length; index++) {

                const regex = /[^/]+(?=\?|$)/;
                const match = imageUrls[index].match(regex);
                let filename = 'NDA'

                if (match) {
                    const filenameWithExtension = match[0];
                    filename = filenameWithExtension.split('.').slice(0, -1).join('.') //Nome do arquivo sem extensão
                }

                newPhotos.push({
                    id: uuidv4(),
                    url: imageUrls[index],
                    title: filename,
                    description: ''
                })
            }

            photos.push({
                category: label as PhotosLabel,
                images: newPhotos
            })

        }
    }

    return photos

}

export async function UploadTipologiesImages({ tipologies, folderTitle, setProgressUploading }: UploadTipologiesImagesProps): Promise<Investment['tipologies']> { // Retorna um array de tipologias

    if (!tipologies) return []; // Adicionado
    
    const totalImages = tipologies.reduce((acc, tipology) => acc + (tipology.image ? 1 : 0), 0); // Contagem correta
    if (totalImages === 0) {
        return []; // Ou retorne 'tipologies' se você quiser retornar o array original sem alterações
    }
    
    let uploadedCount = 0;
    const tipologiesFormatted: Investment['tipologies'] = [];

    // Usando Promise.all para uploads paralelos
    await Promise.all(
        tipologies.map(async (tipology) => {

            //Null check

            const formData = new FormData();
            formData.append('file', tipology.image); // Pega o *primeiro* arquivo da FileList
            formData.append('projectId', folderTitle);

            try {
                const responseFiles = await axios.post<{ imageUrls: string[] }>(
                    '/api/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                const imageUrls = responseFiles.data.imageUrls;


                // Só deve ter UMA URL, já que você está enviando um arquivo por vez
                if (imageUrls.length > 0) {
                    const imageUrl = imageUrls[0];

                    // Extrai o nome do arquivo da URL
                    const regex = /[^/]+(?=\?|$)/;
                    const match = imageUrl.match(regex);
                    let filename = 'NDA'; // Valor padrão
                    if (match) {
                        const filenameWithExtension = match[0];
                        filename = filenameWithExtension.split('.').slice(0, -1).join('.'); // Sem extensão
                    }


                    // Adiciona a tipologia formatada ao array de retorno *com a URL da imagem*
                    tipologiesFormatted.push({
                        ...tipology, // Copia todos os outros campos da tipologia
                        image: imageUrl, // Agora image é uma string (URL), e não mais uma FileList
                    });

                } else {
                    // Tratar o caso em que a API não retorna URLs (erro?)
                    console.error("API de upload não retornou URLs.");
                    
                }

            } catch (error) {
                // Tratar erros de upload aqui (exibir mensagem, logar, etc.)
                console.error("Erro no upload da imagem da tipologia:", error);
            } finally {
                // Atualiza o progresso *depois* do upload (com sucesso ou erro)
                uploadedCount++;
                setProgressUploading(uploadedCount / totalImages);
            }
        })
    );

    return tipologiesFormatted;
}