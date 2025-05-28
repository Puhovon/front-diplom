import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  TextField
} from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputWithLabel = ({
  id,
  label,
  type = "text",
  error,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Специальные пропсы для поля типа date
  const getDateInputProps = () => {
    if (type === 'date') {
      return {
        InputLabelProps: {
          shrink: true,
        },
        inputProps: {
          style: {
            color: 'transparent',
          },
          onFocus: (e) => {
            e.target.style.color = 'inherit';
            if (!e.target.value) {
              e.target.value = '';
            }
          },
          onBlur: (e) => {
            if (!e.target.value) {
              e.target.style.color = 'transparent';
            }
          }
        }
      };
    }
    return {};
  };

  // Определяем реальный тип инпута
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <FormControl variant="outlined" fullWidth error={Boolean(error)}>
      {type === 'password' ? (
        <>
          <InputLabel htmlFor={id}>{label}</InputLabel>
          <OutlinedInput
            id={id}
            type={inputType}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            {...inputProps}
          />
        </>
      ) : (
        <TextField
          id={id}
          label={label}
          type={type}
          variant="outlined"
          {...inputProps}
          {...getDateInputProps()}
          error={Boolean(error)}
          helperText={error}
        />
      )}
      {type === 'password' && error && (
        <FormHelperText error>{error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default InputWithLabel;