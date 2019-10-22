// imports
import {Breakpoint} from "./Breakpoint";
import {IResponsiveValue} from "./ResponsiveValue";


// types
export class ResponsiveValueIterator<T> implements Iterable<[Breakpoint, T]> {

    private readonly _value: IResponsiveValue<T>;


    constructor(value: IResponsiveValue<T>) {
        this._value = value;
    }

    public entries(): ReadonlyArray<[Breakpoint, T]> {

        // create result array
        const entries: Array<[Breakpoint, T]> = [];

        // capture iterator
        const iterator = this[Symbol.iterator]();

        // pipe all iterator values into array
        let entry: IteratorResult<[Breakpoint, T]>;
        while (!(entry = iterator.next()).done) {
            entries.push(entry.value);
        }

        // return array
        return entries;
    }

    public *[Symbol.iterator](): Iterator<[Breakpoint, T]> {

        if (this._value.xs !== undefined) {
            yield ["xs", this._value.xs];
        }

        if (this._value.sm !== undefined) {
            yield ["sm", this._value.sm];
        }

        if (this._value.md !== undefined) {
            yield ["md", this._value.md];
        }

        if (this._value.lg !== undefined) {
            yield ["lg", this._value.lg];
        }

        if (this._value.xl !== undefined) {
            yield ["xl", this._value.xl];
        }
    }
}
