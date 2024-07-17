export interface ErrorDetail {
    field: string;
    message: string;
    code?: string | number;
}


export interface APIResponse {

    message: string;
    code:    number;
    data?:   any;
    errors?:  Array<ErrorDetail>;
    token?:  string;

}