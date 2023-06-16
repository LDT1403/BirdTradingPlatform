import ViewProduct from "../components/UI/view-product/ViewProduct";
export default function Shopping(){
  const ApiLink = "https://localhost:7241/api/Products/All_Product"
  return(
    <ViewProduct api = { ApiLink }/>
  )
}