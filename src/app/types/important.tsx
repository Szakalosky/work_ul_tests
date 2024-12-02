export interface ImportantType {
  weight: boolean;
  carType: string[];
  rampType: string[];
  time: string;
}

export interface VehicleType {
  id: number;
  vehicleName: string;
  gearbox: string;
  feature: string;
  engine: number;
}

export interface ImageVehicleType {
  id: number;
  file: string;
}

export interface ToDoListType {
  id: number;
  name: string;
  status: string | undefined;
  date: string;
}

export interface dataFromAPIType {
  createdAt: Date;
  department: string | null;
  domainSync: boolean;
  emails: string[] | undefined;
  erpLogin: string;
  firstName: string;
  groups: string[];
  id: number;
  lastName: string;
  password: string;
  phoneNumbers: string[] | undefined;
  position: string | null;
  subiektId: number;
  syncId: Date;
  updatedAt: Date;
}

export interface ItTeamType {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  weekNo: string;
  timeWork: string;
}

export interface ColumnHeaderType {
  id: number;
  label: string;
}

export interface AlphabeticallyFilterType {
  id: number;
  filter: string;
}

export interface ElementsFilterType {
  id: number;
  elements: string;
}

export interface ButtonsKeyType {
  key: number;
}
