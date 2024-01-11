import { Header } from '@/components/Header'
import { OutlineButton } from '@/components/OutlineButton'
import { RouterPath } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import { Link } from 'react-router-dom'

export default function WelcomePageHeader() {
  const {
    locale: { header: l },
  } = useLocale()
  return (
    <Header
      leftSlot={
        <OutlineButton component={Link} to={RouterPath.Main} color="secondary">
          {l.button.explorer}
        </OutlineButton>
      }
    />
  )
}
