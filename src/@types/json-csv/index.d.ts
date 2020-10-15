declare module 'json-csv' {
    export interface CsvFieldOptions{
        name:string,
        label:string,
        filter?:unknown
    }
    export type ArrayCsvFieldOptions = Array<CsvFieldOptions>
    export interface CsvOptions {
        fields: ArrayCsvFieldOptions,
        fieldSeparator?:string,
        ignoreHeader?:boolean,
        buffered?:boolean,
        encoding?:string
    }
    export interface CsvCallback {
        (error:Error, result:string) :void
    }
    function buffered(
        data:JSON, options?: CsvOptions, callback:CsvCallback
        ):void;
}
