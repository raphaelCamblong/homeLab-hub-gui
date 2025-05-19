export interface AuditLog {
  action: string;
  CreatedAt: string;
  DeletedAt: DeletedAt;
  details: Details;
  ID: number;
  ip_address: string;
  resource: string;
  resource_id: string;
  updatedAt: string;
  user_agent: string;
  user_id: number;
}

export interface DeletedAt {
  time: string;
  valid: boolean;
}

export interface Details {
  additionalProp1: AdditionalProp1;
}

export interface AdditionalProp1 {}
