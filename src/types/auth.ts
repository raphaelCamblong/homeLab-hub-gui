export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  created_at: string;
  id: number;
  is_active: boolean;
  roles: Role[];
  username: string;
}

export interface Role extends DBModel {
  description: string;
  name: string;
  permissions: Permission[];
}

export interface DBModel {
  ID: number;
  CreatedAt: string;
  DeletedAt: DeletedAt;
  UpdatedAt: string;
}

export interface Permission extends DBModel {
  action: string;
  description: string;
  name: string;
  resource: string;
}

export interface DeletedAt {
  time: string;
  valid: boolean;
}
