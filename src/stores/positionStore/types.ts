export interface Position {
  _id?: string;

  name: string;

  description: string;

  company?: string;
}

export interface PositionFormData {
  name: string;

  description: string;

  company?: string;
}
