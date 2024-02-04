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
export class Commission extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  CommissionId: UUID;

  @Column({ type: DataType.UUID })
  PaymentId: string;

  @Column({ type: DataType.UUID })
  CaseId: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Frequency: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Provider: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  CommissionType: string;

  @Column(DataType.DATE)
  StatusDate: Date;
  @Column(DataType.DATE)
  StartDate: Date;
  @Column(DataType.DATE)
  EndDate: Date;
  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  Status: number;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  NoteText: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  NBRegister: number;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column(DataType.DATE)
  Modified: Date;

  @Column({ type: DataType.UUID })
  VersionId: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PaymentSource: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Consultant: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  IntroducedBy: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  CaseCategory: number;

  @Column({ type: DataType.DECIMAL(18, 4), defaultValue: 0 })
  AmountToCompany: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  PaymentCount: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;
}
