import {Composer} from 'telegraf';

declare module 'telegraf' {
    interface Scenefunc{
        func:(...fns: Middleware<TContext>[]) => this
    }
    export class WizardScene<
    Tcontext extends SceneContextMessageUpdate
    > extends Composer<Tcontext> {
      constructor(id:string, ...args:Middleware<Tcontext>[])
    }
}
