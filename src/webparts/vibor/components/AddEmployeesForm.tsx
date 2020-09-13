import * as React from 'react';
import styles from './Vibor.module.scss';

import { Employee } from './IProps';

import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  Stack,
  IStackProps,
  IStackStyles
} from 'office-ui-fabric-react/lib/Stack';
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption
} from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const genderOptions: IDropdownOption[] = [
  { key: 'Gender', text: 'Male' },
  { key: 'Gender', text: 'Female' },
];

const officeOptions: IDropdownOption[] = [
  { key: 'OfficeId', text: '1' },
  { key: 'OfficeId', text: '2' },
  { key: 'OfficeId', text: '3' },
];

interface Props {
  updateEmployees: (newEmployee: Employee) => void;
}

export default class AddEmployeesForm extends React.Component<Props> {
  public state = {
    newEmployee: {
      Title: '',
      Alias: '',
      Position: '',
      Gender: '',
      OfficeId: '',
    },
    titleError: '',
    aliasError: '',
    positionError: '',
    genderError: '',
    officeError: '',
  };

  public resetFormFields = () => {
    this.setState({
      newEmployee: {
        Title: '',
        Alias: '',
        Position: '',
        Gender: '',
        OfficeId: '',
      }
    });
  }

  //записываем в стейт значение с текстовых инпутов и обнуляем ошибки когда начинается ввод текста
  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name) {
      this.setState({
        titleError: '',
        aliasError: '',
        positionError: '',
        newEmployee: {
          ...this.state.newEmployee,
          [name]: value,
        }
      });
    }
  }

  //записываем в стейт значение с дропдаунов и обнуляем ошибки когда начинается ввод текста
  public handleDropdownChange = (event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption): void => {
    if (item) {
      this.setState({
        genderError: '',
        officeError: '',
        newEmployee: {
          ...this.state.newEmployee,
          [item.key]: item.text,
        }
      });
    }
  }

  //проверяем поля на наличие ошибок и отсылаем нового сотрудника на сервер, обнуляем поля ввода, передаем нового сотрудника для записи в стейт
  public handleAddEmployee = (e: React.FormEvent<HTMLFormElement>): void => {
    const {
      Title,
      Alias,
      Position,
      Gender,
      OfficeId
    } = this.state.newEmployee;

    e.preventDefault();

    if (Title.length < 3) {
      return this.setState({
        titleError: 'Name should be more than 3 characters'
      });
    }

    if (Alias.length < 5) {
      return this.setState({
        aliasError: 'Alias should be more than 5 characters'
      });
    }

    if (Position.length < 4) {
      return this.setState({
        positionError: 'Position should be more than 4 characters'
      });
    }

    if (!Gender) {
      return this.setState({
        genderError: 'Select dropdown'
      });
    }

    if (!OfficeId) {
      return this.setState({
        officeError: 'Select dropdown'
      });
    }

    sp.web.lists.getByTitle("Employees").items.add(
      this.state.newEmployee
    );

    this.resetFormFields();
    this.props.updateEmployees(this.state.newEmployee);
  }

  public render() {
    const {
      Title,
      Alias,
      Position
    } = this.state.newEmployee;

    return (
      <form
        action="#"
        onSubmit={this.handleAddEmployee}
        className={styles.employees__form}
      >
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
              label="Title"
              name="Title"
              value={Title}
              onChange={this.handleInputChange}
              errorMessage={this.state.titleError}
            />
            <TextField
              label="Alias"
              name="Alias"
              value={Alias}
              onChange={this.handleInputChange}
              errorMessage={this.state.aliasError}
            />
            <TextField
              label="Position"
              name="Position"
              value={Position}
              onChange={this.handleInputChange}
              errorMessage={this.state.positionError}
            />
            <Dropdown
              placeholder="Select an option"
              label="Gender"
              options={genderOptions}
              styles={dropdownStyles}
              onChange={this.handleDropdownChange}
              errorMessage={this.state.genderError}
            />
            <Dropdown
              placeholder="Select an option"
              label="Office"
              options={officeOptions}
              styles={dropdownStyles}
              onChange={this.handleDropdownChange}
              errorMessage={this.state.officeError}
            />
            <DefaultButton type="submit" text="Add employee" allowDisabledFocus />
          </Stack>
        </Stack>
      </form>
    );
  }
}
