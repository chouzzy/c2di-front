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
  apartament?: Apartaments
  valorCorrente: number
  documents: ProjectDocuments[];
  dataInvestimento: Date
  createdAt: Date;
  updatedAt: Date;
}
interface UserProprietario {
  id: string;
  user: User;
  userID: string;
  investment: Investment;
  investmentID: string;
  apartamentID: string;
  investedValue: number
  valorCorrente: number
  documents: ProjectDocuments[];
  dataInvestimento: Date
  createdAt: Date;
  updatedAt: Date;
}

interface Notification {
  id: string;
  investmentId: string;
  readonly title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  investment: Investment;
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
  userProprietarios: UserProprietario[];
  investorProfile: InvestorProfile;
  userNotifications: UserNotifications[];
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
}

interface UserNotifications {
  notificationID: string
  isRead: boolean
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
  ADMINISTRATOR = 'ADMINISTRATOR',
  PROPRIETARIO = 'PROPRIETARIO',
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
  userProprietarios: UserProprietario[];
  projectManagerID: string
  buildingProgress: BuildingProgress
  valorOriginal: number
  valorCorrente: number
  historicoDeValorizacao: HistoricoDeValorizacao[]
  financialTotalProgress: FinancialTotalProgress[]
  buildingTotalProgress: BuildingTotalProgress[]

  apartamentTypes: ApartamentTypes[]
  apartaments: Apartaments[]
  valorMetroQuadrado?: ValorMetroQuadrado[]

  active?: boolean
  createdAt: Date;
  updatedAt: Date;
}

interface ApartamentMedia360 {
  salaDeEstar: string[]
  salaDeJantar: string[]
  cozinha: string[]
  quarto1: string[]
  quarto2: string[]
  quarto3: string[]
  banheiro1: string[]
  banheiro2: string[]
  banheiro3: string[]
  sacada: string[]
  lavanderia: string[]
  hall: string[]
}

interface ApartamentTypes {
  id: string
  metragem: string
  description: string
  fotos: string[]
  plantas: string[]
  media360: ApartamentMedia360
}
interface ValorMetroQuadrado {
  id: string
  valor: number
  data: Date
}

interface Apartaments {
  id: string
  andar: string
  final: string
  metragem: string
  userId?: string
  tipoId: string // Adiciona o campo tipoId para referenciar o ApartamentTypes
}

interface FinancialTotalProgress {
  data: Date
  previsto: number
  realizado: number
}

interface BuildingTotalProgress {
  data: Date
  previsto: number
  realizado: number
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
