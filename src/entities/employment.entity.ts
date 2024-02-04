import { UUID } from 'crypto';
import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ timestamps: false })
export class Employment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  EmploymentId: UUID;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PrincipalEmployment: string;

  @Column({ type: DataType.STRING(40), defaultValue: '' })
  Occupation: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  EmploymentType: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  EmployerName: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address1: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address2: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address3: string;

  @Column({ type: DataType.STRING(30), defaultValue: '' })
  Town: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  County: string;

  @Column({ type: DataType.STRING(30), defaultValue: '' })
  Country: string;

  @Column({ type: DataType.STRING(8), defaultValue: '' })
  Postcode: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Phone: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Fax: string;

  @Column(DataType.DATE)
  StartDate: Date;

  @Column(DataType.DATE)
  EndDate: Date;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column(DataType.DATE)
  Modified: Date;

  @Column(DataType.DATE)
  SalaryReviewDate: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PayrollId: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Position: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  ControllingDirector: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Shareholding: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  NoteText: string;

  @Column({ type: DataType.UUID })
  VersionId: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  EmploymentBasis: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  RetirementAge: number;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  DeathInServiceYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  DeathInService: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  SickPayYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  SickPay: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  PMIYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PMI: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  PHIYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PHI: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  CriticalIllnessYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  CriticalIllness: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  CompanyCarYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  CompanyCar: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  ShareOptionsYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  ShareOptions: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  OtherYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Other: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  PensionYN: number;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Pension: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  AutoEnrolment: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  CashCalcId: number;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;
}
