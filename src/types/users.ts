interface Document {
    title: string;
    url: string;
  }
  
  interface Image {
    url: string;
    description?: string;
  }
  
  interface UserInvestment {
    id: string;
    user: User;
    userId: string;
    investment: Investment;
    investmentId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Notification {
    id: string;
    userId: string;
    investmentId: string;
    readonly title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    investment: Investment;
    user: User;
  }

  interface RefreshToken {
    id: string;
    expiresAt: number;
    users: User;
    usersId: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    profession: string;
    birth: Date;
    cpf: string;
    username: string;
    address: Address;
    investorProfileName?: string;
    investorProfileDescription?: string;
    role: Role;
    userInvestments: UserInvestment[];
    investorProfile: InvestorProfile;
    notifications: Notification[];
    createdAt: Date;
    updatedAt: Date;
    refreshToken?: string;
}

interface Address {
    street: string;
    number: number;
    complement?: string;
    zipCode: string;
    city: string;
    state: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

enum Role {
    INVESTOR = 'INVESTOR',
    PROJECT_MANAGER = 'PROJECT_MANAGER',
    ADMINISTRATOR = 'ADMINISTRATOR'
}

interface Investment {
    id: string;
    title: string;
    description: string;
    projectType: ProjectType;
    totalUnits: number;
    numberOfFloors: number;
    unitsPerFloor: number;
    floorPlanTypes: string[];
    launchDate: Date;
    constructionStartDate: Date;
    expectedDeliveryDate: Date;
    address: Address;
    documents: Document[];
    images: Image[];
    investmentValue: number;
    companyName: string;
    partners: string[];
    finishDate?: Date;
    buildingStatus: string;
    investmentDate: Date;
    predictedCost: PredictedCost;
    realizedCost: RealizedCost;
    notifications: Notification[];
    userInvestments: UserInvestment[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  enum ProjectType {
    RESIDENCIAL_MULTIFAMILIAR = 'RESIDENCIAL_MULTIFAMILIAR',
    RESIDENCIAL_VERTICAL = 'RESIDENCIAL_VERTICAL',
    COMERCIAL_GERAL = 'COMERCIAL_GERAL',
    MISTO = 'MISTO',
  }
  
  interface RealizedCost {
    foundation: string;
    structure: string;
    implantation: string;
    workmanship: string;
  }
  
  interface PredictedCost {
    foundation: string;
    structure: string;
    implantation: string;
    workmanship: string;
  }

  interface InvestorProfile {
    id: string;
    userId: string;
    riskTolerance: RiskTolerance;
    investmentGoals: string[];
    investmentHorizon: string;
    monthlyIncome: number;
    netWorth?: number;
    investmentExperience: InvestmentExperience;
    preferredInvestmentTypes: string[];
    otherInvestments?: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
  }
  
  enum RiskTolerance {
    CONSERVADOR = 'CONSERVADOR',
    MODERADO = 'MODERADO',
    ARROJADO = 'ARROJADO',
  }
  
  enum InvestmentExperience {
    INICIANTE = 'INICIANTE',
    INTERMEDIARIO = 'INTERMEDIARIO',
    AVANCADO = 'AVANCADO',
  }