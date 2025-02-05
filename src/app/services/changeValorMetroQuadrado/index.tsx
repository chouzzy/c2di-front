import { api } from "../axios";


const changePrismaProjectValorMetroQuadrado = async (id:any, updateData:Investment) => {
    try {
        const {valorMetroQuadrado} = updateData
        const response = await api.put(`investments/update/${id}`, {
            valorMetroQuadrado
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // Define o header Content-Type
            }
        });

        if (response.status == 200 || response.status == 202) {
            return response.data.investment.valorMetroQuadrado
        } else {
            throw Error("Ocorreu um erro inesperado")
        }

    } catch (error) {
        throw error
    }
};

export { changePrismaProjectValorMetroQuadrado }














// src/app/api/changeValorMetroQuadrado/route.tsx

// import { NextResponse } from 'next/server';
// import { api } from "../axios";
// // ... outras importações ...

// export async function PUT(request: Request) {
//     try {
//         const { id, projectData } = await request.json(); // Obtém o ID e o valorMetroQuadrado do corpo da requisição
//         const {valorMetroQuadrado} = projectData

//         // Chama a função para atualizar o valorMetroQuadrado (ajuste a URL da API)
//         const response = await api.put(`investments/update/${id}`, {valorMetroQuadrado}, {
//             withCredentials: true,
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.status == 200 || response.status == 202) {
//             return NextResponse.json(response.data.investment.valorMetroQuadrado); // Retorna a resposta como JSON
//         } else {
//             throw new Error("Ocorreu um erro inesperado");
//         }

//     } catch (error) {
//         console.error('Erro ao atualizar building progress:', error);
//         return NextResponse.json({ error: 'Erro ao atualizar building progress' }, { status: 500 });
//     }
// }


