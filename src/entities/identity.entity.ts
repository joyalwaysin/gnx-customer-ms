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
export class Identity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  IdentityId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

  @BelongsTo(() => Customer, { foreignKey: 'CustomerId' })
  customer: Customer;

  @Column({ type: DataType.STRING(25), defaultValue: '' })
  Category: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Item: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Reference: string;

  @Column({ type: DataType.DATE })
  Issued: Date;

  @Column({ type: DataType.DATE })
  Expires: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  IssuedAt: string;

  @Column({ type: DataType.DATE })
  Seen: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PlaceOfBirth: string;

  @Column({ type: DataType.DATE })
  DateOfBirth: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  CertifiedCopy: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Type: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  AddressCurrent: string;

  @Column({ type: DataType.UUID })
  VersionId: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column({ type: DataType.DATE })
  Modified: Date;
}
