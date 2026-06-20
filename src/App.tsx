import ComparisonTable from "./components/ComparisonTable";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function App() {
  return (
    <div className="lg:max-w-280 m-auto p-4">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  gap-5 mt-5 mb-15">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div>
        <ComparisonTable products={products} />
      </div>
    </div>
  )
}
