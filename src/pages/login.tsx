import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"

import styles from "../styles/Form.module.css"
import { useAuth } from "../context/AuthContext"
import toast, { Toaster } from "react-hot-toast"
import FormLayout from "../components/layouts/form_layout"
import { mapAuthCodeToMessage } from "../lib/firebase/firebaseMapError"

export default function Login() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingType, setLoadingType] = useState("")
  const router = useRouter()
  const { loginUser, signInGoogle } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const resetLoadingAndType = (loading: boolean, type: string) => {
    setLoading(loading)
    setLoadingType(type)
  }

  const onSubmit = async ({ email, password }: any) => {
    try {
      resetLoadingAndType(true, "cred")
      const res = await loginUser(email, password)
      if (res) {
        router.push("/")
      }
    } catch (err: any) {
      toast.error(mapAuthCodeToMessage(err.code))
      resetLoadingAndType(false, "")
      console.log("error", err)
    } finally {
      // resetLoadingAndType(false, "")
    }
  }

  // google
  const handleGoogleSignin = async () => {
    try {
      resetLoadingAndType(true, "google")
      const res = await signInGoogle()
      console.log("res at signInGoogle", res)
      if (res) {
        router.push("/")
        resetLoadingAndType(false, "")
      }
    } catch (err: any) {
      const msg = mapAuthCodeToMessage(err.code)
      if (msg != "") {
        toast.error(msg)
      }
      resetLoadingAndType(false, "")
    }
  }
  
  return (
    <FormLayout>
      <Head>
        <title>Login to VidShop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="flex flex-col gap-6 mx-auto md:w-3/4 2xl:gap-7">
        <div className="title">
          <h1 className="text-2xl font-bold text-gray-800 md:py-4 md:text-4xl">
            Login to VidShop
          </h1>
        </div>

        {/* form */}
        <form
          className="flex flex-col gap-y-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={`${styles.inputgroup} ${
              errors.email && "border-red-500"
            }`}
          >
            <input
              className={styles.inputtext}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <span className="flex items-center px-3 icon">
              <HiAtSymbol size={23} />
            </span>
          </div>

          <div
            className={`${styles.inputgroup} ${
              errors.password && "border-red-500"
            }`}
          >
            <input
              className={styles.inputtext}
              type={show ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <span
              className="icon flex cursor-pointer items-center px-3 hover:text-[#6366f1]"
              onClick={() => setShow((prevSt) => !prevSt)}
            >
              <HiFingerPrint size={23} />
            </span>
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button
              className={`${styles.button} ${loading && "opacity-50"}`}
              type="submit"
              disabled={loading}
            >
              {loading && loadingType === "cred" ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="input-button">
            <button
              className={`${styles.button_custom} ${
                loading && "text-gray-400"
              }`}
              type="button"
              onClick={handleGoogleSignin}
              disabled={loading}
            >
              {loading && loadingType === "google" ? (
                "loading..."
              ) : (
                <>
                <Image
                  src={"/images/google.svg"}
                  width="20"
                  height={20}
                  alt="google"
                />
                  {" "}Sign In with Google
                </>
              )}
            </button>
          </div>
          
        </form>

        {/* button */}
        <p className="text-center text-gray-400 ">
          Don`t have an account yet?{" "}
          <Link href={"/signup"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </section>
      <Toaster position="bottom-center" />
    </FormLayout>
  )
}

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req })

  // if (session) return { redirect: { destination: "/", permanent: false } }

  return {
    props: { session },
  }
}
