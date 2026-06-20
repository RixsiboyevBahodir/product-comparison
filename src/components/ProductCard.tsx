import type { Product } from "../data/products";

export default function ProductCard({ id, name, color, ssd, ram, image, price }: Product) {

    const addToLocalStorage = (id: number) => {
        const productId = JSON.parse(localStorage.getItem('productId') || '[]')
        const exists = productId.some((ids: number) => ids === id)
        if (!exists) {
            localStorage.setItem('productId', JSON.stringify([...productId, id]))
        } else {
            alert("This product is in the cart.")
        }
        window.dispatchEvent(new Event('productIdChanged'))
    }

    return (
        <div className='rounded-xl overflow-hidden shadow-xl/20 pb-3 text-gray-700'>
            <img src={image} alt={name} />
            <div className='px-2 flex flex-col gap-3'>
                <p className='font-medium sm:text-xl'>{name}</p>
                <p className="sm:text-[18px]">{price}$</p>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0'>
                    <div className='flex flex-col items-center'>
                        <p className='text-gray-400 uppercase text-[0.7rem] tracking-[0.08em]'>Color</p>
                        <p className='text-sm sm:text-base'>{color}</p>
                    </div>
                    <p className='hidden sm:block'>×</p>
                    <div className='flex flex-col items-center'>
                        <p className='text-gray-400 uppercase text-[0.7rem] tracking-[0.08em]'>SSD</p>
                        <p className='text-sm sm:text-base'>{ssd}</p>
                    </div>
                    <p className='hidden sm:block'>×</p>
                    <div className='flex flex-col items-center'>
                        <p className='text-gray-400 uppercase text-[0.7rem] tracking-[0.08em]'>RAM</p>
                        <p className='text-sm sm:text-base'>{ram}</p>
                    </div>
                </div>
                <button onClick={() => addToLocalStorage(id)} className='bg-blue-300 w-full rounded-xl sm:text-[16px] text-[10px] sm:font-medium py-1.5 cursor-pointer hover:opacity-70 active:opacity-25 transition-all duration-200'>Add To Table</button>
            </div>
        </div>
    )
}
