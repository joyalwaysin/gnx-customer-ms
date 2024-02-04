import { UUIDV4 } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({ timestamps: false })
export class Note extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  NoteId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;

  @Column(DataType.DATE)
  NoteDate: Date;

  @Column(DataType.DATE)
  NoteTime: Date;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  NoteText: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  NoteType: string;

  @Column({ type: DataType.STRING(250), defaultValue: '' })
  FileLink: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  Category: number;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column({ type: DataType.DATE })
  Modified: Date;

  @Column({ type: DataType.UUID })
  VersionId: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  CashCalcId: number;
}
