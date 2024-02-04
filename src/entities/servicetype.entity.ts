import {  UUIDV4 } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({timestamps:false})
export class ServiceType extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
    allowNull: false,
    
  })
  ServiceTypeId: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  CustomerId: string;

@BelongsTo(()=>Customer,{foreignKey:"CustomerId"})
customer:Customer

@Column({type: DataType.STRING(35),defaultValue:'' })
Description:string;

@Column(DataType.DATE)
StartDate: Date;

@Column(DataType.DATE)
EndDate: Date;

@Column({type: DataType.STRING(20),defaultValue:'' })
ModifiedBy:string;

@Column({type: DataType.DATE })
Modified:Date;

@Column({type:DataType.UUID} )
VersionId: string;

}