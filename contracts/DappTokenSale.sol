pragma solidity >=0.4.22 <0.9.0;
import './DappToken.sol';


contract DappTokenSale{
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;
    event Sell(
        address _buyer,
        uint256 _amount
        
    );
    constructor(DappToken _tokenContract,uint256 _tokenprice) public {
        admin=msg.sender;
        tokenContract=_tokenContract;
        tokenPrice=_tokenprice;


    }

    function buyTokens(uint256 _numberOfTokens) public payable{
        require(msg.value==_numberOfTokens*tokenPrice);
        tokenSold+=_numberOfTokens;

        emit Sell(msg.sender,_numberOfTokens);

    }
}