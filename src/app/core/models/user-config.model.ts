export class UserConfigurationDto {
  accountId!: number;
  customerName!: string;
  dm!: string;
  dmUserId:number;
  bdm!: string;
  bdmUserId:number;
  salesHead!: string;
  salesHeadUserId:number;
  council!: string[];
  councilUserId:number[];
}
export class UserDetailDto {
  accountId!: number;
  accounts!: string;
  userName!: string;
  userEmailId!: string;
  role!: string;
}
export class UsersDto {
  userId: number;
  userName: string;
  useremailId: string;
  isAdmin: boolean;
  competency:string;
  isCouncil:boolean;
  roles: string[];
}
