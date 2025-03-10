import { changeApartmentUserID } from "@/app/services/changeApartmentUserID"
import { createPrismaUserProprietario } from "@/app/services/createUserProprietario"
import { deletePrismaUserProprietario } from "@/app/services/deleteUserProprietario"
import { filterUserProprietariosByInvestmentID } from "@/app/services/getUserProprietarioListByID"
import { getUsersResumed } from "@/app/services/getUsersResumed"
import { documentsArrayAdapter } from "@/app/services/utils"
import { Button } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react/flex"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

interface deleteUserProprietarioTriggerProps {
    id: string
    setDeletingUserProprietario: Dispatch<SetStateAction<boolean>>
    setUserProprietarioID: Dispatch<SetStateAction<string>>
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



const deleteUserProprietarioTrigger = ({ id, setDeletingUserProprietario, setUserProprietarioID }: deleteUserProprietarioTriggerProps) => {
    setDeletingUserProprietario(true)
    setUserProprietarioID(id)
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

const getUserProprietarios = async (setUserProprietariosList: Dispatch<SetStateAction<UserProprietario[] | undefined>>, projectData: Investment) => {

    try {
        const userProprietariosList = await filterUserProprietariosByInvestmentID({ page: `${0}`, pageRange: `${10}`, investmentID: projectData.id })
        setUserProprietariosList(userProprietariosList)
    } catch (error) {
        console.error(error)
    }

}

const deleteUserProprietario = async (
    userProprietarioID: UserProprietario["id"],
    setUserProprietariosList: Dispatch<SetStateAction<UserProprietario[] | undefined>>,
    userProprietariosList: UserProprietario[] | undefined
) => {


    try {
        const userProprietarioDeleted = await deletePrismaUserProprietario(userProprietarioID)

        setUserProprietariosList(userProprietariosList?.filter((userProprietario: UserProprietario) => userProprietario.id !== userProprietarioDeleted.id))

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
    userProprietariosList: UserProprietario[] | undefined
    setAddMode: Dispatch<SetStateAction<boolean>>
    onOpen: () => void
}

const onSubmitProprietario = async ({ data, investor, projectData, setYupError, investorDate, userProprietariosList, setAddMode, onOpen }: onSubmitInvestorProps) => {

    try {

        if (!investor) { return alert('Selecione um investidor') }

        const apartamentIndex = projectData.apartaments.findIndex(apartament => apartament.andar === data.andar && apartament.final === data.final);

        if (apartamentIndex === -1) {
            console.error('Apartamento não encontrado, verifique novamente');
            setYupError("Apartamento não encontrado, verifique novamente");
            return;
        }

        if (projectData.apartaments[apartamentIndex].userId) {
            onOpen(); // Abre o modal de confirmação
            return; // Interrompe a execução da função onSubmitInvestor
        }

        // Atribui o apartamento ao usuário na tabela de investimentos
        projectData.apartaments[apartamentIndex].userId = investor.id;

        data = await documentsArrayAdapter(data)
        const createUserProprietarioData = {
            userID: investor.id,
            investmentID: projectData.id,
            apartamentID: projectData.apartaments[apartamentIndex].id,
            investedValue: data.investedValue,
            valorCorrente: projectData.valorCorrente,
            documents: data.documents,
            dataInvestimento: new Date(investorDate.toISOString())
        }

        // Cria UserProprietário
        const userProprietarioCreated = await createPrismaUserProprietario(createUserProprietarioData)

        // Atualiza o array de apartaments com a nova atualização
        await changeApartmentUserID(projectData.id, projectData)

        // Adiciona para visualização o novo proprietário
        userProprietariosList?.push(userProprietarioCreated)

        setAddMode(false)


    } catch (error: any) {
        console.error(error)
    }
};

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


export { deleteUserProprietarioTrigger, handleAddClick, handleEditCancel, handleEditClick, getUsers, getUserProprietarios, deleteUserProprietario, onSubmitProprietario }