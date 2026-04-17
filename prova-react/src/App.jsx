import { useState, useEffect } from "react"
import StatusBar from "./components/StatusBar"
import Footer from "./components/Footer"
import ProdutoForm from "./components/ProdutoForm"
import temaEcommerce from "./assets/temaEcommerce.png"
import "./App.css"


import { auth, db } from "./firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth"
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore"

function App() {

  const [mensagem, setMensagem] = useState("");
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [user, setUser] = useState(null)

  
  const [produtos, setProdutos] = useState([])

  

  const login = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, senha)
      setUser(userCred.user)
    } catch {
      alert("Erro no login")
    }
  }

  const cadastrar = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha)
      alert("Usuário criado!")
    } catch {
      alert("Erro no cadastro")
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setMensagem("Usuário Desconectado");
  }

  

  const adicionarProduto = async (produto) => {
    if (!produto.nome || !produto.preco) {
      alert("Preencha todos os campos")
      return
    }

    try {
      await addDoc(collection(db, "produtos"), produto)
      buscarProdutos()
    } catch {
      alert("Erro ao salvar")
    }
  }

  const buscarProdutos = async () => {
    const snapshot = await getDocs(collection(db, "produtos"))

    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setProdutos(lista)
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  
  if (!user) {
    return (
      <div className="login-container">
        <div className="login-box">

          {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

          <h2>Login</h2>
  
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
  
          <div>
            <button onClick={login}>Login</button>
            <button onClick={cadastrar}>Cadastrar</button>
          </div>
        </div>
      </div>
    )
  }
  

  return (
    <div>
      <div className="container">

        <StatusBar />

        <button onClick={logout}>Sair</button>

        <img
          src={temaEcommerce}
          alt="E-commerce"
          width="100"
        />

        <ProdutoForm adicionarProduto={adicionarProduto} />

        <ul>
          {produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome} - R$ {produto.preco}
            </li>
          ))}
        </ul>

        <Footer />

      </div>
    </div>
  )
}

export default App