const createOrderNumber = (uuid, schoolId) => {
  const timestamp = new Date().getTime();
  const uuidNumber = uuid.replace(/\D*/g, '');
  const randomIndexs = (Math.random() * 100).toString().split('');
  const secondNumber = !uuidNumber.charAt(randomIndexs[1]) ? uuidNumber.charAt('1') : uuidNumber.charAt(randomIndexs[1]);
  return `${schoolId}${Math.random() * 10}${timestamp}${secondNumber}${Math.random() * 10}`;
};

export default createOrderNumber;