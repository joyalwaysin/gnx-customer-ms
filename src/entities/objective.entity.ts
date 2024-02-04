import { UUIDV4 } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ timestamps: false })
export class Objective extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  ObjectiveId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Category: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  SortOrder: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  ObjectiveDescription: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  Applicable: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  Comments: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  Rating: number;

  @Column({ type: DataType.UUID })
  VersionId: string;

  @Column({ type: DataType.STRING(16), defaultValue: '' })
  ModifiedBy: string;

  @Column({ type: DataType.DATE })
  Modified: Date;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  CashCalcId: number;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;
}
