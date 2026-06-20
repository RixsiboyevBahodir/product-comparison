export type Product = {
    id: number
    name: string
    price: number
    ram: number
    ssd: number
    color: string
    image: string
}

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15",
        price: 999,
        ram: 16,
        ssd: 256,
        color: "Black",
        image: "https://asset.openshop.uz/uploads/products/photos/202603/e0U5C6zm7W61UcdbEpYx4Dcfuv7dzxsb.jpg"
    },
    {
        id: 2,
        name: "Samsung S24",
        price: 999,
        ram: 12,
        ssd: 256,
        color: "White",
        image: "https://asset.openshop.uz/uploads/products/photos/202603/dodTUhSnBEGvdWZz5r7F8afWbIhyjbXX.jpg"
    },
    {
        id: 3,
        name: "Xiaomi 14",
        price: 999,
        ram: 12,
        ssd: 256,
        color: "Black",
        image: "https://asset.openshop.uz/uploads/products/thumbnail/202605/22F9Qt31nHmnFYUwHHAU49A9ngOlSVab.png"
    },
    {
        id: 4,
        name: "Xiaomi X8",
        price: 450,
        ram: 8,
        ssd: 256,
        color: "White",
        image: "https://asset.openshop.uz/uploads/products/photos/202604/BSX6mvO5xMtVpEGzaGn9cP5ENtyVJwZ9.jpg"
    },
    {
        id: 5,
        name: "Redmi 15",
        price: 320,
        ram: 8,
        ssd: 128,
        color: "Black",
        image: "https://asset.openshop.uz/uploads/products/photos/202603/wmfGS5ZOgiZY60GXmejdJNJIv3h0uo4r.jpg"
    }
]