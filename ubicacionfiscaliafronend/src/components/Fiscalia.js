import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button, Modal,Typography,Box, Input} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Fiscalia() {
  const paperStyle={padding:"50px 20px", width:600, margin:"20px auto"}
  const classes = useStyles();
  const [name, setName]=useState('')//utilización de Hooks
  const [address, setAddress]=useState('')
  const [tel, setTel]=useState('')
  const [fiscalias, setFiscalias]=useState([])
  const [modalVisibility, setModalVisibility]=useState(false)
  const [nameEdit, setNameEdit]=useState('')//utilización de Hooks
  const [addressEdit, setAddressEdit]=useState('')
  const [telEdit, setTelEdit]=useState('')
  const [idEdit, setIdEdit]=useState(null)


 const modalStyle= {
  width: 500,
  top:100,
  margin:'0 auto',
  marginTop:'100px',
  backgroundColor: 'white',
  outline: "none"
  }

    
  const handleCreate = (e) => {
    e.preventDefault()
    const fiscalia ={name,address,tel}
    fetch("http://localhost:8080/Fiscalia/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(fiscalia)
    }).then(()=>{
        console.log("Nuevo registro agregado exitosamente.")
        window.location.reload()
    })
        
    console.log(fiscalia)
  }

 
  const handleUpdate = (e) => {
    e.preventDefault()
    const fiscalia ={name:nameEdit,address:addressEdit,tel:telEdit,id:idEdit}
    fetch("http://localhost:8080/Fiscalia/update",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(fiscalia)
    }).then(()=>{
        console.log("Nuevo registro actulizado.")
        window.location.reload()

    })
        
    console.log(fiscalia)
  }

  const setEditData=(fiscalia)=>{
    setNameEdit(fiscalia.name)
    setAddressEdit(fiscalia.address)
    setTelEdit(fiscalia.tel)
    setIdEdit(fiscalia.id)

  }
  

  const handleDelete = (e,id) => {
    e.preventDefault()
    console.log(id)
    const student ={id}
    fetch("http://localhost:8080/Fiscalia/"+id,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
    }).then(()=>{
        console.log(" registro eliminado.")
        setFiscalias(fiscalias.filter(fiscalia => fiscalia.id != id))
    })
  }

  
  useEffect(()=>{
    fetch("http://localhost:8080/Fiscalia/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setFiscalias(result);
    }
  )
  },[])

  return (
    <Container>
       <Modal
          open={modalVisibility}
          onClose={()=>setModalVisibility(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={modalStyle}>
          <Paper elevation={3} style={paperStyle}>
            <h1>Editar Fiscalía</h1>
            <form className={classes.root} noValidate="off">
            <TextField id="outlined-basic" label="Nombre Fiscalía" variant="outlined" fullWidth 
            value={nameEdit}
            onChange={(e)=>setNameEdit(e.target.value)}
            />
            <TextField id="outlined-basic" label="Dirección Fiscalía" variant="outlined" fullWidth
            value={addressEdit}
            onChange={(e)=>setAddressEdit(e.target.value)}
            />
            <TextField id="outlined-basic" label="Telefono Fiscalía" variant="outlined" fullWidth
            value={telEdit}
            onChange={(e)=>setTelEdit(e.target.value)}
            />
            <Button variant='contained' color='secondary' onClick={handleUpdate}>
            Editar
            </Button>
            </form>
            {name}
            {address}
        </Paper>
          </div>
        </Modal>
        <Paper elevation={3} style={paperStyle}>
            <h1>Agregar Fiscalía</h1>
            <form className={classes.root} noValidate="off">
            <TextField required type="text" id="outlined-basic" label="Nombre Fiscalía" variant="outlined" fullWidth 
            value={name}
            onChange={(e)=>setName(e.target.value)}
             />
            <TextField type="text" id="outlined-basic" label="Dirección Fiscalía" variant="outlined" fullWidth
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            required/>
            <TextField type="tel" id="outlined-basic" label="Telefono Fiscalía" variant="outlined" fullWidth
            value={tel}
            onChange={(e)=>setTel(e.target.value)}
            required/>
            <Button variant='contained' color='secondary' onClick={handleCreate}>
            Agregar
            </Button>
            </form>
            {name}
            {address}
        </Paper>
        <h1>Fiscalías del Ministerio Publico de Guatemala</h1>
        <Paper elevation={3} style={paperStyle}>
            {fiscalias.map(fiscalia=>(
                <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={fiscalia.id}>
                Id:{fiscalia.id}<br/>
                Fiscalía:{fiscalia.name}<br/>
                Dirección:{fiscalia.address}<br/>
                Tel:{fiscalia.tel}
                <br/>
                <Button variant='contained' color='secondary' onClick={(e) => handleDelete(e,fiscalia.id)}>
                  Borrar
                </Button>
                <Button variant='contained' color='primary' onClick={()=>{setModalVisibility(true);setEditData(fiscalia)}}>Editar</Button>
                </Paper>
            ))
        }
        </Paper>
       
    </Container>
  );
}
