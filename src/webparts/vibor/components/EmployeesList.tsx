import * as React from 'react';
import { Employee } from './IProps';
import styles from './Vibor.module.scss';

interface Props {
  employees: Employee[];
}

export default class Vibor extends React.Component<Props> {
  public render() {
    const { employees } = this.props;

    //создаем массив заголовков
    const headers = [
      'Title',
      'Alias',
      'Position',
      'Gender',
      'Sertificate',
      'OfficeId'
    ];

    return (
      <>
        {employees
          &&
          <div className={styles.employees__list}>
            <div className={styles.employees__header}>
              {headers.map(header => (
                <div>
                  <span>{header}</span>
                </div>
              ))}
            </div>
            {employees.map((employee: Employee) => (
              <div key={employee.Id} className={styles.employees__item}>
                <div className={styles.employees__field}>
                  <span>{employee.Title}</span>
                </div>
                <div className={styles.employees__field}>
                  <span>{employee.Alias}</span>
                </div>
                <div className={styles.employees__field}>
                  <span>{employee.Position}</span>
                </div>
                <div className={styles.employees__field}>
                  <span>{employee.Gender}</span>
                </div>
                <div className={styles.employees__field}>
                  {employee.Certificate ? <span>yes</span> : <span>no</span>}
                </div>
                <div className={styles.employees__field}>
                  <span>{employee.OfficeId}</span>
                </div>
              </div>
            ))}
          </div>
        }
      </>
    );
  }
}
