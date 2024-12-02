
import axios from "axios";

const changePrismaProjectBuildingProgress = async (id:any, updateData:Investment) => {
    try {
        const {buildingProgress} = updateData
        const response = await axios.put(`https://c2diserver.awer.co/investments/update/${id}`, {
            buildingProgress
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response.data.investment.buildingProgress
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaProjectBuildingProgress }














// src/app/api/changeBuildingProgress/route.tsx

// import { NextResponse } from 'next/server';
// import axios from "axios";
// // ... outras importações ...

// export async function PUT(request: Request) {
//     try {
//         const { id, projectData } = await request.json(); // Obtém o ID e o buildingProgress do corpo da requisição
//         const {buildingProgress} = projectData

//         // Chama a função para atualizar o buildingProgress (ajuste a URL da API)
//         const response = await axios.put(`https://c2diserver.awer.co/investments/update/${id}`, {buildingProgress}, {
//             withCredentials: true,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.status == 200 || response.status == 202) {
//             return NextResponse.json(response.data.investment.buildingProgress); // Retorna a resposta como JSON
//         } else {
//             throw new Error("Ocorreu um erro inesperado");
//         }

//     } catch (error) {
//         console.error('Erro ao atualizar building progress:', error);
//         return NextResponse.json({ error: 'Erro ao atualizar building progress' }, { status: 500 });
//     }
// }


