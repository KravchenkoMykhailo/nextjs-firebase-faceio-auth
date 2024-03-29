"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { validateName, validateEmail } from "@/validateUser";
import { useAuthentication } from "@/contexts/authentication";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  const { enrollNewUser, authenticateUser, logoutUser, user } =
    useAuthentication();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/vote");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Facial Authentication</title>
      </Head>

      <main>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "1rem",
            }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                width: "100%",
                backgroundImage: `url("/fioauth.png")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "calc(100vh - 2rem)",
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              backgroundColor: "#0d42b2",
              padding: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <div
                style={{
                  padding: "2rem",
                }}
              >
                <h1
                  style={{
                    margin: "0 0 2rem 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <a
                    style={{
                      display: "flex",
                    }}
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/logo.svg"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginRight: "0.5rem",
                      }}
                    />
                  </a>
                  <span style={{ fontSize: "25px" }}>E-Voting System</span>
                </h1>

                <nav
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      color: "#304073",
                      borderBottom: "0.1rem solid #0d42b2",
                      padding: "0 0 1rem 0",
                    }}
                  >
                    SIGN UP
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      color: "#304073",
                      borderBottom: "0.1rem solid #304073",
                      padding: "0 0 1rem 0",
                      opacity: 0.5,

                      cursor: "pointer",
                    }}
                    onClick={authenticateUser}
                  >
                    SIGN IN
                  </div>
                </nav>

                <form
                  style={{
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Steadylearner"
                      style={{
                        borderRadius: "4px",
                        border: "2px solid #d3e0f3",
                        width: "100%",
                        padding: "0.5rem 1rem",
                        lineHeight: "20px",
                        color: "#6783b8",

                        marginBottom: "1rem",
                      }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="steady@learner.com"
                      style={{
                        borderRadius: "4px",
                        border: "2px solid #d3e0f3",
                        width: "100%",
                        padding: "0.5rem 1rem",
                        lineHeight: "20px",
                        color: "#6783b8",
                      }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.toLowerCase());
                      }}
                    />
                  </div>

                  <button
                    style={{
                      marginTop: "2rem",

                      backgroundColor: "#0095ff",
                      border: "1px solid transparent",
                      borderRadius: "0.5rem",
                      boxShadow: "rgb(255 255 255 / 40%) 0 1px 0 0 inset",

                      color: "white",
                      padding: "1rem 0.5rem",

                      cursor: "pointer",
                    }}
                    type="button"
                    onClick={async () => {
                      console.log("sign in clicked");
                      console.log(name);
                      console.log(email);
                      if (name === "" || validateName(name) === false) {
                        toast.info("Please use a valid name");
                        return;
                      }
                      if (email === "" || validateEmail(email) === false) {
                        toast.info("Please use a valid email");
                        return;
                      }

                      await enrollNewUser(name, email);
                    }}
                  >
                    SIGN UP
                  </button>
                </form>

                <p
                  style={{
                    margin: "1rem 0 0 0",
                    lineHeight: "1.5rem",
                    padding: 0,
                    // color: "#0d42b2",
                    opacity: 0.5,
                  }}
                >
                  Cross Browser, Secure & Easy to implement, Passwordless
                  Authentication powered by Face Recognition for Web Sites &
                  Apps
                </p>

                <div
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <a
                    href="https://github.com/steadylearner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                  </a>

                  <a
                    href="https://t.me/steadylearner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TelegramIcon
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                  </a>

                  <a
                    href="https://twitter.com/steadylearner_p"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/steady-learner-3151b7164"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon
                      style={{
                        marginRight: "0.5rem",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
