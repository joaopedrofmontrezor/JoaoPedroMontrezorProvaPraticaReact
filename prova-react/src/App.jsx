import { useState, useEffect } from "react"
import StatusBar from "./components/StatusBar"
import Footer from "./components/Footer"
import ProdutoForm from "./components/ProdutoForm"
import temaEcommerce from "./assets/temaEcommerce.png"
import "./App.css"

function App() {
  const [produtos, setProdutos] = useState([])

  const adicionarProduto = (produto) => {
    setProdutos([...produtos, produto])
  }


  useEffect(() => {
    console.log("Lista de produtos atualizada:", produtos)
  }, [produtos])

  return (
    <div>

    <div className="container">
        <StatusBar />

      
        <img
          src={temaEcommerce}
          alt="E-commerce"
          width="100"
        />

        <ProdutoForm adicionarProduto={adicionarProduto} />

      
        <ul>
          {produtos.map((produto, index) => (
            <li key={index}>
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