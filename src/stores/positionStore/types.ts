export interface Position {
  _id?: string;

  name: string;

  description: string;

  company?: string | null;
}

export interface PositionFormData {
  name: string;

  description: string;

  company?: string | null;
}
