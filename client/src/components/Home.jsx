import React,{useEffect,useContext} from 'react';
import {Box,Button,makeStyles,TextField, Typography} from '@material-ui/core'
import Web3 from 'web3'
import { TokenContext } from '../context/TokenProvider';



const useStyle=makeStyles({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'100px',
        flexDirection:'column',
        '&>*':{
            marginBottom:'10px'
        }
    },
    header:{

    },
    text:{

    },
    button:{
        padding:'15px'
    },
    input:{
        width:'500px'
    }

})

const Home = ({token,buyToken}) => {
    const {tokenNum,setTokenNum}=useContext(TokenContext);
    console.log(tokenNum)
    const classes=useStyle()

    const handleToken=()=>{
        buyToken()
    }
    const handleTokenval=(num)=>{
    setTokenNum(num)
    }

  
    return (
    
                    <Box className={classes.container}>
                        <Typography className={classes.header} variant={'h3'}>DappToken ICO Sale</Typography>
                        <Typography className={classes.text}>Introducing Dapp Token.You Currently have {token.balance} wei in your account </Typography>

                        <Box className={classes.box}>
                        <TextField
     type="number"
     name="share"
     label="Place your Token Number...."
     variant="filled"
     className={classes.input}
     onChange={(e)=>handleTokenval(e.target.value)}
    
    

     
     >

     </TextField>
     <Button color={'primary'} variant={'contained'} className={classes.button} onClick={handleToken}>Buy Token</Button>

                        </Box>
                     




            </Box>




    );
};

export default Home;