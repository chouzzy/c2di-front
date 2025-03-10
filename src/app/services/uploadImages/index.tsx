import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from 'uuid';


interface UploadImagesProps {
    setProgressUploading: Dispatch<SetStateAction<number>>,
    folderTitle: Investment["title"],
    image: any[]
}

export async function UploadImages({ image, folderTitle, setProgressUploading }: UploadImagesProps) {

    const photos: Investment["photos"] = []

    // PARA CADA IMAGEM, SALVA NO BANCO DE IMAGEM, PEGA O LINK E SALVA NO BANCO DE DADOS
    for (const label in image) {

        if (image.hasOwnProperty(label)) {

            const files = image[label];

            console.log('files')
            console.log(files)

            if (files.length < 1) {
                console.log('não tem nada')
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

            console.log('photos pushed')
            console.log(photos)

        }
    }

    console.log('photos after')
    console.log(photos)

    return photos

}