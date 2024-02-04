import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Customer } from './customer.entity';

@Table({timestamps:false})
export class Appointment extends Model{

    @Column({
        type: DataType.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    })
    AppointmentId: string;

    @ForeignKey(() => Customer)
    @Column(DataType.UUID)
        CustomerId: string;
        
    @BelongsTo(()=>Customer,{foreignKey:"CustomerId"})
        customer:Customer

    @Column(DataType.DATE)
    AppointmentDate: Date;

    @Column(DataType.DATE)
    AppointmentTime: Date;

    @Column({type:DataType.STRING(35),defaultValue:""})
    AppointmentType: string;

    @Column({type:DataType.STRING(5000),defaultValue:""})
    Reason: string;

    @Column({type:DataType.STRING(35),defaultValue:""})
    AppointmentAssigned: string;

    @Column({type:DataType.STRING(35),defaultValue:""})
    AppointmentStatus: string;

    @Column({ type: DataType.UUID })
    VersionId: string;

    @Column(DataType.DATE)
    Modified: Date;

    @Column({type:DataType.STRING(20),defaultValue:""})
    ModifiedBy: string;

}
