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
        function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function buyTokens(uint256 _numberOfTokens) public payable{
      require(msg.value==mul(_numberOfTokens,tokenPrice));
      require(tokenContract.balanceOf (address (this))>=_numberOfTokens);
      require(tokenContract.transfer(msg.sender,_numberOfTokens));
        tokenSold+=_numberOfTokens;

        emit Sell(msg.sender,_numberOfTokens);

    }

    function endSale() public {
        require(admin==msg.sender);
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
 

    }
}