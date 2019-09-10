export interface ICategory {
	macroId: number;
	macroName: string;
}

export interface ICountry {
	idCB: number;
	Code: string;
	FullName: string;
}

export interface IData {
	lagerId: number;
	lagerName: string;
	lagerUnit: string;
	lagerPrice: number;
	lagerNameUA: string;
	lagerMacroID: number;
	lagerCountryId: number;
}
