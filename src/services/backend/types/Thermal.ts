export interface Thermal {
  "@odata.context": string;
  "@odata.id": string;
  "@odata.type": string;
  Fans: Fan[];
  Id: string;
  Name: string;
  Temperatures: Temperature[];
}

export interface Fan {
  CurrentReading: number;
  FanName: string;
  Oem: {
    Hp: {
      "@odata.type": string;
      Location: string;
      Type: string;
    };
  };
  Status: {
    Health: string;
    State: string;
  };
  Units: string;
}

export interface Temperature {
  CurrentReading: number;
  Name: string;
  Number: number;
  Oem: {
    Hp: {
      "@odata.type": string;
      LocationXmm: number;
      LocationYmm: number;
      Type: string;
    };
  };
  PhysicalContext: string;
  ReadingCelsius: number;
  Status: {
    Health?: string; // Optional property
    State: string;
  };
  Units: string;
  UpperThresholdCritical: number;
  UpperThresholdFatal: number;
}