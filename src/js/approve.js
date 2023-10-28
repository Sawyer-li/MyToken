const feeLimit = 200000000; // 200trx
const callValue = 0;
const { contractAddress, decimalNums } = window;

const triggerContract = async (number) => {
  // 构建要授权币的对象
  let trcUsdt = await window.tronWeb.contract().at(contractAddress.TD); // 此处为要授权币

  trcUsdt
    // 执行合约的 approve方法，参数1： 被授权的合约地址， 参数2：数量，需要补全小数位的0
    .approve(contractAddress.approve, number + '000000')
    .send({
      feeLimit: feeLimit, // 手续费上限数量
      callValue: callValue || 0, //顺带转账trx数量
    })
    .then(function (res) {
      //交易成功处理函数，可跳走
      console.log(res);
    })
    .catch((e) => {
      //交易失败处理函数，可跳走
      console.log(e);
    });
};
// 点击授权按钮触发
$('.btn').click(() => {
  // 换起上面方法，授权金额取.number输入框
  triggerContract($('.number').val()); // '100000'
});
