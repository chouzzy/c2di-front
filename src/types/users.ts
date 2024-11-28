interface HistoricoDeValorizacao {
  value: number
  date: number
}

interface ProjectDocuments {
  id: string;
  title: string;
  description: string
  url: string;
}

interface Image {
  id: string;
  label: string;
  url: string;
  description?: string;
}

interface UserInvestment {
  id: string;
  user: User;
  userID: string;
  investment: Investment;
  investmentID: string;
  investedValue: number
  valorCorrente: number
  documents: ProjectDocuments[];
  dataInvestimento: Date
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
  documents: ProjectDocuments[];
  images: Image[];
  investmentValue: number;
  companyName: string;
  partners: Partners[];
  finishDate?: Date;
  buildingStatus: string;
  investmentDate: Date;
  predictedCost: PredictedCost;
  realizedCost: RealizedCost;
  notifications: Notification[];
  userInvestments: UserInvestment[];
  projectManagerID: string
  buildingProgress: BuildingProgress
  valorOriginal: number
  valorCorrente: number
  historicoDeValorizacao: HistoricoDeValorizacao[]
  active?: boolean
  createdAt: Date;
  updatedAt: Date;
}

interface BuildingProgress {
  acabamento: number
  alvenaria: number
  estrutura: number
  fundacao: number
  instalacoes: number
  pintura: number
}

interface Partners {
  id: string
  url: string
  name: string
  activity: string
}

enum ProjectType {
  RESIDENCIAL_MULTIFAMILIAR = 'RESIDENCIAL_MULTIFAMILIAR',
  RESIDENCIAL_VERTICAL = 'RESIDENCIAL_VERTICAL',
  COMERCIAL_GERAL = 'COMERCIAL_GERAL',
  MISTO = 'MISTO',
}

interface RealizedCost {
  foundation: number;
  structure: number;
  implantation: number;
  workmanship: number;
}

interface PredictedCost {
  foundation: number;
  structure: number;
  implantation: number;
  workmanship: number;
}

interface InvestorProfile {
  userId: string;
  name: string;
  age: number;
  profession: string;
  monthlyIncome: number;
  investmentGoals: string;
  riskTolerance: string;
  investedBefore: boolean;
  investedBeforeType: string;
  investedBeforeTypeOther?: string; // Opcional
  investmentKnowledge: string;
  investmentHorizon: string;
  hasOtherInvestments: boolean;
  otherInvestments?: string; // Opcional
  preferredInvestmentTypes: string;
  preferredRentType: string;
  finalConsiderations?: string; // Opcional
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
