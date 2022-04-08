const success = { success: true, error: false };
const reject = { success: false, error: true };

const successFunction = (msg) => {
  return { msg, success: true, error: false };
};

const rejectFun = (msg = `Error Occured`) => {
  // if (!msg) {
  //   msg = `Error Occured`;
  // }
  return { msg, success: false, error: true };
};

module.exports = { successFunction, rejectFun };
