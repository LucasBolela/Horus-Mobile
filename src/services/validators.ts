export type Predicate<T> = (value: T) => boolean;

class StringUtil {
  public static isSomeIncluded(values: Array<string>, value: string) {
    return values.some((str) => value.includes(str));
  }

  public static isOnlyNumbers(
    value: string,
    shouldIgnoreWhitespaces?: boolean
  ) {
    return /^[0-9]+$/.test(
      shouldIgnoreWhitespaces ? StringUtil.clearSpaces(value) : value
    );
  }

  public static isOnlyLetters(
    value: string,
    shouldIgnoreWhitespaces?: boolean
  ) {
    return /^[a-zA-Z]+$/.test(
      shouldIgnoreWhitespaces ? StringUtil.clearSpaces(value) : value
    );
  }

  public static hasSomeNumber(value: string) {
    return /[0-9]/g.test(value);
  }

  public static clearSpaces(value: string) {
    return value.replace(/\s+/g, '');
  }

  public static capitalize(value: string) {
    return value.charAt(0) + value.slice(1);
  }

  public static extractNumbers(value: string) {
    return value.replace(/[^0-9]/g, '');
  }
}

class Validator<T> {
  public constructor(public readonly isValid: Predicate<T>) {}

  public static readonly MONEY = new Validator((value: string) =>
    Validator.RegExp.MONEY.test(value.replace('R$', '').replace(/\s/g, ''))
  );

  public static readonly EMAIL = new Validator((value: string) =>
    Validator.RegExp.EMAIL.test(value)
  );

  public static readonly DATE = new Validator(
    (value: Date) => value instanceof Date && !Number.isNaN(Number(value))
  );

  public static readonly CEP = new Validator((value: string | number) =>
    Validator.RegExp.CEP.test(StringUtil.extractNumbers(String(value)))
  );

  public static readonly CPF = new Validator((valueIn: string | number) => {
    const value = StringUtil.extractNumbers(String(valueIn));

    if (value.length !== 11) {
      return false;
    }

    if (Array.from(value).every((char, _, array) => array[0] === char)) {
      return false;
    }

    const calculateDigit = (slice: string, range: number) => {
      const total = Array.from(slice).reduce(
        (accumulator, char, index) =>
          Number(char) * (range - index) + accumulator,
        0
      );

      const rest = (total * 10) % 11;

      return rest === 10 ? 0 : rest;
    };

    const firstDigit = calculateDigit(value.slice(0, -2), 10);

    const secondDigit = calculateDigit(value.slice(0, -1), 11);

    return (
      Number(value.at(-2)) === firstDigit &&
      Number(value.at(-1)) === secondDigit
    );
  });

  public static readonly CNPJ = new Validator((valueIn: string | number) => {
    const value = StringUtil.extractNumbers(String(valueIn));

    if (value.length !== 14) {
      return false;
    }

    if (Array.from(value).every((char, _, array) => array[0] === char)) {
      return false;
    }

    const calculateDigit = (slice: string, weights: Array<number>) => {
      const total = Array.from(slice).reduce(
        (accumulator, char, index) =>
          Number(char) * (weights[index] ?? 0) + accumulator,
        0
      );

      const rest = total % 11;

      if (rest > 10) {
        return NaN;
      }

      return rest === 0 || rest === 1 ? 0 : 11 - rest;
    };

    const firstDigit = calculateDigit(
      value.slice(0, -2),
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    const secondDigit = calculateDigit(
      value.slice(0, -1),
      [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    return (
      Number(value.at(-2)) === firstDigit &&
      Number(value.at(-1)) === secondDigit
    );
  });

  public static readonly PHONE = new Validator((value: string | number) => {
    const valueAsString = String(value);

    return (
      (valueAsString.length === 11 || valueAsString.length === 15) &&
      Validator.RegExp.PHONE.test(StringUtil.extractNumbers(valueAsString))
    );
  });

  private static RegExp = class {
    public static readonly MONEY = /^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/;

    public static readonly EMAIL =
      // eslint-disable-next-line no-control-regex
      /^((([a-z]|\d|[!#$%&'+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+))|((\x22)((((\x20|\x09)(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))(((\x20|\x09)(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.||~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.||~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    public static readonly CEP = /^[0-9]{5}-?[0-9]{3}$/;

    public static readonly PHONE =
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
  };
}

export default Validator;