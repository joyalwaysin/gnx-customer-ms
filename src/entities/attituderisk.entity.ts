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
export class AttitudeToRisk extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  AttitudeToRiskId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;

  @Column({ type: DataType.NUMBER, defaultValue: 0 })
  SortOrder: number;

  @Column({ type: DataType.NUMBER, defaultValue: 0 })
  RatingScore: number;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Rating: string;

  @Column({ type: DataType.STRING(1000), defaultValue: '' })
  RatingDescription: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Category: string;

  @Column({ type: DataType.STRING(500), defaultValue: '' })
  CategoryDescription: string;
}
