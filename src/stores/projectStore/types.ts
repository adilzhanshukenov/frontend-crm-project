import { Company } from "../companyStore/types";

export interface Project {

    name: string;

    description: string;

    start_date: Date;

    end_date: Date;

    status: string;

    company: Company;

}