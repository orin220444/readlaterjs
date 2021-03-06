declare module '@postlight/mercury-parser' {
    export interface ParsedPage {
        title: string,
        content: string,
        author: string,
        datePublished: string,
        leadImageUrl ? : string,
        dek?: string
        nextPageUrl ? : string,
        url: string,
        domain: string,
        excerpt: string,
        wordCount: number,
        direction: string,
        totalPages: number,
        renderedPages: number
    }
    export interface Options {
        contentType?: string
    }
    function parse(url:string, options?:Options): Promise<ParsedPage>
}
