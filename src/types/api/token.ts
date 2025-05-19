export interface ApiKey {
  createdAt: string;
  deletedAt: DeletedAt;
  expires_at: string;
  id: number;
  last_used_at: string;
  name: string;
  permissions: string[];
  updatedAt: string;
  user_id: number;
}

export interface DeletedAt {
  time: string;
  valid: boolean;
}
