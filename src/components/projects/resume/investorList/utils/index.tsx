import { changeApartmentUserID } from "@/app/services/changeApartmentUserID"
import { createPrismaUserInvestment } from "@/app/services/createUserInvestment"
import { deletePrismaUserInvestment } from "@/app/services/deleteUserInvestmentDocument"
import { filterUserInvestmentsByInvestmentID } from "@/app/services/getUserInvestmentListByID"
import { getUsersResumed } from "@/app/services/getUsersResumed"
import { documentsArrayAdapter } from "@/app/services/utils"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react/flex"
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react"
import investor from "../../role/investor"

interface deleteUserInvestmentTriggerProps {
    id: string
    setDeletingUserInvestment: Dispatch<SetStateAction<boolean>>
    setUserInvestmentID: Dispatch<SetStateAction<string>>
}
interface handleEditClickProps {
    setEditMode: Dispatch<SetStateAction<boolean>>
}
interface handleEditCancelProps {
    setEditMode: Dispatch<SetStateAction<boolean>>
    setAddMode: Dispatch<SetStateAction<boolean>>
}
interface handleAddClickProps {
    setAddMode: Dispatch<SetStateAction<boolean>>
}



const deleteUserInvestmentTrigger = ({ id, setDeletingUserInvestment, setUserInvestmentID }: deleteUserInvestmentTriggerProps) => {
    setDeletingUserInvestment(true)
    setUserInvestmentID(id)
}

const handleEditClick = ({ setEditMode }: handleEditClickProps) => {
    setEditMode(true); // Ativa o modo de edição
};
const handleEditCancel = ({ setEditMode, setAddMode }: handleEditCancelProps) => {
    setEditMode(false); // Ativa o modo de edição
    setAddMode(false); // Ativa o modo de upload
};
const handleAddClick = ({ setAddMode }: handleAddClickProps) => {
    setAddMode(true); // Ativa o modo de edição
};

const getUsers = async (setUsersList: Dispatch<SetStateAction<User[] | undefined>>) => {

    try {
        const usersResponse = await getUsersResumed(0, 9999)
        setUsersList(usersResponse)
    } catch (error) {
        console.error(error)
    }

}

const getUserInvestments = async (setUserInvestmentsList: Dispatch<SetStateAction<UserInvestment[] | undefined>>, projectData: Investment) => {

    try {
        const userInvestments = await filterUserInvestmentsByInvestmentID({ page: `${0}`, pageRange: `${10}`, investmentID: projectData.id })
        console.log(userInvestments)
        setUserInvestmentsList(userInvestments)
    } catch (error) {
        console.error(error)
    }

}

const deleteUserInvestment = async (
    userInvestmentID: UserInvestment["id"],
    setUserInvestmentsList: Dispatch<SetStateAction<UserInvestment[] | undefined>>,
    userInvestmentsList: UserInvestment[] | undefined
) => {

    try {
        const userInvestmentDeleted = await deletePrismaUserInvestment(userInvestmentID)

        setUserInvestmentsList(userInvestmentsList?.filter((userInvestment: UserInvestment) => userInvestment.id !== userInvestmentDeleted.id))

    } catch (error) {
        console.error(error)
    }
}

interface onSubmitInvestorProps {
    data: any
    investor: User | undefined
    projectData: Investment
    setYupError: Dispatch<SetStateAction<string>>
    investorDate: Date
    userInvestmentsList: UserInvestment[] | undefined
    setAddMode: Dispatch<SetStateAction<boolean>>
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    cancelRef:MutableRefObject<null>
    setFormData: Dispatch<any>
}
interface continueSubmitInvestorInvestorProps {
    data: any
    investor: User
    projectData: Investment
    setYupError: Dispatch<SetStateAction<string>>
    investorDate: Date
    userInvestmentsList: UserInvestment[] | undefined
    setAddMode: Dispatch<SetStateAction<boolean>>
 
}

export const continueSubmitInvestor = async ({
    data,
    investor,
    projectData,
    setYupError,
    investorDate,
    userInvestmentsList,
    setAddMode,
}: continueSubmitInvestorInvestorProps) => {
    try {
        console.log('data')
        console.log(data)
        const apartamentIndex = projectData.apartaments.findIndex(
            (apartament) => apartament.andar === data.andar && apartament.final === data.final
        );

        if (apartamentIndex === -1) {
            console.error('Apartamento não encontrado, verifique novamente');
            setYupError('Apartamento não encontrado, verifique novamente');
            return;
        }

        // Atribui o apartamento ao usuário na tabela de investimentos
        projectData.apartaments[apartamentIndex].userId = investor.id;

        data = await documentsArrayAdapter(data);
        const createUserInvestmentData = {
            userID: investor.id,
            investmentID: projectData.id,
            investedValue: data.investedValue,
            valorCorrente: projectData.valorCorrente,
            documents: data.documents,
            apartament: projectData.apartaments[apartamentIndex],
            dataInvestimento: new Date(investorDate.toISOString()),
        };

        // Cria UserInvestment
        const userInvestmentCreated = await createPrismaUserInvestment(createUserInvestmentData);

        // Atualiza o array de apartaments com a nova atualização
        await changeApartmentUserID(projectData.id, projectData);

        // Adiciona para visualização o novo Investment
        userInvestmentsList?.push(userInvestmentCreated);

        setAddMode(false);
    } catch (error: any) {
        console.error(error);
    }
};

