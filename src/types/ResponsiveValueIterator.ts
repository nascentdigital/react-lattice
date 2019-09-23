// imports
import {Breakpoint} from "./Breakpoint";
import {ResponsiveValue} from "./ResponsiveValue";


// types
export class ResponsiveValueIterator<T> implements Iterable<[Breakpoint, T]> {

    private readonly _value: ResponsiveValue<T>;


    constructor(value: ResponsiveValue<T>) {
        this._value = value;
    }

    entries(): ReadonlyArray<[Breakpoint, T]> {

        // create result array
        const entries: Array<[Breakpoint, T]> = [];

        // pipe all iterator values into array
        const iterator = this[Symbol.iterator]();
        let entry: IteratorResult<[Breakpoint, T]>;
        while (!(entry = iterator.next()).done) {

            // capture next value
            entries.push(entry.value);

            // move to next entry
            entry = iterator.next();
        }

        // return array
        return entries;
    }

    *[Symbol.iterator](): Iterator<[Breakpoint, T]> {

        if (this._value.xs !== undefined) {
            yield [Breakpoint.xs, this._value.xs];
        }

        if (this._value.sm !== undefined) {
            yield [Breakpoint.sm, this._value.sm];
        }

        if (this._value.md !== undefined) {
            yield [Breakpoint.md, this._value.md];
        }

        if (this._value.lg !== undefined) {
            yield [Breakpoint.lg, this._value.lg];
        }

        if (this._value.xl !== undefined) {
            yield [Breakpoint.xl, this._value.xl];
        }
    }
}
