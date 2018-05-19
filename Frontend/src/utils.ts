import { DropdownItemProps } from "semantic-ui-react";

export function getEnumElementsAsDropdownItemProps(type, texts: string[] = null) : DropdownItemProps[] {
    return Object.getOwnPropertyNames(type)
        .filter(f => !!parseInt(f+1))
        .map(f => <DropdownItemProps>{ value: toDropdownValue(parseInt(f)), text: texts === null ? type[f] : texts[f] });
}

/// Workaround for a semantic ui dropdown bug, when values = 0
export function fromDropdownValue(value: number) {
    return value - 100;
}

/// Workaround for a semantic ui dropdown bug, when values = 0
export function toDropdownValue(value: number) {
    return value + 100;
}
