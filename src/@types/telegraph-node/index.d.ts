declare module 'telegraph-node' {
  export interface AccountInfo {
    shortName: string,
    authorName: string
    }
export class Telegraph {
  createAccount(username:string, userInfo?:AccountInfo):Promise<unknown>
}
}
