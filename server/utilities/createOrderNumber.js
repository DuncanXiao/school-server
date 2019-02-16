const createOrderNumber = (uuid) => {
  const timestamp = new Date().getTime();
  const uuidNumber = uuid.replace(/\D*/g, '');
  const randomIndexs = (Math.random() * 100).toString().split('');
  const firstNumber = !uuidNumber.charAt(randomIndexs[0]) ? randomIndexs[0] : uuidNumber.charAt(randomIndexs[0]);
  const secondNumber = !uuidNumber.charAt(randomIndexs[1]) ? uuidNumber.charAt('1') : uuidNumber.charAt(randomIndexs[1]);
  return `${firstNumber}${Math.random() * 10}${timestamp}${secondNumber}${Math.random() * 10}`;
};

export default createOrderNumber;