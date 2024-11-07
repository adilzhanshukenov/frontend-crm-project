export interface Stage {
  _id?: string;

  name: string;

  description: string;

  company?: string;
}

export interface StageFormData {
  name: string;

  description: string;

  company?: string;
}
