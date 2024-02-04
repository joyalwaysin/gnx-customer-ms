import { UUIDV4 } from 'sequelize';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Employment } from './employment.entity';
import { Identity } from './identity.entity';
import { Objective } from './objective.entity';
import { ServiceType } from './servicetype.entity';
import { Note } from './note.entity';

@Table({ timestamps: false })
export class Customer extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  CustomerId: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Title: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Town: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Country: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  County: string;

  @Column({ type: DataType.STRING(30), defaultValue: '' })
  FirstNames: string;

  @Column({ type: DataType.STRING(5), defaultValue: '' })
  Initials: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  LastName: string;

  @Column({ type: DataType.STRING(30), defaultValue: '' })
  FormerLastName: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Honours: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  KnownAs: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address1: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address2: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Address3: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  AddressName: string;

  @Column({ type: DataType.STRING(25), defaultValue: '' })
  Salutation: string;

  @Column({ type: DataType.STRING(100), defaultValue: '' })
  JointSalutation: string;

  @Column({ type: DataType.STRING(100), defaultValue: '' })
  JointAddressLabel: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  HomePhone: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  WorkPhone: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Fax: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  WorkFax: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Mobile: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  WorkEmail: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Email: string;

  @Column({ type: DataType.STRING(35), defaultValue: 'Not stated' })
  EmailMarketing: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Nationality: string;

  @Column({ type: DataType.STRING(35), defaultValue: 'Not stated' })
  PostalMarketing: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PlaceOfBirth: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  UKResidence: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  CountryOfResidence: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  CountryOfDomicile: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Sex: string;

  @Column(DataType.DATE)
  DateOfBirth: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PreferredRetirementAge: string;

  @Column(DataType.DATE)
  StateRetirementDate: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PensionLifeAllowance: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  MaritalStatus: string;

  @Column(DataType.DATE)
  DateOfMarriage: Date;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  ESGAttitude: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  ESGAttitudeNote: string;

  @Column(DataType.DATE)
  WillDate: Date;

  @Column(DataType.STRING(5000))
  WillNote: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  PowerOfAttorney: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Deceased: string;

  @Column(DataType.DATE)
  DeathDate: Date;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  EducationProfessionExperience: string;

  @Column({ type: DataType.STRING(9), defaultValue: '' })
  NINumber: string;

  @Column({ type: DataType.STRING(13), defaultValue: '' })
  UniqueTaxRef: string;

  @Column({ type: DataType.STRING(40), defaultValue: '' })
  TaxRef: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  TaxOffice: string;

  @Column({ type: DataType.STRING(10), defaultValue: '' })
  TaxRate: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  MarriageAllowance: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Height: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  Weight: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  StateOfHealth: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  HealthNote: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  LongTermCareNeeded: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  Smoker: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  SmokerNote: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  AlcoholNote: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  HazardousPursuitNote: string;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ClientType: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  FSAClientType: string;

  @Column({ type: DataType.STRING(25), defaultValue: '' })
  ClientReference: string;

  @Column(DataType.DATE)
  ClientSince: Date;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Consultant: string;

  @Column({ type: DataType.STRING(50), defaultValue: '' })
  Administrator: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  IntroducedBy: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 12 })
  ReviewInterval: number;

  @Column(DataType.DATE)
  ReviewDate: Date;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  ReviewNote: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  ReviewAssigned: string;

  @Column(DataType.DATE)
  ReviewCompleted: Date;

  @Column({ type: DataType.STRING(9), defaultValue: '' })
  Postcode: string;

  @Column({ type: DataType.STRING(35), defaultValue: 'Not stated' })
  Vulnerability: string;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  VulnerabilityNote: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PreferredContactTime: string;

  @Column(DataType.DATE)
  BusinessCard: Date;

  @Column(DataType.DATE)
  ClientAgreement: Date;

  @Column(DataType.DATE)
  TermsOfBusinessSent: Date;

  @Column(DataType.DATE)
  Idd: Date;

  @Column(DataType.DATE)
  FactfindCompleted: Date;

  @Column(DataType.DATE)
  Menu: Date;

  @Column(DataType.DATE)
  DataProtectionFormSent: Date;

  @Column(DataType.DATE)
  RiskProfile: Date;

  @Column(DataType.DATE)
  AddressStartDate: Date;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  RiskProfileNote: string;

  @Column({ type: DataType.STRING(35), defaultValue: '' })
  PreferredCommunicationType: string;

  @Column(DataType.DATE)
  VerificationOfIdentity: Date;

  @Column(DataType.DATE)
  SanctionsCheck: Date;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  HeadlineNotePopOut: number;

  @Column(DataType.DATE)
  Modified: Date;

  @Column({ type: DataType.STRING(20), defaultValue: '' })
  ModifiedBy: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  Pending: number;

  @Column({ type: DataType.STRING(5000), defaultValue: '' })
  NoteText: string;

  @Column({ type: DataType.SMALLINT, defaultValue: 0 })
  AssociationType: number;

  @Column({
    type: DataType.UUID,
  })
  AssociatedWith: string;

  @Column({ type: DataType.STRING(30), defaultValue: '' })
  PrimaryContact: string;

  @HasMany(() => Employment) // 'CustomerId' is the foreign key in the Payment model
  employment: Employment[];

  @HasMany(() => Identity) // 'CustomerId' is the foreign key in the Payment model
  identity: Identity[];

  @HasMany(() => Objective)
  objective: Objective[];

  @HasMany(() => ServiceType)
  servicetype: ServiceType[];

  @HasMany(() => Note)
  note: Note[];
}
