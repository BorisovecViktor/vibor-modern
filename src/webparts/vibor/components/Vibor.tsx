import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { IProps, IState, Employee } from './IProps';
import styles from './Vibor.module.scss';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import EmployeesList from './EmployeesList';
import AddEmployeesForm from './AddEmployeesForm';

export default class Vibor extends React.Component<IProps, IState> {
  public state = {
    employees: null
  };

  //загружаем список сотрудников
  public async componentDidMount() {
    sp.setup({
      spfxContext: this.props.context
    });

    const response = await sp.web.lists.getByTitle("Employees").items.get();
    this.setState({
      employees: response
    });
  }

  //при добавлении нового сотрудника изменяем стейт
  public updateEmployees = async (newEmployee: Employee) => {
    this.setState({
      employees: [...this.state.employees, newEmployee]
    });
  }

  public render() {
    return (
      <div className={styles.employees}>
        <EmployeesList employees={this.state.employees} />
        <AddEmployeesForm updateEmployees={this.updateEmployees} />
      </div>
    );
  }
}
