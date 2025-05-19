export interface Power {
  "@odata.context": string;
  "@odata.id": string;
  "@odata.type": string;
  Average: number;
  Id: string;
  Maximum: number;
  Minimum: number;
  Name: string;
  PowerDetail: PowerDetail[];
  Samples: number;
}

export interface PowerDetail {
  AmbTemp: number;
  Average: number;
  Cap: number;
  CpuAvgFreq: number;
  CpuCapLim: number;
  CpuMax: number;
  CpuPwrSavLim: number;
  CpuUtil: number;
  Minimum: number;
  Peak: number;
  PrMode: PRMode;
  PunCap: boolean;
  Time: Date;
  UnachCap: boolean;
}

export enum PRMode {
  Dyn = "dyn",
}
