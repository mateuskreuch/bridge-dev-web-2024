class Validator {
  static IS_INTEGER_REGEX = /^[-+]*[0-9]+$/;

  static validateFetchPrimeCountInput(input: string) {
    if (!input)
      throw Error("Entrada vazia");

    if (!Validator.IS_INTEGER_REGEX.test(input))
      throw Error("Entrada deve ser um número");

    const k = Number.parseInt(input);

    if (k <= 0)
      throw Error("Número menor ou igual à zero");
  }
}

//----------------------------------------------------------------------------//

export default Validator;
