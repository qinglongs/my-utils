export declare const numFixed: (num: string | number, decimalPlaces: number) => string;
export declare const numSlice: (num: string | number, decimalPlaces: number) => string;
export declare const splitThousand: (num: string | number) => string;
export declare const amountSliceToYuan: (amount: number | string, decimalPlaces?: number) => string;
export declare const amountSliceToFen: (amount: number | string, decimalPlaces?: number) => string;
export declare const amountFixedToYuan: (amount: number | string, decimalPlaces?: number) => string;
export declare const amountFixedToFen: (amount: number | string, decimalPlaces?: number) => string;
export declare const amountSplitToArray: (amount: string | number, decimalPlaces?: number, type?: "F" | "Y") => string[];
