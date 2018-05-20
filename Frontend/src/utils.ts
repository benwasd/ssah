import { DropdownItemProps } from "semantic-ui-react";

export function getEnumElementsAsDropdownItemProps(type, texts?: string[]) : DropdownItemProps[] {
    return Object.getOwnPropertyNames(type)
        .filter(f => !!parseInt(f+1))
        .map(f => <DropdownItemProps>{ value: toDropdownValue(parseInt(f)), text: texts ? texts[f] : type[f] });
}

/// Workaround for a semantic ui dropdown bug, when values = 0
export function fromDropdownValue(value: number) {
    return value - 100;
}

/// Workaround for a semantic ui dropdown bug, when values = 0
export function toDropdownValue(value?: number) {
    if (value === undefined || value === null) {
        return 0
    }
    else {
        return value + 100;
    }
}

export function throwIfUndefined<T>(value?: T): T {
    if (value === undefined || value === null) {
        throw new Error("Should not be null");
    }
    
    return value;
}
