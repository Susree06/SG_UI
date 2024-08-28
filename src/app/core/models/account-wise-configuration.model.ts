export class AccountWiseconfiguration {
  ConfigurationId!: number;
  AccountId!: number;
  AccountName!:string;
  Type!: string;
  Location!: string;
  BlendedRate!: string;
  WorkingHours!: number;
  Year!: number;
  Jan!: number;
  Feb!: number;
  Mar!: number;
  Apr!: number;
  May!: number;
  Jun!: number;
  Jul!: number;
  Aug!: number;
  Sep!: number;
  Oct!: number;
  Nov!: number;
  Dec!: number;
  CreatedOn!: Date;
  CreatedBy!: string;
}

export class AccountDetails{
  accountId!: number;
  customerName!: string;
  customerGroup!: string;
  BDMUserId!: number
}

export class WorkingHours {
  accountId!: number;
  accountName!:string;
  accountManager!: string;
  location!: string;
  workingHours!: number;
  Action?: string;
}
export class BlendedRateDto {
  accountId!: number;
  accountName!:string;
  accountManager!: string;
  projectId!: number;
  projectName!: string;
  location!: string;
  projectType!: string;
  blendedRate!: number;
  probabilityInPercentage!: number;
  OffshoreBlendedRate!: number;
  OnsiteBlendedRate!: number;
}

export class WorkingDaysDto {
  accountId !: number;
  location !: string;
  jan !: number;
  feb !: number;
  mar !: number;
  apr !: number;
  may !: number;
  jun !: number;
  july !: number;
  aug !: number;
  sep !: number;
  oct !: number;
  nov !: number;
  dec !: number;
  accountManager !: string;
  type !: string;
  accountName! : string;
}
export class LeavesDto {
  accountId !: number;
  location !: string;
  jan !: number;
  feb !: number;
  mar !: number;
  apr !: number;
  may !: number;
  jun !: number;
  july !: number;
  aug !: number;
  sep !: number;
  oct !: number;
  nov !: number;
  dec !: number;
  accountManager !: string;
  type !: string;
  accountName! : string;
}
export class HolidaysDetailsDto {
  location!:string;
  holidayDate!: Date;
  holidayDay!: string;
  holidayName!:string;
}

export class HolidaysDto {
      accountId !: number;
      location !: string;
      jan !: number;
      feb !: number;
      mar !: number;
      apr !: number;
      may !: number;
      jun !: number;
      july !: number;
      aug !: number;
      sep !: number;
      oct !: number;
      nov !: number;
      dec !: number;
      accountManager !: string;
      type !: string;
      accountName! : string;
  }


  export class FileUploadStatusDto
  {
    FileName! : string;
    UploadedBy! : string;
    Status! : string;
    Remark! : string;
    Link! : string;
    CreatedOn! : any;
  }

  export class OtherConfigDto
  {
    accountId!: number;
    accountName!: string;
    igId!: number;
    ig!: string;
    geoLocation!: string;
    geoLocationId!: number;

  }

  export class ProjectDetails{
    projecttId!: number;
    projectName!: string;
    projectCode!: string;
  }

  export class IGDetails{
    iGId!: number;
    iGName!: string;
  }
