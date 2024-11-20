export const isValidCpf = (cpf: string): boolean => {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (cleanedCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanedCpf)) {
    return false;
  }

  const calcVerifier = (baseCpf: string, factor: number): number => {
    const total = baseCpf
      .split("")
      .map((digit) => parseInt(digit, 10))
      .reduce((acc, curr) => acc + curr * factor--, 0);
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const firstVerifier = calcVerifier(cleanedCpf.slice(0, 9), 10);
  const secondVerifier = calcVerifier(cleanedCpf.slice(0, 10), 11);

  return (
    firstVerifier === parseInt(cleanedCpf[9], 10) &&
    secondVerifier === parseInt(cleanedCpf[10], 10)
  );
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidFullName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;
  return nameRegex.test(name) && !/^\d/.test(name);
};