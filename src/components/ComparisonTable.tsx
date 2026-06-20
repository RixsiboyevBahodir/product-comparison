import { useEffect, useState } from 'react'
import type { Product } from '../data/products'

type ComparisonTableProps = {
  products: Product[]
}

export default function ComparisonTable({ products }: ComparisonTableProps) {

  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const stored = JSON.parse(localStorage.getItem('productId') || '[]')
    return Array.isArray(stored) ? stored : []
  })

  const deleteProduct = (id: number) => {
    const updated = selectedIds.filter((ids: number) => ids !== id)
    setSelectedIds(updated)
    localStorage.setItem('productId', JSON.stringify(updated))
  }

  useEffect(() => {
    const handleProductIdChanged = () => {
      const updated = JSON.parse(localStorage.getItem('productId') || '[]')
      setSelectedIds(Array.isArray(updated) ? updated : [])
    }

    window.addEventListener('productIdChanged', handleProductIdChanged)
    return () => window.removeEventListener('productIdChanged', handleProductIdChanged)
  }, [])

  const selectedProducts = products.filter(product => selectedIds.includes(product.id))

  const fieldDiffs = {
    price: new Set(selectedProducts.map(product => product.price)).size > 1,
    color: new Set(selectedProducts.map(product => product.color)).size > 1,
    ssd: new Set(selectedProducts.map(product => product.ssd)).size > 1,
    ram: new Set(selectedProducts.map(product => product.ram)).size > 1,
  }

  const valueClass = (field: keyof typeof fieldDiffs) =>
    fieldDiffs[field] ? 'text-red-500 font-semibold' : 'text-slate-900'

  const comparisonRows = [
    { label: 'Image', key: 'image' as const },
    { label: 'Name', key: 'name' as const },
    { label: 'Price', key: 'price' as const },
    { label: 'Color', key: 'color' as const },
    { label: 'SSD', key: 'ssd' as const },
    { label: 'RAM', key: 'ram' as const },
    { label: 'Remove', key: 'remove' as const },
  ]
  return (
    <div className="px-2">
      {selectedProducts.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
          No products selected for comparison yet.
        </div>
      ) : (
        <>
          <div className="space-y-4 md:hidden">
            {selectedProducts.map((product) => (
              <div key={product.id} className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className='flex items-center justify-between'>
                  <img src={product.image} alt="" className='sm:max-w-20 max-w-10' />
                  <p className='text-[10px] sm:text-sm'>{product.name}</p>
                  <div className='sm:flex items-center gap-7 text-[10px] sm:text-sm'>
                    <p className={`${valueClass('price')}`}>{product.price}$</p>
                    <p className={`${valueClass('color')}`}>{product.color}</p>
                  </div>
                  <div className='sm:flex items-center gap-7 text-[10px] sm:text-sm'>
                    <p className={`${valueClass('ram')}`}>{product.ram}</p>
                    <p className={`${valueClass('ssd')}`}>{product.ssd}</p>
                  </div>
                  <button
                    className="bg-red-500 py-2 px-5 rounded-xl text-[10px] sm:text-sm font-semibold text-white hover:opacity-70 active:opacity-25 transition-all duration-200 cursor-pointer"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <div className="min-w-full">
              {comparisonRows.map((row) => (
                <div key={row.key} className="flex items-start gap-4 py-4 border-b">
                  <div className="w-40 px-5 text-left text-xs font-semibold uppercase text-slate-500">
                    {row.label}
                  </div>

                  {selectedProducts.map((product) => {
                    const valueClassName =
                      row.key === 'price' || row.key === 'color' || row.key === 'ssd' || row.key === 'ram'
                        ? valueClass(row.key as keyof typeof fieldDiffs)
                        : 'text-slate-900'

                    return (
                      <div key={product.id} className="min-w-40 px-5 text-left text-sm">
                        {row.key === 'image' ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-20 w-auto object-contain rounded-2xl border"
                          />
                        ) : row.key === 'name' ? (
                          <p className="font-semibold text-slate-900">{product.name}</p>
                        ) : row.key === 'price' ? (
                          <p className={valueClassName}>{product.price}$</p>
                        ) : row.key === 'color' ? (
                          <p className={valueClassName}>{product.color}</p>
                        ) : row.key === 'ssd' ? (
                          <p className={valueClassName}>{product.ssd}</p>
                        ) : row.key === 'ram' ? (
                          <p className={valueClassName}>{product.ram}</p>
                        ) : (
                          <button
                            className="bg-red-500 py-2 px-4 rounded-xl text-sm font-semibold text-white hover:opacity-70 active:opacity-25 transition-all duration-200 cursor-pointer"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}