const onSubmitInvestor = async ({ data, investor, projectData, setYupError, investorDate, userInvestmentsList, setAddMode, onOpen, setFormData }: onSubmitInvestorProps) => {

    if (!investor) { return alert('Selecione um investidor'); }

    const handleSubmit = async () => {
        try {
            if (!investor) {
                return alert('Selecione um investidor');
            }

            setFormData(data)


            const apartamentIndex = projectData.apartaments.findIndex(apartament => apartament.andar === data.andar && apartament.final === data.final);

            if (apartamentIndex === -1) {
                console.error('Apartamento não encontrado, verifique novamente');
                setYupError('Apartamento não encontrado, verifique novamente');
                return;
            }

            // Verifica se o apartamento já tem um usuário
            if (projectData.apartaments[apartamentIndex].userId) {
                onOpen(); // Abre o modal de confirmação
                return; // Interrompe a execução da função onSubmitInvestor
            }

            // Se não houver usuário, continua com o processo de submissão
            await continueSubmitInvestor({
                data,
                investor,
                projectData,
                setYupError,
                investorDate,
                userInvestmentsList,
                setAddMode,
            });
        } catch (error: any) {
            console.error(error);
        }
    };


    handleSubmit()
};


// const onSubmitInvestor = async ({ data, investor, projectData, setYupError, investorDate, userInvestmentsList, setAddMode }: onSubmitInvestorProps) => {

//     try {

//         if (!investor) { return alert('Selecione um investidor') }

//         const apartamentIndex = projectData.apartaments.findIndex(apartament => apartament.andar === data.andar && apartament.final === data.final);

//         if (projectData.apartaments[apartamentIndex].userId) {
//             if (!confirm('Esse apartamento já possui um usuário cadastrado, deseja continuar?')) {
//                 return; // Retorna vazio se o usuário clicar em "Cancelar"
//             }
//         }

//         if (apartamentIndex === -1) {
//             console.error('Apartamento não encontrado, verifique novamente');
//             setYupError("Apartamento não encontrado, verifique novamente");
//             return;
//         }

//         // Atribui o apartamento ao usuário na tabela de investimentos
//         projectData.apartaments[apartamentIndex].userId = investor.id;

//         data = await documentsArrayAdapter(data)
//         const createUserInvestmentData = {
//             userID: investor.id,
//             investmentID: projectData.id,
//             investedValue: data.investedValue,
//             valorCorrente: projectData.valorCorrente,
//             documents: data.documents,
//             apartament: projectData.apartaments[apartamentIndex],
//             dataInvestimento: new Date(investorDate.toISOString())
//         }

//         // Cria UserInvestment
//         const userInvestmentCreated = await createPrismaUserInvestment(createUserInvestmentData)

//         // Atualiza o array de apartaments com a nova atualização
//         await changeApartmentUserID(projectData.id, projectData)

//         // Adiciona para visualização o novo Investment
//         userInvestmentsList?.push(userInvestmentCreated)

//         setAddMode(false)


//     } catch (error: any) {
//         console.error(error)
//     }
// };

interface AddEditButtonsProps {
    userData: User
    editMode: boolean
    addMode: boolean
    setEditMode: Dispatch<SetStateAction<boolean>>
    setAddMode: Dispatch<SetStateAction<boolean>>
}

export function AddEditButtons({ userData, editMode, addMode, setEditMode, setAddMode }: AddEditButtonsProps) {
    return (
        <>
            {userData.role != 'INVESTOR' && userData.role != 'PROPRIETARIO' ?
                <Flex w='100%' justifyContent={'end'}>
                    {editMode || addMode ?
                        <Button onClick={() => handleEditCancel({ setEditMode, setAddMode })} color={'lightSide'} fontWeight={'light'} bgColor={'redSide'} maxW={40}>
                            Cancelar
                        </Button>
                        :
                        <Flex gap={4}>
                            <Button color='lightSide' bgColor="graySide" onClick={() => handleAddClick({ setAddMode })} maxW={[24, 24, 24, 40, 40]}>
                                Adicionar
                            </Button>
                            <Button color='lightSide' bgColor="darkSide" onClick={() => handleEditClick({ setEditMode })} maxW={[20, 20, 20, 40, 40]}>
                                Editar
                            </Button>
                        </Flex>
                    }
                </Flex>
                : ''
            }
        </>
    )
}



export { deleteUserInvestmentTrigger, handleAddClick, handleEditCancel, handleEditClick, getUsers, getUserInvestments, deleteUserInvestment, onSubmitInvestor }