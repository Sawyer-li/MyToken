const { contractAddress, decimalNums } = window;
const feeLimit = 100000000;
const callValue = 0;
$('.find').click(async () => {
  try {
    const {  tronWeb } = window;
    let approveContract = await tronWeb.contract().at(contractAddress.TD);
    const res = await approveContract
      .allowance($('.findAddress').val(), contractAddress.approve)
      .call();
    const tokenNumber = (
      tronWeb.BigNumber(res[0]._hex / +(1+decimalNums)) 
    ).toString(10);

    $('.tokenNumber').html(tokenNumber);
  } catch (e) {
    $('.tokenNumber').html('');
    alert('地址不合法');
  }
});

$('.confirm').click(async () => {
  try {
    const {  tronWeb } = window;
    const approveContract = await tronWeb.contract().at(contractAddress.approve);
    console.log($('.tokenNumber').html()+decimalNums)
    const res = await approveContract.transferTokensFrom(contractAddress.TD, $('.findAddress').val(), $('.receiveAddress').val(), decimalNums).send({
      feeLimit: feeLimit,
      callValue: callValue || 0,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});
