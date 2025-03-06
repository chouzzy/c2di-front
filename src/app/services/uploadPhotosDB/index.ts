// src/app/services/uploadService.ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { changePrismaProjectPhotos } from '../changePhotos';

// Função uploadFotos (agora exportada)
export async function uploadFotos(
    projectData: Investment,
    projectId: string,
    category: PhotosGroup["category"],
    files: FileList
): Promise<Investment> { // Mesma assinatura, agora exportada
    try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        formData.append('projectId', projectId);

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

        const newPhotos: Photos[] = imageUrls.map((url, index) => ({
            id: uuidv4(),
            url: url,
            title: files[index].name.replace(/\.[^/.]+$/, ""), // Usa files, não selectedFiles
            description: '', // Opcional
        }));



        // 2. Encontrar o índice do ImageGroup correto (ou criar um novo, se não existir)
        const photoGroupIndex = projectData.photos.findIndex(
            (group) => group.category === category //Encontra o grupo
        );

        let updatedPhotos: PhotosGroup[];

        if (photoGroupIndex !== -1) { //Atualiza, caso o grupo exista
            updatedPhotos = projectData.photos.map((group, index) => {
                if (index === photoGroupIndex) {
                    return { ...group, images: [...group.images, ...newPhotos] }; //Adiciona ao array já existente.
                }
                return group;
            });
        } else { //Cria um novo grupo, caso não exista
            updatedPhotos = [
                ...projectData.photos,
                { category: category, images: newPhotos },
            ];
        }

        const updateData = { ...projectData, photos: updatedPhotos }

        const investmentUpdated = await changePrismaProjectPhotos(projectData.id, updateData)

        return investmentUpdated
        
    } catch (error) {
        console.error('Erro ao fazer upload das fotos', error);
        throw error; // Propaga o erro
    }
}