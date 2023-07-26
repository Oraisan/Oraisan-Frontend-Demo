export const formatAddress = (address, fractionDigits = 3) => {
  try {
    return (
      address.slice(0, fractionDigits) + "..." + address.slice(-fractionDigits)
    );
  } catch (error) {
    return undefined;
  }
};
