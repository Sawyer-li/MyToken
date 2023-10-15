var contractAddress;
var tronWeb;

// try {
//   contractAddress = metacoinConfig.contractAddress
//   tronWeb = new TronWeb(
//       metacoinConfig.fullHost,
//       metacoinConfig.fullHost,
//       metacoinConfig.fullHost,
//       metacoinConfig.privateKey
//   )
// } catch (err) {
//   alert('The app looks not configured. Please run `npm run migrate`')
// }

// console.log(111111111111111);
// var obj = setInterval(async () => {
//   if (window.tronWeb) {
//     clearInterval(obj);
//     document.write('Yes, catch it:', window.tronWeb.defaultAddress.base58);
//   }
// }, 10);

// var obj = setInterval(async ()=>{
//   if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
// //if (window.tronLink.tronWeb) 
//       clearInterval(obj)
//       var tronweb = window.tronWeb
//       var tx = await tronweb.transactionBuilder.sendTrx('TN9RRaXkCFtTXRso2GdTZxSxxwufzxLQPP', 10, 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ')
//       var signedTx = await tronweb.trx.sign(tx)
//       var broastTx = await tronweb.trx.sendRawTransaction(signedTx)
//       console.log(broastTx)
//   }
// }, 10)

App = {
  tronWebProvider: null,
  contracts: {},
  accounts: [],
  contractAddress: contractAddress,
  privateKey:
    '0000000000000000000000000000000000000000000000000000000000000001',
  feeLimit: 100000000,
  callValue: 0,
  abi: [
    {
      inputs: [
        {
          name: 'initialBalance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: '_from',
          type: 'address',
        },
        {
          indexed: false,
          name: '_to',
          type: 'address',
        },
        {
          indexed: false,
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: 's',
          type: 'string',
        },
      ],
      name: 'Log',
      type: 'event',
    },
    {
      constant: false,
      inputs: [
        {
          name: 'receiver',
          type: 'address',
        },
        {
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'sendCoin',
      outputs: [
        {
          name: 'sufficient',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'getConvertedBalance',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: 'addr',
          type: 'address',
        },
      ],
      name: 'getBalance',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'getOwner',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  init: async function () {
    this.accounts = [tronWeb.address.fromPrivateKey(metacoinConfig.privateKey)];

    // const account = await tronWeb.createAccount()
    // this.accounts.push(account.address.base58);
    // $("#contractAddress").text(this.contractAddress)
    // $("#accountA").text(this.accounts[0])
    // $("#accountB").text(this.accounts[1])
    // this.initData();
    // this.bindEvents();
  },

  initData: function () {
    var c = 0;

    function reset() {
      c++;
      if (c == 2) {
        $('#loading').css({ display: 'none' });
        $('#commit').attr('disabled', null);
      }
    }

    this.triggerContract('getBalance', [this.accounts[0]], function (data) {
      $('#dev_old_a').html(data.toNumber());
      reset();
    });

    this.triggerContract('getBalance', [this.accounts[1]], function (data) {
      $('#dev_old_b').html(data.toNumber());
      reset();
    });
  },

  transfer: function () {
    var that = this;
    var count = $('#dev_count').val() || 0;
    const to = this.accounts[1];
    const amount = parseInt(count);
    $('#loading').css({ display: 'block' });
    $('#dev_count').val('');
    $('#commit').attr('disabled', 'disabled');
    this.triggerContract('sendCoin', [to, amount], function () {
      that.initData();
    });
  },
  getContract: function (address, callback) {
    tronWeb.getContract(address).then(function (res) {
      callback && callback(res);
    });
  },
  triggerContract: async function (methodName, args, callback) {
    let myContract = await tronWeb.contract().at(this.contractAddress);

    var callSend = 'send';
    this.abi.forEach(function (val) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? 'send' : 'call';
      }
    });

    myContract[methodName](...args)
      [callSend]({
        feeLimit: this.feeLimit,
        callValue: this.callValue || 0,
      })
      .then(function (res) {
        if (res) {
          callback && callback(res);
        }
      });
  },

  initTronWeb: function () {
    /*
     * Replace me...
     */

    return this.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return this.bindEvents();
  },

  bindEvents: function () {
    var that = this;
    $(document).on('click', '#commit', function () {
      that.transfer();
    });
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
