const stringSimilarity = require("string-similarity");

// const sliceEmail = (array) => {
//   return (onlyEmails = array.map((item) => {
//     const aInd = email.split("").indexOf("@");
//     return (mail = item.slice(0, aInd));
//   }));
// };

const findMatch = (email, array) => {
  const emailsArr = array.reduce((acc, item) => {
    console.log(typeof acc)
    console.log(acc)
    console.log(item.email)
    return acc.push(item.email)
  }, []);
  console.log(emailsArr);
  const res = stringSimilarity.findBestMatch(email, emailsArr);
  console.log(res);
  return res;
};

export default findMatch;
