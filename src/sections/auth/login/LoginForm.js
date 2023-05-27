import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import authService from '../../../redux/auth-service';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const onChangeUserName = (e) => {
    // console.log(userName);
    setUserName(e.target.value);
  }; 

  const onChangePassword = (e) => {
    // console.log(password);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    setLoading(true);
    setMessage("");
    e.preventDefault();
      
     await authService.loginAsync(userName, password);
          if(localStorage.getItem("authToken") != null){
            navigate('/dashboard', { replace: true });
          }
          else {
            setLoading(false);
            setMessage(localStorage.getItem("errorMsg"))
          }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
        type="text"
        name="userName"
        label="User Name"
        onChange={onChangeUserName} 
        value={userName}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}         
          onChange={onChangePassword}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin} loading={loading}>
        Login
      </LoadingButton>
      <h3 style={{color : 'red', textAlign: 'center'}}>{message}</h3>
      </form>
    </>
  );
}
