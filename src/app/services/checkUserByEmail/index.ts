import { UserProfile } from "@auth0/nextjs-auth0/client";
import { api } from "../axios";
import axios from "axios";

// const checkUserByEmail = async (user: UserProfile) => {
//     try {

//         const response = await api.get(`users/findUnique/?email=${user.email}`, { withCredentials: true })

//         if (response.status == 200 || response.status == 202) {
//             const userResponse: User = response.data.user
//             return userResponse
//         } else {
//             throw Error("Ocorreu um erro inesperado")
//         }

//     } catch (error) {
//         throw error
//     }
// };

// export { checkUserByEmail }


// src/app/services/checkUserByEmail/index.ts
import { cookies } from 'next/headers'; // Importe a função cookies do next/headers


const checkUserByEmail = async (user: UserProfile) => {
  try {
    if (!user.email) {
      throw new Error("Email do usuário não fornecido.");
    }

    const encodedEmail = encodeURIComponent(user.email);
    const url = `https://c2diserver.awer.co/users/findUnique/?email=${encodedEmail}`;

    // Obter o cookie do cabeçalho da requisição
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers: Record<string, string> = {}; // Cria um objeto para os headers
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`; // Adiciona o token, SE ele existir
    }
      
    const response = await fetch(url, {
      method: 'GET',
      headers: headers, // Passa os headers
      // NÃO use withCredentials no Edge Runtime com fetch e domínios diferentes!
    });

    if (response.ok) {
      const data = await response.json();
      const userResponse: User = data.user; // Ajuste o tipo User
      return userResponse;
    } else {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    throw error;
  }
};

export { checkUserByEmail };