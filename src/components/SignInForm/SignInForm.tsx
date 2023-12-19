import { type userData } from '@/types/types'
import { signupSchema } from '@/utils/zodUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Link, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { EmailInput } from '../EmailInput'
import { PasswordInput } from '../PasswordInput'

export function SignInForm() {
  const [isIndicator, setIsIndicator] = useState(false)

  const onSubmit: SubmitHandler<userData> = () => {
    reset()
    setIsIndicator(false)
  }

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<userData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h2" variant="h5">
        Sign In
      </Typography>
      <Box
        sx={{
          mt: 1,
          minWidth: '552px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <EmailInput register={register} errors={errors} />
        <PasswordInput
          register={register}
          setIsIndicator={setIsIndicator}
          watch={watch}
          isIndicator={isIndicator}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign In
        </Button>
        <Box
          sx={{
            mt: 1,
            minWidth: '552px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            sx={{
              mr: 1,
            }}
            variant="body1"
          >
            Don&apos;t have an account?
          </Typography>
          <Link
            component="button"
            variant="body1"
            underline="none"
            onClick={() => {}}
          >
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  )
}