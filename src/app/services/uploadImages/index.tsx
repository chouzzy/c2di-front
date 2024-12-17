import axios from "axios";
import { Dispatch, SetStateAction } from "react";


interface UploadImagesProps {
    setProgressUploading: Dispatch<SetStateAction<number>>,
    folderTitle: Investment["title"],
    image: any[]
}

export async function UploadImages({image, folderTitle, setProgressUploading}:UploadImagesProps) {

    const images: Investment["images"] = []

    // PARA CADA IMAGEM, SALVA NO BANCO DE IMAGEM, PEGA O LINK E SALVA NO BANCO DE DADOS
    for (const label in image) {

        if (image.hasOwnProperty(label)) {

            const files = image[label];

            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
                setProgressUploading((prevProgress) => prevProgress + 1); // Corrigido
            }

            formData.append('projectId', folderTitle);

            const responseFiles = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Define o Content-Type para upload de arquivos
                },
            });

            const imageUrls = responseFiles.data.imageUrls;

            for (let index = 0; index < imageUrls.length; index++) {

                console.log('imageUrls[index]')
                console.log(imageUrls[index])
                images.push({
                    id: 'newimage',
                    label: label,
                    url: imageUrls[index],
                    description: imageUrls[index].replace('https://c2di-space.nyc3.digitaloceanspaces.com/', '')
                })
            }
        }
    }

    return images

}