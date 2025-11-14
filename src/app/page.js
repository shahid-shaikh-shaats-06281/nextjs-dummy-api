// app/page.js

export default async function Home() {
  // Fetch products from dummy API
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🛍️ Dummy Product Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4"
            style={{ background: "white" }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 mx-auto mb-4 object-contain "
            />
            <h2 className="text-lg font-semibold line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-500 text-sm mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
