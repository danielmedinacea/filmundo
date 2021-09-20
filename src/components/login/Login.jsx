import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import cineLogin from "./img/cinelogin.svg";
import cineSignup from "./img/cinesignup.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const Swal = require("sweetalert2");
  const history = useHistory();
  const [container, setContainer] = useState("");
  const [userNameLogin, setUserNameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [usernameRegistro, setUsernameRegistro] = useState("");
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");

  const signup = () => {
    setContainer("sign-up-mode");
    setUserNameLogin("");
    setPasswordLogin("");
  };
  const signin = () => {
    setContainer("");
    setUsernameRegistro("");
    setEmailRegistro("");
    setPasswordRegistro("");
  };

  const registroUsuario = async (e) => {
    e.preventDefault();
    if (
      usernameRegistro === "" ||
      passwordRegistro === "" ||
      emailRegistro === ""
    ) {
      let timerInterval;
      Swal.fire({
        html: "Rellene todos los campos",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}proyecto/user`, {
        name: usernameRegistro,
        email: emailRegistro,
        password: passwordRegistro,
      })
      .then((response) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userData: response.data.userId,
            token: response.data.token,
          })
        );
        history.push("/main");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          Swal.fire({
            text: "Ya existe un usuario con esas credenciales, ¿Quieres iniciar sesión?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
          }).then((result) => {
            if (result.isConfirmed) {
              setContainer("");
              setUsernameRegistro("");
              setPasswordRegistro("");
              setEmailRegistro("");
            }
          });
        }
      });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    if (userNameLogin === "" || passwordLogin === "") {
      let timerInterval;
      Swal.fire({
        html: "Rellene todos los campos",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}proyecto/user/login`, {
        name: userNameLogin,
        password: passwordLogin,
      })
      .then((response) => {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userData: response.data.userId,
            token: response.data.token,
          })
        );
        history.push("/main");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          Swal.fire({
            text: "No existe este usuario ¿Quieres crearlo?",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
          }).then((result) => {
            if (result.isConfirmed) {
              setContainer("sign-up-mode");
              setUsernameRegistro(userNameLogin);
              setUserNameLogin("");
              setPasswordLogin("");
            }
          });
        }

        if (error.response.status === 401) {
          let timerInterval;
          Swal.fire({
            html: "Contraseña Incorrecta",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            willClose: () => {
              clearInterval(timerInterval);
            },
          });
        }
      });
  };

  useEffect(() => {
    const recoverData = JSON.parse(localStorage.getItem("userData"));
    if (recoverData) {
      history.push("/main");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`contenedor ${container}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={iniciarSesion}>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={userNameLogin}
                onChange={(e) => {
                  setUserNameLogin(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                value={passwordLogin}
                onChange={(e) => {
                  setPasswordLogin(e.target.value);
                }}
              />
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="button solid"
            />
          </form>
          <form action="#" className="sign-up-form" onSubmit={registroUsuario}>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre de Usuario"
                value={usernameRegistro}
                onChange={(e) => {
                  setUsernameRegistro(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={emailRegistro}
                onChange={(e) => {
                  setEmailRegistro(e.target.value);
                }}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Contraseña"
                value={passwordRegistro}
                onChange={(e) => {
                  setPasswordRegistro(e.target.value);
                }}
              />
            </div>
            <input type="submit" className="button" value="Registrarse" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Aún no tienes cuenta?</h3>
            <p>
              Únete para tener la mayor base de datos de películas del mundo
            </p>
            <button
              className="button transparent"
              id="sign-up-btn"
              onClick={signup}
            >
              Registro
            </button>
          </div>
          <img src={cineLogin} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya tienes cuenta?</h3>
            <p>Inicia sesión y disfruta.</p>
            <button
              className="button transparent"
              id="sign-in-btn"
              onClick={signin}
            >
              Iniciar Sesión
            </button>
          </div>
          <img src={cineSignup} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
