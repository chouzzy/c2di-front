import { Flex } from "@chakra-ui/react";
import { Fotos360Banheiro1 } from "./carousels/banheiro1/Fotos360Banheiro1";
import { Dispatch, SetStateAction } from "react";
import { Fotos360Lavanderia } from "./carousels/lavanderia/Fotos360Lavanderia";
import { Fotos360Quarto1 } from "./carousels/quarto1/Fotos360Quarto1";
import { Fotos360SalaDeEstar } from "./carousels/salaDeEstar/Fotos360SalaDeEstar";
import { Fotos360SalaDeJantar } from "./carousels/salaDeJantar/Fotos360SalaDeJantar";
import { Fotos360Sacada } from "./carousels/sacada/Fotos360Sacada";
import { Fotos360Quarto3 } from "./carousels/quarto3/Fotos360Quarto3";
import { Fotos360Quarto2 } from "./carousels/quarto2/Fotos360Quarto2";
import { Fotos360Hall } from "./carousels/hall/Fotos360Hall";
import { Fotos360Cozinha } from "./carousels/cozinha/Fotos360Cozinha";
import { Fotos360Banheiro3 } from "./carousels/banheiro3/Fotos360Banheiro3";
import { Fotos360Banheiro2 } from "./carousels/banheiro2/Fotos360Banheiro2";


interface FotosGeraisProps {
    userData: User
    projectData: Investment
    openImage: (img: Investment["apartamentTypes"][0]["fotos"][0]) => void
    setLoadingFiles: Dispatch<SetStateAction<boolean>>
    unidadeInView?: number
    setFotoType: Dispatch<SetStateAction<string>>
}


export function Media360Carousels({ userData, projectData, openImage, setLoadingFiles, unidadeInView, setFotoType }: FotosGeraisProps) {

    return (

        <Flex flexDir={'column'}>
            {unidadeInView || unidadeInView === 0 ?
                <>

                    {projectData.apartamentTypes[unidadeInView].media360.banheiro1.length != 0 ?

                        <Fotos360Banheiro1
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Banheiro1
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }

                    {projectData.apartamentTypes[unidadeInView].media360.banheiro2.length != 0 ?

                        <Fotos360Banheiro2
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Banheiro2
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.banheiro3.length != 0 ?

                        <Fotos360Banheiro3
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Banheiro3
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.cozinha.length != 0 ?

                        <Fotos360Cozinha
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Cozinha
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.hall.length != 0 ?

                        <Fotos360Hall
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Hall
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.lavanderia.length != 0 ?

                        <Fotos360Lavanderia
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Lavanderia
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.quarto1.length != 0 ?

                        <Fotos360Quarto1
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Quarto1
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.quarto2.length != 0 ?

                        <Fotos360Quarto2
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Quarto2
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.quarto3.length != 0 ?

                        <Fotos360Quarto3
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Quarto3
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.sacada.length != 0 ?

                        <Fotos360Sacada
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360Sacada
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.salaDeEstar.length != 0 ?

                        <Fotos360SalaDeEstar
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360SalaDeEstar
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }
                    {projectData.apartamentTypes[unidadeInView].media360.salaDeJantar.length != 0 ?

                        <Fotos360SalaDeJantar
                            userData={userData}
                            projectData={projectData}
                            openImage={openImage}
                            setLoadingFiles={setLoadingFiles}
                            unidadeInView={unidadeInView}
                            setFotoType={setFotoType}
                        />
                        :
                        projectData.projectManagerID === userData.id ?
                            <Fotos360SalaDeJantar
                                userData={userData}
                                projectData={projectData}
                                openImage={openImage}
                                setLoadingFiles={setLoadingFiles}
                                unidadeInView={unidadeInView}
                                setFotoType={setFotoType}
                            />
                            : ''
                    }


                </> : ''}
        </Flex>
    )
}