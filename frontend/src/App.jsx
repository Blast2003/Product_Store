import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import Navbar from "./components/Navbar.jsx"
import { useProductStore } from "./store/product.js"


function App() {
  const {product} = useProductStore(); // global state (state = object which can change over time)
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
      <Navbar/>
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/create" element={<CreatePage/>}/>
      </Routes>
    </Box>
  )
}

export default App
