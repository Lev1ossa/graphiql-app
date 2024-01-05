import { useLocale } from '@/hooks/useLocale'
import { useValidators } from '@/hooks/useValidators'
import { Box, FormHelperText } from '@mui/material'
import { Fragment } from 'react'
import { ZodError, type ZodString } from 'zod'
import PasswordStrengthBar from './PasswordStrengthBar'

const getPasswordErrors = (password: string, schema: ZodString) => {
  try {
    schema.parse(password)
  } catch (e) {
    if (e instanceof ZodError) {
      return e.issues.map((issue) => issue.message)
    }
  }
  return []
}

export default function PasswordStrength(props: { password: string }) {
  const { password = '' } = props
  const {
    password: { schema, strength, errors: allErrors },
  } = useValidators()
  const { locale } = useLocale()

  const passwordErrors = getPasswordErrors(password, schema)

  const shouldContain = () => {
    return (
      <Box component="span">
        {allErrors.map(([long, short], index) => {
          const color = passwordErrors[0] === long ? 'error.main' : 'inherit'
          return (
            <Fragment key={short}>
              <Box component="span" color={color}>
                {short}
              </Box>
              {index !== allErrors.length - 1 ? ', ' : ''}
            </Fragment>
          )
        })}
      </Box>
    )
  }

  const currentStrength = strength.length - passwordErrors.length - 1

  return (
    <Box px={1}>
      <FormHelperText>
        {locale.signInUpPage.typography.passwordStrength.description}{' '}
        {shouldContain()}
        <PasswordStrengthBar
          current={currentStrength}
          levels={strength.map(([color, text]) => ({ color, text }))}
        />
      </FormHelperText>
    </Box>
  )
}
