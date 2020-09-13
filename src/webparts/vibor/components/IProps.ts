import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IProps {
  description: string;
  context: WebPartContext;
}

export interface Employee {
  Id?: number;
  Title: string;
  Alias: string;
  Position: string;
  Certificate?: boolean;
  Gender: string;
  OfficeId: string;
}

export interface IState {
  employees: Employee[];
}
