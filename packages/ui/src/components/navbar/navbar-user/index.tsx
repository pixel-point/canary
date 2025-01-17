import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ColorType,
  ContrastType,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  FullTheme,
  getModeColorContrastFromFullTheme,
  Icon,
  IThemeStore,
  ModeType,
  Text
} from '@/components'
import { TypesUser } from '@/types'
import { cn } from '@utils/cn'
import { getInitials } from '@utils/stringUtils'
import { TranslationStore } from '@views/repo'

interface UserBlockProps {
  username: string
  email?: string
  url?: string
  isButton?: boolean
  className?: string
}

const UserBlock = ({ username, email, url, isButton = false, className }: UserBlockProps) => {
  const Tag = isButton ? 'button' : 'div'

  return (
    <Tag
      className={cn(
        'relative grid w-full grid-cols-[auto_1fr] grid-rows-2 items-center justify-start gap-x-2.5 text-left',
        className
      )}
    >
      {isButton && (
        <div className="absolute -inset-2 rounded duration-100 ease-in-out group-hover:bg-background-4 group-data-[state=open]:bg-background-4" />
      )}
      <div className="col-start-1 row-span-2">
        <Avatar className="overflow-hidden rounded-md" size="8">
          {!!url && <AvatarImage src={url} alt="user" />}
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
      </div>
      <p className="col-start-2 row-start-1 truncate text-13 font-medium leading-tight text-foreground-1">{username}</p>
      {!!email && (
        <p className="col-start-2 row-start-2 truncate text-13 font-normal leading-tight text-foreground-4">{email}</p>
      )}
    </Tag>
  )
}

interface NavbarUserProps {
  currentUser: TypesUser | undefined
  handleCustomNav: () => void
  handleLogOut: () => void
  useThemeStore: () => IThemeStore
  useTranslationStore: () => TranslationStore
}

export const NavbarUser = ({
  currentUser,
  handleCustomNav,
  handleLogOut,
  useThemeStore,
  useTranslationStore
}: NavbarUserProps) => {
  const username = currentUser?.display_name || currentUser?.uid || ''
  const { theme, setTheme } = useThemeStore()
  const { t, i18n, changeLanguage } = useTranslationStore()
  const { mode, color, contrast } = useMemo(() => getModeColorContrastFromFullTheme(theme), [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <UserBlock username={username} email={currentUser?.email} url={currentUser?.url} isButton />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="ml-3 w-[230px] !rounded-lg bg-background-1"
        align="start"
        sideOffset={-40}
        alignOffset={187}
      >
        <UserBlock className="p-2" username={username} email={currentUser?.email} url={currentUser?.url} />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile-settings">
            <Icon size={12} name="user" className="mr-2" />
            <Text>{t('component:navbar.profile', 'Profile')}</Text>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon size={12} name="paint" className="mr-2" />
            <Text>{t('component:navbar.theme', 'Theme')}</Text>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem disabled>Color Scheme</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={mode}
                onValueChange={value => {
                  setTheme(`${value}-${color}-${contrast}` as FullTheme)
                }}
              >
                <DropdownMenuRadioItem value={ModeType.System}>System</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ModeType.Light}>Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ModeType.Dark}>Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuItem disabled>Color Correction</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={color}
                onValueChange={value => {
                  setTheme(`${mode}-${value}-${contrast}` as FullTheme)
                }}
              >
                <DropdownMenuRadioItem value={ColorType.Standard}>None</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ColorType.ProtanopiaAndDeuteranopia}>Red-Green</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ColorType.Tritanopia}>Blue-Yellow</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuItem disabled>Contrast</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={contrast}
                onValueChange={value => {
                  setTheme(`${mode}-${color}-${value}` as FullTheme)
                }}
              >
                <DropdownMenuRadioItem value={ContrastType.Standard}>Standard</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ContrastType.Low}>Low</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={ContrastType.High}>High</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon size={12} name="environment" className="mr-2" />
            <Text>Language</Text>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={i18n.language}
                onValueChange={value => {
                  changeLanguage(value)
                }}
              >
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fr">French</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleCustomNav}>
          <Icon size={12} name="navigation" className="mr-2" />
          <Text>{t('component:navbar.customNav', 'Customize navigation')}</Text>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <Icon size={12} name="logOut" className="mr-2" />
          <Text>{t('component:navbar.logout', 'Log out')}</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
