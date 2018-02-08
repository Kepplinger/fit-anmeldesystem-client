import { DisplayedValue } from '../displayed-value';

export class DisplayedValueMapper {
  public static mapToDisplayValue(value: string, displayValues: DisplayedValue[]): DisplayedValue {
    for (let displayValue of displayValues) {
      if (displayValue.value.toUpperCase() === value.toUpperCase()) {
        return displayValue;
      }
    }
  }
}
