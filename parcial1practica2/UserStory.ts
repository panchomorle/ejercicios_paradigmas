import { ScrumObject, State } from "./ScrumObject";

export class UserStory extends ScrumObject{
    /**
     *
     */
    constructor( name: string,
        number: number,
        protected hoursWorked: number,
        protected desc: string,
        protected responsible: string)
    {
        super(name, number);
    }

    getTotalHours(): number {
        return this.hoursWorked;
    }

    //The user can alter the state of the u.s only
    setState(state: State){
        this.state = state;
        if (this.parent) this.parent.notify();
    }

}