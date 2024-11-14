export interface Stage {
  _id?: string;

  name: string;

  description: string;

  company?: string | null;
}

export interface StageFormData {
  name: string;

  description: string;

  company?: string | null;
}
