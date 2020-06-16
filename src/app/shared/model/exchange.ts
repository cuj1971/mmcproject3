import { IExchangeJSON, IExchange } from './exchangeratesapi';
export class Exchange {
    public rawResponse: IExchangeJSON;
    
    constructor(data: IExchangeJSON) {
        this.rawResponse = data;
    }

    public getBase(): string {
        console.log('in getBase:');
        console.log('base', this.rawResponse.base);
        return this.rawResponse.base;
    }

    public getStart(): string {
        console.log('in getStart:');
        console.log('start_at', this.rawResponse.start_at);
        return this.rawResponse.start_at;
    }

    public getEnd(): string {
        console.log('in getEnd:');
        console.log('end_at', this.rawResponse.end_at);
        return this.rawResponse.end_at;
        ;
    }

    public getRates() {
        const myObj = this.rawResponse.rates;
        for (const prop1 in myObj) {
           // console.log(`${prop1}`);
            for (const prop2 in myObj[prop1]) {
                console.log(`${prop1}.${prop2} = ${myObj[prop1][prop2]}`); 
            }
        }
        return myObj;
    }
}
