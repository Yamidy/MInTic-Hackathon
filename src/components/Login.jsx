import { useState } from 'react';
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import NaturePeopleIcon from '@mui/icons-material/NaturePeople'
import { useSession } from '../context/sessionContext'



const Login = () => {
  const [formulario, setFormulario] = useState({ email: '', password: '' })
  const { login, resetPassword, fetchProfile } = useSession()
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFormulario = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const promises = []

    // promises.push(login(formulario.email, formulario.password))
    // promises.push(fetchProfile())

    try {
      setErrorMsg('')
      setLoading(true)
      // await Promise.all(promises)
      await login(formulario.email, formulario.password)
    } catch {

      setLoading(false)
      return setErrorMsg('Error al iniciar sesion')
    }

    setLoading(false)
    setSuccessMsg('Login exitoso')

  }

  const [isPassReset, setIsPassReset] = useState(false)

  const toggleForm = () => {
    setIsPassReset(!isPassReset)
  }

  const handleResetPass = async (e) => {
    e.preventDefault();

    try {
      setErrorMsg('')
      setLoading(true)
      await resetPassword(formulario.email)
    } catch {
      setLoading(false)
      return setErrorMsg('Error al enviar correo de recuperacion')
    }

    setLoading(false)
    setSuccessMsg('Correo de recuperacion enviado. Verifique su bandeja de entrada.')
  }



  return (
    <form onSubmit={!isPassReset ? handleSubmit : handleResetPass}>
      <Grid container alignItems='center' justify='center' direction='column' spacing={2}>
        <Grid item>
          <NaturePeopleIcon sx={{ fontSize: 50 }} color='primary' />
        </Grid>
        {errorMsg !== '' && <Alert variant='outlined' severity='error'>{errorMsg}</Alert>}
        {successMsg !== '' ? <Alert variant='outlined' severity='success'>{successMsg}</Alert> : (
          <>
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
            </>
            {!isPassReset &&
              <>
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
              </>
            }
            <>
              <Grid item>
                <Button variant='contained' color='primary' type='submit' disabled={loading}>
                  {!isPassReset ? 'Ingresar' : 'Reestablecer contrasena'}
                </Button>
              </Grid>
              <Grid item>
                <Button variant='text' color='secondary' onClick={toggleForm} size='small'>
                  {!isPassReset ? 'Olvide mi contrasena' : 'Iniciar sesion'}
                </Button>
              </Grid>
            </>
          </>
        )}
      </Grid>
    </form>
  )
}
export default Login
