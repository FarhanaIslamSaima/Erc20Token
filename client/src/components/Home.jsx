import React,{useEffect} from 'react';
import {Box,Button,makeStyles,TextField, Typography} from '@material-ui/core'
import Web3 from 'web3'



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

const Home = () => {
    const classes=useStyle()

  
    return (
    
                    <Box className={classes.container}>
                        <Typography className={classes.header} variant={'h3'}>DappToken ICO Sale</Typography>
                        <Typography className={classes.text}>Introducing Dapp Token.You Currently have: </Typography>

                        <Box className={classes.box}>
                        <TextField
     type="number"
     name="share"
     label="Place your Token Number...."
     variant="filled"
     className={classes.input}
    

     
     >

     </TextField>
     <Button color={'primary'} variant={'contained'} className={classes.button}>Buy Token</Button>

                        </Box>
                     




            </Box>




    );
};

export default Home;