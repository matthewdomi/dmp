import Layout from '../components/Layout'
import SignIn from './auth/signin'

export default function Home() {
  return (
    <Layout title="Home Page">
      <SignIn />
    </Layout>
  )
}
