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
export class TimeAllocation extends Model {
 
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  TimeAllocationId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;

  @Column(DataType.DATE)
  AllocatedDate: Date;

  @Column(DataType.DATE)
  Duration: Date;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  NoteText: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Resource: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column({ type: DataType.DATE })
  Modified: Date;

  @Column({ type: DataType.UUID })
  VersionId: string;
}
