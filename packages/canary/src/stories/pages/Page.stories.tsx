// import { within, userEvent, expect } from '@storybook/test'

export default {
  title: 'Pages/Login',
  parameters: {
    layout: 'fullscreen'
  }
}

export function Login() {
  return <p>Sample Login Page</p>
}
// export const LoggedOut = {}

// // More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
// export const LoggedIn = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement)
//     const loginButton = canvas.getByRole('button', { name: /Log in/i })
//     await expect(loginButton).toBeInTheDocument()
//     await userEvent.click(loginButton)
//     await expect(loginButton).not.toBeInTheDocument()

//     const logoutButton = canvas.getByRole('button', { name: /Log out/i })
//     await expect(logoutButton).toBeInTheDocument()
//   }
// }
