import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { useSession } from '../context/sessionContext'



const UpdateProfile = () => {
  const { currentUser, updateName, updateImage, updatePass } = useSession()
  const [formulario, setFormulario] = useState({ name: currentUser.displayName, password: '', passwordconfirm: '', image:currentUser.photoURL })
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleFormulario = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

  e.preventDefault();
  setLoading(true)
  setErrorMsg('')
  setPasswordMatch(true)
  if (formulario.password !== formulario.passwordconfirm) {
    setLoading(false)
    return setPasswordMatch(false)
      // return setErrorMsg('Contrasenas no coinciden')
  }

  const promises = [];
  if(formulario.name !== currentUser.displayName){
    promises.push(updateName(formulario.name))
  }

  if(formulario.image !== currentUser.photoURL){
    promises.push(updateImage(formulario.image))
  }

  if(formulario.password !== ''){
    promises.push(updatePass(formulario.password))
    }

  Promise.all(promises).then(()=>{
    setSuccessMsg('Datos actualizados')
    }).catch(()=>{
    setErrorMsg('Error al actualizar. Intente de nuevo')
      }).finally(()=>{
      setLoading(false)
      })
    }


  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='center' justify='center' direction='column' spacing={2}>
        {errorMsg !== '' && <Alert variant='outlined' severity='error'>{errorMsg}</Alert>}
        {successMsg !== '' ? <Alert variant='outlined' severity='success'>{successMsg}</Alert> : (
          <>
            <Grid item xs={12}>
              <TextField
                id='name'
                name='name'
                label='Nombre'
                type='text'
                value={formulario.name}
                onChange={handleFormulario}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='image'
                name='image'
                label='URL Imagen'
                type='text'
                value={formulario.image}
                onChange={handleFormulario}
              />
            </Grid>
            <Grid item>
              <TextField
                id='password'
                name='password'
                label='Contrasena'
                type='password'
                value={formulario.password}
                onChange={handleFormulario}
                placeholder="Deja en blanco para no cambiar"
              />
            </Grid>
            <Grid item>
              <TextField
                error={!passwordMatch}
                helperText={!passwordMatch && "Contrasena no coincide"}
                id='passwordconfirm'
                name='passwordconfirm'
                label='Confirmar Contrasena'
                type='password'
                value={formulario.passwordconfirm}
                onChange={handleFormulario}
                placeholder="Deja en blanco para no cambiar"
              />
            </Grid>
            <Grid item>
            <Button variant='contained' color='primary' type='submit' disabled={loading}>Actualizar</Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>

  )
}

export default UpdateProfile
