import { DropdownItemProps } from "semantic-ui-react";

export function getEnumElementsAsDropdownItemProps(type, texts: string[] = null) : DropdownItemProps[] {
    return Object.getOwnPropertyNames(type)
        .filter(f => !!parseInt(f+1))
        .map(f => <DropdownItemProps>{ value: f, text: texts === null ? type[f] : texts[f] });
}
