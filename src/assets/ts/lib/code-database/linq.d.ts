

import { int } from "./symbols";
interface ExecuteCallback<ItemType> {
    (x: ItemType, i: int): boolean;
}
export declare function select<ItemType>(items: ItemType[]): {
    first: () => {
        toList: () => ItemType[];
        get: () => ItemType;
        where: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[];
            get: () => ItemType;
        };
        until: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[];
            get: () => ItemType;
        };
        not: () => {
            where: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[];
                get: () => ItemType;
            };
            until: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[];
                get: () => ItemType;
            };
        };
    };
    all: () => {
        toList: () => ItemType[][];
        get: () => ItemType[];
        where: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[][];
            get: () => ItemType[];
        };
        until: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[][];
            get: () => ItemType[];
        };
        not: () => {
            where: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[][];
                get: () => ItemType[];
            };
            until: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[][];
                get: () => ItemType[];
            };
        };
    };
    last: () => {
        toList: () => ItemType[];
        get: () => ItemType;
        where: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[];
            get: () => ItemType;
        };
        until: (cb: ExecuteCallback<ItemType>) => {
            toList: () => ItemType[];
            get: () => ItemType;
        };
        not: () => {
            where: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[];
                get: () => ItemType;
            };
            until: (cb: ExecuteCallback<ItemType>) => {
                toList: () => ItemType[];
                get: () => ItemType;
            };
        };
    };
};
export {};


