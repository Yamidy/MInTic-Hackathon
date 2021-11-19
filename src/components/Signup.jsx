import { useState } from 'react';
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { useSession } from '../context/sessionContext'



const Signup = () => {
  const [formulario, setFormulario] = useState({ email: '', password: '', passwordconfirm: '' })
  const { signup } = useSession()
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
    setPasswordMatch(true)
    if (formulario.password !== formulario.passwordconfirm) {
      return setPasswordMatch(false)
      // return setErrorMsg('Contrasenas no coinciden')
    }

    try {
      setErrorMsg('')
      setLoading(true)
      await signup(formulario.email, formulario.password)
    } catch {
      return setTimeout(() => {
        setLoading(false)
        setErrorMsg('Error al crear la cuenta')
      }, 2000);

    }
    setErrorMsg('')

    setSuccessMsg('Cuenta creada exitosamente')
    setLoading(false)

  }


  console.log(formulario)

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems='center' justify='center' direction='column' spacing={2}>
        {errorMsg !== '' && <Alert variant='outlined' severity='error'>{errorMsg}</Alert>}
        {successMsg !== '' ? <Alert variant='outlined' severity='success'>{successMsg}</Alert> : (
          <>
            <Grid item xs={12}>
              <TextField
                id='email'
                name='email'
                label='Correo'
                type='email'
                value={formulario.email}
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
              />
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' type='submit' disabled={loading}>Registrarse</Button>
            </Grid>
          </>
        )}
      </Grid>
    </form>

  )

}

export default Signup
