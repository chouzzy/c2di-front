import { v4 as uuidv4 } from 'uuid';


async function createInvestorUtils(data: any, projectManagerID: Investment["projectManagerID"]) {

    try {

        data = await imagesArrayAdapter(data)
        data = await documentsArrayAdapter(data)
        data = await projectTypeAdapter(data)
        data = await floorPlanTypesAdapter(data)
        data.projectManagerID = projectManagerID

        return data

    } catch (error) {
        throw error
    }

}


async function imagesArrayAdapter(data: any) {

    try {

        const photos: Investment["photos"] = []
        data = { ...data, photos }

        for (const label in data.image) {

            if (data.image.hasOwnProperty(label)) {

                const files = data.image[label];

                let newPhotos: Photos[] = []
                for (let index = 0; index < files.length; index++) {
                    const foto = files[index];
                    
                    newPhotos.push({
                        id: uuidv4(),
                        url: foto.name,
                        title: foto.name.replace(/\.[^/.]+$/, ""),
                        description: 'foto.name'
                    })
                    
                }

                photos.push({
                    category: label as PhotosLabel,
                    images: newPhotos
                })
            }
        }
        return data

    } catch (error) {
        throw error
    }

}

async function documentsArrayAdapter(data: any) {
    try {

        const documents: Investment["documents"] | UserInvestment["documents"] = []
        data = { ...data, documents }

        for (let index = 0; index < data.document.length; index++) {

            console.log('data.document[index]')
            console.log(data.document[index])

            data.documents.push({
                id: 'newDoc',
                title: data.document[index].name,
                url: `https://${data.document[index].name}`,
                description: data.document[index].name
            })
        }

        return data

    } catch (error) {
        throw error
    }

}

async function projectTypeAdapter(data: any) {

    try {
        switch (data.projectType) {
            case 'Residencial Multifamiliar':
                data.projectType = "RESIDENCIAL_MULTIFAMILIAR"
                break
            case 'Residencial vertical':
                data.projectType = "RESIDENCIAL_VERTICAL"
                break
            case 'Comercial geral':
                data.projectType = "COMERCIAL_GERAL"
                break
            case 'Misto':
                data.projectType = "MISTO"
                break
        }

        return data

    } catch (error) {
        throw error
    }

}
async function projectTypeReverseAdapter(data: any) {

    try {
        switch (data.projectType) {
            case 'RESIDENCIAL_MULTIFAMILIAR':
                data.projectType = "Residencial Multifamiliar"
                break
            case 'RESIDENCIAL_VERTICAL':
                data.projectType = "Residencial vertical"
                break
            case 'COMERCIAL_GERAL':
                data.projectType = "Comercial geral"
                break
            case 'MISTO':
                data.projectType = "Misto"
                break
        }

        return data

    } catch (error) {
        throw error
    }

}

async function floorPlanTypesAdapter(data: any) {

    try {
        data.floorPlanTypes = data.floorPlanTypes.split(";")

        return data

    } catch (error) {
        throw error
    }
}

async function numbersAdapter(data: any) {

    try {
        data.totalUnits = Number(data.totalUnits)
        data.numberOfFloors = Number(data.numberOfFloors)
        data.unitsPerFloor = Number(data.unitsPerFloor)

        console.log(data.unitsPerFloor)

        return data

    } catch (error) {
        throw error
    }
}

const formatadorMoedaReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
});

const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(valor);
};

const formatarPercentual = (valor: number) => {
    return `${valor * 100}%`
};

const formataData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' });
};

const formataDataMonthShort = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
};


const hasUnreadNotifications = (notifications: UserNotifications[] | Notification[]) => {
    // Itera sobre o array de notificações
    for (let i = 0; i < notifications.length; i++) {
        // Verifica se a propriedade isRead é false
        if (notifications[i].isRead === false) {
            return true; // Se encontrar, retorna true
        }
    }
    return false; // Se não encontrar, retorna false
}

export { createInvestorUtils, imagesArrayAdapter, documentsArrayAdapter, projectTypeAdapter, floorPlanTypesAdapter, projectTypeReverseAdapter, numbersAdapter, formatadorMoedaReal, formatarMoeda, formataData, formataDataMonthShort, formatarPercentual, hasUnreadNotifications }